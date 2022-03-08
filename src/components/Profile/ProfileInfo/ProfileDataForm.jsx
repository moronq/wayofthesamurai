import React from "react";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import classes from './ProfileInfo.module.css'
import styles from "../../common/FormsControls/FormsControls.module.css";


const ProfileDataForm = ({profile, handleSubmit, error}) => {
    return <form>
        <div>
            <button onClick={handleSubmit}>
                Save
            </button>
        </div>
        {error && <div className={styles.formSummaryError}>
            {error}
        </div>}
        <div>
            <b>Full name: </b>{createField("Full Name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job: </b>{createField("", 'lookingForAJob', [], Input, {type: "checkbox"})}
        </div>
        <div>
            <b>My Professional
                Skills: </b>{createField('My Professional Skills', 'lookingForAJobDescription', [], Textarea)}
        </div>
        <div>
            <b>About Me: </b> {createField('About me', 'aboutMe', [], Input)}
        </div>
        <div>
            <b>Contacts: </b> {Object.keys(profile.contacts).map(keys => {
            return <div key={keys} className={classes.contacts}>
                <b>{keys}: {createField(keys, "contacts." + keys, [], Input)}</b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({
    form: 'edit-profile'
})(ProfileDataForm)

export default ProfileDataFormReduxForm