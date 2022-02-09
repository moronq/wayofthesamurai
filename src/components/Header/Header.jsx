import classes from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={classes.header}>
            <img src="https://api.logotip.online/uploads/bd21315b61424cbdb6a15e91cb1a1231.png" alt=""/>
        <div className={classes.loginBlock}>
            {props.isAuth ? props.login
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
        </header>
    )
}

export default Header