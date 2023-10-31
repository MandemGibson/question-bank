import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminFlexBox from "../../../components/AdminFlexBox";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, selectStudents } from "../../../features/studentSlice";
import { fetchStaffs, selectStaff } from "../../../features/staffSlice";
import {
  fetchQuestions,
  selectQuestion,
} from "../../../features/questionSlice";
import Calendar from "react-calendar";
import "../../../cssModules/Calendar.css";

const staffColumn = [
  {
    name: "ID",
    selector: (row) => row.id,
  },
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Class(es)",
    selector: (row) => row.level,
  },
  {
    name: "Status",
    selector: () => {
      return (
        <Box
          borderRadius="0.3125rem"
          backgroundColor="rgba(143, 219, 117, 0.40)"
          color="#4CDA35"
          fontWeight="600"
          height="1.625rem"
          width="4.1875rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <p style={{ margin: "0px" }}>Active</p>
        </Box>
      );
    },
  },
];

const studentColumn = [
  {
    name: "ID",
    selector: (row) => row.id,
  },
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Class",
    selector: (row) => row.level,
  },
  {
    name: "Status",
    selector: () => {
      return (
        <Box
          borderRadius="0.3125rem"
          backgroundColor="rgba(143, 219, 117, 0.40)"
          color="#4CDA35"
          fontWeight="600"
          height="1.625rem"
          width="4.1875rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <p style={{ margin: "0px" }}>Active</p>
        </Box>
      );
    },
  },
];

function AdminDashboard() {
  const dispatch = useDispatch();
  const students = useSelector(selectStudents);
  const staffs = useSelector(selectStaff);
  const questions = useSelector(selectQuestion);
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  useEffect(() => {
    dispatch(fetchStaffs());
    dispatch(fetchStudents());
    dispatch(fetchQuestions());
  }, [dispatch]);

  const staffData = staffs.map((staff) => ({
    id: staff.staff_id,
    name: `${staff.firstname} ${staff.middlename || ""} ${staff.lastname}`,
    email: staff.email,
    level: staff.level.map((level) => {
      return level.name + ", ";
    }),
  }));

  const studentData = students.map((student) => ({
    id: student.student_id,
    name: `${student.firstname} ${student.middlename || ""} ${
      student.lastname
    }`,
    level: student.level.name,
  }));

  const customStyles = {
    head: {
      style: {
        fontSize: "1rem",
        fontWeight: "600",
        color: "#201D1D",
      },
    },
  };

  return (
    <Box display="flex" flexDirection="column" mx="30px" my="20px">
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <AdminFlexBox header="Total Staff" count={staffs.length} />
        <AdminFlexBox header="Total Students" count={students.length} />
        <AdminFlexBox header="Total Questions" count={questions.length} />
        <AdminFlexBox header="Total Online" count="39" />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" flexDirection="column">
          <Box
            bgcolor="white"
            flex="1" //width="40rem"
            minHeight="20rem"
            height="min-content"
            borderRadius="0.625rem"
            mt="20px"
          >
            <Box display="flex" mx="10px" flexDirection="column">
              <DataTable
                title={
                  <p
                    style={{
                      margin: "0px",
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#6b6a6a",
                    }}
                  >
                    Staff Lists
                  </p>
                }
                columns={staffColumn}
                data={staffData}
                responsive
                pagination
                fixedHeader
                highlightOnHover
                customStyles={customStyles}
              />
            </Box>
          </Box>
          <Box
            bgcolor="white"
            flex="1 1" // width="45rem"
            minHeight="20rem"
            height="min-content"
            borderRadius="0.625rem"
            mt="20px"
          >
            <Box display="flex" mx="20px" mt="10px" flexDirection="column">
              <DataTable
                title={
                  <p
                    style={{
                      margin: "0px",
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#6b6a6a",
                    }}
                  >
                    Students Lists
                  </p>
                }
                columns={studentColumn}
                data={studentData}
                responsive
                pagination
                fixedHeader
                highlightOnHover
                customStyles={customStyles}
              />
            </Box>
          </Box>
        </Box>
        <Box
          bgcolor="white"
          // minWidth="19rem"
          // width="min-content"
          mt="20px"
          borderRadius="0.625rem"
          display="flex"
          flexDirection="column"
          // position="relative"
        >
          <div style={{ padding: "10px", width: "100%" }}>
            {date.toDateString()}
            <Calendar value={date} onChange={onChange} calendarType="hebrew" />
          </div>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminDashboard;