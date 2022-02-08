const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

let initialState = {
    posts: [
        {id: '1', message: 'Всем привет епа мать', likeCount: '69',},
        {id: '2', message: 'Эй, почему вы меня не лайкаете???', likeCount: '0',},
        {id: '3', message: 'Салам моим пацанам', likeCount: '14',},
        {id: '4', message: 'ебать это работает пацаны', likeCount: '14',},
        {id: '5', message: 'ахуеть я че теперь разраб на реакте???', likeCount: '14',},
    ],
    newPostText: '',
    profile: null
}

const profileReducer = (state = initialState, action) => {


    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: '6', message: state.newPostText, likeCount: 12,}],
                newPostText: ''
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state
    }
}
export default profileReducer

export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})