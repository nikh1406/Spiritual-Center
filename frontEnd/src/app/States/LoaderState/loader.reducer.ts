import { createReducer, on } from "@ngrx/store";
import { initialState } from "./loader.state";
import { setloadingspinner } from "./loader.action";

export const loaderReducer = createReducer(
    initialState,
    on(setloadingspinner, (state,action) =>{
    
        
        return {
            ...state,
            showLoading: action.status,
        }
    })
)