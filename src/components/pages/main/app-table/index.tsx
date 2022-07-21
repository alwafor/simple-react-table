import React from 'react'
import styles from './index.module.css'
import {IPost} from '../../../../types/entities/post.types'
import iconDownArrow from './../../../../assets/images/icons/icon-downarrow.svg'
import classNames from 'classnames'
import {ISortInfo} from '../../../../App'

interface IProps {
  posts: IPost[]
  activeSort: ISortInfo
  setActiveSort: (callback: (prev: ISortInfo) => ISortInfo) => void
}

export const AppTable: React.FC<IProps> = ({posts, setActiveSort, activeSort}) => {

  const setSort = (fieldName: 'id' | 'title' | 'body') => {
    setActiveSort(prev => {
      if (fieldName === prev.name) {
        return {name: fieldName, asc: !prev.asc}
      }
      return {name: fieldName, asc: true}
    })
  }

  const checkForInvertArrow = (fieldName: 'id' | 'title' | 'body') => activeSort.name === fieldName && activeSort.asc

  // I know I can reuse here, but I'm actually a little tired
  return <table className={styles.root}>
    <thead>
    <tr>
      <td>
        <button className={styles.sortButton} onClick={() => setSort('id')}>ID</button>
        <img src={iconDownArrow} alt="down arrow" className={classNames({[styles.invert]: checkForInvertArrow('id')})}/>
      </td>
      <td>
        <button className={styles.sortButton} onClick={() => setSort('title')}>Заголовок</button>
        <img src={iconDownArrow} alt="down arrow" className={classNames({[styles.invert]: checkForInvertArrow('title')})}/>
      </td>
      <td>
        <button className={styles.sortButton} onClick={() => setSort('body')}>Описание</button>
        <img src={iconDownArrow} alt="down arrow" className={classNames({[styles.invert]: checkForInvertArrow('body')})}/>
      </td>
    </tr>
    </thead>
    <tbody>
    {posts.map(post => <tr key={post.id}>
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>{post.body}</td>
    </tr>)}
    </tbody>
  </table>
}