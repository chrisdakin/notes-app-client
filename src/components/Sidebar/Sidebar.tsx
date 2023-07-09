import { useContext } from 'react';
import { NotesContext } from '../../context/NotesContext';
import { Note } from '../../types';

import styles from './Sidebar.module.css';

export function Sidebar() {
	const { notes, currentNote, setCurrentNoteId, isLoading } =
		useContext(NotesContext);

	return (
		<div className={styles.SidebarContainer}>
			{notes?.length && currentNote ? (
				<ul className={styles.NotesList}>
					{notes.map(({ title, id }) => (
						<li key={id} className={styles.Note}>
							<button disabled={isLoading} onClick={() => setCurrentNoteId(id)}>
								{id === currentNote.id ? currentNote.title : title}
							</button>
						</li>
					))}
				</ul>
			) : (
				<div>Your notes will show up here</div>
			)}
		</div>
	);
}
