const fs = require('fs');

var fetchNotes = () => {
	try {
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch (e) {
		return [];
	}
}

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
	//fetch notes
	var notes = fetchNotes();
	var note = {
		title, 
		body
	};

	//check for duplicate titles
	var duplicateNotes = notes.filter((note) => note.title === title);
	if(duplicateNotes.length === 0){
		//save note
		notes.push(note);
		saveNotes(notes);
		return note;
	}
}

var readNote = (title) => {
	//fetch note
	var notes = fetchNotes();
	//filter note
	var filteredNotes = notes.filter((note) => note.title === title);
	//read note
	return filteredNotes[0];
}

var removeNote = (title) => {
	//fetch notes
	var notes = fetchNotes()
	//filter notes, removing the one with title of argument
	var filteredNotes = notes.filter((note) => note.title !== title);
	//save new notes array
	saveNotes(filteredNotes);

	return notes.length !== filteredNotes.length;
}

var getAll = () => {
	return fetchNotes();
	console.log('Getting all notes');
}

var logNote = (note) => {
	debugger;
	console.log('---');
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
}

module.exports = {
	addNote,
	readNote,
	removeNote,
	getAll,
	logNote
}