import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Card,
  Grid,
  CardContent,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TimelapseIcon from "@mui/icons-material/Timelapse";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import Header from "../../components/header";
import "react-circular-progressbar/dist/styles.css";
import TicketDetailsModal from "../../components/Modal/ticketView";
import "./dashboard.css";
import "../../App.css";

import { useNavigate } from "react-router-dom";

import CustomSidebar from "../global/SideBar";
import Topbar from "../global/TopBar";
import { ticketCountURL, recentTicketURL } from "../api/axios";
import RecentTicketsGrid from "./recentTicket";

const mapPriorityToPersian = (priority) => {
  switch (priority) {
    case "high":
      return "زیاد";
    case "medium":
      return "متوسط";
    case "low":
      return "کم";
    default:
      return priority;
  }
};

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [ticketCount, setTicketCount] = useState([]);
  const [recentTicket, setRecentTicket] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleViewDetails = (ticket) => {
    setSelectedTicket(ticket);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedTicket(null);
    setIsDetailsModalOpen(false);
  };
  const handleModifyAnswer = () => {};

  useEffect(() => {
    const date = new Date();
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    if (date.getTime() > localStorage.getItem("tokenExpiration")) {
      localStorage.clear("accessToken");
      navigate("/login");
    }
  }, [localStorage]);

  useEffect(() => {
    const fetchTicketCount = async () => {
      try {
        const response = await fetch(ticketCountURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch Ticket Counts: ${response.statusText}`
          );
        }

        const data = await response.json();
        setTicketCount(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTicketCount();
  }, []);

  useEffect(() => {
    const fetchRecentTicket = async () => {
      try {
        const response = await fetch(recentTicketURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch Recnet Tickets : ${response.statusText}`
          );
        }

        const data = await response.json();
        setRecentTicket(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchRecentTicket();
  }, []);

  return (
    <div className="pageContainer">
      <CustomSidebar isSidebar={isSidebar} texAlign="right" />
      <div className="dataContainer">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box className="headerContainer">
          {/* HEADER */}
          <Box className="header">
            <Header title="داشبورد" />

            <Box>
              <Button
                className="headerButton"
                sx={{
                  backgroundColor: colors.blueAccent[1000],
                  color: colors.grey[100],
                }}
              >
                <DownloadOutlinedIcon className="headerButtonIcon" />
                دانلود گزارش
              </Button>
            </Box>
          </Box>

          {/* GRID & CHARTS */}
          <Box
            className="parentBox"
            sx={{
              "@media (max-width: 768px)": {
                gridTemplateColumns: "1fr", // Single column for screens smaller than 768px
              },
            }}
          >
            <Box className="gridBox">
              <Grid container className="gridContainer">
                {/* //spacing={28}> */}
                {/* Open Tickets */}
                <Grid item>
                  <Card
                    style={{ backgroundColor: "#d70000" }}
                    className="cardStyle"
                  >
                    <CardContent className="cardContent">
                      <AddCircleOutlineIcon className="iconStyle" />
                      <Typography variant="h5" color="white" textAlign="center">
                        تیکت های باز
                        <br />
                        <br />
                        {ticketCount.find((item) => item.status === "Open")
                          ?.count || 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* In Progress Tickets */}
                <Grid item>
                  <Card
                    style={{ backgroundColor: "#FC6600" }} ///"#964b11" }}
                    className="cardStyle"
                  >
                    <CardContent className="cardContent">
                      <TimelapseIcon className="iconStyle" />
                      <Typography variant="h5" color="white" textAlign="center">
                        تیکت های در دست بررسی
                        <br />
                        <br />{" "}
                        {ticketCount.find(
                          (item) => item.status === "InProgress"
                        )?.count || 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* On Hold Tickets */}
                <Grid item>
                  <Card
                    className="cardStyle"
                    style={{ backgroundColor: "#FFCD25" }} //"#orange" }}
                  >
                    <CardContent className="cardContent">
                      <CheckCircleOutlineIcon className="iconStyle" />
                      <Typography variant="h5" color="white" textAlign="center">
                        تیکت های در انتظار بررسی
                        <br />
                        <br />{" "}
                        {ticketCount.find((item) => item.status === "OnHold")
                          ?.count || 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Resolved Tickets */}
                <Grid item>
                  <Card
                    className="cardStyle"
                    style={{ backgroundColor: "#8A2BE2" }}
                  >
                    <CardContent className="cardContent">
                      <BeenhereIcon className="iconStyle" />
                      <Typography variant="h5" color="white" textAlign="center">
                        تیکت های بررسی شده
                        <br />
                        <br />{" "}
                        {ticketCount.find((item) => item.status === "Resolved")
                          ?.count || 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Closed Tickets */}
                <Grid item>
                  <Card
                    className="cardStyle"
                    style={{ backgroundColor: "#229B11" }}
                  >
                    <CardContent className="cardContent">
                      <HighlightOffIcon className="iconStyle" />
                      <Typography variant="h5" color="white" textAlign="center">
                        تیکت های بسته
                        <br />
                        <br />{" "}
                        {ticketCount.find((item) => item.status === "Closed")
                          ?.count || 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            <RecentTicketsGrid
              recentTicket={recentTicket}
              handleViewDetails={handleViewDetails}
              handleModifyAnswer={handleModifyAnswer}
              mapPriorityToPersian={mapPriorityToPersian}
              colors={colors}
            />
            <Box
              className="recentTicketParentBox"
              backgroundColor={colors.primary[400]}
            >
              <Box
                className="recentTicketBox3 "
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  تیکت های اخیر
                </Typography>
              </Box>
              {recentTicket.map((ticket, i) => (
                <Box
                  key={`${ticket.id}-${i}`}
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  className="recentTicket"
                >
                  <Box>
                    <Typography color={colors.grey[100]}>
                      {ticket.subject}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {mapPriorityToPersian(ticket.priority)}
                    </Typography>
                  </Box>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    ${ticket.time_spent}
                  </Box>

                  <Box>
                    {/* Button to view ticket details */}
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleViewDetails(ticket)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    {/* Button to modify/answer ticket */}
                    <Tooltip title="Modify/Answer">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleModifyAnswer(ticket)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              ))}
              {selectedTicket && (
                <TicketDetailsModal
                  open={isDetailsModalOpen}
                  handleClose={handleCloseDetailsModal}
                  ticket={selectedTicket}
                />
              )}
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;
