import React, { useRef } from 'react'
import styles from './FileUpload.module.sass'

interface Props {
	setFile: React.SetStateAction<any>;
	accept: string;
	children: any;
}

export default function FileUpload({ children, setFile, accept }: Props) {

	const ref = useRef<HTMLInputElement>(null)

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFile(event.target.files?.[0] || null)
	}

	return (
		<div onClick={() => ref.current?.click()}>
			<input
				type="file"
				accept={accept}
				ref={ref}
				className={styles.input_file}
				onChange={onChange}
			/>
			{children}
		</div>
	)
}
