import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from 'react';
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {InitialStateType} from "../../redux/dialogs-reducer";

let maxLength100 = maxLengthCreator(100)

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void

}

const Dialogs: React.FC<PropsType> = (props) => {
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

    if(!props.isAuth){
        return <Redirect to={'/login'}/>
    }

    let addNewMessage = (values: {newMessageBody: string}) => {
        props.addMessage(values.newMessageBody)
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements(props.dialogsPage.dialogs)}
            </div>
            <div className={classes.messages}>
                {messagesElements(props.dialogsPage.messages)}
            </div>
            <AddMessageFormRedux onSubmit = {addNewMessage}/>
        </div>
    )
}

let AddMessageForm =(props)=>{
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name={"newMessageBody"} component={Textarea}
                   validate = {[required, maxLength100]}placeholder={"Enter your message"}></Field>
            <button>Send Message</button>
        </form>
    )
}

let AddMessageFormRedux = reduxForm(
    {form: 'dialogAddMessageForm'}
)(AddMessageForm)

export default Dialogs
