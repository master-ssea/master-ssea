import React from "react";
import Spinner from "./Spinner";

export class NewsCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: ""
    };

    this.submitNews = this.submitNews.bind(this);
  }

  render() {
    let dateOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };
    return (
      <div>
        {this.state.editMode ? (
          <div className="card-panel white">
            <h5>Modifică anunțul</h5>
            <div className="divider" />
            <div className="input-field">
              <textarea
                id="editNews"
                className="materialize-textarea"
                maxLength="140"
                value={this.state.editText}
                onChange={e => this.setState({ editText: e.target.value })}
              />
              <label htmlFor="editNews">Introduceți un mesaj nou</label>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button className="btn" onClick={this.submitNews}>
                <i className="material-icons">done</i>
              </button>
              <button
                className="btn red darken-1"
                onClick={() => {
                  this.setState({ editMode: false, editText: "" });
                }}
              >
                <i className="material-icons">close</i>
              </button>
            </div>
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            <button
              style={{ position: "absolute", top: "1rem", right: "1rem" }}
              onClick={() => this.setState({ editMode: true })}
              className="btn-floating waves-effect waves-light blue"
            >
              <i className="material-icons">comment</i>
            </button>
            <div className="card-panel white">
              <h5>Anunțuri</h5>
              <div className="divider" />
              {this.props.news != null ? (
                <div>
                  <blockquote className="flow-text">
                    {this.props.news}
                  </blockquote>
                  <div
                    className="right-align flow-text"
                    style={{ marginTop: "1rem" }}
                  >
                    <strong>{this.props.author}</strong>
                  </div>
                  <div
                    className="right-align"
                    style={{ marginBottom: "0.5rem" }}
                  >
                    {new Date(this.props.date).toLocaleTimeString(
                      "en-GB",
                      dateOptions
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className="center-align"
                  style={{ marginTop: "3rem", marginBottom: "1rem" }}
                >
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  submitNews() {
    if (this.state.editText.length < 10) {
      Materialize.toast("Textul trebuie sa aiba minim 10 caractere.", 4000);
      return;
    }
    Materialize.toast("Anuntul a fost actualizat!", 4000);
    this.props.submitNews(this.state.editText);
    this.setState({ editMode: false, editText: "" });
  }
}
