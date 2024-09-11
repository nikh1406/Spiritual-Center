import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { userList } from "../../../models/backend";


export interface UserlistState extends EntityState<userList>{
    unpaidList:userList[]
}

export const UserlistAdapter = createEntityAdapter<userList>({
    selectId:selectUserId
});

export const initialState:UserlistState = UserlistAdapter.getInitialState({
    unpaidList:[]
});

// export interface UserlistState {
//     userlist:userList[]
// }

// export const initialState:UserlistState ={
//     userlist: []
// } 

export function selectUserId(a: userList): string {
    return a.devoteeId;
}