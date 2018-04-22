import React, { Component } from 'react';
import '../scss/button.scss';


class CreateNoteBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note_title: '',
      note_text: '',
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
  }

  onTitleChange(event) {
    this.setState({ note_title: event.target.value });
  }

  onTextChange(event) {
    this.setState({ note_text: event.target.value });
  }

  render() {
    return (
      <div className="create-bar-container">
        <input className="input-bar" placeholder="Enter Title" onChange={this.onTitleChange} value={this.state.note_title} />
        <input className="input-bar" placeholder="Enter Text" onChange={this.onTextChange} value={this.state.note_text} />
        <br />
        <div
          className="button -green center"
          onClick={() => this.props.onCreate(this.state.note_title, this.state.note_text)}
          role="button"
          tabIndex="0"
        >Create
        </div>
      </div>
    );
  }
}

export default CreateNoteBar;
