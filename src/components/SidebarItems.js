import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "../cssModules/SidebarItems.css";
import { useSidebar } from "../SidebarContext";

function SidebarItems({ title, to, Icon, selected, setSelected }) {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={`sidebar--items ${
        selected === title && "sidebar--items-active"
      }`}
      onClick={() => setSelected(title)}
    >
      {Icon && <Icon className="sidebar--icon" />}
      <Typography marginLeft="15px" fontFamily="Allerta" color="#6b6a6a">
        {isCollapsed && title}
      </Typography>
      <Link to={to} />
    </div>
  );
}

export default SidebarItems;
