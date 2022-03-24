import classes from './Preloader.module.css'
import preloader from "../../../assets/images/preloader.gif";
import React from "react";

type PreloaderType = {}

let Preloader: React.FC<PreloaderType> = (props) => {
    return <div >
        <img className={classes.preloaderImage} src={preloader}/>
    </div>
}

export default Preloader