import { useContext } from 'react';
import { NotesContext } from '../../context/NotesContext';
import { formatDate } from '../../utilities';
import { CreateNoteIcon, DeleteNoteIcon, HamburgerIcon } from './icons';
import { useIsMobile } from '../../hooks';

import styles from './Menu.module.css';

export function Menu() {
	const {
		currentNote,
		handleCreateNote,
		handleDeleteNote,
		isSidebarOpen,
		setIsSidebarOpen,
	} = useContext(NotesContext);

	const isMobile = useIsMobile();

	return (
		<div className={styles.MenuContainer}>
			{isMobile && (
				<button
					className={styles.Button}
					tabIndex={0}
					onClick={() => setIsSidebarOpen((curr) => !curr)}
				>
					<HamburgerIcon className={styles.Icon} />
				</button>
			)}
			<button className={styles.Button} tabIndex={0} onClick={handleCreateNote}>
				<CreateNoteIcon className={styles.Icon} />
			</button>
			{currentNote?.updatedAt && !isSidebarOpen && (
				<p>{formatDate(currentNote?.updatedAt)}</p>
			)}
			{!isSidebarOpen && (
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
			)}
		</div>
	);
}
