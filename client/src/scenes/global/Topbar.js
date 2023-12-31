import { Avatar, Box } from "@mui/material";
import "../../cssModules/Topbar.css";
import { connect } from "react-redux";
import { selectTitle } from "../../features/titleSlice";
import { useSelector } from "react-redux";
import { ReactComponent as SearchIcon } from "../../svg/Search.svg";
import { ReactComponent as NotificationIcon } from "../../svg/VectorBell.svg";
import { selectUser } from "../../features/userSlice";
import { useState } from "react";

function Topbar() {
  const user = useSelector(selectUser);
  const title = useSelector(selectTitle);
  const [search, setSearch] = useState("");

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
            Staff
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
