import classes from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import React from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.webp";


const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div className={classes.descriptionBlock}>
                <img className={classes.mainPhoto} src={profile.photos.large || userPhoto}/>
                {isOwner && <input onChange={onMainPhotoSelected} type={'file'}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                <div>
                    <div>
                        <b>Full name: </b>{profile.fullName}
                    </div>
                    <div>
                        <b>Looking for a job: </b>{profile.lookingForAJob ? "yes" : "no"}
                    </div>
                    {profile.lookingForAJob &&
                    <div>
                        <b>My Professional Skills: </b>{profile.lookingForAJobDescription}
                    </div>
                    }
                    <div>
                        <b>About Me: </b> {profile.aboutMe}
                    </div>
                    <div>
                        <b>Contacts: </b> {Object.keys(profile.contacts).map(keys => {
                            return <Contacts contactTitle={keys} contactValue={profile.contacts[keys]}/>
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Contacts = ({contactTitle, contactValue}) => {
    return <div className={classes.contacts}>
        <b>{contactTitle}: </b>{contactValue}
    </div>
}

export default ProfileInfo