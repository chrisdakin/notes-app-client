import { useContext } from 'react';
import { NotesContext } from '../../context/NotesContext';
import { ErrorIcon } from '../Menu/icons';
import { checkNoteLengthValid } from '../../utilities';
import styles from './styles/RowButton.module.css';

export function RowButton({
	isCurrentNote,
	id,
	title,
	text,
	searchValue,
}: {
	isCurrentNote: boolean;
	id: string;
	title: string;
	text: string;
	searchValue: string;
}) {
	const { isTyping, isLoading, handleChangeNote } = useContext(NotesContext);

	const handleOnClick = () => {
		if (!isTyping && !isLoading) {
			handleChangeNote(id);
		}
	};

	const noteLengthIsValid = checkNoteLengthValid(text);

	const rowClasses = [
		styles.Button,
		isCurrentNote ? styles.ButtonActive : '',
		isTyping || isLoading ? styles.ButtonDisabled : '',
		!noteLengthIsValid ? styles.Error : '',
	].join(' ');

	return (
		<div
			aria-label={title}
			title={title}
			className={rowClasses}
			onClick={handleOnClick}
			onKeyDown={(event) => {
				if (event.code === 'Enter' || event.code === 'Space') {
					handleOnClick();
				}
			}}
			tabIndex={0}
		>
			<p>{title}</p>
			{!noteLengthIsValid && <ErrorIcon className={styles.Icon} />}
		</div>
	);
}
