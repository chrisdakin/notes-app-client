import { useContext } from 'react';
import { useIsMobile } from '../../hooks';
import { NotesContext } from '../../context/NotesContext';
import { RowButton } from './RowButton';

import styles from './styles/Sidebar.module.css';

export function Sidebar() {
	const { notes, currentNote, setCurrentNoteId, isSidebarOpen } =
		useContext(NotesContext);
	const isMobile = useIsMobile();

	return !isMobile || isSidebarOpen ? (
		<nav>
			<div className={styles.SidebarContainer}>
				{notes?.length && currentNote ? (
					<ul className={styles.NotesList}>
						{notes.map(({ title, id }) => {
							const isCurrentNote = id === currentNote.id;

							return (
								<li key={id}>
									<RowButton
										onClick={() => setCurrentNoteId(id)}
										isCurrentNote={isCurrentNote}
										title={title}
										currentNote={currentNote}
									/>
								</li>
							);
						})}
					</ul>
				) : (
					<div>Your notes will show up here</div>
				)}
			</div>
		</nav>
	) : null;
}
