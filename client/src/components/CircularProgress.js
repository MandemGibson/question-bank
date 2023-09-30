import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar = ({ value }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(value);
  }, [value]);

  return (
    <div style={{ width: "10rem" }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={15}
        styles={buildStyles({
          textSize: "16px",
          pathTransitionDuration: 0.5,
          textColor: "#00B1C9",
          pathColor: `#00B1C9`,
          trailColor: "#E46E00",
        })}
      />
    </div>
  );
};

export default CircularProgressBar;
