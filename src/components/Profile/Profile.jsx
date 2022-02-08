import classes from './Profile.module.css'

const Profile = () => {
    return (
        <div className={classes.content}>
            <div>
                <img src="https://icdn.lenta.ru/images/2021/04/27/20/20210427205427216/original_7a6a634533af24d3fb1124510487e2be.jpg" alt="%%%"/>
            </div>
            <div>ava + description</div>
            <div>
                My posts
                    <div>
                        new post
                    </div>
                <div className={classes.posts}>
                    <div className={classes.item}>
                        Post 1
                    </div>
                    <div className={classes.item}>
                        Post 2
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile