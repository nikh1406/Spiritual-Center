import { createReducer, on } from "@ngrx/store";
import { initialState } from "./login.state";
import { autologout, flagChange, loginFail, loginSuccess } from "./login.action";

export const loginReducer = createReducer(
    initialState,
    on(loginSuccess, (state, action) => {


        return {
            ...state,
            user: action.user,
            flag: action.flag
        }

    }),

    on(flagChange, (state, action) => {
        return {
            ...state,
            flag: action.flag
        }
    }),

    on(loginFail, (state) => {
        return {
            ...state,
            user: null,
            flag: {
                isvalidCredential: false,
                otpView: false
            }
        }
    }),
    on(autologout, (state, action) => {
        return {
            ...state,
            user: null,
            flag: {
                isvalidCredential: true,
                otpView: false
            }
        }

    })
)