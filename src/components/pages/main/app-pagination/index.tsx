import React from 'react'
import styles from './index.module.css'
import classNames from 'classnames'

interface IProps {
  currentPage: number
  setCurrentPage: (pageNumber: number) => void
  pagesCount: number
}

export const AppPagination: React.FC<IProps> = ({
                                                  currentPage,
                                                  setCurrentPage,
                                                  pagesCount
                                                }) => {

  const pagesNumbersArray = Array(pagesCount).fill(null).map((el, i) => i + 1)

  const changePage = (pageNumber: number) => {
    setCurrentPage(Math.max(Math.min(pageNumber, pagesCount), 1))
  }

  const gotoPrevPage = () => changePage(currentPage - 1)
  const gotoNextPage = () => changePage(currentPage + 1)
  const gotoPage = (pageNumber: number) => () => changePage(pageNumber)

  return <div className={styles.root}>
    <button className={styles.button} onClick={gotoPrevPage}>Назад</button>
    <div className={styles.pageNumbersWrapper}>
      {pagesNumbersArray.map(pageNumber => <button key={pageNumber}
                                                   className={classNames(styles.pageNumberButton, {[styles.activePageNumber]: pageNumber === currentPage})}
                                                   onClick={gotoPage(pageNumber)}>{pageNumber}</button>)
      }
    </div>
    <button className={styles.button} onClick={gotoNextPage}>Далее</button>
  </div>
}