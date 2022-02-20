import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'

let initialState = {
    posts: [
        {id: '1', message: 'Всем привет епа мать', likeCount: '69',},
        {id: '2', message: 'Эй, почему вы меня не лайкаете???', likeCount: '0',},
        {id: '3', message: 'Салам моим пацанам', likeCount: '14',},
        {id: '4', message: 'ебать это работает пацаны', likeCount: '14',},
        {id: '5', message: 'ахуеть я че теперь разраб на реакте???', likeCount: '14',},
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
        default:
            return state
    }
}
export default profileReducer

export const addPostActionCreator = (postBody) => ({type: ADD_POST, postBody})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})

export const getUsersProfile =(userId) =>{
    return(dispatch) => {
        usersAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data))
            })
    }
}

export const getStatus =(userId) =>{
    return(dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data))
            })
    }
}

export const updateStatus =(status) =>{
    return(dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            })
    }
}



