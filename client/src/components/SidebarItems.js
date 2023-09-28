import { Typography } from "@mui/material";
import React from "react";
import "../cssModules/SidebarItems.css";
import { useSidebar } from "../SidebarContext";
import { useNavigate } from "react-router-dom";
import { changeTitle } from "../features/titleSlice";
import { useDispatch } from "react-redux";

function SidebarItems({ title, to, Icon, selected, setSelected }) {
  const { isCollapsed } = useSidebar();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setSelected(title);
    dispatch(changeTitle(title));
    navigate(to);
  };

  return (
    <div
      className={`sidebar--items ${selected && "sidebar--items-active"}`}
      onClick={handleClick}
    >
      {Icon && (
        <Icon
          className={isCollapsed ? "sidebar--icon" : "sidebar--icon__collapsed"}
        />
      )}
      <Typography marginLeft="15px" fontFamily="Allerta" color="#6b6a6a">
        {isCollapsed && title}
      </Typography>
    </div>
  );
}

export default SidebarItems;
