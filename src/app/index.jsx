// React
import React from "react";
import { render } from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";

// Firebase stuff
import firebase from "firebase";

// Stylesheets
import materialize from "../../node_modules/materialize-css/dist/css/materialize.css";
import animateCSS from "./animate.css";

// Components
import SubjectPage from "./components/SubjectPage";
import { SubjectList } from "./components/SubjectList";
import { LandingPage } from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import Navbar from "./components/Navbar";

import { config } from "./firebase-config";
import LoadingPage from "./components/LoadingPage";
firebase.initializeApp(config);

// Push notifications
const messaging = firebase.messaging();
messaging.onMessage(payload => {
  Materialize.toast("Recenzie noua disponibila!", 4000);
});

// Request notification permissions from the User. This function is only run
// after successfuly authentication.
function requestNotificationPermission(userID) {
  messaging
    .requestPermission()
    .then(() => {
      console.log("Push notifications allowed!");
      return messaging.getToken();
    })
    .then(token => {
      console.log("Sending token to server: ", token);
      firebase
        .database()
        .ref(`users/${userID}/notificationToken`)
        .set(token);
    })
    .catch(err => {
      console.log("Push notifications denied!");
    });
}

function PrivateRoute(props) {
  console.log("Private Route: ", props);
  return (
    <Route
      exact
      path={props.path}
      render={
        // If I am authed, I return the render function given as props. Otherwise
        // I render a redirect.
        props.authed === null
          ? () => <LoadingPage />
          : props.authed === true
            ? props.render
            : () => <LoginPage loadingLogin={props.loadingLogin} />
      }
    />
  );
}

// function PublicRoute(props) {
//   return (
//     <Route
//       exact
//       path={props.path}
//       render={props.authed === false ? props.render : () => <LandingPage />}
//     />
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authed: null,
      userID: null,
      displayName: null,
      email: null,
      newsText: null,
      newsAuthor: "",
      newsDate: new Date(),
      subjects: {},
      courses: {},
      laboratories: {},
      seminaries: {},
      courseQuestions: {},
      laboratoryQuestions: {},
      seminaryQuestions: {},
      toReview: {},
      alreadyReviewed: []
    };

    this.notifications = {};

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Authentication successful
        this.setState({
          authed: true,
          userID: user.uid,
          email: user.email
        });

        if (user.displayName != null) {
          this.setState({
            displayName: user.displayName
          });
        }

        this.loadDataFromDatabase();
        requestNotificationPermission(user.uid);
      } else {
        // Authentication unsuccessful
        this.setState({
          authed: false
        });
      }
    });

    this.loadDataFromDatabase = this.loadDataFromDatabase.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.submitNews = this.submitNews.bind(this);
    this.loadingLogin = this.loadingLogin.bind(this);
    this.updateDisplayName = this.updateDisplayName.bind(this);
  }

  loadDataFromDatabase() {
    firebase
      .database()
      .ref("discipline/")
      .once("value")
      .then(snapshot => {
        this.setState({
          subjects: snapshot.val()
        });
      });

    firebase
      .database()
      .ref("questionsCourses/")
      .once("value")
      .then(snapshot => {
        this.setState({
          courseQuestions: snapshot.val()
        });
      });

    firebase
      .database()
      .ref("questionsLaboratory/")
      .once("value")
      .then(snapshot => {
        this.setState({
          laboratoryQuestions: snapshot.val()
        });
      });

    firebase
      .database()
      .ref("questionsSeminary/")
      .once("value")
      .then(snapshot => {
        this.setState({
          seminaryQuestions: snapshot.val()
        });
      });

    firebase
      .database()
      .ref("users/" + this.state.userID)
      .on("value", snapshot => {
        if (snapshot.val() == null) return;
        this.setState({
          toReview: snapshot.val().toReview
        });
      });

    // Update FNa article
    firebase
      .database()
      .ref("news/")
      .on("value", snapshot => {
        this.setState({
          newsAuthor: snapshot.val().author,
          newsText: snapshot.val().text,
          newsDate: snapshot.val().date
        });
      });
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        {this.state.authed ? (
          <Navbar
            displayName={this.state.displayName}
            email={this.state.email}
            signOut={this.signOut}
            noNotifications={
              Object.entries(this.state.toReview).filter(([key, val]) => {
                return val == true;
              }).length
            }
          />
        ) : (
          ""
        )}
        <Switch>
          <PrivateRoute
            exact
            path="/"
            authed={this.state.authed}
            loadingLogin={this.loadingLogin}
            render={props => (
              <LandingPage
                {...props}
                submitNews={this.submitNews}
                author={this.state.newsAuthor}
                news={this.state.newsText}
                newsDate={this.state.newsDate}
                numToReview={
                  Object.entries(this.state.toReview).filter(([key, val]) => {
                    return val == true;
                  }).length
                }
              />
            )}
          />
          <Route
            exact
            path="/signup"
            authed={this.state.authed}
            render={props => (
              <SignupPage
                {...props}
                updateDisplayName={this.updateDisplayName}
              />
            )}
          />
          <Route
            exact
            path="/login"
            authed={this.state.authed}
            component={LoginPage}
          />
          <PrivateRoute
            exact
            path="/subjects"
            authed={this.state.authed}
            render={props => (
              <SubjectList
                subjects={this.state.subjects}
                toReview={this.state.toReview}
              />
            )}
          />
          <PrivateRoute
            exact
            path="/subject/:id"
            authed={this.state.authed}
            render={props => (
              <SubjectPage
                subjectID={props.match.params.id}
                imageURL={this.state.subjects[props.match.params.id].imageURL}
                courseQuestions={this.state.courseQuestions}
                laboratoryQuestions={this.state.laboratoryQuestions}
                seminaryQuestions={this.state.seminaryQuestions}
                subject={this.state.subjects[props.match.params.id]}
                toReview={this.state.toReview}
                submitReview={this.submitReview}
              />
            )}
          />
        </Switch>
      </div>
    );
  }

  submitReview(id, answers, additionalComment) {
    // id is the id of the laboratory/question
    firebase
      .database()
      .ref("answers/" + id + "/" + this.state.userID)
      .set({
        ...answers,
        additionalComment: additionalComment
      });

    let temp = {};
    temp[id] = false;

    firebase
      .database()
      .ref("users/" + this.state.userID + "/toReview")
      .update({
        ...temp
      })
      .then(() => {
        Materialize.toast("Recenzia a fost trimisa!", 4000);
      });
  }

  submitNews(content) {
    console.log("news:", this.state.displayName);
    firebase
      .database()
      .ref("news/")
      .set({
        author: this.state.displayName,
        text: content,
        date: new Date().toUTCString()
      });
  }

  updateDisplayName(user, displayName) {
    user.updateProfile({
      displayName: displayName
    });
    this.setState({
      displayName: displayName
    });
  }

  signOut() {
    firebase.auth().signOut();
  }

  loadingLogin() {
    this.setState({
      authed: null
    });
  }
}

render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("app")
);
