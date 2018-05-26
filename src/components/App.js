import React, { Component } from 'react';
import Immutable from 'immutable';
import io from 'socket.io-client';
import Note from './note';
import CreateBar from './createbar';
// import DataStore from '../services/datastore';
import '../scss/style.scss';

const socketserver = 'http://localhost:9090';
// import * as db from './services/datastore';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
    };
    this.onCreate = this.onCreate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);

    this.socket = io(socketserver);
    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });
  }

  componentDidMount() {
    this.socket.on('notes', (notes) => {
      this.setState({ notes: Immutable.Map(notes) });
    });
  }

  onCreate(noteTitle, noteText) {
    console.log('emitting');
    const newNote = {
      title: noteTitle,
      text: noteText,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      zIndex: 1,
    };
    this.socket.emit('createNote', newNote);
  }

  onDelete(id) {
    this.socket.emit('deleteNote', id);
  }

  onUpdate(id, fields) {
    this.socket.emit('updateNote', id, fields);
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
