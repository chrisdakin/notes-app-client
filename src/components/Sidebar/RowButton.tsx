import { useContext } from 'react';
import { NotesContext } from '../../context/NotesContext';
import styles from './styles/RowButton.module.css';

export function RowButton({
	isCurrentNote,
	id,
	title,
}: {
	isCurrentNote: boolean;
	id: string;
	title: string;
}) {
	const { isTyping, isLoading, handleChangeNote } = useContext(NotesContext);

	const handleOnClick = () => {
		if (!isTyping && !isLoading) {
			handleChangeNote(id);
		}
	};

	const rowClasses = [
		styles.Button,
		isCurrentNote ? styles.ButtonActive : '',
		isTyping || isLoading ? styles.ButtonDisabled : '',
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
		</div>
	);
}
