import { useContext } from 'react';

import { NotesContext } from '../../context/NotesContext';
import { Note } from '../../types';
import { RowButton } from './RowButton';

import styles from './styles/Sidebar.module.css';

export function Sidebar() {
	const { notes, currentNote, setCurrentNoteId, isLoading } =
		useContext(NotesContext);

	return (
		<div className={styles.SidebarContainer}>
			{notes?.length && currentNote ? (
				<ul className={styles.NotesList}>
					{notes.map(({ title, id }) => {
						const isCurrentNote = id === currentNote.id;

						return (
							<li key={id} className={styles.Note}>
								<RowButton
									onClick={() => setCurrentNoteId(id)}
									isActive={isCurrentNote}
								>
									<p>{isCurrentNote ? currentNote.title : title}</p>
								</RowButton>
							</li>
						);
					})}
				</ul>
			) : (
				<div>Your notes will show up here</div>
			)}
		</div>
	);
}
