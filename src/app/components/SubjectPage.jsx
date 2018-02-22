import React from "react";
import ReactDOM from "react-dom";

import SubjectCollapsible from "./SubjectCollapsible";
import { withRouter } from "react-router";

class SubjectPage extends React.Component {
  constructor(props) {
    super(props);

    this.filterToReview = this.filterToReview.bind(this);
  }

  filterToReview(items) {
    let filteredItems = Object.entries(items).filter(([key, val]) => {
      return this.props.toReview[key] == true;
    });

    return filteredItems;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div
        className="card z-depth-0"
        style={{ position: "absolute", top: "3rem" }}
      >
        <div className="card-image">
          <img src={this.props.subject.imageURL} className="responsive-img" />
          <span className="card-title flow-text">
            {this.props.subject.titlu}
          </span>
          <a
            className="btn-floating halfway-fab waves-effect waves-light blue"
            onClick={() =>
              setTimeout(() => {
                this.props.history.goBack();
              }, 200)
            }
          >
            <i className="material-icons">reply</i>
          </a>
        </div>
        <div className="card-content">
          <div>
            <p>{this.props.subject.descriere}</p>
          </div>
          <div
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
            className="divider"
          />
          {this.filterToReview(this.props.subject.cursuri || []).length == 0 &&
          this.filterToReview(this.props.subject.laboratoare || []).length ==
            0 ? (
            <p className="flow-text" style={{ textAlign: "center" }}>
              Nicio recenzie disponibilă în acest moment.
            </p>
          ) : (
            <div>
              <SubjectCollapsible
                courses={this.filterToReview(this.props.subject.cursuri || [])}
                questions={this.props.courseQuestions}
                submitReview={this.props.submitReview}
                icon="import_contacts"
              />
              <SubjectCollapsible
                courses={this.filterToReview(
                  this.props.subject.laboratoare || []
                )}
                questions={this.props.laboratoryQuestions}
                submitReview={this.props.submitReview}
                icon="build"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(SubjectPage);
