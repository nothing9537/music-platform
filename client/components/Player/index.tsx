import React, { useEffect } from 'react'
import styles from './Player.module.sass'
import { Grid, IconButton } from '@mui/material'
import PlayArrow from '@mui/icons-material/PlayArrow'
import Pause from '@mui/icons-material/Pause'
import VolumeUp from '@mui/icons-material/VolumeUp'
import TrackProgress from '../TrackProgress'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useActions } from '../../hooks/useActions'

let audio: HTMLAudioElement;

export default function Player() {

	const { active, pause, currentTime, duration, volume } = useAppSelector(state => state.player)
	const { currentTrack } = useAppSelector(state => state.tracks)
	const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration } = useActions()
	

	useEffect(() => {
		if (!audio) {
			audio = new Audio()
		} else {
			setAudio()
			play()
		}
	}, [active, currentTrack])

	function play() {
		if (!pause) {
			playTrack()
			audio.play()
		} else {
			pauseTrack()
			audio.pause()
		}
	}

	function setAudio() {
		if (active) {
			audio.src = active.picture.includes('moke') ? active.audio : 'http://localhost:5000' + active.audio
			audio.volume = volume / 100
			audio.onloadedmetadata = () => {
				setDuration(Math.ceil(audio.duration))
			}
			audio.ontimeupdate = () => {
				setCurrentTime(Math.ceil(audio.currentTime))
			}
			play()
		}
	}

	function changeVolume(event: React.ChangeEvent<HTMLInputElement>) {
		audio.volume = Number(event.target.value) / 100
		setVolume(Number(event.target.value))
	}

	function changeCurrentTime(event: React.ChangeEvent<HTMLInputElement>) {
		audio.currentTime = Number(event.target.value)
		setCurrentTime(Number(event.target.value))
	}

	if (!active) {
		return null
	}

	return (
		<div className={styles.player}>
			<IconButton onClick={play}>
				{pause
					? <Pause />
					: <PlayArrow />
				}
			</IconButton>
			<Grid container direction='column' className={styles.grid}>
				<div>
					{active?.name}
				</div>
				<div className={styles.artist}>
					{active?.artist}
				</div>
			</Grid>
			<TrackProgress
				left={currentTime}
				right={duration}
				onChange={changeCurrentTime}
			/>
			<VolumeUp className={styles.left} />
			<TrackProgress
				left={volume}
				right={100}
				onChange={changeVolume}
			/>
		</div>
	)
}
