import classes from './MyPosts.module.css'

const MyPosts = () => {
    return (
            <div>
                My posts
                    <div>
                        new post
                    </div>
                <div className={classes.posts}>
                    <div className={classes.item}>
                        <img src="https://memax.club/wp-content/uploads/2019/06/milye_kartinki_1_03072146.jpg" alt=""/>
                        Post 1
                    </div>
                    <div className={classes.item}>
                        Post 2
                    </div>
                </div>
            </div>
    )
}

export default MyPosts