import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../cssModules/Sidebar.css";
import { CloseOutlined, Logout, MenuRounded } from "@mui/icons-material";
import ola from "../../../images/ola.jpg";
import { Button, IconButton } from "@mui/material";
import SidebarItems from "../../../components/SidebarItems";
import { ReactComponent as dashboardIcon } from "../../../svg/dashboard.svg";
import { ReactComponent as quizIcon } from "../../../svg/quiz.svg";
import { ReactComponent as examsIcon } from "../../../svg/exams.svg";
import { ReactComponent as gradesIcon } from "../../../svg/grades.svg";
import { ReactComponent as usersGuideIcon } from "../../../svg/usersGuide.svg";
import { ReactComponent as feedbackIcon } from "../../../svg/Vector.svg";
import { useSidebar } from "../../../SidebarContext";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../../features/userSlice";

function StuSidebar() {
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
    try {
      const sessionId = JSON.parse(localStorage.getItem("sessionId"));
      console.log(sessionId.sessionId);
      const result = await axios.post(
        "http://localhost:3005/api/auth/logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${sessionId.sessionId}`,
          },
        }
      );
      console.log(result.data);
      localStorage.clear();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
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
          Icon={quizIcon}
          title="Quiz Tab"
          selected={selectedItem === "Quiz Tab"}
          setSelected={handleItemClick}
          to="/quiz-tab"
        />
        <SidebarItems
          Icon={examsIcon}
          title="Exams Tab"
          selected={selectedItem === "Exams Tab"}
          setSelected={handleItemClick}
          to="/exams-tab"
        />
        <SidebarItems
          Icon={gradesIcon}
          title="My Grades"
          selected={selectedItem === "My Grades"}
          setSelected={handleItemClick}
          to="/grades"
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
        >
          <Logout />
        </Button>
      )}
    </div>
  );
}

export default StuSidebar;
