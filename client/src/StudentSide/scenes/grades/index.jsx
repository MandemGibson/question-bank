import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

const boxStyle = {
  backgroundColor: "white",
  flexShrink: 0,
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  borderRadius: "0.625rem",
};

function Grades() {
  const user = useSelector(selectUser);
  const [grade, setGrade] = useState("");
  const [average, setAverage] = useState(0);
  const [remarks, setRemarks] = useState("");

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
  const data = [];
  const labels = [];
  user.user.Results.forEach((res) => {
    const date = new Date(res.createdAt);
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const time = date
      .toLocaleTimeString("en-US", { hour12: true })
      .split(" ")[0];
    const label = `${month} ${year} ${time}`;
    labels.push(label);

    data.push(res.result);
  });

  useEffect(() => {
    const calculateAverageAndGrade = () => {
      const sumOnDate = user.user.Results.reduce(
        (acc, result) => acc + result.result,
        0
      );
      const average = sumOnDate / user.user.Results.length;

      let grades;
      let remarks;

      switch (true) {
        case average >= 95:
          grades = "A+";
          remarks =
            "Congratulations on your outstanding performance! Your consistent excellence sets you apart.";
          break;
        case average >= 90:
          grades = "A";
          remarks =
            "Great job! Your hard work and dedication are evident in your consistently high performance.";
          break;
        case average >= 85:
          grades = "B+";
          remarks =
            "Well done! Your good performance reflects your strong effort and understanding of the material.";
          break;
        case average >= 80:
          grades = "B";
          remarks =
            "Well done! Your good performance reflects your strong effort and understanding of the material.";
          break;
        case average >= 75:
          grades = "C+";
          remarks =
            "Keep it up! Your performance is satisfactory, and there is potential for further improvement.";
          break;
        case average >= 70:
          grades = "C-";
          remarks =
            "Keep it up! Your performance is satisfactory, and there is potential for further improvement.";
          break;
        case average >= 65:
          grades = "D+";
          remarks =
            "There is room for improvement. Consider focusing on areas where you can enhance your understanding.";
          break;
        case average >= 60:
          grades = "D";
          remarks =
            "There is room for improvement. Consider focusing on areas where you can enhance your understanding.";
          break;
        case average >= 55:
          grades = "E";
          remarks =
            "Your performance is below average. It's essential to review and address areas that need improvement.";
          break;
        case average >= 50:
          grades = "F";
          remarks =
            "Your performance is below average. It's essential to review and address areas that need improvement.";
          break;
        default:
          grades = "F";
          remarks =
            "Your performance is below average. It's essential to review and address areas that need improvement.";
          break;
      }

      setAverage(average);
      setRemarks(remarks);
      setGrade(grades);
    };

    calculateAverageAndGrade();
  }, [user.user.Results, setAverage, grade]);

  const LineChartData = {
    labels: labels,
    datasets: [
      {
        label: "My Performance",
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

  const [text] = useTypewriter({
    words: [remarks],
    loop: {},
  });

  return (
    <Box display="flex" flexDirection="column" margin="20px">
      <Box display="flex" justifyContent="space-between" mb="40px">
        <Box sx={boxStyle} height="16rem" width="32rem" flex="1" mr="10px">
          <p style={{ margin: "10px", color: "#6b6a6a", marginBottom: "10px" }}>
            My Cumulative Average
          </p>
          <Box textAlign="center" width="100%">
            <p style={{ margin: "0px", fontSize: "8rem", color: "#1494A6" }}>
              {Math.round(average) + "%"}
            </p>
          </Box>
        </Box>
        <Box sx={boxStyle} height="16rem" width="32rem" flex="1" ml="10px">
          <p style={{ margin: "10px", color: "#6b6a6a", marginBottom: "10px" }}>
            My Average Grade
          </p>
          <Box textAlign="center" width="100%">
            <p style={{ margin: "0px", fontSize: "8rem", color: "#1494A6" }}>
              {grade}
            </p>
          </Box>
        </Box>
      </Box>
      <Box p={2} sx={boxStyle} mb="40px">
        <p style={{ margin: "0px", fontFamily: "Rubik", fontWeight: "bold" }}>
          Remark: <span style={{ fontWeight: "normal" }}>{text}</span>
          <Cursor />
        </p>
      </Box>
      <Box sx={boxStyle}>
        <Box p={2}>
          <p style={{ margin: "0px", color: "#6b6a6a", marginBottom: "10px" }}>
            My Performance
          </p>
          <Box width="100%" alignSelf="center" height="100%">
            <Line data={LineChartData} options={options} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Grades;
