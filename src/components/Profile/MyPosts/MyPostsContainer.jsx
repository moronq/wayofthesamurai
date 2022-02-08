import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import React from 'react'
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";

let postsElements = (data) => {
    return(
        data.map(el=> <Post message = {el.message} likeCount = {el.likeCount}/>)
    )
}

let newPostElement = React.createRef()

const MyPosts = (props) => {

    let addPost = () => {
        props.dispatch(addPostActionCreator())
    }

    let onPostChange = () => {
        let text = newPostElement.current.value
        props.dispatch(updateNewPostTextActionCreator(text))
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref = {newPostElement} value={props.newPostText} onChange={onPostChange}/>
                </div>
                <div>
                    <button onClick={addPost} >Add Post</button>
                </div>
            </div>
            <div className={classes.posts}>
                {postsElements(props.data)}
            </div>
        </div>
    )
}

export default MyPosts