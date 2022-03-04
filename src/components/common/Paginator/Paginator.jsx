import React from "react";
import styles from "./Paginator.module.css";


export const Paginator = ({totalUsersCount, pageSize, onPageChanged, currentPage}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        {pages.map(el => {
            return <span onClick={() => {
                onPageChanged(el)
            }} className={currentPage === el && styles.selectedPage}>{el}</span>
        })}
    </div>
}

export default Paginator






















