import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


let Users = ({onPageChanged, currentPage, totalUsersCount, pageSize, users, ...props}) => {

    return <div>
        <Paginator onPageChanged={onPageChanged} currentPage={currentPage} totalUsersCount={totalUsersCount}
                   pageSize={pageSize}/>
        {
            users.map(u => <User key={u.id} user={u} follow={props.follow}
                                 followingInProgress={props.followingInProgress} unfollow={props.unfollow}/>
            )
        }
    </div>
}

export default Users






















