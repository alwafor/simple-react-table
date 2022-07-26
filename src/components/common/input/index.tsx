import React from 'react'
import styles from './index.module.css'
import classNames from 'classnames'

interface IProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  icon?: string
}

export const SearchInput: React.FC<IProps> = ({icon, className, ...props}) => {
  return <div className={classNames(styles.root, className)}>
    <input className={classNames(styles.input, {[styles._icon]: !!icon})} {...props}/>
    {icon && <img className={styles.icon} src={icon} alt={'icon'}/>}
  </div>
}