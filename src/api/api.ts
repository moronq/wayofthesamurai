import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'c20cb63c-22e4-4d92-a542-582215d9946d'
    },
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodesForCaptchaEnum {
    captchaIsRequired = 10,
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}