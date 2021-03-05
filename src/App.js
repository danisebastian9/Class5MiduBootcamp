import "./styles.css";
import { Note } from "./Note";
import { useEffect, useState } from "react";
import { getAllNotes } from "./Services/notes/getAllNotes";
import { createNote } from "./Services/notes/createNote";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllNotes().then((notes) => {
      setNotes(notes);
      setLoading(false);
    });
  }, []);

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: 1
    };

    createNote(noteToAddToState).then((newNote) => {
      setNotes((prevNotes) => prevNotes.concat(newNote));
    });

    setNewNote("");
  };

  return (
    <div>
      <h1>Notes</h1>
      {loading ? "Loading..." : ""}
      <ul className="App">
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} />
        <button>Create Note</button>
      </form>
    </div>
  );
}
