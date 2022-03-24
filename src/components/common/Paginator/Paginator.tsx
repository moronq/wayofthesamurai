import React, {useState} from "react"
import styles from "./Paginator.module.css"
import cn from "classnames"

type PropsType = {
    totalItemsCount: number
    pageSize: number
    onPageChanged: (PageNumber: number)=> void
    currentPage: number
    portionSize?: number
}

export const Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, onPageChanged, currentPage, portionSize = 20}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div className={styles.paginator}>
        {portionNumber > 1 &&
        <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>PREV</button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(el => {
                return <span onClick={() => {
                    onPageChanged(el)
                }} className={cn({[styles.selectedPage]: currentPage === el}, styles.pageNumber)}>{el}</span>
            })}
        {portionNumber < portionCount &&
        <button onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>NEXT</button>}
    </div>
}

export default Paginator






















