import {InferActionsTypes} from "./redux-store";

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

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SN/DIALOGS/ADD-MESSAGE':
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 4, message: body,}],
            }
        default:
            return state
    }
}

export const actions = {
    sendMessage: (newMessageBody: string) => ({
        type: 'SN/DIALOGS/ADD-MESSAGE',
        newMessageBody
    } as const)
}


export default dialogsReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
