const ADD_MESSAGE = 'ADD-MESSAGE'

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
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: '4', message: body,}],
            }
        default:
            return state
    }
}

export default dialogsReducer

export const addMessageActionCreator = (newMessageBody) => ({type: ADD_MESSAGE, newMessageBody})