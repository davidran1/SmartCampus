import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddAlertIcon from "@mui/icons-material/AddAlert";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setIsExpanded(!isMobile);
  }, [isMobile]);

  const toggleDrawer = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: isExpanded ? 240 : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isExpanded ? 240 : 60,
          boxSizing: "border-box",
          backgroundColor: "#f4f6f8",
          top: "64px",
          transition: "width 0.3s",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 2,
          justifyContent: isExpanded ? "space-between" : "center",
        }}
      >
        {isExpanded && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #3f51b5, #21CBF3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Admin Panel
          </Typography>
        )}
        <IconButton onClick={toggleDrawer} sx={{ minWidth: 40, minHeight: 40 }}>
          {isExpanded ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => navigate("/admin")}
          sx={{ "&:hover": { backgroundColor: "#e0f7fa", cursor: "pointer" } }}
        >
          <ListItemIcon>
            <HomeIcon sx={{ color: "#3f51b5" }} />
          </ListItemIcon>
          {isExpanded && <ListItemText primary="Admin dashboard" />}
        </ListItem>
        <ListItem
          button
          onClick={() => navigate("/UsersTable")}
          sx={{ "&:hover": { backgroundColor: "#e0f7fa", cursor: "pointer" } }}
        >
          <ListItemIcon>
            <GroupIcon sx={{ color: "#3f51b5" }} />
          </ListItemIcon>
          {isExpanded && <ListItemText primary="User management" />}
        </ListItem>
        <ListItem
          button
          onClick={() => navigate("/SensorStatistics")}
          sx={{ "&:hover": { backgroundColor: "#e0f7fa", cursor: "pointer" } }}
        >
          <ListItemIcon>
            <BarChartIcon sx={{ color: "#3f51b5" }} />
          </ListItemIcon>
          {isExpanded && <ListItemText primary="Sensors" />}
        </ListItem>
        <ListItem
          button
          onClick={() => navigate("/AlertCenter")}
          sx={{ "&:hover": { backgroundColor: "#e0f7fa", cursor: "pointer" } }}
        >
          <ListItemIcon>
            <AddAlertIcon sx={{ color: "#3f51b5" }} />
          </ListItemIcon>
          {isExpanded && <ListItemText primary="Alert center" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
