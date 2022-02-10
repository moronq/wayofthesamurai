import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.webp";
import {NavLink} from "react-router-dom";
import * as axios from "axios";


let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(el => {
                return <span onClick={() => {
                    props.onPageChanged(el)
                }} className={props.currentPage === el && styles.selectedPage}>{el}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/'+ u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} alt=""
                             className={styles.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/` + u.id, {
                                    withCredentials: true,
                                    headers: {
                                        'API-KEY': 'c20cb63c-22e4-4d92-a542-582215d9946d'
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(u.id)
                                        }
                                    })
                            }
                            }>Unfollow</button>
                            : <button onClick={() => {
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/` + u.id, {}, {
                                    withCredentials: true,
                                    headers: {
                                        'API-KEY': 'c20cb63c-22e4-4d92-a542-582215d9946d'
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(u.id)
                                        }
                                    })
                            }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users






















