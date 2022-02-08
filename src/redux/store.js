import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: '1', message: 'Всем привет епа мать', likeCount: '69',},
                {id: '2', message: 'Эй, почему вы меня не лайкаете???', likeCount: '0',},
                {id: '3', message: 'Салам моим пацанам', likeCount: '14',},
                {id: '4', message: 'ебать это работает пацаны', likeCount: '14',},
                {id: '5', message: 'ахуеть я че теперь разраб на реакте???', likeCount: '14',},
            ],
            newPostText: ''
        },
        dialogsPage: {
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
        },
        sidebar: {},
    },
    _callSubscriber() {
        console.log('no subscribers')
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    getState() {
        return this._state
    },
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state)

    }
}

export default store
