import { createSlice } from '@reduxjs/toolkit';
import { TracksState, ITrack } from './../../interfaces/tracks';

const initialState: TracksState = {
	tracks: [],
	currentTrack: {} as ITrack
}

export const tracksSlice = createSlice({
	name: 'tracks',
	initialState,
	reducers: {
		setTracks: (state, action) => {
			state.tracks = action.payload
		},
		setCurrentTrack: (state, action) => {
			state.currentTrack = action.payload
		}
	}
})

export const tracksActions = tracksSlice.actions
export default tracksSlice.reducer