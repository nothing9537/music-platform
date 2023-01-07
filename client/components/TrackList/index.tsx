import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { ITrack } from '../../interfaces/tracks'
import TrackItem from '../TrackItem';

interface Props {
	tracks: ITrack[];
}

export default function TrackList({ tracks }: Props) {
	return (
		<Grid container direction='column'>
			<Box p={2}>
				{tracks.map((track, index) => 
					<TrackItem 
						key={track._id}
						track={track}
					/>
				)}
			</Box>
		</Grid>
	)
}
