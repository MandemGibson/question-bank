import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import CircularProgressBar from "../../components/CircularProgress";
import CircleIcon from "@mui/icons-material/Circle";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, selectQuestion } from "../../features/questionSlice";
import { removeStaff, selectStaff } from "../../features/staffSlice";
import { fetchStudents, selectStudents } from "../../features/studentSlice";
import DataTable from "react-data-table-component";
import axios from "axios";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend
);

const firstLayout = {
  // backgroundColor: "white",
  height: "10rem",
  borderRadius: "0.5rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "darkslategray",
};

const secondLayout = {
  backgroundColor: "white",
  height: "20rem",
  borderRadius: "0.5rem",
  display: "flex",
  justifyContent: "space-between",
  p: 1,
  alignItems: "center",
};

const numberContainer = {
  boxShadow: "inset 0 0 5px rgba(0,0,0, 0.3)",
  width: "100px",
  textAlign: "center",
  p: 1,
  borderRadius: "0.25rem",
};

const customStyles = {
  head: {
    style: {
      fontSize: "1rem",
      fontWeight: "600",
      color: "#201D1D",
    },
  },
};

function SAdminDashboard() {
  const dispatch = useDispatch()
  const questions = useSelector(selectQuestion);
  const staff = useSelector(selectStaff);
  const students = useSelector(selectStudents);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchQuestions())
    dispatch(fetchStudents())
  }, [dispatch])

  const studentsAndStaff = [...staff, ...students];

  const searchRes = studentsAndStaff.filter((item) => {
    return item.firstname.toLowerCase().includes(search.toLowerCase());
  });

  const quiz = questions.filter((q) => {
    return q.category.name === "Quiz";
  });

  const exam = questions.filter((q) => {
    return q.category.name === "Exam";
  });

  const examPercentage = (exam.length / questions.length) * 100;

  const LineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Best Performance",
        data: [1, 15, 30, 15, 40, 70],
        backgroundColor: (context) => {
          const bgColor = ["rgba(131,234,248,1)", "rgba(217,217,217,0)"];
          if (!context.chart.chartArea) {
            return;
          }
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
          gradientBg.addColorStop(1, bgColor[1]);
          gradientBg.addColorStop(0.5, bgColor[0]);
          return gradientBg;
        },
        borderColor: "#2F95CE",
        pointBorderColor: "#fff",
        pointBorderWidth: 4,
        tension: 0,
        fill: true,
      },
      {
        label: "Worst Performance",
        data: [15, 25, 40, 35, 45, 55].reverse(),
        backgroundColor: (context) => {
          const bgColor = ["rgba(255, 128, 128, 1)", "rgba(255, 128, 128, 0)"];
          if (!context.chart.chartArea) {
            return;
          }
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
          gradientBg.addColorStop(1, bgColor[1]);
          gradientBg.addColorStop(0.5, bgColor[0]);
          return gradientBg;
        },
        borderColor: "#ff0000",
        pointBorderColor: "#fff",
        pointBorderWidth: 4,
        tension: 0,
        fill: true,
      },
    ],
  };
  const options = {
    plugins: {
      legend: true,
      tooltip: true,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: (value) => value + "%",
        },
      },
    },
    elements: {
      line: {
        fill: true,
      },
    },
  };

  const questionColumn = [
    {
      name: "Role",
      selector: (row) => {
        return row.role === 3921 ? "Staff" : "Student";
      },
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "",
      selector: (row) => {
        return (
          <>
            <button
              style={{
                borderRadius: "0.3125rem",
                backgroundColor: "red",
                color: "white",
                fontWeight: "600",
                height: "1.625rem",
                width: "4.1875rem",
                outline: "none",
                border: "none",
                cursor: "pointer",
                marginRight: "10px",
              }}
              onClick={() => handleDelete(row.role, row.id)}
            >
              Delete
            </button>
            <button
              style={{
                borderRadius: "0.3125rem",
                backgroundColor: "#4CDA35",
                color: "white",
                fontWeight: "600",
                height: "1.625rem",
                width: "4.1875rem",
                outline: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => row.questionId}
            >
              Edit
            </button>
          </>
        );
      },
    },
  ];

  const data = search === "" ? studentsAndStaff.sort((a, b)=> a.firstname.localeCompare(b.firstname)).map((item) => ({
    role: item.role,
    name: `${item.firstname} ${item.middlename || ""} ${item.lastname}`,
    id: item.id
  })) : searchRes.map((item) => ({
    role: item.role,
    name: `${item.firstname} ${item.middlename || ""} ${item.lastname}`,
    id: item.id
  }));

  const handleDelete = async(role, id) => {
    if (role === 3921) {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        await axios.delete(`${apiUrl}/staffs/${id}`)
        dispatch(removeStaff(id))
      } catch (error) {
        console.error("Deletion error", error)
      }
    }
  }

  return (
    <Box m={2}>
      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(auto-fit,minmax(150px, 1fr))"}
        gap={2}
        mb={2}
      >
        <Box
          sx={firstLayout}
          border="2px solid red"
          bgcolor="rgba(255,128,128,0.8)"
        >
          <h3 style={{ fontSize: "3rem", margin: 0 }}>{staff.length}</h3>
          <p style={{ margin: 0 }}>Total Staff</p>
        </Box>
        <Box
          sx={firstLayout}
          border="2px solid green"
          bgcolor="rgba(144, 238, 144, 0.6)"
        >
          <h3 style={{ fontSize: "3rem", margin: 0 }}>{students.length}</h3>
          <p style={{ margin: 0 }}>Total Students</p>
        </Box>
        <Box
          sx={firstLayout}
          border="2px solid #2F95CE"
          bgcolor="rgba(131,234,248,0.6)"
        >
          <h3 style={{ fontSize: "3rem", margin: 0 }}>{questions.length}</h3>
          <p style={{ margin: 0 }}>Total Questions</p>
        </Box>
      </Box>
      <Box display={"grid"} gridTemplateColumns={"1.5fr 1fr"} gap={2} mb={2}>
        <Box sx={secondLayout}>
          <Line data={LineChartData} options={options} />
        </Box>
        <Box sx={secondLayout} flexDirection="column">
          <Box
            bgcolor={"lightblue"}
            borderRadius={"0.25rem"}
            p={1}
            fontWeight={"600"}
            fontSize={"15px"}
            px={5}
            color="darkslategray"
          >
            Question Category
          </Box>
          <CircularProgressBar value={examPercentage || 0} />
          <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} gap={2}>
            <Box>
              <Box display="flex" alignItems="center">
                <CircleIcon
                  sx={{
                    width: "10px !important",
                    height: "10px !important",
                    color: "#00B1C9",
                  }}
                />
                <p style={{ margin: 0, fontFamily: "Acme", fontSize: "14px" }}>
                  Exam
                </p>
              </Box>
              <Box sx={numberContainer}>
                {exam.length} of {questions.length}
              </Box>
            </Box>
            <Box>
              <Box display="flex" alignItems="center">
                <CircleIcon
                  sx={{
                    width: "10px !important",
                    height: "10px !important",
                    color: "#E46E00",
                  }}
                />
                <p style={{ margin: 0, fontFamily: "Acme", fontSize: "14px" }}>
                  Quiz
                </p>
              </Box>
              <Box sx={numberContainer}>
                {quiz.length} of {questions.length}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        bgcolor="white"
        height="25rem"
        borderRadius="0.5rem"
        p="5px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        overflow="hidden"
      >
        <Box display="flex" justifyContent="center">
          <Box
            sx={{
              padding: "10px",
              display: "flex",
              alignSelf: "center",
              width: "20rem",
              borderRadius: "5px",
              height: "22px",
              color: "gray",
              backgroundColor: "#d9d9d9",
              mb: "5px",
            }}
          >
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                background: "none",
                width: "100%",
              }}
            />
          </Box>
        </Box>
        <Box
          bgcolor="#eef3f8"
          height="calc(100% - 20px)"
          borderRadius="0.25rem"
          p="5px"
          sx={{overflowY:"scroll"}}
        >
          <DataTable
            columns={questionColumn}
            data={data}
            responsive
            pagination
            selectableRows
            fixedHeader
            highlightOnHover
            customStyles={customStyles}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default SAdminDashboard;
