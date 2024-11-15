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

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

const PowerDashboard = () => {
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
      title: "Light",
      valData: "",
      valDate: "",
      valLoc: "",
      bgColor: "#87A2FF",
    },
    {
      title: "Movment",
      valData: "",
      valDate: "",
      valLoc: "",
      bgColor: "#629584",
    },
    {
      title: "Air condition on/off",
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

    const LightSensors = selectedClassSensors.filter((sens) =>
      sens.type.includes("Light")
    );
    const MovementSensors = selectedClassSensors.filter((sens) =>
      sens.type.includes("Movement")
    );
    const ACSensors = selectedClassSensors.filter((sens) =>
      sens.type.includes("AC")
    );

    // Update each card with a unique value based on the selected format
    const updatedCardData = cardData.map((card, index) => {
      let newValData;
      let newValDate;
      let newValLoc;
      switch (index) {
        case 0:
          if (LightSensors.length === 0) {
            newValData = `There is no Light sensors in this class`;
          } else {
            LightSensors.forEach((sensor, index) => {
              const LightIndex = sensor.type.indexOf("Light");
              // Get the latest data entry (last element in sensors_data array)
              const latestData =
                sensor.sensors_data[sensor.sensors_data.length - 1];
              const LightValue = latestData.data[LightIndex];

              const date = new Date(latestData.last_update);
              // Extract the parts and format them
              const formattedDate = `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}, ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
              const locatedAt = sensor.location.room[1];
              console.log(sensor.sensors_data.id);
              if (LightValue == "true") {
                newValData = `ON`;
              } else {
                newValData = `OFF`;
              }
              newValDate = `Last Update: ${formattedDate}`;
              newValLoc = `Located at: ${locatedAt}`;
            });
          }
          break;
        case 1:
          if (MovementSensors.length == 0) {
            newValData = `There is no Movement sensors in this class`;
          } else {
            MovementSensors.forEach((sensor, index) => {
              const MovementIndex = sensor.type.indexOf("Movement");
              // Get the latest data entry (last element in sensors_data array)
              const latestData =
                sensor.sensors_data[sensor.sensors_data.length - 1];
              const MovmentValue = latestData.data[MovementIndex];

              const date = new Date(latestData.last_update);
              // Extract the parts and format them
              const formattedDate = `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}, ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
              const locatedAt = sensor.location.room[1];

              newValData = MovmentValue;
              newValDate = `Last Update: ${formattedDate}`;
              newValLoc = `Located at: ${locatedAt}`;
            });
          }
          break;
        case 2:
          if (ACSensors.length == 0) {
            newValData = `There is no Air Condition sensors in this class`;
          } else {
            ACSensors.forEach((sensor, index) => {
              const ACIndex = sensor.type.indexOf("Movement");
              // Get the latest data entry (last element in sensors_data array)
              const latestData =
                sensor.sensors_data[sensor.sensors_data.length - 1];
              const ACValue = latestData.data[ACIndex];

              const date = new Date(latestData.last_update);
              // Extract the parts and format them
              const formattedDate = `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}, ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
              const locatedAt = sensor.location.room[1];
              if (ACValue == "true") {
                newValData = `ON`;
              } else {
                newValData = `OFF`;
              }
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

  const hoursForMov = Array.from({ length: 24 }, (_, i) => i); // [0, 1, 2, ..., 23]
  const valuesForMov = [
    1,
    0,
    0,
    1,
    1,
    1,
    0,
    1,
    0,
    0, // Example data: 0 = OFF, 1 = ON
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1, // Fill in the rest according to actual data
    0,
    1,
    0,
    1,
  ];

  // Prepare data for the chart
  const chartDataForMov = {
    labels: hoursForMov.map((hour) => `${hour}:00`), // X-axis labels as hours of the day
    datasets: [
      {
        label: "Movment Status",
        data: valuesForMov,
        backgroundColor: valuesForMov.map((status) =>
          status === 1 ? "#629584" : "#629584"
        ),
        borderWidth: 1,
      },
    ],
  };

  const optionsForMov = {
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
          text: "Status (ON/OFF)",
        },
        ticks: {
          callback: (value) => (value === 1 ? "ON" : "OFF"),
          stepSize: 1,
          max: 1,
          min: 0,
        },
      },
    },
  };

  const hoursForLight = Array.from({ length: 24 }, (_, i) => i); // [0, 1, 2, ..., 23]
  const valuesForLight = [
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    0,
    0, // Example data: 0 = OFF, 1 = ON
    0,
    1,
    0,
    1,
    0,
    1,
    1,
    1,
    0,
    1, // Fill in the rest according to actual data
    0,
    1,
    0,
    0,
  ];

  // Prepare data for the chart
  const chartDataForLight = {
    labels: hoursForLight.map((hour) => `${hour}:00`), // X-axis labels as hours of the day
    datasets: [
      {
        label: "Light Status",
        data: valuesForLight,
        backgroundColor: valuesForLight.map((status) =>
          status === 1 ? "#87A2FF" : "#87A2FF"
        ),
        borderWidth: 1,
      },
    ],
  };

  const optionsForLight = {
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
          text: "Status (ON/OFF)",
        },
        ticks: {
          callback: (value) => (value === 1 ? "ON" : "OFF"),
          stepSize: 1,
          max: 1,
          min: 0,
        },
      },
    },
  };

  const hoursForAC = Array.from({ length: 24 }, (_, i) => i); // [0, 1, 2, ..., 23]
  const valuesForAC = [
    1,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    0,
    0, // Example data: 0 = OFF, 1 = ON
    0,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    0, // Fill in the rest according to actual data
    0,
    1,
    0,
    0,
  ];

  // Prepare data for the chart
  const chartDataForAC = {
    labels: hoursForAC.map((hour) => `${hour}:00`), // X-axis labels as hours of the day
    datasets: [
      {
        label: "Light Status",
        data: valuesForLight,
        backgroundColor: valuesForAC.map((status) =>
          status === 1 ? "#08C2FF" : "#08C2FF"
        ),
        borderWidth: 1,
      },
    ],
  };

  const optionsForAC = {
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
          text: "Status (ON/OFF)",
        },
        ticks: {
          callback: (value) => (value === 1 ? "ON" : "OFF"),
          stepSize: 1,
          max: 1,
          min: 0,
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
            padding: "40px 1px",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #3f51b5, #21CBF3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "fadeIn 2s ease-in-out",
          }}
        >
          Power Dashboard
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
              Movement Status Throughout the Day
            </Typography>
            <Box sx={{ height: "100%" }}>
              <Bar data={chartDataForMov} options={optionsForMov} />
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
              Light Status Throughout the Day
            </Typography>
            <Box sx={{ height: "100%" }}>
              <Bar data={chartDataForLight} options={optionsForLight} />
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
              AC Status Throughout the Day
            </Typography>
            <Box sx={{ height: "100%" }}>
              <Bar data={chartDataForAC} options={optionsForAC} />
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
          {"Back to Main Page"}
        </Button>
      </Box>
    </Box>
  );
};

export default PowerDashboard;
