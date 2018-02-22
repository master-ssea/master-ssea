import uniqueID from "../utils/uniqueID";
import React from "react";

export class BinaryQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: null,
      additionalComment: ""
    };

    this.checkBox = this.checkBox.bind(this);
  }

  componentWillMount() {
    this.id1 = uniqueID();
    this.id2 = uniqueID();
  }

  checkBox(decision) {
    this.setState({ answer: decision });
    this.props.onReview(this.state);
  }

  render() {
    return (
      <div>
        <h5>{this.props.title}</h5>
        <p>{this.props.detail}</p>
        <br />
        <form>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <p>
              <input
                type="checkbox"
                checked={this.state.answer == null ? false : this.state.answer}
                onChange={() => this.checkBox(true)}
                id={this.id1}
              />
              <label htmlFor={this.id1}>Da</label>
            </p>
            <p>
              <input
                type="checkbox"
                checked={this.state.answer == null ? false : !this.state.answer}
                onChange={() => this.checkBox(false)}
                id={this.id2}
              />
              <label htmlFor={this.id2}>Nu</label>
            </p>
          </div>
        </form>
        {this.state.answer == false ? (
          <div className="input-field">
            <textarea
              style={{
                height: "2.5rem",
                maxHeight: "2.5rem",
                overflowY: "auto"
              }}
              maxLength="140"
              className="materialize-textarea"
              value={this.state.additionalComment}
              onChange={e => {
                this.setState({ additionalComment: e.target.value });
                this.props.onReview(this.state);
              }}
            />
            <label>Comentariu optional</label>
          </div>
        ) : (
          ""
        )}
        <br />
      </div>
    );
  }
}
