import { Avatar, Box } from "@mui/material";
import React from "react";
import "../../cssModules/Topbar.css";
import { connect } from "react-redux";
import { selectTitle } from "../../features/titleSlice";
import { useSelector } from "react-redux";
import { ReactComponent as SearchIcon } from "../../svg/Search.svg";
import { ReactComponent as NotificationIcon } from "../../svg/VectorBell.svg";

function Topbar() {
  const title = useSelector(selectTitle);
  return (
    <div className="topbar">
      <p>{title}</p>
      <div className="search__tray">
        <input placeholder="Search here" />
        <SearchIcon />
      </div>
      <div className="header__right">
        <div className="bell--icon">
          <NotificationIcon />
        </div>
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
