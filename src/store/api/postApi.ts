import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IPost} from '../../types/entities/post.types'

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], string>({
      query: () => `/posts`,
    }),
  }),
})

export const { useGetPostsQuery } = postApi