import { createReducer, on } from "@ngrx/store";
import { initialState, paymentAdapter } from "./payment.state";
import {  addpayment, addpaymentSuccess, loadpaymentByIdSuccess, loadpaymentSuccess, updatepaymentSuccess } from "./payment.action";


export const paymentReducer = createReducer(
    initialState,
    // on(addpayment, (state,action)=>{
    //     return {
    //         ...state,
    //         payment:action.payment
    //     }
    // }),
    on(addpaymentSuccess, (state,action)=>{
        return paymentAdapter.addOne(action.payment,state)
    }),
    // on(deletepaymentSuccess,(state,{id})=>{
    //     return paymentAdapter.removeOne(id,state);
    // }),
    on(loadpaymentSuccess,(state,action)=>{
        return paymentAdapter.setAll(action.payment,state);
    }),

    on(loadpaymentByIdSuccess,(state,action)=>{
        return paymentAdapter.setAll(action.payment,state);
    }),
    on(updatepaymentSuccess,(state,action)=>{
        return paymentAdapter.updateOne(action.payment,state);
    })

)