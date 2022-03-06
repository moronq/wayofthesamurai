import {connect} from "react-redux";
import {
    follow, requestUsers,
    setTotalUsersCount,
    unfollow,
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage,pageSize)

    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize)

    }

    render() {
        return <>
            {this.props.isFetching? <Preloader/> : null}
            <Users totalItemsCount={this.props.totalUsersCount}
                   pageSize={ this.props.pageSize}
                   currentPage = {this.props.currentPage}
                   onPageChanged = {this.onPageChanged}
                   users = {this.props.users}
                   follow = {this.props.follow}
                   unfollow = {this.props.unfollow}
                   followingInProgress = {this.props.followingInProgress}
            />
        </>

    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default compose(
    connect(mapStateToProps, {
        follow, unfollow, setTotalUsersCount, getUsers: requestUsers,
    }))(UsersContainer)

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber) =>{
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) =>{
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetching: (fetch) =>{
//             dispatch(toggleIsFetchingAC(fetch))
//         }
//     }
// }