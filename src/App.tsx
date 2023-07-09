import { useContext, useEffect, useCallback } from 'react';
import styles from './App.module.css';
import { Menu } from './components/Menu';
import { Sidebar } from './components/Sidebar';
import { CurrentNote } from './components/Note';
import { NotesContext } from './context/NotesContext';

import './global.css';

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
			<Menu />
			<div className={styles.App}>
				<nav>
					<div>
						<Sidebar />
					</div>
				</nav>
				<div className={styles.Divider} />
				<main>
					<div className={styles.noteContainer}>
						<CurrentNote />
					</div>
				</main>
			</div>
		</div>
	);
}
