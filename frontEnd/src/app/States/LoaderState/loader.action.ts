import { createAction, props } from "@ngrx/store"

export const SET_LOADING_ACTION = "[Loader State] set loading pinner"
export const RESET_LOADING_ACTION = "[Loader State] reset loading pinner"


export const setloadingspinner = createAction(SET_LOADING_ACTION,
    props<{ status: boolean }>()
);

