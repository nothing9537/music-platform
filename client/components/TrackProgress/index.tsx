import React from 'react'
import styles from './TrackProgress.module.sass'

interface Props {
	left: number;
	right: number;
	onChange: (e: any) => void;
}

export default function TrackProgress({ left, right, onChange }: Props) {
	return (
		<div className={styles.container}>
			<input
				type='range'
				min={0}
				max={right}
				value={left}
				onChange={onChange}
			/>
			<div>{left} / {right}</div>
		</div>
	)
}
