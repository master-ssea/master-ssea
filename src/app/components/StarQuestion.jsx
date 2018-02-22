import React from "react";

import Stars from "./Stars";

export default class StarQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: 0,
      additionalComment: ""
    };

    this.starsNewScore = this.starsNewScore.bind(this);
  }

  // Invoked when a new score has been registered by the stars
  starsNewScore(score) {
    this.setState({
      answer: score
    });
    this.props.onReview(this.state);
  }

  render() {
    return (
      <div style={{ display: "flex", flexFlow: "column nowrap" }}>
        <h5>{this.props.title}</h5>
        <p>{this.props.detail}</p>
        <Stars onClick={this.starsNewScore} />
        {/* <div className="input-field">
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
            disabled={this.state.answer == 0}
          />
          <label>Comentariu optional</label>
        </div> */}
      </div>
    );
  }
}
