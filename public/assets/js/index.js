var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $("#savebtn");
var $newNoteBtn = $(".fa-pencil-alt");
var $noteList = $(".list-container");

console.log($noteText)
// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db
var getNotes = function() {
   
    
    let res = $.getJSON ("/db.json", function(json){
        console.log(json)
        //console.log(Array.from(json));
        return json//JSON.parse(json)
    })

    return res
};

// A function for saving a note to the db
var saveNote = function(note) {
    // var newNote = {
    //     title: $noteTitle.val().trim(),
    //     text: $noteText.val().trim(),
     
    //    }
        $.post("/api/notes", note, function(data) {    
            $noteTitle.val("");
            $noteTex.val("");
            renderNoteList(note);
 
       });
 
    
};

// A function for deleting a note from the db
var deleteNote = function(id) {
    $.post(`/api/delete/${id}`,id, function(data){
        console.log('data deleted :) ');
    });
  
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function() {
    if(activeNote){
        $noteTitle.val(activeNote.title);
        $noteText.val(activeNote.text);
    }
  
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function() {
    activeNote['title']= $noteTitle.val();
    activeNote["text"] = $noteText.val();
    saveNote(activeNote);

    $noteTitle.val("");
    $noteText.val("");
    $saveNoteBtn.attr("style", "display: none");

};

// Delete the clicked note
var handleNoteDelete = function(event) {
    //event.preventDefault();
    let id = $(this).parent().attr("id");
    $(this).parent().remove();
    deleteNote(id);   
};

// Sets the activeNote and displays it
var handleNoteView = async function() {
    let noteList = await getNotes();
    let myNote = $(this).text();
    for(note of noteList ){
        if(note.title === myNote){
            activeNote.title = note.title;
            activeNote.text = note.text;
            renderActiveNote();
        }
    }

};

// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = function() {
    activeNote={};
    renderActiveNote();
  
};

// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function() {
    console.log('typing')
    console.log($noteText.val())
    if ($noteTitle.val() === '' || $noteText.val() === '') {
        $saveNoteBtn.attr('style', 'display:none');
    } else {
        $saveNoteBtn.attr('style', 'display:inline-block');
    };

     
};

// Render's the list of note titles
var renderNoteList = function(notes) {
    console.log(notes);
    let listItem = $('<div>').addClass('list-group-item');
    let deleteIcon = $('<i>').addClass('fas fa-trash-alt float-right');
  
    listItem.text(notes.title);
    listItem.attr("id", notes.id);
    listItem.append(deleteIcon);
    $('.list-container').prepend(listItem);
  
};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = async function() {
    let noteList = await getNotes();
    console.log(noteList)
    noteList.map(item => renderNoteList(item) );
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup",handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
