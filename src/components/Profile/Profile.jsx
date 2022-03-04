import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";


const Profile = ({profile, status, updateStatus}) => {
    return (
        <div className={classes.content}>
            <ProfileInfo profile = {profile} status = {status} updateStatus = {updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile

