import {GetItemsType, instance, APIResponseType} from "./api"
import {AxiosPromise} from "axios";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    unfollowUsers(userId: number) {
        return instance.delete(`follow/` + userId).then(res=>res.data) as Promise<APIResponseType>
    },

    followUsers(userId: number) {
        return instance.post<APIResponseType>(`follow/` + userId).then(res => res.data)
    },
}