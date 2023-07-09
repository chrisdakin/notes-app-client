import { useContext, useState, useEffect, useCallback } from 'react';
import { NotesContext } from '../../context/NotesContext';
import { formatDate } from '../../utilities';

let timeout = 0;

export function CurrentNote() {
	const {
		currentNote,
		handleUpdateNoteTitle,
		handleUpdateNoteText,
		handleSaveCurrentNote,
		handleDeleteNote,
	} = useContext(NotesContext);

	const [isDirty, setIsDirty] = useState(false);
	const [isTyping, setIsTyping] = useState(false);

	const handleIsTyping = useCallback(
		(duration: number) => {
			if (!isDirty) {
				setIsDirty(true);
			}

			setIsTyping(true);

			if (timeout) {
				window.clearTimeout(timeout);
			}

			timeout = window.setTimeout(() => setIsTyping(false), duration);
		},
		[isDirty]
	);

	useEffect(() => {
		if (!isTyping && isDirty) {
			handleSaveCurrentNote();
		}
	}, [isTyping, handleIsTyping]);

	return currentNote ? (
		<div>
			<div>{formatDate(currentNote?.updatedAt)}</div>
			title:
			<input
				onChange={(evt) => {
					handleIsTyping(300);
					handleUpdateNoteTitle(evt.target.value);
				}}
				value={currentNote.title}
			/>
			<br />
			<textarea
				onChange={(evt) => {
					handleIsTyping(1000);
					handleUpdateNoteText(evt.target.value);
				}}
				value={currentNote.text}
			/>
			<br />
			<div>
				<button
					onClick={() => {
						handleDeleteNote(currentNote.id);
					}}
				>
					Delete
				</button>
			</div>
		</div>
	) : (
		<div>Add a note to begin</div>
	);
}
