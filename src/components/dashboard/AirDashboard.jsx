import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { Scatter, Bar, Line, Pie, Radar, Doughnut } from "react-chartjs-2";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { useSelector } from "react-redux";
import { useGetSensorsQuery } from "../../redux/rtk/userData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

const AirDashboard = () => {
  const isMobile = window.innerWidth < 700;
  const token = useSelector((state) => state.userData.token);
  const { data } = useGetSensorsQuery(token);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (data) {
      console.log("Fetched sensor data:", data);
      setSensorsData(data);
    }
  }, [data]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [menuState, setMenuState] = useState({
    anchorEl: null,
    classAnchorEl: null,
    selectedBuilding: "",
    selectedClass: "",
  });

  const handleMenuOpen = (event, menuType) => {
    setMenuState((prevState) => ({
      ...prevState,
      [menuType]: event.currentTarget,
    }));
  };

  const handleMenuClose = (menuType, value) => {
    setMenuState((prevState) => ({
      ...prevState,
      [menuType]: null,
      ...(value && menuType === "anchorEl" ? { selectedBuilding: value } : {}),
      ...(value && menuType === "classAnchorEl"
        ? { selectedClass: value }
        : {}),
    }));
  };

  const initialCardData = [
    {
      title: "Temperature",
      valData: "",
      valDate: "",
      valLoc: "",
      bgColor: "#4caf50",
    },
    {
      title: "Humidity",
      valData: "",
      valDate: "",
      valLoc: "",
      bgColor: "#87A2FF",
    },
    {
      title: "CO2",
      valData: "",
      valDate: "",
      valLoc: "",
      bgColor: "#629584",
    },
    {
      title: "Pressure",
      valData: "",
      valDate: "",
      valLoc: "",
      bgColor: "#08C2FF",
    },
  ];

  const [sensorsData, setSensorsData] = useState([]);
  const [cardData, setCardData] = useState(initialCardData);
  const handleDisplayDataClick = () => {
    const selectedClass = `${menuState.selectedClass || "None"}_${menuState.selectedBuilding || "None"}`;

    const selectedClassSensors = sensorsData.filter((sens) =>
      sens.location.room.includes(selectedClass)
    );

    //console.log(selectedClassSensors);
    if (selectedClassSensors.length === 0) {
      setAlertMessage(
        `There are no sensors in this class. Please choose another one.`
      );
      setShowAlert(true);
      return;
    } else {
      setAlertMessage(`Data updated`);
      setShowAlert(true);
    }

    const tempSensors = selectedClassSensors.filter((sens) =>
      sens.type.includes("Temperature")
    );
    const humiditySensors = selectedClassSensors.filter((sens) =>
      sens.type.includes("Humidity")
    );
    const co2Sensors = selectedClassSensors.filter((sens) =>
      sens.type.includes("CO2")
    );
    const pressurSensors = selectedClassSensors.filter((sens) =>
      sens.type.includes("Pressure")
    );

    // Update each card with a unique value based on the selected format
    const updatedCardData = cardData.map((card, index) => {
      let newValData;
      let newValDate;
      let newValLoc;
      switch (index) {
        case 0:
          if (tempSensors.length === 0) {
            newValData = `There is no temperature sensor in this class`;
          } else {
            tempSensors.forEach((sensor, index) => {
              const temperatureIndex = sensor.type.indexOf("Temperature");
              // Get the latest data entry (last element in sensors_data array)
              const latestData =
                sensor.sensors_data[sensor.sensors_data.length - 1];
              const temperatureValue = latestData.data[temperatureIndex];

              const date = new Date(latestData.last_update);
              // Extract the parts and format them
              const formattedDate = `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}, ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
              const locatedAt = sensor.location.room[1];
              newValData = `${temperatureValue}`;
              newValDate = `Last Update: ${formattedDate}`;
              newValLoc = `Located at: ${locatedAt}`;
            });
          }
          break;
        case 1:
          if (humiditySensors.length === 0) {
            newValData = `There is no humidity sensor in this class`;
          } else {
            humiditySensors.forEach((sensor, index) => {
              const humidityIndex = sensor.type.indexOf("Humidity");
              // Get the latest data entry (last element in sensors_data array)
              const latestData =
                sensor.sensors_data[sensor.sensors_data.length - 1];
              const humidityValue = latestData.data[humidityIndex];

              const date = new Date(latestData.last_update);
              // Extract the parts and format them
              const formattedDate = `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}, ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
              const locatedAt = sensor.location.room[1];
              newValData = `${humidityValue}`;
              newValDate = `Last Update: ${formattedDate}`;
              newValLoc = `Located at: ${locatedAt}`;
            });
          }
          break;
        case 2:
          if (co2Sensors.length === 0) {
            newValData = `There is no humidity sensor in this class`;
          } else {
            co2Sensors.forEach((sensor, index) => {
              const co2Index = sensor.type.indexOf("CO2");
              // Get the latest data entry (last element in sensors_data array)
              const latestData =
                sensor.sensors_data[sensor.sensors_data.length - 1];
              const co2Value = latestData.data[co2Index];
              const date = new Date(latestData.last_update);
              // Extract the parts and format them
              const formattedDate = `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}, ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
              const locatedAt = sensor.location.room[1];
              newValData = `${co2Value}`;
              newValDate = `Last Update: ${formattedDate}`;
              newValLoc = `Located at: ${locatedAt}`;
            });
          }
          break;
        case 3:
          if (pressurSensors.length === 0) {
            newValData = `There is no humidity sensor in this class`;
          } else {
            pressurSensors.forEach((sensor, index) => {
              const pressurIndex = sensor.type.indexOf("Pressur");
              // Get the latest data entry (last element in sensors_data array)
              const latestData =
                sensor.sensors_data[sensor.sensors_data.length - 1];
              const pressurValue = latestData.data[pressurIndex];
              const date = new Date(latestData.last_update);
              // Extract the parts and format them
              const formattedDate = `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}, ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
              const locatedAt = sensor.location.room[1];
              newValData = `${pressurValue}`;
              newValDate = `Last Update: ${formattedDate}`;
              newValLoc = `Located at: ${locatedAt}`;
            });
          }
          break;
        default:
          newValData = "N/A";
      }

      return {
        ...card,
        valData: newValData,
        valDate: newValDate,
        valLoc: newValLoc,
      };
    });

    setCardData(updatedCardData);
  };

  const buildingsData = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const classesData = [
    "100",
    "101",
    "102",
    "103",
    "104",
    "105",
    "106",
    "107",
    "108",
    "109",
    "110",
    "111",
    "112",
    "200",
    "201",
    "202",
    "203",
    "204",
    "205",
    "206",
    "207",
    "208",
    "209",
    "210",
    "211",
    "212",
    "300",
    "301",
    "302",
    "303",
    "304",
    "305",
    "306",
    "307",
    "308",
    "309",
    "310",
    "311",
    "312",
  ];

  const hoursForTemp = Array.from({ length: 24 }, (_, i) => i); // [0, 1, 2, ..., 23]
  const valuesForTemp = [
    15, 13, 12, 16, 22, 26, 24, 20, 17, 18, 19, 21, 23, 24, 25, 26, 24, 22, 20,
    18, 17, 16, 15, 14,
  ];

  // Prepare data for the chart
  const chartDataForTemp = {
    labels: hoursForTemp.map((hour) => `${hour}:00`), // X-axis labels as hours of the day
    datasets: [
      {
        label: "Temperature Status",
        data: valuesForTemp,
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderColor: "#4caf50",
        borderWidth: 1,
        tension: 0.3, // Adds a smooth curve to the line
      },
    ],
  };

  const optionsForTemp = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Hour of Day",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        ticks: {
          stepSize: 5,
          max: 50,
          min: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}°C`,
        },
      },
    },
  };

  const hoursForHumid = Array.from({ length: 24 }, (_, i) => i); // [0, 1, 2, ..., 23]
  const valuesForHumid = [
    40, 30, 45, 50, 60, 62, 70, 53, 48, 41, 38, 30, 45, 57, 53, 64, 61, 74, 80,
    72, 61, 68, 56, 63,
  ];

  // Prepare data for the chart
  const chartDataForHumid = {
    labels: hoursForHumid.map((hour) => `${hour}:00`), // X-axis labels as hours of the day
    datasets: [
      {
        label: "Humidity Status",
        data: valuesForHumid,
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderColor: "#87A2FF",
        borderWidth: 1,
        tension: 0.3, // Adds a smooth curve to the line
      },
    ],
  };

  const optionsForHumid = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Hour of Day",
        },
      },
      y: {
        title: {
          display: true,
          text: "Humidity (%) ",
        },
        ticks: {
          stepSize: 10,
          max: 100,
          min: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}%`,
        },
      },
    },
  };

  const hoursForCO2 = Array.from({ length: 24 }, (_, i) => i); // [0, 1, 2, ..., 23]
  const valuesForCO2 = [
    1667, 1769, 545, 730, 991, 708, 1858, 1189, 884, 1081, 638, 853, 1398, 654,
    576, 1546, 979, 1926, 928, 1147, 1944, 402, 702, 1538,
  ];

  // Prepare data for the chart
  const chartDataForCO2 = {
    labels: hoursForCO2.map((hour) => `${hour}:00`), // X-axis labels as hours of the day
    datasets: [
      {
        label: "CO2 Status",
        data: valuesForCO2,
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderColor: "#629584",
        borderWidth: 1,
        tension: 0.3, // Adds a smooth curve to the line
      },
    ],
  };

  const optionsForCO2 = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Hour of Day",
        },
      },
      y: {
        title: {
          display: true,
          text: "CO2 (ppm)",
        },
        ticks: {
          stepSize: 100,
          max: 2000,
          min: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}pcc`,
        },
      },
    },
  };

  const hoursForPressure = Array.from({ length: 24 }, (_, i) => i); // [0, 1, 2, ..., 23]
  const valuesForPressure = [
    83564, 93522, 17364, 76697, 2032, 40089, 15238, 9784, 60295, 37636, 89769,
    17778, 6931, 43343, 67321, 26543, 88663, 91172, 73532, 8363, 73621, 12973,
    73645, 33423,
  ];

  // Prepare data for the chart
  const chartDataForPressure = {
    labels: hoursForPressure.map((hour) => `${hour}:00`), // X-axis labels as hours of the day
    datasets: [
      {
        label: "Pressure Status",
        data: valuesForPressure,
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderColor: "#08C2FF",
        borderWidth: 1,
        tension: 0.3, // Adds a smooth curve to the line
      },
    ],
  };

  const optionsForPressure = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Hour of Day",
        },
      },
      y: {
        title: {
          display: true,
          text: "Pressure (pa)",
        },
        ticks: {
          stepSize: 10000,
          max: 100000,
          min: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}pa`,
        },
      },
    },
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            mb: 4,
            padding: "25px 1px",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #3f51b5, #21CBF3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "fadeIn 2s ease-in-out",
          }}
        >
          Air Dashboard
        </Typography>

        <Box>
          <Tooltip title="Select a building" arrow>
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginRight: 2,
                backgroundColor: "#0288d1",
                "&:hover": { backgroundColor: "#01579b" },
              }}
              onClick={(e) => handleMenuOpen(e, "anchorEl")}
            >
              Building
            </Button>
          </Tooltip>
          <Menu
            anchorEl={menuState.anchorEl}
            open={Boolean(menuState.anchorEl)}
            onClose={() => handleMenuClose("anchorEl")}
          >
            {buildingsData.map((building) => (
              <MenuItem
                key={building}
                onClick={() => handleMenuClose("anchorEl", building)}
              >
                {building}
              </MenuItem>
            ))}
          </Menu>

          <Tooltip title="Select a class" arrow>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                marginRight: 2,
                backgroundColor: "#7b1fa2",
                "&:hover": { backgroundColor: "#4a148c" },
              }}
              onClick={(e) => handleMenuOpen(e, "classAnchorEl")}
            >
              Class
            </Button>
          </Tooltip>
          <Menu
            anchorEl={menuState.classAnchorEl}
            open={Boolean(menuState.classAnchorEl)}
            onClose={() => handleMenuClose("classAnchorEl")}
          >
            {classesData.map((className) => (
              <MenuItem
                key={className}
                onClick={() => handleMenuClose("classAnchorEl", className)}
              >
                {className}
              </MenuItem>
            ))}
          </Menu>

          <Tooltip title="Click to display data" arrow>
            <Button
              variant="outlined"
              color="info"
              onClick={handleDisplayDataClick}
            >
              {`Selected: ${menuState.selectedBuilding || "None"}, ${menuState.selectedClass || "None"}`}
            </Button>
          </Tooltip>
        </Box>
      </Box>
      <Snackbar
        open={showAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Bottom center position
        sx={{ marginBottom: "500px" }} // Adjusts distance from the bottom
      >
        <Alert
          onClose={handleCloseAlert}
          severity="info"
          sx={{ width: "100%", backgroundColor: "#2A3663", color: "white" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mt: 2,
          color: "text.secondary",
          padding: "10px 1px",
          fontWeight: "medium",
          background: "linear-gradient(90deg, #3f51b5, #21CBF3)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: 0.8,
          animation: "fadeIn 3s ease-in-out",
        }}
      >
        {menuState.selectedBuilding === "" ? "Please choose building " : null}
        <br></br>
        {menuState.selectedClass === "" ? "Please choose class" : null}
      </Typography>

      <Grid container spacing={4} sx={{ width: "100%", mb: 4 }}>
        {cardData.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: card.bgColor,
                borderRadius: "12px",
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <LightbulbIcon
                  sx={{ fontSize: 40, color: "white", marginRight: 2 }}
                />
                <Typography variant="h5" sx={{ color: "white" }}>
                  {card.title}
                </Typography>
              </CardContent>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" sx={{ color: "white" }}>
                  {card.valData}
                  <br></br>
                  {card.valDate}
                  <br></br>
                  {card.valLoc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Grid for Charts */}
      <Grid container spacing={4} sx={{ width: "100%" }}>
        {/* Left side (Movement Status graph) */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              boxShadow: 4,
              borderRadius: 3,
              height: "400px",
              backgroundColor: "#f5f7fa",
              transition: "box-shadow 0.3s ease",
              "&:hover": { boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)" },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#3f51b5" }}
            >
              Temperature Status Throughout the Day
            </Typography>
            <Box sx={{ height: "100%" }}>
              <Line data={chartDataForTemp} options={optionsForTemp} />
            </Box>
          </Paper>
        </Grid>

        {/* Right side (Light Status graph) */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              boxShadow: 4,
              borderRadius: 3,
              height: "400px",
              backgroundColor: "#f5f7fa",
              transition: "box-shadow 0.3s ease",
              "&:hover": { boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)" },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#3f51b5" }}
            >
              Humidity Status Throughout the Day
            </Typography>
            <Box sx={{ height: "100%" }}>
              <Line data={chartDataForHumid} options={optionsForHumid} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              boxShadow: 4,
              borderRadius: 3,
              height: "400px",
              backgroundColor: "#f5f7fa",
              transition: "box-shadow 0.3s ease",
              "&:hover": { boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)" },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#3f51b5" }}
            >
              CO2 Status Throughout the Day
            </Typography>
            <Box sx={{ height: "100%" }}>
              <Line data={chartDataForCO2} options={optionsForCO2} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              boxShadow: 4,
              borderRadius: 3,
              height: "400px",
              backgroundColor: "#f5f7fa",
              transition: "box-shadow 0.3s ease",
              "&:hover": { boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)" },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#3f51b5" }}
            >
              Pressure Status Throughout the Day
            </Typography>
            <Box sx={{ height: "100%" }}>
              <Line data={chartDataForPressure} options={optionsForPressure} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Material Design Back to Main Page Button */}
      <Box sx={{ display: "flex", justifyContent: "right", marginTop: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ padding: "10px 20px", borderRadius: 2 }}
          onClick={() => (window.location.href = "/")}
        >
          {isMobile ? "Main" : "Back to Main Page"}
        </Button>
      </Box>
    </Box>
  );
};

export default AirDashboard;
