export function formatDate(dateString: string) {
	const date = new Date(dateString);
	const options = {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	} as const;

	const formattedDate = date.toLocaleString('en-US', options);

	return formattedDate;
}
