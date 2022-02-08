import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from 'react';
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogs-reducer";

let dialogsElements = (dialogs) => {
    return (
        dialogs.map(el => <DialogItem name={el.name} id={el.id}/>)
    )
}

let messagesElements = (messages) => {
    return (
        messages.map(m => <Message message={m.message}/>)
    )
}

const Dialogs = (props) => {

    let addMessage = () => {
        props.dispatch(addMessageActionCreator())
    }

    let onMessageChange = (e) => {
        let text = e.target.value
        props.dispatch(updateNewMessageTextActionCreator(text))
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements(props.state.dialogs)}
            </div>
            <div className={classes.messages}>
                {messagesElements(props.state.messages)}
            </div>
            <div>
                <textarea value={props.state.newMessageText} onChange={onMessageChange}/>
            </div>
            <div>
                <button onClick={addMessage}>send</button>
            </div>
        </div>
    )
}

export default Dialogs