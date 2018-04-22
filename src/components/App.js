import React, { Component } from 'react';
import Immutable from 'immutable';
import Note from './note';
import CreateBar from './createbar';
import DataStore from '../services/datastore';
import '../scss/style.scss';
// import * as db from './services/datastore';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      dataStore: new DataStore(),
    };
    this.onCreate = this.onCreate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentDidMount() {
    this.state.dataStore.fetchNotes((notes) => {
      this.setState({ notes: Immutable.Map(notes) });
    });
  }

  onCreate(noteTitle, noteText) {
    const newNote = {
      title: noteTitle,
      text: noteText,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      zIndex: 1,
    };
    this.state.dataStore.addNote(newNote);
  }

  onDelete(id) {
    this.state.dataStore.deleteNote(id);
  }

  onUpdate(id, fields) {
    this.state.dataStore.updateNote(id, fields);
  }

  render() {
    return (
      <div>
        <CreateBar onCreate={this.onCreate} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          return (
            <Note
              onDelete={this.onDelete}
              onUpdate={this.onUpdate}
              noteId={id}
              title={note.title}
              text={note.text}
              key={id}
              x={note.x}
              y={note.y}
              zIndex={note.zIndex}
              isEditing={false}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
