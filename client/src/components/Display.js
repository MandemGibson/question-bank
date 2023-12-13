import { Avatar } from "@mui/material";
import React, { useState } from "react";

function Display({ avatar, name, onClick, selected, setSelected }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid gray",
        padding: "5px",
        marginLeft: "5px",
        cursor: "pointer",
        backgroundColor:
          selected === name ? "lightblue" : isHovered ? "lightgray" : "white",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        setSelected(name);
        onClick();
      }}
    >
      <Avatar src={avatar} />
      <p style={{ marginLeft: "20px" }}>{name}</p>
    </div>
  );
}

export default Display;
