import React from "react";

exports.Badge = props => {
  return props.noNotifications > 0 ? (
    <span
      style={
        props.topRight
          ? {
              position: "absolute",
              top: "1px",
              right: "1px",
              minWidth: "2rem"
            }
          : { minWidth: "2rem" }
      }
      class="new badge green"
      data-badge-caption={props.noNotifications}
    />
  ) : (
    ""
  );
};
