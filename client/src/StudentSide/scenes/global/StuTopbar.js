import { Avatar, Box } from "@mui/material";
import React from "react";
import "../../../cssModules/Topbar.css";
import { connect } from "react-redux";
import { selectTitle } from "../../../features/titleSlice";
import { useSelector } from "react-redux";
import { ReactComponent as NotificationIcon } from "../../../svg/VectorBell.svg";
import { selectUser } from "../../../features/userSlice";

function Topbar() {
  const title = useSelector(selectTitle);
  const user = useSelector(selectUser);
  return (
    <div className="topbar">
      <p>{title}</p>
      <div>
        <h3>Welcome {user?.user.firstname}</h3>
      </div>
      <div className="header__right">
        <div className="bell--icon">
          <NotificationIcon />
        </div>
        <Avatar src="" sx={{ borderRadius: "10px" }} />
        <Box display="flex" flexDirection="column" alignItems="normal" ml="5px">
          <p id="name" style={{ margin: "0px" }}>
            {user?.user.firstname} {user?.user.middlename} {user?.user.lastname}
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
