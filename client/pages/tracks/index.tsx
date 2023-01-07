import { Box, Button, Card, Grid, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/Layouts/MainLayout'
import TrackList from '../../components/TrackList'
import { useActions } from '../../hooks/useActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useInput } from '../../hooks/useInput'
import { ITrack } from '../../interfaces/tracks'
import { useGetTracksQuery } from '../../redux/API/tracks.api'

export default function Index() {

  const Router = useRouter()

  const items: ITrack[] = [
    {
      _id: '1',
      name: 'End Of Existence',
      artist: 'The Browling',
      text: 'Some text',
      listens: 5,
      audio: '/moke/End_Of_Existence.mp3',
      picture: '/moke/jp7zgKyXqWA.jpg',
      comments: []
    },
    {
      _id: '2',
      name: 'The Taste Of Regret',
      artist: 'In Fear And Faith',
      text: 'Some text',
      listens: 5,
      audio: 'moke/The_Taste_Of_Regret.mp3',
      picture: '/moke/M5b9l8pmloo.jpg',
      comments: []
    },
    {
      _id: '3',
      name: 'Essence',
      artist: 'Dxnzxl',
      text: 'Some text',
      listens: 5,
      audio: '/moke/dxnzxl-essence.mp3',
      picture: '/moke/W5Q9kI8njKc.jpg',
      comments: []
    },
  ]

  const { data, isLoading, error } = useGetTracksQuery('')
  const { setTracks } = useActions()
  const { tracks } = useAppSelector(state => state.tracks)
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    if (!isLoading) {
      if (query !== '') {
        setTracks([...items, ...data].filter(track => track?.name?.toLowerCase()?.includes(query) || track?.artist?.toLowerCase()?.includes(query)))
      } else {
        setTracks([...items, ...data])
      }
    }
  }, [data, query])

  function search(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value)
  }

  if (!data || isLoading) {
    return (
      <MainLayout>
        <h1>Loading...</h1>
      </MainLayout>
    )
  }

  return (
    <MainLayout title='Track list - music platform'>
      <Grid container justifyContent='center'>
        <Card style={{ width: '900px' }}>
          <Box p={3}>
            <Grid container justifyContent='space-between'>
              <h1>Track list</h1>
              <Button onClick={() => Router.push('/tracks/create')}>
                Export track
              </Button>
            </Grid>
          </Box>
          <TextField
            placeholder='Search'
            value={query}
            onChange={search}
            fullWidth
          />
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  )
}