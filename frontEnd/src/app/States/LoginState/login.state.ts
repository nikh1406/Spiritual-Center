import { loginFlag, loginResponse } from "../../models/backend"

export interface loginState{
    user:loginResponse | null;
    flag:loginFlag | null;
}

export const initialState:loginState = {
    user: null,
    flag: {
        isvalidCredential: true,
        otpView: false
    }
}