import * as axios from "axios";



const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'c20cb63c-22e4-4d92-a542-582215d9946d'
    },
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    unfollowUsers(userId){
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/` + userId,)
    },

    followUsers(userId){
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/` + userId)
    }
}

