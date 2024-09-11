import { loaderReducer } from "./LoaderState/loader.reducer";
import { LOADER_STATE_NAME } from "./LoaderState/loader.selector";
import { loaderState } from "./LoaderState/loader.state";
import { loginReducer } from "./LoginState/login.reducer";
import { loginState } from "./LoginState/login.state";
import { userlistReducer } from "../modules/States/DevoteeList/userlist.reducers";
import { UserlistState } from "../modules/States/DevoteeList/userlist.state";
import { paymentReducer } from "../modules/States/payment/payment.reducer";
import { PaymentState } from "../modules/States/payment/payment.state";
import { LOGIN_STATE_NAME } from "./LoginState/login.selector";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { USERLIST_STATE_NAME } from "../modules/States/DevoteeList/userlist.selector";
import { PAYMETS_STATE_NAME } from "../modules/States/payment/payment.selector";

export interface AppState{
    [USERLIST_STATE_NAME]:UserlistState;
    [PAYMETS_STATE_NAME]:PaymentState;
    [LOGIN_STATE_NAME]:loginState;
    [LOADER_STATE_NAME]:loaderState
    router:RouterReducerState
}

export const appReducer = {
    [USERLIST_STATE_NAME] : userlistReducer,
    [PAYMETS_STATE_NAME]:paymentReducer,
    [LOGIN_STATE_NAME]:loginReducer,
    [LOADER_STATE_NAME]:loaderReducer,
    router:routerReducer
}