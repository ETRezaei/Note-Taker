var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".far fa-save");
var $newNoteBtn = $("fas fa-pencil-alt");
var $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db
var getNotes = function() {
    // var json = (function() {
    //     var json = null;
    //     $.ajax({
    //         'async': false,
    //         'global': false,
    //         'url': "/databse.json",
    //         'dataType': "json",
    //         'success': function (data) {
    //             json = data;
    //         }
    //     });
    //     return json;
    // })();
    return $.getJSON ("db.json", function(json){
        return JSON.parse(json)
    })

    
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
        $noteTex.val(activeNote.text);
    }
  
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function() {
    activeNote['title']= $noteTitle.val();
    activeNote["text"] = $noteText.val();
    saveNote(activeNote);

    $noteTitle.val("");
    $noteTex.val("");
    $saveNoteBtn.attr("style", "display: none");

};

// Delete the clicked note
var handleNoteDelete = function(event) {
    event.preventDefault();
    let id = $(this).parent().attr("id");
    $(this).parent().remove();
    deleteNote(id);   
};

// Sets the activeNote and displays it
var handleNoteView = function() {
    let noteList = getNotes();
    let myNote = $(this).text();
    for(not of noteList ){
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

    $(".note-title").bind("change", function() {
        var value = $(this).val();
        if (value && value.length > 0) {
            // Exist text in your input
            $saveNoteBtn.show();
        } else {
            $saveNoteBtn.hide();
        }
    });
  
};

// Render's the list of note titles
var renderNoteList = function(notes) {
    let listItem = $('<div>').addClass('list-group-item');
    let deleteIcon = $('<i>').addClass('fas fa-trash-alt float-right delete-btn');
  
    listItem.text(notes.title);
    listItem.att("id", note.id);
    listItem.append(deleteIcon);
    $('.list-container').prepend(listItem);
  
};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {
    let noteList = getNotes();
    noteList.map(item => renderNoteList(item) );
  
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
