import { Button, Grid } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import MainLayout from '../../components/Layouts/MainLayout'
import AudioForm from '../../components/StepForms/AudioForm'
import InfoForm from '../../components/StepForms/InfoForm'
import PictureForm from '../../components/StepForms/PictureForm'
import StepWrapper from '../../components/StepWrapper'
import { useInput } from '../../hooks/useInput'

export default function Create() {

	const [activeStep, setActiveStep] = useState(0)
	const [picture, setPicture] = useState('')
	const [audio, setAudio] = useState('')
	const Router = useRouter()
	const name = useInput('')
	const artist = useInput('')
	const text = useInput('')

	const back = () => setActiveStep(prev => prev - 1)

	const next = () => {

		if (activeStep !== 2) {
			setActiveStep(prev => prev + 1)
		} else {
			const formData = new FormData()
			formData.append('name', name.value)
			formData.append('artist', artist.value)
			formData.append('text', text.value)
			formData.append('picture', picture)
			formData.append('audio', audio)
			axios.post('http://localhost:5000/tracks', formData)
				.then(response => Router.push('/tracks'))
				.catch(error => console.log(error))
		}
	}



	return (
		<MainLayout>
			<StepWrapper activeStep={activeStep}>
				{activeStep === 0 &&
					<InfoForm
						name={name}
						artist={artist}
						text={text}
					/>
				}
				{activeStep === 1 &&
					<PictureForm
						setFile={setPicture}
						accept='image/*'
					/>
				}
				{activeStep === 2 &&
					<AudioForm
						setFile={setAudio} accept='audio/*'
					/>
				}
			</StepWrapper>
			<Grid container justifyContent='space-between'>
				<Button
					variant='contained'
					disabled={activeStep === 0}
					onClick={back}
				>
					Back
				</Button>
				<Button
					variant='contained'
					onClick={next}
				>
					Next
				</Button>
			</Grid>
		</MainLayout >
	)
}
