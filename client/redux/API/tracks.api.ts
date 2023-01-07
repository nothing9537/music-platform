import { ITrack } from './../../interfaces/tracks';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tracksApi = createApi({
	reducerPath: 'tracksApi',
	baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
	endpoints: (builder) => ({
		getTracks: builder.query({
			query: () => '/tracks'
		})
	})
})

export const { useGetTracksQuery } = tracksApi