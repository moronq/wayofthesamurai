import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import React from "react";
import {Redirect} from "react-router-dom";
import styles from './../common/FormsControls/FormsControls.module.css'
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    captchaURL: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormOwnProps = {
    captchaURL: string | null
}

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL}/>
    </div>
}

export type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    email: string
    password: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

let LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaURL}) => {
    return (
        <form onSubmit={handleSubmit}>

            {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
            {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, {type: "password"})}
            {createField<LoginFormValuesTypeKeys>(null, "rememberMe", [], Input, {type: "checkbox"}, 'remember me')}

            {captchaURL && <img src={captchaURL}/>}
            {captchaURL && createField<LoginFormValuesTypeKeys>("Symbols from the picture", "captcha", [required], Input, {})}


            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm)

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaURL: state.auth.captchaURL,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)