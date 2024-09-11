import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { autologin, autologout, flagChange, loginFail, loginStart, loginSuccess } from './login.action';
import { catchError, concatMap, exhaustMap, filter, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { BackendDataService } from '../../Services/backend-data.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { setloadingspinner } from '../LoaderState/loader.action';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Login, loginFlag } from '../../models/backend';



@Injectable()
export class LoginEffects {


  constructor(private tostr: ToastrService, private route: Router, private actions$: Actions, private backendService: BackendDataService, private store: Store<AppState>) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      mergeMap((action) => {
        if (action.role === 'Admin' && action.password === "admin") {
          return this.backendService.getLoginToken({ id: action.id, role: action.role }).pipe(
            map((data) => {
              this.store.dispatch(setloadingspinner({ status: false }));
              this.backendService.setUserInLocalStorage(data);
              const flag: loginFlag = {
                isvalidCredential: true,
                otpView: false,
              };
              return loginSuccess({ user: data, flag: flag, redirect: true });
            }),
            catchError((error) => {
              this.tostr.error(error.error);
              this.store.dispatch(setloadingspinner({ status: false }));
              return of(loginFail());
            }),
          );
        } else if (action.role === 'Devotee') {

          return this.backendService.getuserList().pipe(
            switchMap((users) => {
              const user = users.filter((user) => user.devoteeId === action.id);

              if (user.length == 1 && action.password === 'password' && action.otp === '') {
                const flag: loginFlag = {
                  isvalidCredential: true,
                  otpView: true,
                };
                this.store.dispatch(setloadingspinner({ status: false }));

                return of(flagChange({ flag: flag }));
              }
              else if (user.length == 1 && action.password === 'password' && action.otp === '000000') {
                return this.backendService.getLoginToken({ id: action.id, role: action.role }).pipe(
                  map((data) => {
                    this.store.dispatch(setloadingspinner({ status: false }));
                    this.backendService.setUserInLocalStorage(data);
                    const flag: loginFlag = {
                      isvalidCredential: true,
                      otpView: false,
                    };
                    return loginSuccess({ user: data, flag: flag, redirect: true });
                  }),
                  catchError((error) => {
                    this.tostr.error(error.error);
                    this.store.dispatch(setloadingspinner({ status: false }));
                    return of();
                  }),
                );
              }
              else {
                const flag: loginFlag = {
                  isvalidCredential: false,
                  otpView: false,
                };
                this.store.dispatch(setloadingspinner({ status: false }));
                return of(flagChange({ flag: flag }));
              }
            }),
          );
        } else {
          this.store.dispatch(setloadingspinner({ status: false }));
          return of(loginFail())
        }
      }),
    );
  });


  loginRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      tap((action) => {
        if (action.redirect) {
          this.tostr.success("login Successfuly")
          if (action.user!.role == 'Admin') {
            this.route.navigate(['/admin/userlist'])
          }
          else {
            this.route.navigate(['/devotee/mypayments'])
          }
        }

      })
    )
  }, { dispatch: false })


  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autologin),
      mergeMap((action) => {
        const user = this.backendService.getuserFromLocalStorage()
        let flag: loginFlag = {
          isvalidCredential: true,
          otpView: false
        }
        // const tokenVerify:any = jwtDecode(user!['token'])
        // if(tokenVerify['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == 'Admin' || tokenVerify['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == "Devotee"){
        //   let flag: loginFlag = {
        //     isvalidCredential: true,
        //     otpView: false
        //   }
        //   return of(loginSuccess({ user: user, flag: flag, redirect: false }));
        // }
        // return of()
        return of(loginSuccess({ user: user, flag: flag, redirect: false }));
      })
    )
  })

  autologout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autologout),
      map((action) => {
        this.backendService.logOut();
        this.store.dispatch(setloadingspinner({ status: false }))
        this.route.navigate(["login"])
      }),

    )
  }, { dispatch: false })


  // IsLogin$ = createEffect(()=>{
  //   return this.actions$.pipe(
  //     ofType(ROUTER_NAVIGATED),
  //     filter((r:RouterNavigatedAction)=>{
  //       return r.payload.routerState.url.startsWith("/login")
  //     }),

  //   )
  // })
}
