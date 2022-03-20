import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUsersProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer.ts";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUsersProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.userId != prevProps.match.params.userId){
            this.refreshProfile()
        }
    }


    render() {

        return (
            <Profile {...this.props}
                     isOwner = {!this.props.match.params.userId}
                     profile = {this.props.profile}
                     savePhoto = {this.props.savePhoto}
                     status = {this.props.status}
                     saveProfile = {this.props.saveProfile}
                     updateStatus = {this.props.updateStatus}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, {getUsersProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)