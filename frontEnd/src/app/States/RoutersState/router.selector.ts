import { RouterReducerState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const getRouterState = createFeatureSelector<RouterReducerState>('');

export const getcurrentRouteData = createSelector(
    getRouterState,
    (state)=> {
        return state.state.url
        
    }
)

