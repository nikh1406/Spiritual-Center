import { createReducer, on } from "@ngrx/store";
import { initialState, UserlistAdapter } from "./userlist.state";
import { adduserSuccess, deleteUserSuccess, getByIdUserSuccess, loadUserSuccess, photouploadSuccess, unpaidUserSuccess, updateuserSuccess } from "./userlist.actions";


export const userlistReducer = createReducer(
    initialState,
    on(adduserSuccess, (state,action)=>{
        console.log(state);
        console.log(action.user);
        return UserlistAdapter.addOne(action.user,state);
    }),
    on(deleteUserSuccess,(state,{id})=>{
        return UserlistAdapter.removeOne(id,state);
    }),
    on(loadUserSuccess,(state,action)=>{
        return UserlistAdapter.setAll(action.user,state);
    }),

    on(getByIdUserSuccess,(state,action)=>{
        return UserlistAdapter.setOne(action.user,state);
    }),
    
    on(updateuserSuccess,(state,action)=>{
        console.log(state);
        console.log(action);
        sessionStorage.removeItem("EditUserData")
        return UserlistAdapter.updateOne(action.user,state);
    }),

    on(unpaidUserSuccess,(state,action)=>{
        return {
            ...state,
            unpaidList:action.payments
        }
    }),

    on(photouploadSuccess,
        (state,action)=>{
            console.log(state);
            console.log(action);
            return UserlistAdapter.updateOne(action.user,state);
        }
    ),
    // on(photouploadSuccess,
    //     (state,action)=>{
    //         return {
    //             ...state,
    //             entities[state.entities[]] = action.user.photo
    //         }
    //     }
    // )
   
)