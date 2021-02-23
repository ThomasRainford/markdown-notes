import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import NoteProvider from '../context/NoteContext';
import '../styles/globals.css';

// colour scheme
// - Dark blue:   #05386B
// - Dark green:  #379683
// - Green:       #5CDB95
// - Light Green: #8EE4AF
// - White:       #EDF5E1

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<CSSReset />
			<NoteProvider>
				<Component {...pageProps} />
			</NoteProvider>
		</ChakraProvider>
	)
}
