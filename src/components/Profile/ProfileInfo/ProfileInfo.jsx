import classes from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import React, {useState} from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.webp";
import ProfileDataForm from "./ProfileDataForm";


const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData).then(()=>{
            setEditMode(false)
            })
    }

    return (
        <div>
            <div className={classes.descriptionBlock}>
                <img className={classes.mainPhoto} src={profile.photos.large || userPhoto}/>
                {isOwner && <input onChange={onMainPhotoSelected} type={'file'}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                {editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={profile} setEditMode = {()=> {setEditMode(true)}} isOwner={isOwner}/>}
            </div>
        </div>
    )
}

const ProfileData = ({profile, isOwner, setEditMode}) => {
    return <div>
        {isOwner && <div>
            <button onClick={setEditMode}>
                Edit
            </button>
        </div>}
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
            return <Contacts key={keys} contactTitle={keys} contactValue={profile.contacts[keys]}/>
        })}
        </div>
    </div>
}


const Contacts = ({contactTitle, contactValue}) => {
    return <div className={classes.contacts}>
        <b>{contactTitle}: </b>{contactValue}
    </div>
}

export default ProfileInfo