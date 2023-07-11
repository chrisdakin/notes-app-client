import { useContext } from 'react';
import { NotesContext } from '../../context/NotesContext';
import {
	CreateNoteIcon,
	DeleteNoteIcon,
	HamburgerIcon,
	LeftArrowIcon,
} from './icons';
import { Header } from './Header';
import { useIsMobile } from '../../hooks';
import { checkNoteLengthValid } from '../../utilities';
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
		notes,
		setCurrentNote,
	} = useContext(NotesContext);

	const isMobile = useIsMobile();

	const allNoteLengthsValid = [
		...notes.filter((note) => note.id !== currentNote.id),
		currentNote,
	].every((note) => checkNoteLengthValid(note?.text || ''));

	const createDisabled =
		isTyping || isLoading || !checkNoteLengthValid(currentNote?.text);
	const deleteDisabled =
		!currentNote ||
		isTyping ||
		isLoading ||
		(notes.length === 1 && !allNoteLengthsValid) ||
		notes.length === 0;

	const createButtonClasses = [
		styles.Button,
		createDisabled ? styles.Disabled : '',
	].join(' ');

	const deleteButtonClasses = [
		styles.Button,
		deleteDisabled ? styles.Disabled : '',
	].join(' ');

	const createNoteIconClasses = [
		styles.Icon,
		styles.CreateNoteIcon,
		!checkNoteLengthValid(currentNote?.text) ? styles.IconDisabled : '',
	].join(' ');

	const hamburgerIconClasses = [styles.Icon, styles.HamburgerIcon].join(' ');
	const leftArrowIconClasses = [styles.Icon, styles.LeftArrowIcon].join(' ');

	const onTryCreateNote = () => {
		if (allNoteLengthsValid) {
			handleCreateNote();
		} else {
			setCurrentNote(notes.find((note) => !checkNoteLengthValid(note.text)));
		}
	};

	return (
		<div className={styles.MenuContainer}>
			{isMobile && (
				<button
					aria-label="Toggle Sidebar"
					className={styles.Button}
					tabIndex={0}
					onClick={() => setIsSidebarOpen((curr) => !curr)}
				>
					{isSidebarOpen ? (
						<LeftArrowIcon className={leftArrowIconClasses} />
					) : (
						<HamburgerIcon className={hamburgerIconClasses} />
					)}
				</button>
			)}
			<button
				disabled={createDisabled}
				aria-label="Create Note"
				className={createButtonClasses}
				tabIndex={0}
				onClick={onTryCreateNote}
			>
				<CreateNoteIcon className={createNoteIconClasses} />
			</button>
			<Header />
			<button
				aria-label="Delete Note"
				className={deleteButtonClasses}
				tabIndex={0}
				disabled={deleteDisabled}
				onClick={() => {
					handleDeleteNote(currentNote.id);
				}}
			>
				<DeleteNoteIcon
					className={deleteDisabled ? styles.IconDisabled : styles.Icon}
				/>
			</button>
		</div>
	);
}
