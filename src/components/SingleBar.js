import React from "react";
import ReactDOM from "react-dom";

function SingleBar({ width, height, data, color, month, number }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <svg style={{ marginLeft: 5 }} width={width} height={height}>
        <path
          style={{
            animation: "bounce linear 400ms",
            transformOrigin: "50% 100%",
            margin: "auto"
          }}
          d={data}
          fill={color}
        />
      </svg>
      <p style={{ fontSize: 12 }}>{month}</p>
      <p style={{ fontSize: 12 }}>{number}</p>
    </div>
  );
}

export default SingleBar;