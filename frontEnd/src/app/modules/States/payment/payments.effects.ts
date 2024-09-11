import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BackendDataService } from "../../../Services/backend-data.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../../States/app.state";
import { ToastrService } from "ngx-toastr";
import { addpayment, addpaymentSuccess, loadpayment, loadpaymentById, loadpaymentByIdSuccess, loadpaymentSuccess, updatepayment } from "./payment.action";
import { map, mergeMap, switchMap, tap } from "rxjs";
import { payment } from "../../../models/backend";
import { Router } from "@angular/router";
import { getPaymentsById } from "./payment.selector";

@Injectable()
export class PaymentsEffects {
    constructor(private actions$: Actions, private routes: Router, private backend: BackendDataService, private store: Store<AppState>, private tostr: ToastrService) { }

    loadPaymentsData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadpayment),
            mergeMap((action) => {
                return this.backend.getPaymentData().pipe(
                    map((payment) => {
                        return loadpaymentSuccess({ payment: payment })
                    })
                )
            })
        )
    });

    loadPaymentsDataById$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadpaymentById),
            mergeMap((action) => {
                return this.backend.getPaymentDataById(action.id).pipe(
                    map((payment: payment[]) => {
                        return loadpaymentByIdSuccess({ payment: payment })
                    })
                )
            })
        )
    });

    addPaymentsData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addpayment),
            mergeMap((action) => {
                return this.backend.postPymentData(action.payment).pipe(
                    map((data) => {
                        const user:payment = {
                            devoteeId: action.payment.devoteeId,
                            month: action.payment.month,
                            year: action.payment.year,
                            amount: action.payment.amount
                        };
                        return addpaymentSuccess({ payment: user })
                    })
                )
            })
        )
    });

    addPaymentSucess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addpaymentSuccess),
            tap((action) => {
                this.store.select(getPaymentsById).subscribe((d) => {
                    console.log(d);
                })
                this.routes.navigate(['/devotee/mypayments'])
            })
        )
    }, { dispatch: false })


}