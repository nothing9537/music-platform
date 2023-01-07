import { Container, Stepper, Step, StepLabel, Grid, Card } from '@mui/material'
import React from 'react'
import { Steps } from '../../consts/Steps'

interface Props {
	activeStep: number
	children: any
}

export default function StepWrapper({ children, activeStep }: Props) {
	return (
		<Container>
			<Stepper activeStep={activeStep}>
				{Steps.map((step, index) =>
					<Step
						key={index}
						completed={activeStep > index}
					>
						<StepLabel>
							{step}
						</StepLabel>
					</Step>
				)}
			</Stepper>
			<Grid container justifyContent='center' style={{ margin: '70px 0', height: 270 }}>
					<Card style={{ width: 600 }}>
						{children}
					</Card>
			</Grid>
		</Container>
	)
}
