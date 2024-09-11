import { createAction, props } from "@ngrx/store";
import { userList } from "../../../models/backend";
import { Update } from "@ngrx/entity";

export const ADD_USER_ACTION =  '[usercreate page] add user';
export const ADD_USER_SUCCESS =  '[usercreate page] add user success';

export const UPDATE_USER_ACTION =  '[edituser page] update user';
export const UPDATE_USER_SUCCESS =  '[edituser page] update user success';

export const DELETE_USER_ACTION =  '[userlist page] delete user';
export const DELETE_USER_SUCCESS =  '[userlist page] delete user success';

export const LOAD_USER_ACTION =  '[userlist page] load user';
export const LOAD_USER_SUCCESS =  '[userlist page] load user success';

export const GET_USER_BY_ID_ACTION =  '[Profile page] get user by Id';
export const GET_USER_BY_ID_SUCCESS =  '[Profile page] get user by Id success';

export const PHOTO_UPLOAD_ACTION =  '[Edit/create user page] photo Upload Action';
export const PHOTO_UPLOAD_SUCCESS =  '[Edit/create user page] photo Upload success';

export const UNPAID_PAYMENTS_ACTION =  '[Donation page] unpaid payments';
export const UNPAID_PAYMENTS_SUCCESS =  '[Donation page] unpaid payments success';


export const  adduser = createAction(
    ADD_USER_ACTION,
    props<{user:userList,photoFile:File}>()
);
export const adduserSuccess = createAction(
    ADD_USER_SUCCESS,
    props<{user:userList}>()
)

export const  getByIdUser = createAction(
    GET_USER_BY_ID_ACTION,
    props<{id:string}>()
);
export const getByIdUserSuccess = createAction(
    GET_USER_BY_ID_SUCCESS,
    props<{user:userList}>()
)

export const updateuser = createAction(
    UPDATE_USER_ACTION,
    props<{user:userList,photoFile:File}>()
)
export const updateuserSuccess = createAction(
    UPDATE_USER_SUCCESS,
    props<{user:Update<userList>}>()
)

export const deleteUser = createAction(
    DELETE_USER_ACTION,
    props<{id:string}>()
)
export const deleteUserSuccess = createAction(
    DELETE_USER_SUCCESS,
    props<{id:string}>()
)

export const loadUser = createAction(
    LOAD_USER_ACTION,
)

export const loadUserSuccess = createAction(
    LOAD_USER_SUCCESS,
    props<{user:userList[]}>()
)

export const photoupload = createAction(
    PHOTO_UPLOAD_ACTION,
    props<{user:userList,photoFile:File}>()
)
export const photouploadSuccess = createAction(
    PHOTO_UPLOAD_SUCCESS,
    props<{user:Update<userList>}>()
)

export const unpaidUserAction = createAction(
    UNPAID_PAYMENTS_ACTION,
)
export const unpaidUserSuccess = createAction(
    UNPAID_PAYMENTS_SUCCESS,
    props<{payments:userList[]}>()
)