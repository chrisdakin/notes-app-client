import { Note } from '../../types';

import styles from './styles/RowButton.module.css';

export function RowButton({
	isCurrentNote,
	currentNote,
	onClick,
	title,
}: {
	isCurrentNote: boolean;
	currentNote: Note;
	onClick: () => void;
	title: string;
}) {
	return (
		<div
			aria-label={title}
			title={title}
			className={`${styles.Button} ${isCurrentNote ? styles.ButtonActive : ''}`}
			onClick={onClick}
			onKeyDown={(event) => {
				if (event.code === 'Enter' || event.code === 'Space') {
					onClick();
				}
			}}
			tabIndex={0}
		>
			<p>{isCurrentNote ? currentNote.title : title}</p>
		</div>
	);
}
