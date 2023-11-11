import React, { useEffect, useState } from "react";
import "../../../cssModules/Sidebar.css";
import { CloseOutlined, Logout, MenuRounded } from "@mui/icons-material";
import ola from "../../../images/ola.jpg";
import { Button, IconButton } from "@mui/material";
import SidebarItems from "../../../components/SidebarItems";
import { ReactComponent as dashboardIcon } from "../../../svg/dashboard.svg";
import { ReactComponent as staffIcon } from "../../../svg/staff.svg";
import { ReactComponent as studentIcon } from "../../../svg/student.svg";
import { ReactComponent as statisticsIcon } from "../../../svg/Many Line Graph.svg";
import { ReactComponent as usersGuideIcon } from "../../../svg/usersGuide.svg";
import { ReactComponent as feedbackIcon } from "../../../svg/Vector.svg";
import { useSidebar } from "../../../SidebarContext";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../../features/userSlice";

function AdminSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const [selectedItem, setSelectedItem] = useState(() => {
    const localValue = localStorage.getItem("SIDEBARITEMS");
    if (localValue === null) {
      return "Dashboard";
    }

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("SIDEBARITEMS", JSON.stringify(selectedItem));
  }, [selectedItem]);

  const handleItemClick = (title) => {
    setSelectedItem(title);
  };

  const LogoutOutOfApp = async () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className={isCollapsed ? "sidebar" : "sidebar sidebar__collapsed"}>
      <div
        className={isCollapsed ? "sidebar__upper" : "sidebar__upper--collapsed"}
      >
        {isCollapsed ? (
          <div className="logo">
            <img src={ola} alt="" width="150px" height="100px" />
          </div>
        ) : (
          <img
            src={ola}
            alt=""
            width="80px"
            height="50px"
            style={{
              marginTop: "55px",
              objectFit: "contain",
              visibility: "hidden",
            }}
          />
        )}

        <IconButton
          sx={{
            color: "#6b6a6a",
            position: "absolute",
            right: 0,
          }}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <CloseOutlined /> : <MenuRounded />}
        </IconButton>
      </div>
      <div className="space1"></div>
      <div className="sidebar__options">
        <SidebarItems
          Icon={dashboardIcon}
          title="Dashboard"
          selected={selectedItem === "Dashboard"}
          setSelected={handleItemClick}
          to="/"
        />
        <SidebarItems
          Icon={staffIcon}
          title="Staff"
          selected={selectedItem === "Staff"}
          setSelected={handleItemClick}
          to="/staff"
        />
        <SidebarItems
          Icon={studentIcon}
          title="Students"
          selected={selectedItem === "Students"}
          setSelected={handleItemClick}
          to="/students"
        />
        <SidebarItems
          Icon={statisticsIcon}
          title="Statistics"
          selected={selectedItem === "Statistics"}
          setSelected={handleItemClick}
          to="/statistics"
        />
      </div>
      <div className="space2"></div>
      <div className="sidebar__options">
        <SidebarItems
          Icon={usersGuideIcon}
          title="Users Guide"
          selected={selectedItem === "Users Guide"}
          setSelected={handleItemClick}
          to="/guide"
        />
        <SidebarItems
          Icon={feedbackIcon}
          title="Feedback"
          selected={selectedItem === "Feedback"}
          setSelected={handleItemClick}
          to="/feedback"
        />
      </div>
      {isCollapsed ? (
        <Button
          variant="contained"
          startIcon={<Logout />}
          sx={{
            textTransform: "capitalize",
            m: "3rem 1.5rem 2rem 1.5rem",
            borderRadius: "20px",
            fontFamily: "Rubik",
            fontWeight: "700",
            bgcolor: "#83EAF8",
          }}
          onClick={LogoutOutOfApp}
        >
          Log out
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            bottom: 0,
            borderRadius: "100px",
            alignContent: "center",
            m: "1.5rem 1.5rem 2rem 0.3rem",
            bgcolor: "#83eaf8",
          }}
          onClick={LogoutOutOfApp}
        >
          <Logout />
        </Button>
      )}
    </div>
  );
}

export default AdminSidebar;
