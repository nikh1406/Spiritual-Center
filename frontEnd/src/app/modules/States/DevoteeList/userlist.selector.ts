import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserlistAdapter, UserlistState } from "./userlist.state";

export const USERLIST_STATE_NAME = 'Devotee';
const getUserState = createFeatureSelector<UserlistState>(USERLIST_STATE_NAME);

export const userSelector = UserlistAdapter.getSelectors();

export const getUser = createSelector(
    getUserState,
    userSelector.selectAll
);

export const getUserEntities = createSelector(
    getUserState,
    userSelector.selectEntities
);

export const getUnpaidData = createSelector(
    getUserState,
    (state)=>{
        return state.unpaidList
    }
)

export const getUserById = createSelector(
    getUser,
    (post)=>{
        return post ? post.filter((d) => d.devoteeId === JSON.parse(localStorage.getItem("userData")!).id) : null;
    }
)

