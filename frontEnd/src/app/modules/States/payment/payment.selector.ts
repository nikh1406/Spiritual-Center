import { createFeatureSelector, createSelector } from "@ngrx/store";
import { paymentAdapter, PaymentState } from "./payment.state";
import { map, of } from "rxjs";

export const PAYMETS_STATE_NAME = "payments"
const getPaymentsState = createFeatureSelector<PaymentState>(PAYMETS_STATE_NAME)

export const paymentSelector = paymentAdapter.getSelectors();

export const getPayments = createSelector(
    getPaymentsState,
    paymentSelector.selectAll
)

export const getPaymentsEntity = createSelector(
    getPaymentsState,
    paymentSelector.selectEntities
)




export const getPaymentsById = createSelector(
    getPayments,
    (payment)=>{
        return  payment ? payment.filter((d) => d.devoteeId === JSON.parse(localStorage.getItem("userData")!).id) : null;;
    }
)