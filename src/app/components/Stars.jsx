import React from "react";

export default class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    };
  }

  renderStar(i) {
    if (i <= this.state.rating)
      return (
        <i
          className="material-icons orange-text animated bounceIn"
          style={{ fontSize: "3rem" }}
          onTouchStart={() => this.rate(i)}
        >
          star
        </i>
      );
    else
      return (
        <i
          className="material-icons grey-text animated"
          style={{ fontSize: "3rem" }}
          onTouchStart={() => this.rate(i)}
        >
          star_border
        </i>
      );
  }

  rate(i) {
    this.setState({
      rating: i
    });
    this.props.onClick(i);
  }

  render() {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {this.renderStar(1)}
        {this.renderStar(2)}
        {this.renderStar(3)}
        {this.renderStar(4)}
        {this.renderStar(5)}
      </div>
    );
  }

  componentDidMount() {
    // $('.material-icons').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
    //     $('.material-icons').removeClass('bounceIn')
    // });
  }
}
