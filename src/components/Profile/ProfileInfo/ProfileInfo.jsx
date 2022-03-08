import classes from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import React from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.webp";


const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e)=> {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div className={classes.descriptionBlock}>
                <img className={classes.mainPhoto} src={profile.photos.large || userPhoto}/>
                ava + description
                {isOwner && <input onChange={onMainPhotoSelected} type={'file'}/>}
                <ProfileStatusWithHooks status = {status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo