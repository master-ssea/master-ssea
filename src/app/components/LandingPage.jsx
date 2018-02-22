import React from "react";
import { NewsCard } from "./NewsCard";
import { Badge } from "./Badge";

export class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: "4rem",
          margin: "0 auto",
          width: "100%"
        }}
      >
        <div
          style={{
            // backgroundColor: "#f5f6fa",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingBottom: "2rem"
          }}
          className="container"
        >
          <NewsCard
            news={this.props.news}
            author={this.props.author}
            submitNews={this.props.submitNews}
            date={this.props.newsDate}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              width: "100%"
            }}
          >
            <div className="center-align">
              <button
                onClick={() =>
                  setTimeout(() => this.props.history.push("/subjects"), 200)
                }
                style={{
                  width: "15rem",
                  marginBottom: "0.5rem",
                  marginTop: "0.5rem"
                }}
                className="btn-large waves-effect white black-text"
              >
                <i className="material-icons large left">library_books</i>
                Discipline
                <Badge noNotifications={this.props.numToReview} topRight />
              </button>
              <br />
              <a
                href="https://ie.utcluj.ro/files/orar/ORAR_FIE_2017-18_sem2_MASTER_I.pdf"
                style={{
                  width: "15rem",
                  marginBottom: "0.5rem",
                  marginTop: "0.5rem"
                }}
                className="btn-large waves-effect white black-text"
              >
                <i className="material-icons large left">date_range</i>
                Orar
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
