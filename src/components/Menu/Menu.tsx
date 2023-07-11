import { useContext } from 'react';
import { NotesContext } from '../../context/NotesContext';
import { CreateNoteIcon, DeleteNoteIcon, HamburgerIcon } from './icons';
import { Header } from './Header';
import { useIsMobile } from '../../hooks';
import { checkNoteLengthValid } from '../../utilities';
import styles from './styles/Menu.module.css';

export function Menu() {
	const {
		currentNote,
		handleCreateNote,
		handleDeleteNote,
		setIsSidebarOpen,
		isLoading,
		isTyping,
		notes,
		setCurrentNote,
	} = useContext(NotesContext);

	const isMobile = useIsMobile();

	const buttonClasses = [
		styles.Button,
		isTyping || isLoading ? styles.ButtonDisabled : '',
	].join(' ');

	const allNoteLengthsValid = [
		...notes.filter((note) => note.id !== currentNote.id),
		currentNote,
	].every((note) => checkNoteLengthValid(note?.text || ''));

	const createNoteIconClasses = [
		styles.Icon,
		styles.CreateNoteIcon,
		!checkNoteLengthValid(currentNote?.text) ? styles.IconDisabled : '',
	].join(' ');

	const onTryCreateNote = () => {
		if (allNoteLengthsValid) {
			handleCreateNote();
		} else {
			setCurrentNote(notes.find((note) => !checkNoteLengthValid(note.text)));
		}
	};

	const createDisabled = isTyping || isLoading;
	const deleteDisabled =
		!currentNote ||
		isTyping ||
		isLoading ||
		(notes.length <= 1 && !allNoteLengthsValid);
	const createButtonClasses = [
		buttonClasses,
		createDisabled ? styles.Disabled : '',
	].join(' ');
	const deleteButtonClasses = [
		buttonClasses,
		deleteDisabled ? styles.Disabled : '',
	].join(' ');

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
					className={notes.length <= 1 ? styles.IconDisabled : styles.Icon}
				/>
			</button>
		</div>
	);
}
