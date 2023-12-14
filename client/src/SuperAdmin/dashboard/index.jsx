import { Box } from "@mui/material";
import React from "react";
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
  Legend
} from "chart.js";
import CircularProgressBar from "../../components/CircularProgress";

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
};

const secondLayout = {
  backgroundColor: "white",
  height: "20rem",
  borderRadius: "0.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function SAdminDashboard() {
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
          display: false,
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
          bgcolor="rgba(255,128,128,0.6)"
        >
          <h3 style={{ fontSize: "3rem", margin: 0 }}>1000</h3>
          <p style={{margin:0}}>Total Registered</p>
        </Box>
        <Box
          sx={firstLayout}
          border="2px solid green"
          bgcolor="rgba(144, 238, 144, 0.6)"
        >
          <h3 style={{ fontSize: "3rem", margin: 0 }}>1000</h3>
          <p style={{margin:0}}>Total Registered</p>
        </Box>
        <Box
          sx={firstLayout}
          border="2px solid #2F95CE"
          bgcolor="rgba(131,234,248,0.6)"
        >
          <h3 style={{ fontSize: "3rem", margin: 0 }}>1000</h3>
          <p style={{margin:0}}>Total Registered</p>
        </Box>
      </Box>
      <Box display={"grid"} gridTemplateColumns={"1.5fr 1fr"} gap={2} mb={2}>
        <Box sx={secondLayout}>
          <Line data={LineChartData} options={options} />
        </Box>
        <Box sx={secondLayout}>
          <CircularProgressBar value={46} />
        </Box>
      </Box>
      <Box bgcolor="white" height="25rem" borderRadius="0.5rem"></Box>
    </Box>
  );
}

export default SAdminDashboard;
