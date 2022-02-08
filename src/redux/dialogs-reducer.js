const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

let initialState = {
    dialogs: [
        {id: '1', name: 'Sereja'},
        {id: '2', name: 'Sveta'},
        {id: '3', name: 'Valera'},
        {id: '4', name: 'Vitalik'},
    ],
    messages: [
        {id: '1', message: 'Hi'},
        {id: '2', message: 'Hello!'},
        {id: '3', message: 'Whatsaaaap'},
    ],
    newMessageText: '',
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            let body = state.newMessageText
            return {
                ...state,
                messages: [...state.messages, {id: '4', message: body,}],
                newMessageText: ''
            }
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newText
            }
        default:
            return state
    }
}

export default dialogsReducer

export const addMessageActionCreator = () => ({type: ADD_MESSAGE})
export const updateNewMessageTextActionCreator = (text) => ({type: UPDATE_NEW_MESSAGE_TEXT, newText: text})