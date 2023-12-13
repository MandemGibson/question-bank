import { Avatar, Box } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Display from "../../components/Display";
import { selectStudents } from "../../features/studentSlice";

const containerStyle = {
  backgroundColor: "white",
  height: "100vh",
  borderRadius: "0.7rem",
};

function SAdminStudentList() {
  const student = useSelector(selectStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStudentClick = (studentDetails) => {
    setSelectedStudent(studentDetails);
    console.log(selectedStudent);
  };

  const currentYear = new Date().getFullYear();

  const ageOfStudent =
    Number(currentYear) - Number(selectedStudent?.dob.split("-")[0]);

  return (
    <Box
      m={2}
      display={"grid"}
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      gap={2}
    >
      <Box sx={containerStyle} overflow={"hidden"}>
        <h3
          style={{
            margin: 0,
            padding: "20px",
            zIndex: 10,
            boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.5)",
            position: "sticky",
            top: 0,
            borderRadius: "0.7rem 0.7rem 0 0",
          }}
        >
          Students List
        </h3>
        <div
          style={{
            overflowY: student.length !== 0 ? "scroll" : "hidden",
            maxHeight: "calc(100% - 60px)",
          }}
        >
          {student.length === 0 && (
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              No data to display
            </p>
          )}
          {student &&
            student.map((eachStudent) => {
              return (
                <Display
                  key={eachStudent.id}
                  name={`${eachStudent.firstname} ${eachStudent.middlename ||
                    ""} ${eachStudent.lastname}`}
                  onClick={() => handleStudentClick(eachStudent)}
                />
              );
            })}
        </div>
      </Box>
      <Box sx={containerStyle}>
        {selectedStudent ? (
          <>
            <Box
              height={"min-content"}
              p={2}
              display={"flex"}
              gap={3}
              alignItems={"center"}
            >
              <Avatar
                src=""
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                }}
              />
              <Box>
                <h1 style={{ margin: 0 }}>
                  {`${selectedStudent.firstname} ${selectedStudent.middlename ||
                    ""} ${selectedStudent.lastname}`}
                </h1>
                <h5 style={{ margin: 0 }}>Age: {ageOfStudent}</h5>
              </Box>
            </Box>
            <Box px={2}>
              <h5>Date Of Birth: {selectedStudent.dob.split("T")[0]}</h5>
              <h5>Residence: {selectedStudent.residence}</h5>
              <h5>Class: {selectedStudent.level.name}</h5>
            </Box>
          </>
        ) : (
          <Box
            width={"100%"}
            height={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <p style={{ margin: "0" }}>Select a student to view details</p>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default SAdminStudentList;
