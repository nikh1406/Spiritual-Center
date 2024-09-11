import { createFeatureSelector, createSelector } from "@ngrx/store"
import { loaderState } from "./loader.state"

export const LOADER_STATE_NAME = "loader"


const getLoaderState = createFeatureSelector<loaderState>(LOADER_STATE_NAME);

export const getLoading = createSelector(
    getLoaderState,
    (state) =>{
        return state.showLoading;
    }
)