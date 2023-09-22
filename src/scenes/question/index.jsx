import { HomeOutlined, HomeRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import "../../cssModules/Navbar.css";
import QuestionSet from "../../components/QuestionSet";
import ola from "../../images/ola.jpg";
import { useNavigate } from "react-router-dom";

// export const NavBarItems = ({ items, selected, setSelected, to }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     setSelected(items);
//     navigate(to);
//   };
//   return (
//     <Box className={`nav__item ${selected && "nav__item"}`}>
//       <button
//         style={{
//           background: "none",
//           border: "none",
//           margin: "0px",
//           outline: "none",
//         }}
//         onClick={handleClick}
//       >
//         {items}
//       </button>
//     </Box>
//   );
// };

function Questions() {
  const [selected, setSelected] = useState(<HomeRounded />);

  const handleItemClick = (items) => {
    setSelected(items);
  };

  return (
    <Box display="flex" flexDirection="column" padding="20px">
      <Box
        display="flex"
        alignItems="center"
        borderRadius="30px"
        bgcolor="#1494A6"
        height="2.5rem"
        width="max-content"
        paddingLeft="20px"
        paddingRight="20px"
        onClick={handleItemClick}
        className={`nav__item ${selected && "nav__item"}`}
      >
        
      </Box>

      <h3 style={{ margin: "0px" }}>Previous Questions</h3>
      <QuestionSet
        title="English"
        subtitle="jhs 2"
        duration="1:30:00"
        days="2 days ago"
        image={ola}
      />
      <QuestionSet
        title="English"
        subtitle="jhs 2"
        duration="1:30:00"
        days="2 days ago"
        image={ola}
      />
      <QuestionSet
        title="English"
        subtitle="jhs 2"
        duration="1:30:00"
        days="2 days ago"
        image={ola}
      />
      <QuestionSet
        title="English"
        subtitle="jhs 2"
        duration="1:30:00"
        days="2 days ago"
        image={ola}
      />
      <Box>
        <h3 style={{ margin: "0px", marginTop: "20px" }}>New Questions</h3>
        <QuestionSet
          title="English"
          subtitle="jhs 2"
          duration="1:30:00"
          days="2 hours ago"
          image={ola}
        />
      </Box>
    </Box>
  );
}

export default Questions;
