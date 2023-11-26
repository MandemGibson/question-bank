import { Avatar, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../../cssModules/Topbar.css";
import { connect } from "react-redux";
import { selectTitle } from "../../../features/titleSlice";
import { selectStaff } from "../../../features/staffSlice";
import { selectStudents } from "../../../features/studentSlice";
import { useSelector } from "react-redux";
import { ReactComponent as SearchIcon } from "../../../svg/Search.svg";
import { ReactComponent as NotificationIcon } from "../../../svg/VectorBell.svg";
import { useDispatch } from "react-redux";
import { fetchStaffs } from "../../../features/staffSlice";

function Topbar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const students = useSelector(selectStudents);

  useEffect(() => {
    dispatch(fetchStaffs());
  }, [dispatch]);
  const staff = useSelector(selectStaff);
  const title = useSelector(selectTitle);

  const StaffAndStudents = [...staff, ...students];

  const searchRes = StaffAndStudents.filter((item) => {
    return item.firstname.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="topbar">
      <p>{title}</p>
      <div className="search__tray">
        <input
          placeholder="Search here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon />
      </div>

      {search !== "" && (
        <div
          style={{
            position: "absolute",
            marginBottom: "-100px",
            marginLeft: "21rem",
            width: "30%",
            height: "min-content",
            borderRadius: "0.625rem",
            backgroundColor: "white",
            paddingLeft: "10px",
            paddingRight: "10px",
            border: "1px solid #83eaf8",
          }}
        >
          {searchRes.map((item) => {
            return (
              <div
                key={item.id}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  {item.firstname} {item.middlename || ""} {item.lastname}
                </p>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "lightgray",
                  }}
                >
                  {item.role === 6631 ? "Student" : "Staff"}
                </span>
              </div>
            );
          })}
        </div>
      )}
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
