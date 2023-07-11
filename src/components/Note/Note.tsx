import { useContext, useEffect, useRef, useCallback } from 'react';
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
		isTyping,
		setIsTyping,
		setIsSidebarOpen,
	} = useContext(NotesContext);

	const inputElement = useRef(null);
	useEffect(() => {
		if (inputElement.current) {
			inputElement.current.focus();
		}
	}, [currentNote, inputElement]);

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
		[isCurrentNoteDirty, setIsCurrentNoteDirty, setIsTyping]
	);

	useEffect(() => {
		if (!isTyping && isCurrentNoteDirty) {
			handleSaveCurrentNote();
		}
	}, [isTyping]);

	return (
		currentNote && (
			<div className={styles.NoteContainer}>
				<textarea
					ref={inputElement}
					aria-label="Note Textarea"
					className={styles.TextArea}
					onClick={() => {
						setIsSidebarOpen(false);
					}}
					onChange={(evt) => {
						handleIsTyping(500);
						handleUpdateNote(evt.target.value);
					}}
					value={currentNote.text}
				/>
				<br />
			</div>
		)
	);
}
