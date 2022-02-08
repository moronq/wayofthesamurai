import classes from './Post.module.css'

const Post = (props) => {
    return (
            <div className={classes.item}>
                <img src="https://memax.club/wp-content/uploads/2019/06/milye_kartinki_1_03072146.jpg" alt=""/>
                {props.message}
                <div>
                    <span>{props.likeCount} Like</span>
                </div>
            </div>
    )
}

export default Post