import { Box, IconButton } from "@mui/material";
import React, { useMemo } from "react";
import { MoreVert } from "@mui/icons-material";
import CircularProgressBar from "../../components/CircularProgress";
import CircleIcon from "@mui/icons-material/Circle";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { selectResults } from "../../features/resultSlice";
import { selectStudents } from "../../features/studentSlice";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

const boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";

function Statistics() {
  const user = useSelector(selectUser);
  const result = useSelector(selectResults);
  const students = useSelector(selectStudents)

  const value = 0;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const staffLevels = useMemo(() => {
    return user?.user.level.map((level) => level.name) || [];
  }, [user]);

  const filteredResult = result.filter((student) => {
    const studentLevelName = student.student.level.name;
    return staffLevels.includes(studentLevelName);
  });

  const labels = [];
  const data = [];

  filteredResult.forEach((res) => {
    const date = new Date(res.createdAt);
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const time = date
      .toLocaleTimeString("en-US", { hour12: true })
      .split(" ")[0];
    const label = `${month} ${year} ${time}`;
    labels.push(label);

    const studentsOnDate = filteredResult.filter(
      (student) =>
        new Date(student.createdAt).toDateString() === date.toDateString()
    );

    const sumOnDate = studentsOnDate.reduce(
      (acc, result) => acc + result.result,
      0
    );
    const averageOnDate = sumOnDate / studentsOnDate.length;

    data.push(averageOnDate);
  });

  const filteredStudents = students.filter((student) => {
    const studentLevelName = student.level.name;
    return staffLevels.includes(studentLevelName);
  });
  console.log(filteredStudents);

  labels.sort((a, b) => new Date(a) - new Date(b));
  data.sort((a, b) => new Date(a) - new Date(b));

  const LineChartData = {
    labels: labels,
    datasets: [
      {
        label: "Class Performance",
        data: data,
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
        tension: 0.4,
        fill: true,
      },
    ],
  };
  const options = {
    plugins: {
      legend: false,
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
          display: false,
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
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

  const recordedGrade = [];

  const BarChartData = {
    labels: ["A+", "A", "B+", "B", "C+", "C-", "D+", "D", "E", "F"],
    datasets: [
      {
        data: recordedGrade,
        backgroundColor: "#00B1C9",
      },
    ],
  };
  return (
    <Box display="flex" flexDirection="column" margin="20px">
      <Box display="flex" justifyContent="space-between">
        <Box
          bgcolor="white"
          height="16rem"
          width="18rem"
          mr="20px"
          borderRadius="0.625rem"
          boxShadow={boxShadow}
          padding="5px"
          display="flex"
          flexDirection="column"
        >
          <Box display="flex" justifyContent="space-between">
            <p style={{ margin: "0px", color: "#6b6a6a" }}>Attendance</p>
            <select
              style={{
                border: "none",
                backgroundColor: "#d9d9d9",
                borderRadius: "0.45rem",
                color: "#6b6a6a",
                width: "min-content",
                fontFamily: "Allerta",
                padding: "5px",
                outline: "none",
              }}
            >
              <option>My class</option>
              {user.user.level.map((level) => {
                return <option key={level.id}>{level.name}</option>;
              })}
            </select>
          </Box>
          <Box
            alignSelf="center"
            justifySelf="center"
            pt="20px"
            fontFamily="Rubik"
            fontWeight="600"
          >
            <CircularProgressBar value={value} />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" flexDirection="column">
              <Box display="flex" alignItems="center">
                <CircleIcon
                  sx={{
                    width: "20px !important",
                    height: "20px !important",
                    color: "#00B1C9",
                  }}
                />
                <p style={{ margin: "0px", color: "#6b6a6a" }}>Present</p>
              </Box>
              <Box display="flex" alignItems="center">
                <CircleIcon
                  sx={{
                    width: "20px !important",
                    height: "20px !important",
                    color: "#E46E00",
                  }}
                />
                <p style={{ margin: "0px", color: "#6b6a6a" }}>Absent</p>
              </Box>
            </Box>
            <Box>
              <p style={{ margin: "0px", color: "#6b6a6a" }}>
                Total: {filteredStudents.length}
              </p>
            </Box>
          </Box>
        </Box>
        <Box
          bgcolor="white"
          height="16rem"
          width="24rem"
          mr="20px"
          borderRadius="0.625rem"
          boxShadow={boxShadow}
          padding="5px"
          display="flex"
          flexDirection="column"
        >
          <Box display="flex" justifyContent="space-between">
            <p style={{ margin: "0px", color: "#6b6a6a" }}>Recorded Grades</p>
            <select
              style={{
                border: "none",
                backgroundColor: "#d9d9d9",
                borderRadius: "0.45rem",
                color: "#6b6a6a",
                width: "min-content",
                fontFamily: "Allerta",
                padding: "5px",
                outline: "none",
              }}
            >
              <option>My class</option>
              {user.user.level.map((level) => {
                return <option key={level.id}>{level.name}</option>;
              })}
            </select>
          </Box>
          <Box>
            <Bar data={BarChartData} options={options}></Bar>
          </Box>
        </Box>
        <Box
          bgcolor="white"
          height="16rem"
          width="18rem"
          mr="20px"
          borderRadius="0.625rem"
          boxShadow={boxShadow}
          padding="5px"
          display="flex"
          flexDirection="column"
        >
          <Box display="flex" justifyContent="space-between">
            <p style={{ margin: "0px", color: "#6b6a6a" }}>Flagged Questions</p>
            <IconButton>
              <MoreVert style={{ color: "#6b6a6a" }} />
            </IconButton>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60%">
            <p style={{margin: 0, color:"#83eaf8"}}>No question flagged yet</p>
          </Box>
        </Box>
      </Box>
      <Box
        bgcolor="#fff"
        boxShadow={boxShadow}
        mt="30px"
        borderRadius="0.625rem"
        width="63.5%"
        p="20px"
      >
        <Box display="flex" justifyContent="space-between">
          <p style={{ margin: "0px", color: "#6b6a6a" }}>Student Performance</p>
          <select
            style={{
              border: "none",
              backgroundColor: "#d9d9d9",
              borderRadius: "0.45rem",
              color: "#6b6a6a",
              width: "min-content",
              fontFamily: "Allerta",
              padding: "5px",
              outline: "none",
            }}
          >
            <option>Last week</option>
            <option>Last month</option>
            <option>Last year</option>
          </select>
        </Box>
        <Box width="100%" height="100%" alignSelf="center">
          <Line data={LineChartData} options={options}></Line>
        </Box>
      </Box>
    </Box>
  );
}

export default Statistics;
