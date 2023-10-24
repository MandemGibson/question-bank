import { Avatar, Box } from "@mui/material";
import React, { useEffect } from "react";
import "../../../cssModules/Topbar.css";
import { connect } from "react-redux";
import { selectTitle } from "../../../features/titleSlice";
import { selectStaff } from "../../../features/staffSlice";
import { useSelector } from "react-redux";
import { ReactComponent as SearchIcon } from "../../../svg/Search.svg";
import { ReactComponent as NotificationIcon } from "../../../svg/VectorBell.svg";
import { useDispatch } from "react-redux";
import { fetchStaffs } from "../../../features/staffSlice";

function Topbar() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStaffs());
  }, [dispatch]);
  const staff = useSelector(selectStaff);
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
        <Avatar src={staff?.profile_pic} sx={{ borderRadius: "10px" }} />
        <Box display="flex" flexDirection="column" alignItems="normal" ml="5px">
          <p id="name" style={{ margin: "0px" }}>
            {staff?.firstname}
            {staff?.middlename} {staff?.lastname}
          </p>

          <p id="position" style={{ margin: "0px" }}>
            Admin
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
