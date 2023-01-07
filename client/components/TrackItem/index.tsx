import { Card, Grid, IconButton } from '@mui/material';
import React from 'react'
import { ITrack } from '../../interfaces/tracks'
import styles from './TrackItem.module.sass'
import PlayArrow from '@mui/icons-material/PlayArrow'
import Pause from '@mui/icons-material/Pause'
import Delete from '@mui/icons-material/Delete'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useActions } from '../../hooks/useActions';

interface Props {
	track: ITrack;
	active?: boolean
}

export default function TrackItem({ track, active = false }: Props) {

	const router = useRouter()
	const { playTrack, setActiveTrack, setCurrentTrack } = useActions()

	function play(event: React.MouseEvent<HTMLButtonElement>) {
		event.stopPropagation()
		setActiveTrack(track)
		playTrack()
	}

	function setTrack() {
		setCurrentTrack(track)
		setActiveTrack(track)
		playTrack()
		router.push('/tracks/' + track._id)
	}

	const src = `http://localhost:5000/${track.picture}`

	return (
		<Card className={styles.track} onClick={setTrack}>
			<IconButton onClick={play}>
				{active ? <Pause /> : <PlayArrow />}
			</IconButton>
			{track.picture.includes('moke')
				? <Image width={70} height={70} alt='picture' src={track.picture} />
				: <Image width={70} height={70} alt='picture' src={src} loader={() => src} />
			}
			<Grid container direction='column' className={styles.grid}>
				<div>{track.name}</div>
				<div className={styles.artist}>{track.artist}</div>
			</Grid>
			{active &&
				<div>
					02:42 / 03:59
				</div>
			}
			<IconButton onClick={e => e.stopPropagation()} className={styles.delete_icon}>
				<Delete />
			</IconButton>
		</Card>
	)
}
