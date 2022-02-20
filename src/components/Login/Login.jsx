import {Field, reduxForm} from "redux-form";
import {loginAPI} from "../../api/api";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";

const Login = (props) =>{

    const onSubmit = (formData) => {
        // console.log(formData)
        // loginAPI.signIn(formData.login, formData.password)
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
                <Field placeholder={"Login"} name={"login"}
                       validate={[required]} component = {Input}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"}
                       validate={[required]} component = {Input}/>
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component = {Input}/> remember me
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