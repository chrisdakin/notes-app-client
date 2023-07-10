import { useContext } from 'react';
import { useIsMobile } from '../../hooks';
import { NotesContext } from '../../context/NotesContext';
import { RowButton } from './RowButton';

import styles from './styles/Sidebar.module.css';

export function Sidebar() {
	const { notes, currentNote, isSidebarOpen } = useContext(NotesContext);
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
									<RowButton id isCurrentNote={isCurrentNote} title={title} />
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
