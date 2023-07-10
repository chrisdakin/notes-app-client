import { useContext } from 'react';
import { Note } from '../../types';
import { NotesContext } from '../../context/NotesContext';
import styles from './styles/RowButton.module.css';

export function RowButton({
	isCurrentNote,
	id,
	title,
}: {
	isCurrentNote: boolean;
	id;
	title: string;
}) {
	const { currentNote, isTyping, isLoading, setCurrentNoteId } =
		useContext(NotesContext);

	const handleOnClick = () => {
		if (!isTyping && !isLoading) {
			setCurrentNoteId(id);
		}
	};

	const rowClasses = [
		styles.Button,
		isCurrentNote ? styles.ButtonActive : '',
		isTyping || isLoading ? styles.ButtonDisabled : '',
	];

	return (
		<div
			aria-label={title}
			title={title}
			className={rowClasses.join(' ')}
			onClick={handleOnClick}
			onKeyDown={(event) => {
				if (event.code === 'Enter' || event.code === 'Space') {
					handleOnClick();
				}
			}}
			tabIndex={0}
		>
			<p>{isCurrentNote ? currentNote.title : title}</p>
		</div>
	);
}
