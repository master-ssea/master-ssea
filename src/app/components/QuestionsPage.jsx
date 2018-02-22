import React from "react";
import ReactDOM from "react-dom";
import StarQuestion from "./StarQuestion";
import { BinaryQuestion } from "./BinaryQuestion";

export class QuestionsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: {},
      additionalComment: ""
    };

    // this.gotoQestion = this.gotoQestion.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.pushAnswer = this.pushAnswer.bind(this);
  }

  pushAnswer(id, answer) {
    let _answers = this.state.answers;
    _answers[id] = answer;
    this.setState({
      answers: _answers
    });

    console.log(this.state.answers);
  }

  render() {
    return (
      <div>
        {Object.entries(this.props.questions).map(([id, question]) =>
          (() => {
            switch (question.type) {
              case "binary":
                return (
                  <BinaryQuestion
                    title={question.title}
                    detail={question.detail}
                    onReview={answer => this.pushAnswer(id, answer)}
                  />
                );
              case "star":
                return (
                  <StarQuestion
                    title={question.title}
                    detail={question.detail}
                    onReview={answer => this.pushAnswer(id, answer)}
                  />
                );
              default:
                return (
                  <div>{`Question type: ${question.type} not supported.`}</div>
                );
            }
          })()
        )}
        <br />
        <div className="divider" />
        <div className="input-field">
          <textarea
            style={{ height: "5rem", maxHeight: "5rem", overflowY: "auto" }}
            maxLength="280"
            ref={additionalComment =>
              (this.additionalComment = additionalComment)
            }
            className="materialize-textarea"
            value={this.state.additionalComment}
            onChange={e => this.setState({ additionalComment: e.target.value })}
          />
          <label>Comentariu adițional (280 de caractere)</label>
        </div>
        <div className="center-align">
          <button
            ref={buttonSubmit => (this.buttonSubmit = buttonSubmit)}
            className="btn-flat waves-effect"
            onClick={this.submitReview}
            disabled={
              !(
                Object.keys(this.state.answers)
                  .sort()
                  .toString() ==
                Object.keys(this.props.questions)
                  .sort()
                  .toString()
              )
            }
          >
            Trimite recenzia
          </button>
        </div>
      </div>
    );
  }

  // gotoQestion(reference) {
  //   let node = ReactDOM.findDOMNode(reference);
  //   node.scrollIntoView({
  //     alignToTop: false,
  //     behavior: "smooth",
  //     block: "center"
  //   });

  //   if (this.reviewedCourses.includes(0) == false) {
  //     this.setState({
  //       canSubmit: true
  //     });
  //   }
  // }

  submitReview() {
    this.props.onSubmit(
      this.props.id,
      this.state.answers,
      this.state.additionalComment
    );
  }
}
