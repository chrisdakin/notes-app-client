import { useContext } from 'react';
import { NotesContext } from '../../context/NotesContext';
import { useIsMobile } from '../../hooks';
import { formatDate } from '../../utilities';
import { ErrorIcon } from './icons';
import { MIN_NOTE_LENGTH, MAX_NOTE_LENGTH } from '../../constants';
import { checkNoteLengthValid } from '../../utilities';
import styles from './styles/Header.module.css';

export function Header() {
	const { currentNote, isSidebarOpen } = useContext(NotesContext);

	const isMobile = useIsMobile();

	const noteLength = currentNote?.text.length || 0;
	const noteTooShort = noteLength < MIN_NOTE_LENGTH;
	const isValid = checkNoteLengthValid(currentNote?.text || '');

	const error = currentNote && (
		<div className={styles.ErrorContainer}>
			<p aria-label="Note error" className={styles.ErrorText}>
				{!isMobile ? 'Note is ' : ''}
				{noteTooShort
					? MIN_NOTE_LENGTH - noteLength
					: noteLength - MAX_NOTE_LENGTH}{' '}
				characters
				{noteTooShort ? ' under' : ' over'} limit {isMobile ? '-' : 'and'} won't
				be saved
			</p>
			{!isMobile && <ErrorIcon className={styles.Icon} />}
		</div>
	);

	const date = currentNote?.updatedAt && !isSidebarOpen && (
		<p aria-label="Last Updated">
			{!isMobile && 'Last saved'} {formatDate(currentNote?.updatedAt)}
		</p>
	);

	return isValid ? date : error;
}
