import classes from './Preloader.module.css'
import preloader from "../../assets/images/preloader.gif";
import React from "react";

let Preloader = (props) => {
    return <div >
        <img className={classes.preloaderImage} src={preloader}/>
    </div>
}

export default Preloader