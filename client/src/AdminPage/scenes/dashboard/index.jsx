import { Box } from "@mui/material";
import React, { useEffect } from "react";
import AdminFlexBox from "../../../components/AdminFlexBox";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { selectStudents } from "../../../features/studentSlice";
import { selectStaff } from "../../../features/staffSlice"
import axios from "axios";

const column = [
  {
    name: "ID",
    selector: row => row.id
  },
  {
    name: "Name",
    selector: row => row.name
  },
  {
    name: "Email",
    selector: row => row.email
  },
  {
    name: "Class",
    selector: row => row.level
  },
]

function AdminDashboard() {
  const students = useSelector(selectStudents)
  const staffs = useSelector(selectStaff)

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = axios.get("http://localhost:3005/api/staffs")
console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
   fetchStaff()
  },[])

  const data = [
    {
      id: 1000,
      name: "Philip Cudjoe",
      email: "test@test.io",
      level: "Primary 2"
    },
    {
      id: 1000,
      name: "Philip Cudjoe",
      email: "test@test.io",
      level: "Primary 2"
    },
    {
      id: 1000,
      name: "Philip Cudjoe",
      email: "test@test.io",
      level: "Primary 2"
    },
    {
      id: 1000,
      name: "Philip Cudjoe",
      email: "test@test.io",
      level: "Primary 2"
    },
  ]
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
              <DataTable columns={column} data={data} />
            </Box>
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
