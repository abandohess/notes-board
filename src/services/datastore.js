import Firebase from 'firebase';

class DataStore {
  constructor() {
    const config = {
      apiKey: 'AIzaSyC18Dmhhm0ACLd6zA2dwqJej1w-qkfqXag',
      authDomain: 'notes-board-c8ea2.firebaseapp.com',
      databaseURL: 'https://notes-board-c8ea2.firebaseio.com',
      projectId: 'notes-board-c8ea2',
      storageBucket: 'notes-board-c8ea2.appspot.com',
      messagingSenderId: '84726366946',

      rules: {
        '.read': true,
        '.write': true,
      },
    };
    Firebase.initializeApp(config);
    this.database = Firebase.database();
  }

  fetchNotes(callback) {
    this.database.ref('notes').on('value', (snapshot) => {
      callback(snapshot.val());
    });
  }

  addNote(note) {
    this.database.ref('notes').push(note);
  }

  deleteNote(firebaseKey) {
    this.database.ref('notes').child(firebaseKey).remove();
  }

  updateNote(firebaseKey, fields) {
    this.database.ref('notes').child(firebaseKey).update(fields);
  }
}

export default DataStore;
