import { HYDRATE } from 'next-redux-wrapper';
import { createSlice } from "@reduxjs/toolkit";
import { PlayerState } from "../../interfaces/player";

const initialState: PlayerState = {
	currentTime: 0,
	duration: 0,
	active: null,
	volume: 1,
	pause: false
}

export const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		playTrack: (state) => {
			state.pause = true
		},
		pauseTrack: (state) => {
			state.pause = false
		},
		setActiveTrack: (state, action) => {
			state.active = action.payload
			state.duration = 0
			state.currentTime = 0
		},
		setCurrentTime: (state, action) => {
			state.currentTime = action.payload
		},
		setDuration: (state, action) => {
			state.duration = action.payload
		},
		setVolume: (state, action) => {
			state.volume = action.payload
		}
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload
			}
		}
	}
})
export const playerActions = playerSlice.actions
export default playerSlice.reducer