import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import Draggable from 'react-draggable';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      text: props.text,
      isEditing: props.isEditing,
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onDrag = this.onDrag.bind(this);
  }
  onDrag(e, ui) {
    const newpos = {
      x: ui.x,
      y: ui.y,
    };
    this.props.onUpdate(this.props.noteId, newpos);
  }
  onChangeText(event) {
    this.setState({ text: event.target.value });
  }
  onChangeTitle(event) {
    this.setState({ title: event.target.value });
  }
  renderText() {
    if (this.state.isEditing) {
      return (
        <div className="textarea-body-container">
          <Textarea className="textarea-body" value={this.state.text} onChange={this.onChangeText} />
        </div>
      );
    } else {
      return (
        <div className="markdown-container" dangerouslySetInnerHTML={{ __html: marked(this.props.text || '') }} />
      );
    }
  }
  renderTitle() {
    if (this.state.isEditing) {
      return (
        <div className="textarea-body-container">
          <Textarea className="title-edit-text" value={this.state.title} onChange={this.onChangeTitle} />
        </div>
      );
    }
    return (
      <p className="title-text">{this.props.title}</p>
    );
  }
  render() {
    return (
      <Draggable
        handle=".note-mover"
        grid={[5, 5]}
        defaultPosition={{ x: this.props.x, y: this.props.y }}
        position={{ x: this.props.x, y: this.props.y }}
        onDrag={this.onDrag}
      >
        <div className="note-container">
          <div className="note-title-container">
            {this.renderTitle()}
            <div className="icon-container">
              <i className="fa fa-trash-o"
                role="button"
                tabIndex={0}
                onClick={() => {
                  this.props.onDelete(this.props.noteId);
                }}
              />
              <i className="fa fa-pencil-square-o"
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (this.state.isEditing) {
                    this.setState({ isEditing: false });
                    const newText = {
                      title: this.state.title,
                      text: this.state.text,
                    };
                    this.props.onUpdate(this.props.noteId, newText);
                  } else {
                    this.setState({ isEditing: true });
                  }
                }}
              />
              <i className="fa fa-arrows-alt note-mover" />
            </div>
          </div>
          {this.renderText()}
        </div>
      </Draggable>
    );
  }
}

export default Note;
