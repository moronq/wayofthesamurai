import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import React from 'react'
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10)

const MyPosts = (props) => {

    let postsElements = (posts) => {
        return (
            posts.map(el => <Post message={el.message} key={el.id} likeCount={el.likeCount}/>)
        )
    }

    let onAddPost = (value) => {
        props.addPost(value.postBody)
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <NewPostReduxForm onSubmit={onAddPost}/>
            </div>
            <div className={classes.posts}>
                {postsElements(props.posts)}
            </div>
        </div>
    )
}

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"postBody"} validate={[required, maxLength10,]}></Field>
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}

const NewPostReduxForm = reduxForm({
    form: 'ProfileAddNewPostForm'
})(AddNewPostForm)


export default MyPosts