import {ResultCodesEnum, ResultCodesForCaptchaEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Action} from "redux";


let initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    captchaURL: null as null | string
}


const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SN/auth/SET_USER_DATA':
        case 'SN/auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.data,
            }
        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SN/auth/SET_USER_DATA', data: {userId, email, login, isAuth}
    } as const),
    getCaptchaURLSuccess: (captchaURL: string) => ({
        type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS', data: {captchaURL}
    } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodesForCaptchaEnum.captchaIsRequired) {
            dispatch(getCaptchaURL())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaURL = ():ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaURL()
    let captchaURL = data.url

    dispatch(actions.getCaptchaURLSuccess(captchaURL))

}
export default authReducer

export type InitialStateType = typeof initialState
type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType | ReturnType<typeof stopSubmit>>



