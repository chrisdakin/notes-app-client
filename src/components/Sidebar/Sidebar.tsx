import { useContext, useState } from 'react';
import { useIsMobile } from '../../hooks';
import { NotesContext } from '../../context/NotesContext';
import { RowButton } from './RowButton';
import { ClearIcon } from './ClearIcon';
import styles from './styles/Sidebar.module.css';

export function Sidebar() {
	const { notes, currentNote, isSidebarOpen } = useContext(NotesContext);
	const [searchValue, setSearchValue] = useState('');
	const isMobile = useIsMobile();

	const filteredNotes = searchValue
		? notes.filter((note) =>
				note.text?.toLowerCase().includes(searchValue.toLocaleLowerCase())
		  )
		: notes;

	return !isMobile || isSidebarOpen ? (
		<nav>
			<div className={styles.SearchContainer}>
				<input
					placeholder="Search"
					className={styles.SearchInput}
					onChange={(evt) => setSearchValue(evt.target.value)}
					value={searchValue}
					type="text"
					aria-label="Search"
				></input>
				<button
					onClick={() => setSearchValue('')}
					className={styles.SearchClearButton}
					aria-label="Clear search"
				>
					<ClearIcon className={styles.SearchClearIcon} />
				</button>
			</div>
			<div className={styles.SidebarContainer}>
				{notes?.length && currentNote ? (
					<ul className={styles.NotesList}>
						{filteredNotes.length ? (
							filteredNotes.map(({ title, id, text }) => {
								const isCurrentNote = id === currentNote.id;

								return (
									<li key={id}>
										<RowButton
											id={id}
											isCurrentNote={isCurrentNote}
											title={isCurrentNote ? currentNote.title : title}
											text={isCurrentNote ? currentNote.text : text}
											searchValue={searchValue}
										/>
									</li>
								);
							})
						) : (
							<p className={styles.NoNotes}>No search results</p>
						)}
					</ul>
				) : (
					<p className={styles.NoNotes}>No saved notes</p>
				)}
			</div>
		</nav>
	) : null;
}
