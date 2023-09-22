import { NotificationsOutlined, Search } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import React from "react";
import "../../cssModules/Topbar.css";
import { connect } from "react-redux";
import { selectTitle } from "../../features/titleSlice";
import { useSelector } from "react-redux";

function Topbar() {
  const title = useSelector(selectTitle);
  return (
    <div className="topbar">
      <p>{title}</p>
      <div className="search__tray">
        <input placeholder="Search here" />
        <Search
          sx={{ color: "#83eaf8", fontWeight: "400", fontSize: "20px" }}
        />
      </div>
      <div className="header__right">
        <NotificationsOutlined
          sx={{
            color: "#83eaf8",
            fontWeight: "400",
            fontSize: "22px",
            mr: "20px",
          }}
        />
        <Avatar src="" sx={{ borderRadius: "10px" }} />
        <Box display="flex" flexDirection="column" alignItems="normal" ml="5px">
          <p id="name" style={{ margin: "0px" }}>
            Emily Smith
          </p>
          <p id="position" style={{ margin: "0px" }}>
            Staff
          </p>
        </Box>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    title: selectTitle(state), // Use selectTitle to get the title from Redux
  };
};

export default connect(mapStateToProps)(Topbar);
