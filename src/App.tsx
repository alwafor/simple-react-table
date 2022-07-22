import React, {useEffect, useMemo, useState} from 'react'
import {useGetPostsQuery} from './store/api/postApi'
import {SearchInput} from './components/common/input'
import styles from './App.module.css'

import iconSearch from './assets/images/icons/icon-search.svg'
import {AppTable} from './components/pages/main/app-table'
import {AppPagination} from './components/pages/main/app-pagination'


export type IHeadRow = 'id' | 'title' | 'body'
// asc means ascending
export interface ISortInfo {
  name: IHeadRow
  asc: boolean
}

function App() {

  const {data, isLoading, isError} = useGetPostsQuery('')

  const [currentPage, setCurrentPage] = useState(1)
  const [searchInputValue, setSearchInputValue] = useState('')

  const [activeSort, setActiveSort] = useState<ISortInfo>({
    name: 'id',
    asc: true
  })

  useEffect(() => {
    document.title = `Страница таблицы №${currentPage}`
  },[currentPage])

  const searchedPosts = useMemo(() => {
    if (!data) return []
    if (searchInputValue === '') return data

    return data.filter(post => Object.values(post).some(value => String(value).includes(searchInputValue)))
  }, [searchInputValue, data])

  const postsToDisplay = useMemo(() => {
    return searchedPosts.slice(10 * (currentPage - 1), 10 * (currentPage - 1) + 10)
  }, [currentPage, searchedPosts])

  const sortedPosts = useMemo(() => {
    const collator = Intl.Collator(undefined, {numeric: true})

    return postsToDisplay.sort((a,b) => {
      const compareResult = collator.compare(String(a[activeSort.name]), String(b[activeSort.name]))
      if(activeSort.asc) return compareResult
      return -compareResult
    })
  }, [postsToDisplay, activeSort])

  const pagesCount = useMemo(() => {
    return Math.ceil(searchedPosts.length / 10)
  }, [searchedPosts])

  const searchPosts = (searchValue: string) => {
    setCurrentPage(1)
    setSearchInputValue(searchValue)
  }

  if (isError) return <div>Произошла непредвиденная ошибка! Попробуйте обновить страницу!</div>

  if (isLoading) return <div>Загрузка...</div>

  return (
    <div className={styles.root}>
      <SearchInput className={styles.searchInput} icon={iconSearch} placeholder={'Поиск'} value={searchInputValue}
                   onChange={e => searchPosts(e.target.value)}/>

      {searchedPosts.length === 0
        ? <div className={styles.notification}>Постов по данному запросу не найдено!</div>
        : <>
          <AppTable posts={sortedPosts} setActiveSort={setActiveSort} activeSort={activeSort}/>
          <AppPagination currentPage={currentPage}
                         setCurrentPage={setCurrentPage} pagesCount={pagesCount}/>
        </>}
    </div>
  );
}

export default App;
