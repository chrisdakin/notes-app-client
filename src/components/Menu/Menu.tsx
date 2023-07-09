import { useContext } from 'react';
import { NotesContext } from '../../context/NotesContext';
import { formatDate } from '../../utilities';
import { CreateNoteIcon, DeleteNoteIcon } from './icons';

import styles from './Menu.module.css';

export function Menu() {
	const { currentNote, handleCreateNote, handleDeleteNote } =
		useContext(NotesContext);

	return (
		<div className={styles.MenuContainer}>
			<button className={styles.Button} tabIndex={0} onClick={handleCreateNote}>
				<CreateNoteIcon className={styles.Icon} />
			</button>
			{currentNote?.updatedAt && <p>{formatDate(currentNote?.updatedAt)}</p>}
			<button
				className={styles.Button}
				tabIndex={0}
				disabled={!currentNote}
				onClick={() => {
					handleDeleteNote(currentNote.id);
				}}
			>
				<DeleteNoteIcon className={styles.Icon} />
			</button>
		</div>
	);
}
