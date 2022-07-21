import React from 'react'
import styles from './index.module.css'
import {IPost} from '../../../../types/entities/post.types'

interface IProps {
  posts: IPost[]
}

export const AppTable: React.FC<IProps> = ({posts}) => {
  return <table className={styles.root}>
    <thead>
    <tr>
      <td>ID</td>
      <td>Заголовок</td>
      <td>Описание</td>
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