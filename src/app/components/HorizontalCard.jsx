import React from "react";
import { withRouter } from "react-router-dom";
import { Badge } from "./Badge";

class HorizontalCard extends React.Component {
  constructor(props) {
    super(props);
    this.navigateTo = this.navigateTo.bind(this);
  }

  render() {
    return (
      <div
        onClick={this.navigateTo}
        className="card horizontal waves-effect"
        style={{ height: "10rem" }}
      >
        <div
          className="card-image valign-wrapper"
          style={{ padding: "0.5rem" }}
        >
          <img className="responsive-img" src={this.props.image} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p style={{ fontWeight: "bold" }}>
              <strong>{this.props.title}</strong>
            </p>
            <p style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "0.9em" }}>
              {this.props.subtitle}
            </p>
          </div>
          <Badge noNotifications={this.props.notifications} topRight />
        </div>
      </div>
    );
  }

  navigateTo() {
    // Only if we want to navigate we navigate
    if (this.props.linkTo) {
      setTimeout(() => {
        this.props.history.push(this.props.linkTo);
      }, 200);
    }
  }
}

export default withRouter(HorizontalCard);
