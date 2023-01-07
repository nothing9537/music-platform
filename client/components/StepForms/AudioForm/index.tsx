import { Button } from '@mui/material';
import React from 'react'
import FileUpload from '../../FileUpload'

interface Props {
	setFile: React.SetStateAction<any>;
	accept: string;
}

export default function AudioForm({ setFile, accept }: Props) {
	return (
		<div>
			<FileUpload setFile={setFile} accept={accept}>
				<Button>
					Upload audio
				</Button>
			</FileUpload>
		</div>
	)
}
