import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import React from 'react'
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";


const MyPosts = (props) => {

    let postsElements = (posts) => {
        return(
            posts.map(el=> <Post message = {el.message} key = {el.id} likeCount = {el.likeCount}/>)
        )
    }

    let newPostElement = React.createRef()

    let onPostAdd = () => {
        props.addPost()
    }

    let onPostChange = () => {
        let text = newPostElement.current.value
        props.updateNewPostText(text)
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref = {newPostElement} value={props.newPostText} onChange={onPostChange}/>
                </div>
                <div>
                    <button onClick={onPostAdd} >Add Post</button>
                </div>
            </div>
            <div className={classes.posts}>
                {postsElements(props.posts)}
            </div>
        </div>
    )
}

export default MyPosts