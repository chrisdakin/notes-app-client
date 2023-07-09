export function HamburgerIcon({ className }: { className: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 48 48"
			className={className}
		>
			<path d="M41,14H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,14Z" fill="#6f7380" />
			<path d="M41,26H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,26Z" fill="#6f7380" />
			<path d="M41,38H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,38Z" fill="#6f7380" />
		</svg>
	);
}
