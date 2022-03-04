import classes from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from './ProfileStatus'
import React from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";


const ProfileInfo = ({profile, status, updateStatus}) => {

    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={classes.descriptionBlock}>
                <img src={profile.photos.large}/>
                ava + description
                <ProfileStatusWithHooks status = {status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo