import React from 'react'
import styles from './index.module.css'
import {IPost} from '../../../../types/entities/post.types'
import iconDownArrow from './../../../../assets/images/icons/icon-downarrow.svg'
import classNames from 'classnames'
import {IHeadRow, ISortInfo} from '../../../../App'

interface IProps {
  posts: IPost[]
  activeSort: ISortInfo
  setActiveSort: (callback: (prev: ISortInfo) => ISortInfo) => void
}

interface IAttr {
  fieldName: IHeadRow
  title: string
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

  const attrsRenderArr: IAttr[] = [
    {fieldName: 'id', title: 'ID'},
    {fieldName: 'title', title: 'Заголовок'},
    {fieldName: 'body', title: 'Описание'}
  ]

  return <table className={styles.root}>
    <thead>
    <tr>
      {attrsRenderArr.map(attrs => <td>
        <button className={styles.sortButton} onClick={() => setSort(attrs.fieldName)}>{attrs.title}</button>
        <img src={iconDownArrow} alt="down arrow"
             className={classNames({[styles.invert]: checkForInvertArrow(attrs.fieldName)})}/>
      </td>)}
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