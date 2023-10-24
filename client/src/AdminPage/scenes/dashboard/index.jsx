import { Box } from "@mui/material";
import React from "react";
import AdminFlexBox from "../../../components/AdminFlexBox";
import List from "../../../components/List";

function AdminDashboard() {
  return (
    <Box display="flex" flexDirection="column" mx="30px" my="20px">
      <Box display="flex" justifyContent="space-between">
        <AdminFlexBox header="Total Staff" count="30" />
        <AdminFlexBox header="Total Staff" count="30" />
        <AdminFlexBox header="Total Staff" count="30" />
        <AdminFlexBox header="Total Staff" count="30" />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" flexDirection="column" flexGrow={0} flexShrink={1}>
          <Box
            bgcolor="white"
            width="45rem"
            height="20rem"
            borderRadius="0.625rem"
            mt="20px"
          >
            <p
              style={{
                margin: "10px 0 0 10px",
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#6b6a6a",
              }}
            >
              Staff Lists
            </p>
            <Box
              display="flex"
            //   justifyContent="space-between"
              mx="20px"
              mt="10px"
            >
              {/* <p style={{ margin: "0" }}>ID</p>
              <p style={{ margin: "0" }}>Name</p>
              <p style={{ margin: "0" }}>Email</p>
              <p style={{ margin: "0" }}>Class</p>
              <p style={{ margin: "0" }}>Status</p> */}
                          <table>
                              <tr></tr>
                          </table>
            </Box>
            {/* <List id="STA1000" name="Philip Cudjoe" email="themaingib@gmail.com" level="Primary 6"/> */}
          </Box>
          <Box
            bgcolor="white"
            width="45rem"
            height="20rem"
            borderRadius="0.625rem"
            mt="20px"
          ></Box>
        </Box>
        <Box
          bgcolor="white"
          width="19rem"
          mt="20px"
          borderRadius="0.625rem"
        ></Box>
      </Box>
    </Box>
  );
}

export default AdminDashboard;
