import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users ids,
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case "SN/USERS/SET_USERS":
            return {...state, users: action.users}
        case "SN/USERS/SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case 'SN/USERS/SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.count}
        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.fetch}
        case 'SN/USERS/TOGGLE_IN_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state
    }
}

export const actions = {
    followSuccess: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'SN/USERS/SET_TOTAL_USERS_COUNT',
        count: totalUsersCount
    } as const),
    toggleIsFetching: (fetch: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', fetch} as const),
    toggleIsFollowing: (isFetching: boolean, userId: number) => ({
        type: 'SN/USERS/TOGGLE_IN_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)

}

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(currentPage))
    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
    dispatch(actions.toggleIsFetching(false))
}

const _followUnfollowMethod = async (dispatch: Dispatch<ActionsTypes>, userId: number,
                                     actionCreator: (userId: number) => ActionsTypes,
                                     apiMethod: any) => {
    dispatch(actions.toggleIsFollowing(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleIsFollowing(false, userId))
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowMethod(dispatch, userId, actions.unfollowSuccess, usersAPI.unfollowUsers.bind(usersAPI))
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowMethod(dispatch, userId, actions.followSuccess, usersAPI.followUsers.bind(usersAPI))
}


export default usersReducer

type InitialState = typeof initialState
type ThunkType = BaseThunkType<ActionsTypes>
type ActionsTypes = InferActionsTypes<typeof actions>