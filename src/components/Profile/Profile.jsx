import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";


const Profile = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    return (
        <div className={classes.content}>
            <ProfileInfo profile = {profile}
                         isOwner = {isOwner}
                         status = {status}
                         savePhoto = {savePhoto}
                         saveProfile = {saveProfile}
                         updateStatus = {updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile

