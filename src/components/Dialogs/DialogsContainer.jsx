import React from 'react';
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

let mapStateToProps = (state) =>{
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch) =>{
    return {
        updateNewMessageText: (text) =>{
            dispatch(updateNewMessageTextActionCreator(text))
        },
        addMessage: () =>{
            dispatch(addMessageActionCreator())
        }
    }
}

let AuthRedirectComponent = withAuthRedirect(Dialogs)

const DialogsContainer = connect (mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

export default DialogsContainer