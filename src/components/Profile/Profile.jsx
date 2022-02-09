import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";


const Profile = (props) => {
    return (
        <div className={classes.content}>
            <ProfileInfo profile = {props.profile} />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile

