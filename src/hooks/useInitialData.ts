import { useEffect, useState } from 'react';
import { Note } from '../types';
import { getNotes } from '../api';

export function useInitialData() {
	const [data, setData] = useState<Note[] | null>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const notes = await getNotes();
			if (notes.error) {
				setError((error as any)?.message || 'Unknown error');
			} else {
				setData(notes.data);
			}
			setIsLoading(false);
		};

		fetchData();
	}, []);

	return { data, isLoading, error };
}
