import { Note } from '../types';

export async function addNote() {
	try {
		const response = await fetch('/api/notes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();
		return { data, error: null, message: '' };
	} catch (error) {
		console.error('Error adding note:', error);
		return { data: null, error, message: 'Error adding note' };
	}
}

export async function getNotes() {
	try {
		const response = await fetch('/api/notes', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();
		return { data, error: null, message: '' };
	} catch (error) {
		console.error('Error retrieving notes:', error);
		return { data: null, error, message: 'Error retrieving notes' };
	}
}

export async function saveNote(note: Note, keepalive: boolean = false) {
	try {
		const response = await fetch(`/api/notes/${note.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			keepalive,
			body: JSON.stringify(note),
		});

		console.log(response);
		const data = await response.json();
		return { data, error: null, message: '' };
	} catch (error) {
		console.error('Error saving note:', error);
		return { data: null, error, message: 'Error saving note' };
	}
}

export async function deleteNote(noteId) {
	try {
		const response = await fetch(`/api/notes/${noteId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();
		return { data, error: null, message: '' };
	} catch (error) {
		console.error('Error deleting note:', error);
		return { data: null, error, message: 'Error deleting note' };
	}
}
