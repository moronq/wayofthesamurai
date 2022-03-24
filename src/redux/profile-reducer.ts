import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

let initialState = {
    posts: [
        {id: 1, message: 'Всем привет епа мать', likeCount: 69,},
        {id: 2, message: 'Эй, почему вы меня не лайкаете???', likeCount: 0,},
        {id: 3, message: 'Салам моим пацанам', likeCount: 14,},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SN/PROFILE/ADD-POST':
            return {
                ...state,
                posts: [...state.posts, {id: 4, message: action.postBody, likeCount: 12,}],
            }
        case "SN/PROFILE/SET_USER_PROFILE":
            return {...state, profile: action.profile}
        case "SN/PROFILE/SET_STATUS":
            return {...state, status: action.status}
        case "SN/PROFILE/SAVE_PHOTO_SUCCESS":
            return {...state, profile: {...state.profile, photos: action.photo}}
        default:
            return state
    }
}

export const actions = {
    addPostActionCreator: (postBody: string) => ({type: 'SN/PROFILE/ADD-POST', postBody} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    savePhotoSuccess: (photo: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photo} as const),
}

export const getUsersProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const savePhoto = (photo: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(photo)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    let userId = getState().auth.userId
    let data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUsersProfile(userId))
        } else {
            throw new Error('userId can\'t be null')
        }
    } else {
        dispatch(stopSubmit('edit-profile', {'contacts': {'facebook': data.messages[0]}}))
        return Promise.reject(data.messages[0])
    }
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>


