import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, finalize, map, mergeMap, of, switchMap, tap, withLatestFrom } from "rxjs";
import { Update } from "@ngrx/entity";
import { BackendDataService } from "../../../Services/backend-data.service";
import { adduser, adduserSuccess, deleteUser, deleteUserSuccess, getByIdUser, getByIdUserSuccess, loadUser, loadUserSuccess, photoupload, photouploadSuccess, unpaidUserAction, unpaidUserSuccess, updateuser, updateuserSuccess } from "./userlist.actions";
import { userList } from "../../../models/backend";
import { createReducer, Store } from "@ngrx/store";
import { AppState } from "../../../States/app.state";
import { setloadingspinner } from "../../../States/LoaderState/loader.action";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Injectable()
export class UserListEffects {
    constructor(private actions$: Actions, private routes: Router, private backend: BackendDataService, private store: Store<AppState>, private tostr: ToastrService) { }


    loadUser$ = createEffect(() => {
        return this.actions$.pipe(

            ofType(loadUser),
            mergeMap((action) => {
                return this.backend.getuserList().pipe(
                    map((user) => {
                        return loadUserSuccess({ user })
                    }),
                    catchError(error => {
                        this.tostr.error(error.error)
                        return of();
                    })

                )
            })
        )
    });

    getUserById$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getByIdUser),
            mergeMap((action) => {
                return this.backend.getuserListById(action.id).pipe(
                    map((user) => {
                        return getByIdUserSuccess({ user })
                    })
                )
            })
        )
    })


    addUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(adduser),
            mergeMap((action) => {
                return this.backend.postUserData(action.user).pipe(
                    map((data) => {
                        console.log(data);
                        let user = {
                            ...data
                        };
                        if (action.user.photo != "") {
                            let formData = new FormData();
                            formData.append('file', action.photoFile);
                            this.backend.uploadPhoto(data.devoteeId, formData).subscribe((d) => {
                                user.photo = d.filename
                            })
                        }
                        return adduserSuccess({ user })
                    }),

                    finalize(() => {
                        setTimeout(() => {
                            this.routes.navigate(["/admin/userlist"]);
                            this.store.dispatch(setloadingspinner({ status: false }))
                        }, 3000);
                    })
                )
            })
        )
    });

    updateUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateuser),
            mergeMap((action) => {

                return this.backend.updateUserData(action.user.devoteeId, action.user).pipe(
                    map((data) => {
                        debugger
                        let updatePost: Update<userList> = {
                            id: action.user.devoteeId,
                            changes: {
                                ...action.user,
                            },
                        };
                        debugger
                        if(action.photoFile != undefined){
                            debugger
                            let formData = new FormData();
                            formData.append('file', action.photoFile);
                            this.backend.uploadPhoto(action.user.devoteeId, formData).subscribe((d) => {
                                updatePost.changes.photo = d.filename
                                
                            })
                        }
                        return updateuserSuccess({ user: updatePost });
                    }),
                    catchError(error => {
                        this.tostr.error(error)
                        this.store.dispatch(setloadingspinner({ status: false }))
                        return of();
                    }),
                    finalize(() => {
                        setTimeout(() => {
                            this.routes.navigate(["/admin/userlist"]);
                            this.store.dispatch(setloadingspinner({ status: false }))
                        }, 5000);
                    })
                )

            })
        )
    })

    // photoUpload$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(photoupload),
    //         mergeMap((action) => {

    //             const formData = new FormData();
    //             formData.append('file', action.photoFile);
    //             return this.backend.uploadPhoto(action.user.devoteeId, formData).pipe(
    //                 map((data) => {
    //                     const updatePost: Update<userList> = {
    //                         id: action.user.devoteeId,
    //                         changes: {
    //                             ...action.user,
    //                             photo: data.filename.toString()
    //                         },
    //                     };
    //                     console.log(updatePost);
    //                     this.store.dispatch(setloadingspinner({ status: false }))
    //                     return photouploadSuccess({ user: updatePost })
    //                 })
    //             )
    //         })
    //     )
    // })



    unpaidUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(unpaidUserAction),
            mergeMap((action) => {
                return this.backend.getUnpaidUserDetial().pipe(
                    map((payments) => {
                        return unpaidUserSuccess({ payments })
                    })
                )
            })
        )
    })

    deleteUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteUser),
            switchMap((action) => {
                return this.backend.deleteUser(action.id).pipe(
                    map((data) => {
                        this.tostr.success(data)
                        return deleteUserSuccess({ id: action.id })
                    }),
                    catchError(error => {
                        this.tostr.error(error.error)
                        this.store.dispatch(setloadingspinner({ status: false }))
                        return of();
                    })
                )
            })
        )
    })




}