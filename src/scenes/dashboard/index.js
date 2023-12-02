import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/header";
// import CircularProgress from "@mui/joy/CircularProgress";
// import {styled} from "@mui/material/styles";

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
            <Box
              className="recentTicketParentBox"
              backgroundColor={colors.primary[1000]}
            >
              <Box
                className="recentTicketBox2"
                backgroundColor={colors.primary[1000]}
              >
                <Box
                  className="recentTicketBox2"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  colors={colors.grey[100]}
                >
                  <Typography
                    color={colors.grey[100]}
                    variant="h5"
                    fontWeight="600"
                  >
                    تیکت ها اخیر
                  </Typography>
                </Box>
                {recentTicket.map((ticket, i) => (
                  <Box
                    key={`${ticket.id}-${i}`}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    overflow="auto"
                    p="15px"
                  >
                    <Typography
                      color={colors.blueAccent[1000]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {ticket.submitted_by}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {ticket.priority}
                    </Typography>

                    <Box color={colors.grey[100]}>{ticket.time_spent}</Box>
                    <Box
                      backgroundColor={colors.blueAccent[1000]}
                      p="5px 10px"
                      borderRadius="4px"
                    >
                      {ticket.subject}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box
              className="chartContainer"
              backgroundColor={colors.primary[1000]}
            >
              <Typography
                variant="h5"
                className="chartText"
                marginTop="10px"
                marginRight="10px"
              >
                نمودار وضعیت تیکت ها
              </Typography>
              <Box
                display="grid"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                overflow="auto"
                flex="1"
              >
                <div>
                  <div className="circularbar">
                    <CircularProgressbar value={75} text={`${75}%`} />
                  </div>
                  <div>
                    <Typography variant="h5" color="red" textAlign="center">
                      تیکت های باز :{" "}
                      {ticketCount.find((item) => item.status === "Open")
                        ?.count || 0}
                    </Typography>
                    <Typography variant="h5" color="purple" textAlign="center">
                      تیکت های در دست بررسی :{" "}
                      {ticketCount.find((item) => item.status === "InProgress")
                        ?.count || 0}
                    </Typography>
                    <Typography variant="h5" color="blue" textAlign="center">
                      تیکت های در انتظار بررسی :{" "}
                      {ticketCount.find((item) => item.status === "OnHold")
                        ?.count || 0}
                    </Typography>
                    <Typography variant="h5" color="grey" textAlign="center">
                      تیکت های بررسی شده :{" "}
                      {ticketCount.find((item) => item.status === "Resolved")
                        ?.count || 0}
                    </Typography>
                    <Typography variant="h5" color="green" textAlign="center">
                      تیکت های بسته شده :{" "}
                      {ticketCount.find((item) => item.status === "Closed")
                        ?.count || 0}
                    </Typography>
                  </div>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;
