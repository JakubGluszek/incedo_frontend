import { createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import Cookies from 'universal-cookie';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const cookies = new Cookies()
    headers.set("X-CSRF-TOKEN", cookies.get('csrf_access_token'))
    return headers
  }
})

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 403) {
    // access token is old, try to refresh
    const refreshResult = await baseQuery({ url: '/account/auth/refresh', method: 'POST' }, api, extraOptions)
    if (refreshResult?.meta?.response?.status === 200) {
      // retry original query with new cookies
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result;
}

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
})
