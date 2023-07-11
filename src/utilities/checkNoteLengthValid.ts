import { MIN_NOTE_LENGTH, MAX_NOTE_LENGTH } from '../constants';

export const checkNoteLengthValid = (text: string) =>
	(text.length || 0) >= MIN_NOTE_LENGTH &&
	(text.length || 0) <= MAX_NOTE_LENGTH;
