import { useContext } from 'react';
import { NotesContext } from '../../context/NotesContext';
import { formatDate } from '../../utilities';
import { CreateNoteIcon, DeleteNoteIcon, HamburgerIcon } from './icons';
import { useIsMobile } from '../../hooks';
import styles from './styles/Menu.module.css';

export function Menu() {
	const {
		currentNote,
		handleCreateNote,
		handleDeleteNote,
		isSidebarOpen,
		setIsSidebarOpen,
		isLoading,
		isTyping,
	} = useContext(NotesContext);

	const isMobile = useIsMobile();

	const buttonClasses = [
		styles.Button,
		isTyping || isLoading ? styles.ButtonDisabled : '',
	].join(' ');

	const createNoteIconClasses = [styles.Icon, styles.CreateNoteIcon].join(' ');

	return (
		<div className={styles.MenuContainer}>
			{isMobile && (
				<button
					aria-label="Toggle Sidebar"
					className={buttonClasses}
					tabIndex={0}
					onClick={() => setIsSidebarOpen((curr) => !curr)}
				>
					<HamburgerIcon className={styles.Icon} />
				</button>
			)}
			<button
				disabled={isTyping || isLoading}
				aria-label="Create Note"
				className={buttonClasses}
				tabIndex={0}
				onClick={handleCreateNote}
			>
				<CreateNoteIcon className={createNoteIconClasses} />
			</button>
			{currentNote?.updatedAt && !isSidebarOpen && (
				<p aria-label="Last Updated">{formatDate(currentNote?.updatedAt)}</p>
			)}
			<button
				aria-label="Delete Note"
				className={buttonClasses}
				tabIndex={0}
				disabled={!currentNote || isTyping || isLoading}
				onClick={() => {
					handleDeleteNote(currentNote.id);
				}}
			>
				<DeleteNoteIcon className={styles.Icon} />
			</button>
		</div>
	);
}
