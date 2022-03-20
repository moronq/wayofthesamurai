const ADD_MESSAGE = 'ADD-MESSAGE'

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Sereja'},
        {id: 2, name: 'Sveta'},
        {id: 3, name: 'Valera'},
        {id: 4, name: 'Vitalik'},
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello!'},
        {id: 3, message: 'Whatsaaaap'},
    ] as Array<MessageType>,
}
export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case ADD_MESSAGE:
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 4, message: body,}],
            }
        default:
            return state
    }
}

type SendMessageCreatorActionType = {
    type: typeof ADD_MESSAGE
    newMessageBody: string
}

export default dialogsReducer

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({type: ADD_MESSAGE, newMessageBody})