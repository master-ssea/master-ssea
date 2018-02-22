import React from "react";
import { withRouter } from "react-router";
import { Badge } from "./Badge";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  render() {
    return (
      <div>
        <ul id="slide-out" className="side-nav">
          <li>
            <div className="user-view">
              <div className="background blue" />
              <a>
                <i className="circle material-icons large white-text">person</i>
              </a>
              <a>
                <span className="white-text name">
                  {this.props.displayName}
                </span>
              </a>
              <a>
                <span className="white-text email">{this.props.email}</span>
              </a>
            </div>
          </li>
          <li>
            <a className="subheader">Navigare</a>
          </li>
          <li>
            <a
              className="waves-effect"
              onClick={() => {
                this.props.history.push("/");
                $(".button-collapse").sideNav("hide");
              }}
            >
              <i className="material-icons">home</i>Pagină principală
            </a>
          </li>
          <li>
            <a
              className="waves-effect"
              onClick={() => {
                this.props.history.push("/subjects");
                $(".button-collapse").sideNav("hide");
              }}
            >
              <i className="material-icons">view_agenda</i>Listă discipline
              <Badge noNotifications={this.props.noNotifications} />
            </a>
          </li>
          <li>
            <a
              className="waves-effect"
              href="https://ie.utcluj.ro/files/orar/ORAR_FIE_2017-18_sem2_MASTER_I.pdf"
            >
              <i className="material-icons">date_range</i>Orar
            </a>
          </li>
          <li />
          <li>
            <a className="subheader">Alte opțiuni</a>
          </li>
          {/* <li>
            <a className="waves-effect">
              <i className="material-icons">feedback</i>Raportați o problemă
            </a>
          </li> */}
          <li>
            <a className="waves-effect" onClick={this.signOut}>
              <i className="material-icons">exit_to_app</i>Deconectați-vă
            </a>
          </li>
        </ul>
        <div
          className="blue valign-wrapper"
          style={{
            width: "100%",
            height: "4rem",
            position: "fixed",
            top: "0px",
            zIndex: 7
          }}
        >
          <a
            data-activates="slide-out"
            className="button-collapse"
            style={{ marginLeft: "1rem" }}
          >
            <i
              className="material-icons small white-text waves-effect waves-light"
              style={{
                borderRadius: "50%"
              }}
            >
              menu
            </i>
          </a>
          <a
            style={{
              position: "absolute",
              right: "1rem",
              display:
                this.props.history.location.pathname === "/" ? "none" : ""
            }}
            onClick={() => this.props.history.goBack()}
          >
            <i
              className="material-icons small white-text waves-effect waves-light"
              style={{
                borderRadius: "50%"
              }}
            >
              reply
            </i>
          </a>
        </div>
      </div>
    );
  }

  componentDidMount() {
    $(".button-collapse").sideNav();
  }

  signOut() {
    $(".button-collapse").sideNav("hide");
    this.props.signOut();
  }
}

export default withRouter(Navbar);
