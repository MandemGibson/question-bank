import React, { useState } from "react";
import "../../cssModules/Sidebar.css";
import { CloseOutlined, Logout, MenuRounded } from "@mui/icons-material";
import ola from "../../images/ola.jpg";
import { Button, IconButton } from "@mui/material";
import SidebarItems from "../../components/SidebarItems";
import { ReactComponent as dashboardIcon } from "../../svg/dashboard.svg";
import { ReactComponent as questionsIcon } from "../../svg/questions.svg";
import { ReactComponent as resultsIcon } from "../../svg/Component 6.svg";
import { ReactComponent as statisticsIcon } from "../../svg/Many Line Graph.svg";
import { ReactComponent as usersGuideIcon } from "../../svg/usersGuide.svg";
import { ReactComponent as feedbackIcon } from "../../svg/Vector.svg";
import { useSidebar } from "../../SidebarContext";

function Sidebar() {
  const [selected, setSelected] = useState("Dashboard");
  const { isCollapsed, setIsCollapsed } = useSidebar();

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
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItems
          Icon={questionsIcon}
          title="Questions"
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItems
          Icon={resultsIcon}
          title="Results"
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItems
          Icon={statisticsIcon}
          title="Statistics"
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <div className="space2"></div>
      <div className="sidebar__options">
        <SidebarItems
          Icon={usersGuideIcon}
          title="Users Guide"
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItems
          Icon={feedbackIcon}
          title="Feedback"
          selected={selected}
          setSelected={setSelected}
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
        >
          <Logout />
        </Button>
      )}
    </div>
  );
}

export default Sidebar;
