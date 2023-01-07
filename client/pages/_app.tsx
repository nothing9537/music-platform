import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { Provider } from 'react-redux';
import { tracksApi } from '../redux/API/tracks.api';
import { wrapper } from '../redux/store';

function MyApp({ Component, ...rest }: { Component: any }) {
	const { store, props } = wrapper.useWrappedStore(rest);
	const { pageProps } = props;
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;