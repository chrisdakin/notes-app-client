import { useContext } from 'react';
import { NotesContext } from '../../context/NotesContext';

import styles from './Menu.module.css';

export function Menu() {
	const { notes, currentNote, handleCreateNote } = useContext(NotesContext);

	return (
		<div className={styles.MenuContainer}>
			<button onClick={handleCreateNote}>Add Note</button>
		</div>
	);
}
