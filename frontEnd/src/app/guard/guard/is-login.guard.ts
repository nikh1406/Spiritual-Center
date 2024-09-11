import { CanActivateFn, Router } from '@angular/router';
import { BackendDataService } from '../../Services/backend-data.service';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../States/app.state';
import { loginSuccess } from '../../States/LoginState/login.action';
import { loginFlag } from '../../models/backend';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const routes = inject(Router);
  const backendService = inject(BackendDataService);
  const store = inject(Store<AppState>);
  
  if(backendService.getuserFromLocalStorage() != null){
    const user = backendService.getuserFromLocalStorage()

    const flag:loginFlag = {
      isvalidCredential: true,
      otpView: false
    }    
    store.dispatch(loginSuccess({ user: user!,flag,redirect:true }))
  }
  return true

    // if(backendService.getuserFromLocalStorage() != null){
  //   const user = backendService.getuserFromLocalStorage()

  //   const flag:loginFlag = {
  //     isvalidCredential: true,
  //     otpView: false
  //   } 
  //   if(jwtDecode(user!['token'])){
  //     const tokenVerify:any = jwtDecode(user!['token'])
  //     if(tokenVerify['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === "Admin" || tokenVerify['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === "Devotee"){
  //       store.dispatch(loginSuccess({ user: user!,flag,redirect:true }))
  //     }
  //     else{
  //       routes.navigate(['/'])
  //     }
  //   }   
  // }
  // return true
};
