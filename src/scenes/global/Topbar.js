import { NotificationsOutlined, Search } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import React from "react";
import "../../cssModules/Topbar.css";

function Topbar() {
  return (
    <div className="topbar">
      <p>Dashboard</p>
      <div className="search__tray">
        <input placeholder="Search here" />
        <Search />
      </div>
      <div className="header__right">
        <NotificationsOutlined />
        <Avatar src="" sx={{ borderRadius: "10px" }} />
        <div>
          <p>Emily Smith</p>
          <p>Staff</p>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
