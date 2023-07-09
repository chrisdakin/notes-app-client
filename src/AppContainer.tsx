import App from './App';
import { useInitialData } from './hooks/useInitialData';
import { NotesContextProvider } from './context/NotesContext';

export default function AppContainer() {
	const { data, isLoading, error } = useInitialData();

	if (isLoading) {
		return <div>Loading</div>;
	}

	if (!data || error) {
		return <div>Error: {error || 'Unknown error'} </div>;
	}

	return (
		<NotesContextProvider data={data}>
			<App />
		</NotesContextProvider>
	);
}
