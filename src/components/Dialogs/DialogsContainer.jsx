import React from 'react';
import {sendMessageCreator,} from "../../redux/dialogs-reducer.ts";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) =>{
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch) =>{
    return {
        addMessage: (newMessageBody) =>{
            dispatch(sendMessageCreator(newMessageBody))
        }
    }
}

export default compose(
    connect (mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs)