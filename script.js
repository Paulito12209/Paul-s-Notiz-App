// == ARRAYS ==
let notesTitles = [];                                     // Titel der aktiven Notizen
let notes = [];                                           // Inhalt der aktiven Notizen

let archivNotesTitles = [];                               // Titel der archivierten Notizen
let archivNotes = [];                                     // Inhalt der archivierten Notizen

let trashNotesTitles = [];                                // Titel der Notizen im Papierkorb
let trashNotes = [];                                      // Inhalt der Notizen im Papierkorb

// == INIT FUNKTION ==
function init(){
    getFromLocalStorage();
    renderNotes();
    renderArchivedNotes();
    renderTrashNotes();
}

// === LOCAL STORAGE Funktionen ===

// SPEICHERN aller Arrays im Local Storage
function saveToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("notesTitles", JSON.stringify(notesTitles));
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
    localStorage.setItem("trashNotesTitles", JSON.stringify(trashNotesTitles));
    localStorage.setItem("archivNotes", JSON.stringify(archivNotes));
    localStorage.setItem("archivNotesTitles", JSON.stringify(archivNotesTitles));
}

// LADEN aller Arrays aus dem Local Storage
function getFromLocalStorage() {
    // Aktive Notizen laden (null-Check)
    if(JSON.parse(localStorage.getItem("notes")) != null){
        notes = JSON.parse(localStorage.getItem("notes"));
        notesTitles = JSON.parse(localStorage.getItem("notesTitles"));
    }
    
    // Papierkorb laden (null-Check)
    if(JSON.parse(localStorage.getItem("trashNotes")) != null){
        trashNotes = JSON.parse(localStorage.getItem("trashNotes"));
        trashNotesTitles = JSON.parse(localStorage.getItem("trashNotesTitles"));
    }
    
    // Archiv laden (null-Check)
    if(JSON.parse(localStorage.getItem("archivNotes")) != null){
        archivNotes = JSON.parse(localStorage.getItem("archivNotes"));
        archivNotesTitles = JSON.parse(localStorage.getItem("archivNotesTitles"));
    }
}

// === NOTIZ HINZUFÜGEN ===
function addNote() {
    let titleInput = document.getElementById("note_title_input");
    let noteInput = document.getElementById("note_input");
    
    let title = titleInput.value;
    let note = noteInput.value;
    
    // Prüfen ob mindestens ein Feld ausgefüllt ist
    if (title == "" && note == "") {
        alert("Bitte geben Sie einen Titel oder eine Notiz ein!");
        return;
    }
    
    // Falls nur Titel oder nur Notiz eingegeben wurde
    if (title == "") {
        title = "Ohne Titel";
    }
    if (note == "") {
        note = "Keine Beschreibung";
    }
    
    // Zur Array hinzufügen
    notesTitles.push(title);
    notes.push(note);
    
    // Eingabefelder leeren
    titleInput.value = "";
    noteInput.value = "";
    
    // Speichern und anzeigen
    saveToLocalStorage();
    renderNotes();
}

// === RENDER FUNKTIONEN ===

// AKTIVE NOTIZEN anzeigen
function renderNotes() {
    let contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        contentRef.innerHTML += getNoteTemplate(indexNote);
    }
}

// ARCHIVIERTE NOTIZEN anzeigen
function renderArchivedNotes() {
    let contentRef = document.getElementById("archived_content");
    contentRef.innerHTML = "";

    for (let indexNote = 0; indexNote < archivNotes.length; indexNote++) {
        contentRef.innerHTML += getArchivedNoteTemplate(indexNote);
    }
}

// PAPIERKORB NOTIZEN anzeigen
function renderTrashNotes() {
    let contentRef = document.getElementById("trash_content");
    contentRef.innerHTML = "";

    for (let indexNote = 0; indexNote < trashNotes.length; indexNote++) {
        contentRef.innerHTML += getTrashNoteTemplate(indexNote);
    }
}

// === TEMPLATE FUNKTIONEN ===

// Template für AKTIVE NOTIZEN
function getNoteTemplate(indexNote) {
    return `<div class="note_template_box">
                <div class="note_text"> 
                    <b>${notesTitles[indexNote]}</b> 
                    <div class="note_text_checkbox"> 
                        <input type="checkbox" id="myCheck"> 
                        <p>${notes[indexNote]}</p> 
                    </div>  
                </div>
                <div>
                    <button onclick="moveToArchive(${indexNote})" class="option_button"> 
                        <img class="option_icon" src="./assets/img/archive.png" alt="Archiv Button" />
                    </button> 
                    <button onclick="moveToTrash(${indexNote})" class="option_button"> 
                        <img class="option_icon" src="./assets/img/delete-button.png" alt="Delete Button" />
                    </button>
                </div>
            </div>`;
}

// Template für ARCHIVIERTE NOTIZEN
function getArchivedNoteTemplate(indexNote) {
    return `<div class="note_template_box">
                <div class="note_text"> 
                    <b>${archivNotesTitles[indexNote]}</b> 
                    <div class="note_text_checkbox"> 
                        <input type="checkbox" id="myCheck"> 
                        <p>${archivNotes[indexNote]}</p> 
                    </div>  
                </div>
                <div>
                    <button onclick="moveArchiveToNotes(${indexNote})" class="option_button"> 
                        <img class="option_icon" src="./assets/img/write-file.png" alt="Zurück zu Notizen" />
                    </button> 
                    <button onclick="moveArchiveToTrash(${indexNote})" class="option_button"> 
                        <img class="option_icon" src="./assets/img/delete-button.png" alt="Delete Button" />
                    </button>
                </div>
            </div>`;
}

// Template für PAPIERKORB NOTIZEN
function getTrashNoteTemplate(indexNote) {
    return `<div class="note_template_box">
                <div class="note_text"> 
                    <b>${trashNotesTitles[indexNote]}</b> 
                    <div class="note_text_checkbox"> 
                        <input type="checkbox" id="myCheck"> 
                        <p>${trashNotes[indexNote]}</p> 
                    </div>  
                </div>
                <div>
                    <button onclick="moveTrashToNotes(${indexNote})" class="option_button"> 
                        <img class="option_icon" src="./assets/img/write-file.png" alt="Wiederherstellen" />
                    </button> 
                    <button onclick="deleteNote(${indexNote})" class="option_button"> 
                        <img class="option_icon" src="./assets/img/delete-button.png" alt="Permanent löschen" />
                    </button>
                </div>
            </div>`;
}

// === BEWEGUNGS-FUNKTIONEN ===

// Von AKTIVEN NOTIZEN ins ARCHIV verschieben
function moveToArchive(indexNote) {
    // Notiz aus aktiven Arrays nehmen
    let title = notesTitles[indexNote];
    let note = notes[indexNote];
    
    // Zu Archiv-Arrays hinzufügen
    archivNotesTitles.push(title);
    archivNotes.push(note);
    
    // Aus aktiven Arrays entfernen
    notesTitles.splice(indexNote, 1);
    notes.splice(indexNote, 1);
    
    // Speichern und alle Bereiche neu anzeigen
    saveToLocalStorage();
    renderNotes();
    renderArchivedNotes();
}

// Von AKTIVEN NOTIZEN in PAPIERKORB verschieben
function moveToTrash(indexNote) {
    // Notiz aus aktiven Arrays nehmen
    let title = notesTitles[indexNote];
    let note = notes[indexNote];
    
    // Zu Papierkorb-Arrays hinzufügen
    trashNotesTitles.push(title);
    trashNotes.push(note);
    
    // Aus aktiven Arrays entfernen
    notesTitles.splice(indexNote, 1);
    notes.splice(indexNote, 1);
    
    // Speichern und alle Bereiche neu anzeigen
    saveToLocalStorage();
    renderNotes();
    renderTrashNotes();
}

// Vom ARCHIV zu AKTIVEN NOTIZEN verschieben
function moveArchiveToNotes(indexNote) {
    // Notiz aus Archiv-Arrays nehmen
    let title = archivNotesTitles[indexNote];
    let note = archivNotes[indexNote];
    
    // Zu aktiven Arrays hinzufügen
    notesTitles.push(title);
    notes.push(note);
    
    // Aus Archiv-Arrays entfernen
    archivNotesTitles.splice(indexNote, 1);
    archivNotes.splice(indexNote, 1);
    
    // Speichern und alle Bereiche neu anzeigen
    saveToLocalStorage();
    renderNotes();
    renderArchivedNotes();
}

// Vom ARCHIV in PAPIERKORB verschieben
function moveArchiveToTrash(indexNote) {
    // Notiz aus Archiv-Arrays nehmen
    let title = archivNotesTitles[indexNote];
    let note = archivNotes[indexNote];
    
    // Zu Papierkorb-Arrays hinzufügen
    trashNotesTitles.push(title);
    trashNotes.push(note);
    
    // Aus Archiv-Arrays entfernen
    archivNotesTitles.splice(indexNote, 1);
    archivNotes.splice(indexNote, 1);
    
    // Speichern und alle Bereiche neu anzeigen
    saveToLocalStorage();
    renderArchivedNotes();
    renderTrashNotes();
}

// Vom PAPIERKORB zu AKTIVEN NOTIZEN verschieben
function moveTrashToNotes(indexNote) {
    // Notiz aus Papierkorb-Arrays nehmen
    let title = trashNotesTitles[indexNote];
    let note = trashNotes[indexNote];
    
    // Zu aktiven Arrays hinzufügen
    notesTitles.push(title);
    notes.push(note);
    
    // Aus Papierkorb-Arrays entfernen
    trashNotesTitles.splice(indexNote, 1);
    trashNotes.splice(indexNote, 1);
    
    // Speichern und alle Bereiche neu anzeigen
    saveToLocalStorage();
    renderNotes();
    renderTrashNotes();
}

// PERMANENT LÖSCHEN aus Papierkorb
function deleteNote(indexNote) {
    // Sicherheitsabfrage
    let title = trashNotesTitles[indexNote];
    let confirmDelete = confirm(`Möchten Sie die Notiz "${title}" wirklich permanent löschen?`);
    
    if (confirmDelete) {
        // Aus Papierkorb-Arrays entfernen
        trashNotesTitles.splice(indexNote, 1);
        trashNotes.splice(indexNote, 1);
        
        // Speichern und Papierkorb neu anzeigen
        saveToLocalStorage();
        renderTrashNotes();
    }
}