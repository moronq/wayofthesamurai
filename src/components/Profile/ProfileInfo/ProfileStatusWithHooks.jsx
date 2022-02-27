import React, {useState} from "react";

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)


    let activateEditMode = () => {
        setEditMode(true)
    }

    let deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    let onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{props.status || "---"}</span>
            </div>
            }
            {editMode &&
            <div>
                <input value={status} onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true}/>
            </div>
            }
        </div>
    )

}

export default ProfileStatusWithHooks