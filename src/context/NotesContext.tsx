import {
	useState,
	createContext,
	ReactElement,
	Dispatch,
	SetStateAction,
	useEffect,
} from 'react';
import { Note } from '../types';
import { addNote, saveNote, getNotes, deleteNote } from '../api';
import { checkNoteLengthValid } from '../utilities';

export const NotesContext = createContext<{
	notes: Note[];
	currentNote: Note | null;
	setCurrentNote: Dispatch<SetStateAction<Note>>;
	handleCreateNote: () => void;
	handleUpdateNote: (text: string) => void;
	handleSaveCurrentNote: (keepalive?: boolean) => void;
	handleDeleteNote: (id: string) => void;
	isCurrentNoteDirty: boolean;
	setIsCurrentNoteDirty: Dispatch<SetStateAction<boolean>>;
	isSidebarOpen: boolean;
	setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
	isLoading: boolean;
	isTyping: boolean;
	setIsTyping: Dispatch<SetStateAction<boolean>>;
	handleChangeNote: (id: string) => void;
}>({
	notes: [],
	currentNote: null,
	setCurrentNote: () => {},
	handleCreateNote: () => {},
	handleUpdateNote: () => {},
	handleSaveCurrentNote: () => {},
	handleDeleteNote: () => {},
	isCurrentNoteDirty: false,
	setIsCurrentNoteDirty: () => {},
	isSidebarOpen: false,
	setIsSidebarOpen: () => {},
	isLoading: false,
	isTyping: false,
	setIsTyping: () => {},
	handleChangeNote: () => {},
});

export function NotesContextProvider({
	children,
	data,
}: {
	children: ReactElement;
	data: Note[];
}) {
	const [notes, setNotes] = useState(data || []);
	const [currentNote, setCurrentNote] = useState(data[0] || null);
	const [isCurrentNoteDirty, setIsCurrentNoteDirty] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!notes.length && !currentNote) {
			handleCreateNote();
		}
	}, [notes, currentNote]);

	const handleChangeNote = (id: string) => {
		if (
			currentNote &&
			isCurrentNoteDirty &&
			checkNoteLengthValid(currentNote?.text)
		) {
			saveNote(currentNote);
			setIsCurrentNoteDirty(false);
		}
		const refetchNotes = async () => {
			setIsLoading(true);
			const newNotes = await getNotes();

			if (!newNotes.error) {
				setNotes(newNotes.data);
				setCurrentNote(newNotes.data.find((note) => note.id === id));
			}
			setIsLoading(false);
		};
		refetchNotes();
	};

	const handleCreateNote = () => {
		const createNoteWrapper = async () => {
			setIsLoading(true);
			let response;
			const createNote = async () => {
				response = await addNote();
				setNotes(response.data.notes);
			};

			await createNote();
			setCurrentNote(
				response.data.notes.find((note) => note.id === response.data.newNoteId)
			);
			setIsLoading(false);
		};
		if (!isLoading) {
			createNoteWrapper();
		}
	};

	const handleSaveCurrentNote = async (keepalive: boolean = false) => {
		const noteLengthIsValid = checkNoteLengthValid(currentNote?.text);

		if (currentNote && noteLengthIsValid) {
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
		if (currentNote?.id !== notes[0].id) {
			setNotes((notes) => {
				const newNotes = [...notes];
				const index = notes.findIndex((note) => note.id === currentNote.id);
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
		if (!isLoading) {
			setIsLoading(true);
			const response = await deleteNote(id);
			setCurrentNote(response.data.notes[0] || null);
			setNotes(response.data.notes);
			setIsLoading(false);
		}
	};

	return (
		<NotesContext.Provider
			value={{
				notes,
				currentNote,
				setCurrentNote,
				handleCreateNote,
				handleUpdateNote,
				handleSaveCurrentNote,
				handleDeleteNote,
				handleChangeNote,
				isCurrentNoteDirty,
				setIsCurrentNoteDirty,
				isSidebarOpen,
				setIsSidebarOpen,
				isLoading,
				isTyping,
				setIsTyping,
			}}
		>
			{children}
		</NotesContext.Provider>
	);
}
