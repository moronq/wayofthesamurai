import classes from './ProfileInfo.module.css'

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img
                    src="https://icdn.lenta.ru/images/2021/04/27/20/20210427205427216/original_7a6a634533af24d3fb1124510487e2be.jpg"
                    alt="%%%"/>
            </div>
            <div className={classes.descriptionBlock}>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo