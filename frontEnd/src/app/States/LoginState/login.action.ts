import { createAction, props } from "@ngrx/store";
import { loginFlag, loginResponse } from "../../models/backend";

export const  LOGIN_START = '[login page] login Start';
export const  LOGIN_SUCCESS = '[login page] login Success';
export const  LOGIN_Fali = '[login page] login Fail';


export const  Flag_Status = 'Flag_Status Changed';


export const  LOGOUT_ACTION = '[login page] logout';


export const  AUTO_LOGIN_ACTION = '[login page] auto login';


export const loginStart = createAction(
    LOGIN_START,
    props<{id:string,role:string,password:string,otp:string}>()
)
export const loginSuccess = createAction(
    LOGIN_SUCCESS,
    props<{user:loginResponse | null,flag:loginFlag,redirect:boolean}>()
)
export const loginFail = createAction(
    LOGIN_Fali
)

export const flagChange = createAction(
    Flag_Status,
    props<{flag:loginFlag}>()
)


export const autologin = createAction(
    AUTO_LOGIN_ACTION,
    
)

export const autologout = createAction(
    LOGOUT_ACTION,
)
