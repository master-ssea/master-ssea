import React from "react";

import { QeustionsPage, QuestionsPage } from "./QuestionsPage";

let currentCourse = null;

export default class SubjectCollapsible extends React.Component {
  constructor(props) {
    super(props);

    this.currentCourse = null;

    this.submitReview = this.submitReview.bind(this);
    this.loadModal = this.loadModal.bind(this);
  }

  getDateString(dateString, short = false) {
    let dateObj = new Date(dateString);
    let options = {
      year: short ? "2-digit" : "numeric",
      month: short ? "short" : "long",
      day: "numeric"
    };
    return dateObj.toLocaleString("en-GB", options);
  }

  getTimeString(dateString) {
    let dateObj = new Date(dateString);
    let options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    };
    return dateObj.toLocaleTimeString("en-GB", options);
  }

  render() {
    let timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    };
    let dateOptions = {
      year: "2-digit",
      month: "short",
      day: "numeric"
    };

    if (this.props.courses.length > 0)
      return (
        <div>
          <ul className="collapsible" data-collapsible="accordion">
            {this.props.courses.map(([key, value], index) => (
              <li key={`${index}${this.props.courses.length}`}>
                <div className="collapsible-header flow-text">
                  <i className="material-icons">{this.props.icon}</i>
                  {value.shortTitle}
                  <span
                    class="new badge"
                    data-badge-caption={new Date(
                      value.dateStart
                    ).toLocaleDateString("en-GB", dateOptions)}
                  />
                </div>
                <div
                  className="collapsible-body"
                  style={{ padding: "1rem", background: "#FAFAFA" }}
                >
                  <div>
                    <h5>{value.longTitle}</h5>
                    <p className="flow-text">
                      <strong>Început: </strong>
                      <span style={{ marginLeft: "0rem" }}>
                        {new Date(value.dateStart).toLocaleTimeString(
                          "en-US",
                          timeOptions
                        )}
                      </span>
                    </p>
                    <p className="flow-text">
                      <strong>Sfârșit: </strong>
                      <span style={{ marginLeft: "0.5rem" }}>
                        {new Date(value.dateEnd).toLocaleTimeString(
                          "en-US",
                          timeOptions
                        )}
                      </span>
                    </p>
                    <div
                      style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
                      className="divider"
                    />
                    <QuestionsPage
                      questions={this.props.questions}
                      onSubmit={this.loadModal}
                      id={key}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div
            className="modal modal-fixed-footer"
            style={{ height: "15em" }}
            ref={modal => (this.modal = modal)}
          >
            <div className="modal-content">
              <h4>Ești sigur(ă)?</h4>
              <p>Odată trimisă, recenzia nu va mai putea fi modificată.</p>
            </div>
            <div className="modal-footer">
              <div style={{ display: "inline" }}>
                <button className="modal-action modal-close waves-effect waves-red btn-flat">
                  Nu
                </button>
                <button
                  onClick={this.submitReview}
                  className="modal-action modal-close waves-effect waves-green btn-flat"
                >
                  Da, sunt sigur(ă)
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    else {
      return "";
    }
  }

  componentDidMount() {
    $(".collapsible").collapsible();
    $(this.modal).modal({ startingTop: "100%", endingTop: "30%" });
  }

  componentDidUpdate() {
    // TODO: Remove
    $(".collapsible").collapsible();
    $(this.modal).modal({ startingTop: "100%", endingTop: "30%" });
  }

  loadModal(id, answers, additionalComment) {
    this.currentCourse = id;
    this.answers = answers;
    this.additionalComment = additionalComment;
    $(this.modal).modal("open");
  }

  submitReview() {
    $(".collapsible").collapsible("close", 0);
    this.props.submitReview(
      this.currentCourse,
      this.answers,
      this.additionalComment
    );
  }
}
