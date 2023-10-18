import { Box } from "@mui/material";
import React from "react";
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
  const LineChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "My Performance",
        data: [50, 60, 70, 63, 40, 55, 80, 85, 70, 67, 81, 90],
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
    words: [
      "Your performance is satisfactory, with room for improvement in future assessments.",
    ],
    loop: {},
  });

  return (
    <Box display="flex" flexDirection="column" margin="20px">
      <Box display="flex" justifyContent="space-between" mb="40px">
        <Box sx={boxStyle} height="16rem" width="32rem" flex="1" mr="10px">
          <p style={{ margin: "10px", color: "#6b6a6a", marginBottom: "10px" }}>
            My Average Grade
          </p>
          <Box textAlign="center" width="100%">
            <p style={{ margin: "0px", fontSize: "8rem", color: "#1494A6" }}>
              C
            </p>
          </Box>
        </Box>
        <Box sx={boxStyle} height="16rem" width="32rem" flex="1" ml="10px">
          <p style={{ margin: "10px", color: "#6b6a6a", marginBottom: "10px" }}>
            My Rank
          </p>
          <Box textAlign="center" width="100%">
            <p style={{ margin: "0px", fontSize: "8rem", color: "#1494A6" }}>
              3
              <span style={{ fontSize: "4rem", verticalAlign: "super" }}>
                rd
              </span>
            </p>
          </Box>
        </Box>
      </Box>
      <Box p={2} sx={boxStyle} mb="40px">
        <p style={{ margin: "0px", fontFamily: "Rubik", fontWeight: "bold" }}>
          Remark:{" "} <span style={{fontWeight:"normal"}}>{text}</span>
           <Cursor/>
        </p>
      </Box>
      <Box sx={boxStyle}>
        <Box p={2} >
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
