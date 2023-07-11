import { useContext, useEffect, useCallback } from 'react';
import styles from './App.module.css';
import { Menu } from './components/Menu';
import { Sidebar } from './components/Sidebar';
import { CurrentNote } from './components/Note';
import { NotesContext } from './context/NotesContext';
import { checkNoteLengthValid } from './utilities';

export default function App() {
	const { handleSaveCurrentNote, isCurrentNoteDirty, currentNote } =
		useContext(NotesContext);

	const saveNoteBeforeUnload = useCallback(
		() =>
			isCurrentNoteDirty &&
			checkNoteLengthValid(currentNote.text) &&
			handleSaveCurrentNote(true),
		[isCurrentNoteDirty, handleSaveCurrentNote, checkNoteLengthValid]
	);

	useEffect(() => {
		window.addEventListener('beforeunload', saveNoteBeforeUnload);

		return () =>
			window.removeEventListener('beforeunload', saveNoteBeforeUnload);
	}, [saveNoteBeforeUnload]);

	return (
		<div>
			<div className={styles.App}>
				<Sidebar />
				<div className={styles.Divider} />
				<div className={styles.MainContent}>
					<Menu />
					<main>
						<CurrentNote />
					</main>
				</div>
			</div>
		</div>
	);
}
