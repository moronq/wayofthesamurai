import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from 'react';

const Dialogs = (props) => {
    let dialogsElements = (dialogs) => {
        return (
            dialogs.map(el => <DialogItem name={el.name} key = {el.id} id={el.id}/>)
        )
    }

    let messagesElements = (messages) => {
        return (
            messages.map(m => <Message message={m.message} key = {m.id}/>)
        )
    }

    let onMessageAdd = () => {
        props.addMessage()
    }

    let onMessageChange = (e) => {
        let text = e.target.value
        props.updateNewMessageText(text)
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements(props.dialogsPage.dialogs)}
            </div>
            <div className={classes.messages}>
                {messagesElements(props.dialogsPage.messages)}
            </div>
            <div>
                <textarea value={props.dialogsPage.newMessageText} onChange={onMessageChange}/>
            </div>
            <div>
                <button onClick={onMessageAdd}>send</button>
            </div>
        </div>
    )
}

export default Dialogs