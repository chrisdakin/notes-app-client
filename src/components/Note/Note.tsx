import { useContext, useState, useEffect, useCallback } from 'react';
import { NotesContext } from '../../context/NotesContext';
import styles from './styles/Note.module.css';

let timeout = 0;

export function CurrentNote() {
	const {
		currentNote,
		handleUpdateNote,
		handleSaveCurrentNote,
		isCurrentNoteDirty,
		setIsCurrentNoteDirty,
	} = useContext(NotesContext);

	const [isTyping, setIsTyping] = useState(false);

	const handleIsTyping = useCallback(
		(duration: number) => {
			if (!isCurrentNoteDirty) {
				setIsCurrentNoteDirty(true);
			}

			setIsTyping(true);

			if (timeout) {
				window.clearTimeout(timeout);
			}

			timeout = window.setTimeout(() => setIsTyping(false), duration);
		},
		[isCurrentNoteDirty, setIsCurrentNoteDirty]
	);

	useEffect(() => {
		if (!isTyping && isCurrentNoteDirty) {
			handleSaveCurrentNote();
		}
	}, [isTyping, handleIsTyping]);

	return currentNote ? (
		<div className={styles.NoteContainer}>
			<textarea
				className={styles.TextArea}
				onChange={(evt) => {
					handleIsTyping(500);
					handleUpdateNote(evt.target.value);
				}}
				value={currentNote.text}
			/>
			<br />
		</div>
	) : (
		<div>Add a note to begin</div>
	);
}
