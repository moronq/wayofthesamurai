import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState = {
    posts: [
        {id: '1', message: 'Всем привет', likeCount: '69',},
        {id: '2', message: 'Эй, почему вы меня не лайкаете???', likeCount: '0',},
        {id: '3', message: 'Салам моим пацанам', likeCount: '14',},
    ],
    profile: null,
    status: '',
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: '6', message: action.postBody, likeCount: 12,}],
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

export const addPostActionCreator = (postBody) => ({type: ADD_POST, postBody})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const savePhotoSuccess = (photo) => ({type: SAVE_PHOTO_SUCCESS, photo})

export const getUsersProfile = (userId) => async dispatch => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async dispatch => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const savePhoto = (photo) => async dispatch => {
    let response = await profileAPI.savePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    let userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUsersProfile(userId))
    } else {
        dispatch(stopSubmit('edit-profile', {'contacts': {'facebook': response.data.messages[0]}}))
        return Promise.reject(response.data.messages[0])
    }
}

export const updateStatus = (status) => async dispatch => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}




