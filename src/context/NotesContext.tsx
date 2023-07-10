import {
	useState,
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

	const handleChangeNote = (id: string) => {
		if (currentNote && isCurrentNoteDirty) {
			saveNote(currentNote);
			setIsCurrentNoteDirty(false);
		}
		const refetchNotes = async () => {
			setIsLoading(true);
			const notes = await getNotes();

			if (!notes.error) {
				setNotes(notes.data);
				setCurrentNote(notes.data.find((note) => note.id === id));
			}
			setIsLoading(false);
		};
		refetchNotes();
	};

	const handleCreateNote = () => {
		const createNoteWrapper = async () => {
			let response;
			const createNote = async () => {
				response = await addNote();
				setNotes(response.data.notes);
			};

			await createNote();
			setCurrentNote(
				response.data.notes.find((note) => note.id === response.data.newNoteId)
			);
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
		if (currentNote.id !== notes[0].id) {
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
		const response = await deleteNote(id);
		setCurrentNote(response.data.notes[0] || null);
		setNotes(response.data.notes);
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
