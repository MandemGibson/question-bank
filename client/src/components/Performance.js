import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

function Performance({ name, level }) {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return (
    <>
      <Box
        display="flex"
        ml="10px"
        mr="10px"
        mb="5px"
        mt="10px"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column">
          <p
            style={{
              margin: "0px",
              color: "#201D1D",
              fontSize: width <= 1024 ? "0.7rem" : "13px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </p>
        </Box>
        <Box display="flex" flexDirection="column">
          <p
            style={{
              margin: "0px",
              color: "#201D1D",
              fontSize: width <= 1067 ? "0.7rem" : "13px",
            }}
          >
            {level}
          </p>
        </Box>
      </Box>
      {width <= 1067 ? null : (
        <Box borderBottom="1px solid #473333" mr="10px" ml="10px" />
      )}
    </>
  );
}

export default Performance;
