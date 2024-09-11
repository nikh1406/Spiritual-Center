import { createAction, props } from "@ngrx/store";
import { payment, userList } from "../../../models/backend";
import { Update } from "@ngrx/entity";

export const ADD_PAYMENTS_ACTION =  '[PayOnline page] add payment';
export const ADD_PAYMENTS_SUCCESS =  '[PayOnline page] add payment success';

export const UPDATE_PAYMENTS_ACTION =  '[userlist page] update user';
export const UPDATE_PAYMENTS_SUCCESS =  '[userlist page] update user success';

// export const DELETE_PAYMENTS_ACTION =  '[userlist page] delete user';
// export const DELETE_PAYMENTS_SUCCESS =  '[userlist page] delete user success';

export const LOAD_PAYMENTS_ACTION =  '[Donation page] load payments';
export const LOAD_PAYMENTS_SUCCESS =  '[Donation page] load payments success';

export const LOAD_PAYMENTS_BY_ID_ACTION =  '[Mypayment page] load payments by id';
export const LOAD_PAYMENTS_BY_ID_SUCCESS =  '[Mypayment page] load payments by id success';




export const  addpayment = createAction(
    ADD_PAYMENTS_ACTION,
    props<{payment:payment}>()
);
export const addpaymentSuccess = createAction(
    ADD_PAYMENTS_SUCCESS,
    props<{payment:payment}>()
)

export const updatepayment = createAction(
    UPDATE_PAYMENTS_ACTION,
    props<{payment:payment}>()
)
export const updatepaymentSuccess = createAction(
    UPDATE_PAYMENTS_SUCCESS,
    props<{payment:Update<payment>}>()
)

// export const deletepayment = createAction(
//     DELETE_PAYMENTS_ACTION,
//     props<{id:string}>()
// )
// export const deletepaymentSuccess = createAction(
//     DELETE_PAYMENTS_SUCCESS,
//     props<{id:string}>()
// )

export const loadpayment = createAction(
    LOAD_PAYMENTS_ACTION,
)

export const loadpaymentSuccess = createAction(
    LOAD_PAYMENTS_SUCCESS,
    props<{payment:payment[]}>()
)


export const loadpaymentById = createAction(
    LOAD_PAYMENTS_BY_ID_ACTION,
    props<{id:string}>()

)

export const loadpaymentByIdSuccess = createAction(
    LOAD_PAYMENTS_BY_ID_SUCCESS,
    props<{payment:payment[]}>()
)