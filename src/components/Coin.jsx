import React from "react";

function Coin({ rank, name }) {
  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        justifyContent: "space-between",
        width: "350px",
      }}
    >
      <p>{rank}</p>
      <p>{name}</p>
    </div>
  );
}

export default Coin;
