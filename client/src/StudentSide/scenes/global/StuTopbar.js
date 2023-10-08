import { Avatar, Box } from "@mui/material";
import React from "react";
import "../../../cssModules/Topbar.css";
import { connect } from "react-redux";
import { selectTitle } from "../../../features/titleSlice";
import { useSelector } from "react-redux";
import { ReactComponent as NotificationIcon } from "../../../svg/VectorBell.svg";

function Topbar() {
  const title = useSelector(selectTitle);
  return (
    <div className="topbar">
      <p>{title}</p>
      <div>
        <h3>Welcome Phil</h3>
      </div>
      <div className="header__right">
        <div className="bell--icon">
          <NotificationIcon />
        </div>
        <Avatar src="" sx={{ borderRadius: "10px" }} />
        <Box display="flex" flexDirection="column" alignItems="normal" ml="5px">
          <p id="name" style={{ margin: "0px" }}>
            Philip Gibson Cudjoe
          </p>

          <p id="position" style={{ margin: "0px" }}>
            Student
          </p>
        </Box>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    title: selectTitle(state),
  };
};

export default connect(mapStateToProps)(Topbar);
