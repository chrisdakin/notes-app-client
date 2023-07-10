import {
	useState,
	useRef,
	useEffect,
	createContext,
	ReactElement,
	Dispatch,
	SetStateAction,
} from 'react';
import { Note } from '../types';
import { addNote, saveNote, getNotes, deleteNote } from '../api';

export const NotesContext = createContext<{
	notes: Note[];
	currentNote: Note | null;
	setCurrentNoteId: Dispatch<SetStateAction<string>>;
	handleCreateNote: () => void;
	handleUpdateNote: (text: string) => void;
	handleSaveCurrentNote: (keepalive?: boolean) => void;
	handleDeleteNote: (id: string) => void;
	isCurrentNoteDirty: boolean;
	setIsCurrentNoteDirty: Dispatch<SetStateAction<boolean>>;
	isSidebarOpen: boolean;
	setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
	isLoading: boolean;
}>({
	notes: [],
	currentNote: null,
	setCurrentNoteId: () => {},
	handleCreateNote: () => {},
	handleUpdateNote: () => {},
	handleSaveCurrentNote: () => {},
	handleDeleteNote: () => {},
	isCurrentNoteDirty: false,
	setIsCurrentNoteDirty: () => {},
	isSidebarOpen: false,
	setIsSidebarOpen: () => {},
	isLoading: false,
});

export function NotesContextProvider({
	children,
	data,
}: {
	children: ReactElement;
	data: Note[];
}) {
	const [notes, setNotes] = useState(data || []);
	const [currentNoteId, setCurrentNoteId] = useState(data[0]?.id || null);
	const [currentNote, setCurrentNote] = useState(
		notes.find((note) => note?.id === currentNoteId || null)
	);
	const [isCurrentNoteDirty, setIsCurrentNoteDirty] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const notInitialRender = useRef(false);

	// handle current note ID change
	useEffect(() => {
		const refetchNotes = async () => {
			setIsLoading(true);
			const notes = await getNotes();

			if (!notes.error) {
				setNotes(notes.data);
				setCurrentNote(notes.data.find((note) => note.id === currentNoteId));
			}
			setIsLoading(false);
		};

		if (notInitialRender.current) {
			if (currentNote && isCurrentNoteDirty) {
				saveNote(currentNote);
				setIsCurrentNoteDirty(false);
			}
			refetchNotes();
		} else {
			notInitialRender.current = true;
		}
	}, [currentNoteId]);

	const handleCreateNote = () => {
		const createNoteWrapper = async () => {
			let response;
			const createNote = async () => {
				response = await addNote();
				setNotes(response.data.notes);
			};

			await createNote();
			setCurrentNoteId(response.data.newNoteId);
		};
		createNoteWrapper();
	};

	const handleSaveCurrentNote = async (keepalive: boolean = false) => {
		if (currentNote) {
			setIsLoading(true);
			const response = await saveNote(currentNote, keepalive);

			if (!response.error) {
				setCurrentNote((note) => ({
					...note,
					updatedAt: new Date().toISOString(),
				}));
			}
			setIsLoading(false);
		}
	};

	const handleUpdateNote = (text: string) => {
		if (currentNoteId !== notes[0].id) {
			setNotes((notes) => {
				const newNotes = [...notes];
				const index = notes.findIndex((note) => note.id === currentNoteId);
				newNotes.unshift(newNotes.splice(index, 1)[0]);
				return newNotes;
			});
		}

		const title = text.trim() === '' ? 'New Note' : text.trim().split('\n')[0];
		setCurrentNote((curr) => ({
			...curr,
			text,
			title,
		}));
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
				handleUpdateNote,
				handleSaveCurrentNote,
				handleDeleteNote,
				isCurrentNoteDirty,
				setIsCurrentNoteDirty,
				isSidebarOpen,
				setIsSidebarOpen,
				isLoading,
			}}
		>
			{children}
		</NotesContext.Provider>
	);
}
