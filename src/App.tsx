import React from 'react'
import {useGetPostsQuery} from './store/api/postApi'

function App() {

  const {data, isLoading, isError} = useGetPostsQuery('')

  console.log(data)

  return (
    <div className="App">
      initial application
    </div>
  );
}

export default App;
