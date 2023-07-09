import { ReactNode } from 'react';
import styles from './styles/RowButton.module.css';

export function RowButton({
	children,
	onClick,
	isActive,
}: {
	children: ReactNode;
	onClick: () => void;
	isActive: boolean;
}) {
	return (
		<div
			className={`${styles.Button} ${isActive ? styles.ButtonActive : ''}`}
			onClick={onClick}
			onKeyDown={(event) => {
				if (event.code === 'Enter' || event.code === 'Space') {
					onClick();
				}
			}}
			tabIndex={0}
		>
			{children}
		</div>
	);
}
