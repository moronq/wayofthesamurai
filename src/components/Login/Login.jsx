import {Field, reduxForm} from "redux-form";

const Login = (props) =>{

    const onSubmit = (formData) => {

    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"login"} component = {"input"}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component = {"input"}/>
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component = {"input"}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

export default Login