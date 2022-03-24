import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type PropsType = {
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    totalItemsCount: number
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({onPageChanged, currentPage, totalItemsCount, pageSize, users, ...props}) => {

    return <div>
        <Paginator onPageChanged={onPageChanged} currentPage={currentPage} totalItemsCount={totalItemsCount}
                   pageSize={pageSize}/>
        {
            users.map(u => <User key={u.id} user={u} follow={props.follow}
                                 followingInProgress={props.followingInProgress} unfollow={props.unfollow}/>
            )
        }
    </div>
}

export default Users






















