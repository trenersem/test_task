import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setToken } from './authSlice';
import {
  TokenApi,
  PositionQuery,
  UserApi,
} from '../types';
import { RootState } from '../store';
import { providesList } from '../utils';
const baseUrl = process.env.REACT_APP_API_URL;

const createRequest = (url: string, token?: string) => ({
  url,
});

export const testTaskApi = createApi({
  reducerPath: 'testTaskApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authReducer.token;

      if (token) {
        headers.set('Token', `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Token', 'Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<UserApi, { countUsers: number }>({
      query: ({ countUsers }) => createRequest(`/api/v1/users?count=${countUsers}`),
      providesTags: (result, _err, _params) => providesList(result?.users, 'Users'),
    }),
    getToken: builder.query<TokenApi, void>({
      query: () => createRequest(`/api/v1/token`),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.token));
        } catch (err) {
          console.log(err);
        }
      },
      providesTags: ['Token'],
    }),
    gepPositions: builder.query<PositionQuery, void>({
      query: () => createRequest(`/api/v1/positions`),
    }),
    createNewUser: builder.mutation<void, FormData>({
      query: (body: FormData) => ({
        url: `${baseUrl}/api/v1/users`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users', 'Token'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetTokenQuery,
  useGepPositionsQuery,
  useCreateNewUserMutation,
} = testTaskApi;
