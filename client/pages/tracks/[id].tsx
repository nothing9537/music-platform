import { Button, Grid, TextField } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import MainLayout from '../../components/Layouts/MainLayout'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useInput } from '../../hooks/useInput'
import axios from 'axios'
import { useActions } from '../../hooks/useActions'

export default function TrackPage() {

	const { currentTrack: track } = useAppSelector(state => state.tracks)
	const username = useInput('')
	const comment = useInput('')
	const router = useRouter()
	const { setCurrentTrack } = useActions()

	async function addComment() {
		try {
			const response = await axios.post('http://localhost:3000/tracks/comments', {
				username: username.value,
				text: comment.value,
				trackId: track._id
			})
			setCurrentTrack({...track, comments: [...track.comments, response.data]})
		} catch (error) {
			console.log(error);
		}
	}

	const src = `http://localhost:5000/${track.picture}`

	return (
		<MainLayout title={`Music platform - ${track.name} - ${track.artist}`}>
			<Button variant='outlined' style={{ fontSize: 32 }} onClick={() => router.push('/tracks')}>
				All tracks
			</Button>
			<Grid container style={{ margin: '20px 0' }}>
				{track?.picture?.includes('moke')
					? <Image width={200} height={200} alt='picture' src={track.picture} />
					: <Image width={200} height={200} alt='picture' src={src} loader={() => src} />
				}
				<div style={{ marginLeft: 30 }}>
					<h1>Name - {track.name}</h1>
					<h1>Artist - {track.artist}</h1>
					<h1>Listens  - {track.listens}</h1>
				</div>
			</Grid>
			<h1>Track text</h1>
			<p>{track.text}</p>
			<h1>Comments</h1>
			<Grid container direction='column' gap={2}>
				<TextField
					{...username}
					label='Your name'
					fullWidth
				/>
				<TextField
					{...comment}
					label='Your comment'
					fullWidth
					multiline
					rows={4}
				/>
				<Button onClick={addComment}>
					Send comment
				</Button>
			</Grid>
			<div>
				{track?.comments?.map((comment) =>
					<div key={comment._id}>
						<div>Author - {comment.username}</div>
						<div>Text - {comment.text}</div>
					</div>
				)}
			</div>
		</MainLayout>
	)
}
