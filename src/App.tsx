import React from 'react'
import {useGetPostsQuery} from './store/api/postApi'
import {SearchInput} from './components/common/input'
import styles from './App.module.css'

import iconSearch from './assets/images/icons/icon-search.svg'

function App() {

  const {data, isLoading, isError} = useGetPostsQuery('')

  return (
    <div className={styles.root}>

      <SearchInput className={styles.searchInput} icon={iconSearch} placeholder={'Поиск'}/>

    </div>
  );
}

export default App;
