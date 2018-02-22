import React from "react";

import firebase from "firebase";

export class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      pass1: "",
      pass2: "",
      showError: false,
      errorMessage: ""
    };

    this.submitSignup = this.submitSignup.bind(this);
  }

  render() {
    return (
      <div className="center-align" style={{ height: "100%" }}>
        <div
          className="blue"
          style={{
            height: "12rem",
            display: "flex",
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <img
            src="https://i.imgur.com/Vsjg7PE.png"
            style={{
              width: "8rem",
              height: "8rem",
              margin: "auto"
            }}
          />
        </div>
        <div style={{ width: "80%", margin: "auto" }}>
          <h4 className="center-align">Înregistrare</h4>
          <form>
            <div className="input-field">
              <i className="material-icons prefix">person</i>
              <input
                id="inputName"
                type="text"
                className="validate"
                onChange={e => (this.state.displayName = e.target.value)}
              />
              <label htmlFor="inputName">Nume și prenume</label>
            </div>
            <div className="input-field">
              <i className="material-icons prefix">email</i>
              <input
                id="inputMail"
                type="text"
                className="validate"
                onChange={e => (this.state.email = e.target.value)}
              />
              <label htmlFor="inputMail">E-Mail</label>
            </div>
            <div className="input-field">
              <i className="material-icons prefix">lock</i>
              <input
                id="inputPass"
                type="password"
                className="validate"
                onChange={e => (this.state.pass1 = e.srcElement.value)}
                data-error="Passwords do not match"
              />
              <label htmlFor="inputPass">Parolă</label>
            </div>
            <div>
              <button
                className="btn blue"
                style={{ width: "100%" }}
                onClick={this.submitSignup}
                type="button"
              >
                Înregistrează-te
              </button>
            </div>
          </form>
          {this.state.showError == true ? (
            <p style={{ color: "#e74c3c", marginBottom: "1rem" }}>
              {this.state.errorMessage}
            </p>
          ) : (
            <br />
          )}
        </div>
      </div>
    );
  }

  submitSignup() {
    // First reset any previous errors.
    this.setState({
      showError: false
    });

    if (this.state.displayName.length == 0) {
      this.setState({
        showError: true,
        errorMessage: "Please enter your full name."
      });
      return;
    }

    console.log(this.state.pass1);

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.pass1)
      .then(user => {
        this.props.updateDisplayName(user, this.state.displayName);
        this.setState({ showError: false });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          showError: true,
          errorMessage: err.message
        });
      });
  }

  componentDidMount() {
    console.log(this.state);
  }
}
