import classes from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";

const ProfileInfo = (props) => {
    return (

    )
}

const Profile = () => {
    return (
        <div className={classes.content}>
            <div>
                <img src="https://icdn.lenta.ru/images/2021/04/27/20/20210427205427216/original_7a6a634533af24d3fb1124510487e2be.jpg" alt="%%%"/>
            </div>
            <div>ava + description</div>
            <MyPosts />
        </div>
    )
}

export default Profile