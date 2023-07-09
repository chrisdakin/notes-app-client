import { useContext, useEffect, useCallback } from 'react';
import styles from './App.module.css';
import { Menu } from './components/Menu';
import { Sidebar } from './components/Sidebar';
import { CurrentNote } from './components/Note';
import { NotesContext } from './context/NotesContext';

export default function App() {
	const { handleSaveCurrentNote } = useContext(NotesContext);

	const saveNoteBeforeUnload = useCallback(
		() => handleSaveCurrentNote(true),
		[handleSaveCurrentNote]
	);

	useEffect(() => {
		window.addEventListener('beforeunload', saveNoteBeforeUnload);

		return () =>
			window.removeEventListener('beforeunload', saveNoteBeforeUnload);
	}, [saveNoteBeforeUnload]);

	return (
		<div>
			<div className={styles.App}>
				<nav>
					<Sidebar />
				</nav>
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
