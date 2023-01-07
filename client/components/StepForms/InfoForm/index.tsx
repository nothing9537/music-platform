import { Grid, TextField } from '@mui/material'
import React from 'react'

type field = { value: any, onChange: React.SetStateAction<any> }

interface Props {
	name: field;
	artist: field;
	text: field;
}

export default function InfoForm({ name, artist, text }: Props) {
	return (
		<Grid container direction='column' p={2} gap={1}>
			<TextField
				{...name}
				label='Name'
			/>
			<TextField
				{...artist}
				label='Artist'
			/>
			<TextField
				{...text}
				label='Text'
				multiline
				rows={3}
			/>
		</Grid>
	)
}
