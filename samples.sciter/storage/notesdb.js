
import * as Storage from "@storage"; 
import * as Env from "@env";
import * as Sciter from "@sciter";

function initDb(storage) { 
  storage.root = { 
    version: 1, 
    notesByDate: storage.createIndex("date",false), // list of notes indexed by date of creation
    notesById:   storage.createIndex("string",true) // list of notes indexed by their UID
  }
  return storage.root; 
}

var storage = Storage.open(Env.path("USER_DOCUMENTS") +"/test-note.db");
var root = storage.root || initDb(storage); // get root data object or initialize DB

document.on("beforeunload",function(){
  root = undefined;
  storage.close();
  storage = undefined;
});

export class Note {
  
  constructor(text, date = undefined, id = undefined) {
    this.id = id || Sciter.uuid();
    this.date = date || new Date();
    this.text = text;
    
    // adding it to storage
    let root = storage.root;
    root.notesByDate.set(this.date, this); 
    root.notesById.set(this.id, this);

    storage.commit(); // we do manual commit here

    // PubSub: notify potential observers
    document.post(new Event("new-note",{bubbles:true,data:this}));
  }

  delete() {
    let root = storage.root;
    root.notesByDate.delete(this.date, this); // need 'this' here as index is not unique
    root.notesById.delete(this.id);
  }

  static getById(id) {
    return storage.root.notesById.get(id); // will fetch object from DB and do 
                                           // Object.setPrototypeOf(note,Note.prototype)
  }

  static all() { // in creation date order
    return root.notesByDate;
  }
}