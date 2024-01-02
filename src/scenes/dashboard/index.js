import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Card,
  Grid,
  CardContent,
} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TimelapseIcon from "@mui/icons-material/Timelapse";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import Header from "../../components/header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./dashboard.css";
import "../../App.css";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomSidebar from "../global/SideBar";
import Topbar from "../global/TopBar";
import { ticketCountURL, recentTicketURL } from "../api/axios";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [ticketCount, setTicketCount] = useState([]);
  const [recentTicket, setRecentTicket] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
                  {/* //xs={12} sm={6} md={2}> */}
                  <Card  className="cardStyle" style={{ backgroundColor: "red", width: `calc(33.33% - 20px)` }}>
                    <CardContent className="cardContent">
                      <AddCircleOutlineIcon className="iconStyle" />
                      <Typography variant="h5" color="white" textAlign="center">
                        تیکت های باز:{" "}
                        {ticketCount.find((item) => item.status === "Open")
                          ?.count || 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* In Progress Tickets */}
                <Grid item>
                  <Card style={{ backgroundColor: "brown" }}>
                    <CardContent className="cardContent">
                      <TimelapseIcon
                        style={{
                          fontSize: 60,
                          color: "white",
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                        }}
                      />
                      <Typography variant="h5" color="white" textAlign="center">
                        تیکت های در دست بررسی:{" "}
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
                    style={{ backgroundColor: "orange" }}
                  >
                    <CardContent>
                      <BeenhereIcon
                        style={{
                          fontSize: 60,
                          color: "white",
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                        }}
                      />
                      <Typography variant="h5" color="white" textAlign="center">
                        تیکت های در انتظار بررسی:{" "}
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
                    style={{ backgroundColor: "purple" }}
                  >
                    <CardContent>
                      <CheckCircleOutlineIcon
                        style={{
                          fontSize: 60,
                          color: "white",
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                        }}
                      />
                      <Typography variant="h5" color="white" textAlign="center">
                        تیکت های بررسی شده:{" "}
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
                    style={{ backgroundColor: "green" }}
                  >
                    <CardContent>
                      <HighlightOffIcon
                        style={{
                          fontSize: 60,
                          color: "white",
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                        }}
                      />
                      <Typography variant="h5" color="white" textAlign="center">
                        تیکت های بسته شده:{" "}
                        {ticketCount.find((item) => item.status === "Closed")
                          ?.count || 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  Recent Transactions
                </Typography>
              </Box>
              {recentTicket.map((ticket, i) => (
                <Box
                  key={`${ticket.id}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {ticket.priority}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {ticket.subject}
                    </Typography>
                  </Box>
                  <div
                    color={colors.grey[100]}
                    dangerouslySetInnerHTML={{ __html: ticket.description }}
                  ></div>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    ${ticket.time_spent}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* <Box
              className="recentTicketParentBox"
              backgroundColor={colors.primary[1000]}
            >
              <Box
                className="recentTicketBox2"
                backgroundColor={colors.primary[1000]}
              >
               
              </Box>
            </Box> */}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;
