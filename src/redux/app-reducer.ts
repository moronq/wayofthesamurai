import {getAuthUserData} from "./auth-reducer"
import {InferActionsTypes} from "./redux-store";

let initialState = {
    initialized: false,
}
export type InitialStateType = typeof initialState

type ActionType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SN/APP/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}

const actions = {
    initializedSuccess: ()=> ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
        Promise.all([promise])
            .then(()=>{
                dispatch(actions.initializedSuccess())
        })
}

export default appReducer

