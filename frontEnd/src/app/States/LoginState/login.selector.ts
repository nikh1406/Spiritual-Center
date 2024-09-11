import { createFeatureSelector, createSelector } from "@ngrx/store";
import { loginState } from "./login.state";


export const LOGIN_STATE_NAME = "Login";

const getLoginState = createFeatureSelector<loginState>(LOGIN_STATE_NAME);

export const isAuthenticated = createSelector(getLoginState,
    state => {
        return state.user ? true : false
    }
)

export const loginUserDetail = createSelector(
    getLoginState,
    (state) => {
        return [state.user?.id];
    }
) 

export const getFlag = createSelector(
    getLoginState,
    state => {
        return state.flag
    }
)
