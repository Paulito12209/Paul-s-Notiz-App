let notes = [];

let trashNotes = [];

function renderNotes() {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";

  for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote);
  }
}

function renderTrashNotes() {
  let trashContentRef = document.getElementById("trash_content");
  trashContentRef.innerHTML = "";

  for (
    let indexTrashNote = 0;
    indexTrashNote < trashNotes.length;
    indexTrashNote++
  ) {
    trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
  }
}

function getNoteTemplate(indexNote) {
  return `<div class=note_template_box> <div class="note_text"> <input type="checkbox" id="myCheck"> <p>${notes[indexNote]}</p></div> <button onclick="deleteNote(${indexNote})" class="delete_button"> <img class="delete_icon" src="./assets/img/delete-button.png" alt="Delete Button" /></button>
</div>`;
}

function getTrashNoteTemplate(indexTrashNote) {
  return `<div class=note_template_box> <div class="note_text"> <input type="checkbox" id="myCheck"> <p>${trashNotes[indexTrashNote]}</p></div> <button onclick="deleteNote(${indexTrashNote})" class="delete_button"> <img class="delete_icon" src="./assets/img/delete-button.png" alt="Delete Button" /></button>
</div>`;
}

function addNote() {
  let noteInputRef = document.getElementById("note_input");
  let noteInput = noteInputRef.value;

  notes.push(noteInput);

  renderNotes();

  noteInputRef.value = "";
}

function deleteNote(indexNote) {
  let trashNote = notes.splice(indexNote, 1);
  trashNotes.push(trashNote);
  renderNotes();
  renderTrashNotes();
}
