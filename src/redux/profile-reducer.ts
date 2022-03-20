import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState = {
    posts: [
        {id: 1, message: 'Всем привет епа мать', likeCount: 69,},
        {id: 2, message: 'Эй, почему вы меня не лайкаете???', likeCount: 0,},
        {id: 3, message: 'Салам моим пацанам', likeCount: 14,},
        {id: 4, message: 'ебать это работает пацаны', likeCount: 14,},
        {id: 5, message: 'ахуеть я че теперь разраб на реакте???', likeCount: 14,},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 6, message: action.postBody, likeCount: 12,}],
            }
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photo}}
        default:
            return state
    }
}
export default profileReducer

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    postBody: string
}
export const addPostActionCreator = (postBody: string): AddPostActionCreatorType => ({type: ADD_POST, postBody})
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status})
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photo: PhotosType
}
export const savePhotoSuccess = (photo: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photo})

export const getUsersProfile = (userId: number) => async (dispatch: any) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const savePhoto = (photo: PhotosType) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    let userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUsersProfile(userId))
    } else {
        dispatch(stopSubmit('edit-profile', {'contacts': {'facebook': response.data.messages[0]}}))
        return Promise.reject(response.data.messages[0])
    }
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}




