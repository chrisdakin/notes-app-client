import {
	useState,
	useRef,
	useEffect,
	createContext,
	ReactElement,
	Dispatch,
	SetStateAction,
	useCallback,
} from 'react';
import { Note } from '../types';
import { addNote, saveNote, getNotes, getNoteById, deleteNote } from '../api';

export const NotesContext = createContext<{
	notes: Note[];
	currentNote: Note | null;
	setCurrentNoteId: Dispatch<SetStateAction<string>>;
	handleCreateNote: () => void;
	handleUpdateNoteTitle: (title: string) => void;
	handleUpdateNoteText: (text: string) => void;
	handleSaveCurrentNote: (keepalive?: boolean) => void;
	handleDeleteNote: (id: string) => void;
	isLoading: boolean;
}>({
	notes: [],
	currentNote: null,
	setCurrentNoteId: () => {},
	handleCreateNote: () => {},
	handleUpdateNoteTitle: () => {},
	handleUpdateNoteText: () => {},
	handleSaveCurrentNote: () => {},
	handleDeleteNote: () => {},
	isLoading: false,
});

export function NotesContextProvider({
	children,
	data,
}: {
	children: ReactElement;
	data: Note[];
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [notes, setNotes] = useState(data || []);
	const [currentNoteId, setCurrentNoteId] = useState(data[0]?.id || null);
	const [currentNote, setCurrentNote] = useState(
		notes.find((note) => note?.id === currentNoteId || null)
	);

	const notInitialRender = useRef(false);

	// handle current note ID change
	useEffect(() => {
		const refetchNotes = async () => {
			const notes = await getNotes();

			if (!notes.error) {
				setNotes(notes.data);
				setCurrentNote(notes.data.find((note) => note.id === currentNoteId));
			}
		};

		if (notInitialRender.current) {
			if (currentNote) {
				saveNote(currentNote);
			}
			refetchNotes();
		} else {
			notInitialRender.current = true;
		}
	}, [currentNoteId]);

	const handleCreateNote = () => {
		const createNote = async () => {
			const response = await addNote();
			setNotes(response.data.notes);
			setCurrentNoteId(response.data.newNoteId);
		};

		createNote();
	};

	const handleSaveCurrentNote = async (keepalive: boolean = false) => {
		if (currentNote) {
			const response = await saveNote(currentNote, keepalive);

			if (!response.error) {
				setCurrentNote((note) => ({
					...note,
					updatedAt: new Date().toISOString(),
				}));
			}
		}
	};

	const handleUpdateNoteTitle = (title: string) => {
		setCurrentNote((curr) => ({ ...curr, title }));
	};

	const handleUpdateNoteText = (text: string) => {
		setCurrentNote((curr) => ({ ...curr, text }));
	};

	const handleDeleteNote = async (id: string) => {
		const response = await deleteNote(id);
		setCurrentNoteId(response.data.notes[0]?.id || null);
	};

	return (
		<NotesContext.Provider
			value={{
				notes,
				currentNote,
				setCurrentNoteId,
				handleCreateNote,
				handleUpdateNoteTitle,
				handleUpdateNoteText,
				handleSaveCurrentNote,
				handleDeleteNote,
				isLoading,
			}}
		>
			{children}
		</NotesContext.Provider>
	);
}
