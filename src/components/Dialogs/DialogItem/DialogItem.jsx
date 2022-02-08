import classes from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    return (
        <div className={classes.dialog + ' ' + classes.active}>
            <NavLink to = {'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}

const Message = (props) => {
    return (
        <div className={classes.message}>{props.message}</div>
    )
}

let dialogs = [
    {id: '1', name: 'Sereja'},
    {id: '2', name: 'Sveta'},
    {id: '3', name: 'Valera'},
]

let dialogsElements = dialogs.map(d => <DialogItem name = {d.name} id = {d.id}/>)

let messages = [
    {id: '1', message: 'Hi'},
    {id: '2', message: 'Hello!'},
    {id: '3', message: 'Whatsaaaap'},
]

let messagesElements = messages.map(m => <Message message = {m.message}/>)

const Dialogs = (props) => {
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs