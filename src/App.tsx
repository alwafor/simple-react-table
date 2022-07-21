import React, {useMemo, useState} from 'react'
import {useGetPostsQuery} from './store/api/postApi'
import {SearchInput} from './components/common/input'
import styles from './App.module.css'

import iconSearch from './assets/images/icons/icon-search.svg'
import {AppTable} from './components/pages/main/app-table'
import {AppPagination} from './components/pages/main/app-pagination'

function App() {

  const {data, isLoading, isError} = useGetPostsQuery('')
  const [currentPage, setCurrentPage] = useState(1)

  const postsToDisplay = useMemo(() => {
    if(!data) return []
    return data.slice(10 * (currentPage - 1), 10 * (currentPage - 1) + 10)
  }, [currentPage, data])

  if(isError) return <div>Произошла непредвиденная ошибка!</div>

  if(isLoading) return <div>Загрузка...</div>

  return (
    <div className={styles.root}>
      <SearchInput className={styles.searchInput} icon={iconSearch} placeholder={'Поиск'}/>
      <AppTable posts={postsToDisplay}/>
      <AppPagination />
    </div>
  );
}

export default App;
