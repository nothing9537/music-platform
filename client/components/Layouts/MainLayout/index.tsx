import { Container } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import NavigationPanel from '../../NavigationPanel'
import Player from '../../Player'
import styles from './MainLayout.module.sass'

interface Props {
	children: React.ReactNode
	title?: string;
	description?: string;
	keywords?: string;
}

export default function MainLayout({ children, title, description = '', keywords }: Props) {
	return (
		<>
			<Head>
				<title>{title || 'Music platform'}</title>
				<meta name="description" content={'Music platform. Here everyone can upload our track, and make comments!' + description} />
				<meta name='robots' content='index, follow' />
				<meta name='keywords' content={'Music, music platform, upload, tracks, artists ' + keywords} />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>	
			<NavigationPanel />
			<Container className={styles.container}>
				{children}
			</Container>
			<Player />
		</>
	)
}
