import { Avatar, Box } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Display from "../../components/Display";
import { selectStaff } from "../../features/staffSlice";

const containerStyle = {
  backgroundColor: "white",
  height: "100vh",
  borderRadius: "0.7rem",
};

const h4Styles = {
  fontWeight: "700",
  color: "black"
}

const spanStyles = {
  fontWeight: "600",
  color: "#6b6a6a",
  fontSize: "15px"
}

function SAdminStaffList() {
  const staff = useSelector(selectStaff);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null)

  const handleStaffClick = (staffDetails) => {
    setSelectedStaff(staffDetails);
    console.log(selectedStaff);
  };

  const currentYear = new Date().getFullYear();

  const ageOfStaff =
    Number(currentYear) - Number(selectedStaff?.dob.split("-")[0]);

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
          Staff List
        </h3>
        <div
          style={{
            overflowY: staff.length !== 0 ? "scroll" : "hidden",
            maxHeight: "calc(100% - 60px)",
          }}
        >
          {staff.length === 0 && (
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
          {staff &&
            staff?.map((eachStaff) => {
              return (
                <Display
                  key={eachStaff.id}
                  name={`${eachStaff.firstname} ${eachStaff.middlename || ""} ${
                    eachStaff.lastname
                  }`}
                  onClick={() => handleStaffClick(eachStaff)}
                  selected={selectedItem}
                  setSelected={setSelectedItem}
                />
              );
            })}
        </div>
      </Box>
      <Box sx={containerStyle}>
        {selectedStaff ? (
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
                  {`${selectedStaff.firstname} ${selectedStaff.middlename ||
                    ""} ${selectedStaff.lastname}`}
                </h1>
                <h4 style={{ margin: 0 }}>
                  Age: <span>{ageOfStaff}</span>{" "}
                </h4>
              </Box>
            </Box>
            <Box px={2}>
              <h4 style={h4Styles}>
                E-mail: <span style={spanStyles}>{selectedStaff.email}</span>
              </h4>
              <h4 style={h4Styles}>
                Primary Contact: <span style={spanStyles}>{selectedStaff.primary_contact}</span>
              </h4>
              <h4 style={h4Styles}>
                Secondary Contact:{" "}
                <span style={spanStyles}>{selectedStaff.secondary_contact}</span>
              </h4>
              <h4 style={h4Styles}>
                Date Of Birth: <span style={spanStyles}>{selectedStaff.dob.split("T")[0]}</span>
              </h4>
              <h4 style={h4Styles}>
                Residence: <span style={spanStyles}>{selectedStaff.residence}</span>
              </h4>
              <h4 style={h4Styles}>
                Assigned Class:{" "}
                <span style={spanStyles}>
                  {selectedStaff.level.map((lev) => lev.name).join(", ")}
                </span>
              </h4>
              <h4 style={h4Styles}>
                Assigned Subjects:{" "}
                <span style={spanStyles}>
                  {selectedStaff.subjects.map((subject) => subject.name)}
                </span>
              </h4>
              <h4 style={h4Styles}>
                Total Question Papers set:{" "}
                <span style={spanStyles}>{selectedStaff.topics.length}</span>
              </h4>
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
            <p style={{ margin: "0" }}>Select a staff member to view details</p>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default SAdminStaffList;
