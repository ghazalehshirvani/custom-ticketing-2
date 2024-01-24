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

import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import Header from "../../components/header";
import "react-circular-progressbar/dist/styles.css";
import TicketDetailsModal from "../../components/Modal/ticketView";
import "./dashboard.css";
import "../../App.css";
import OpenTicketCard from "../../components/Modal/cardDesign";
import { useNavigate } from "react-router-dom";

import CustomSidebar from "../global/SideBar";
import Topbar from "../global/TopBar";
import { ticketCountURL, recentTicketURL, ticketURL } from "../api/axios";
import RecentTicketsGrid from "./recentTicketsView";
import CardItem from "../../components/Modal/cardItem";
// import TicketsTable from "./recentTicketsView";
import RecentTicketsDashboard from "./recentTicketsView";

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
        const response = await fetch(ticketURL, {
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
        console.log("ticket count");
        console.log(data["count"]);
        setTicketCount(data["count"]);
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
        setRecentTicket(data["results"]);
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
                <OpenTicketCard
                  backgroundColor="#d70000"
                  status="Open"
                  count={
                    recentTicket.find((item) => item.status === "Open")?.count
                  }
                />
                {/* Render individual cards using the CardItem component */}

                <OpenTicketCard
                  backgroundColor="#FC6600"
                  status="InProgress"
                  count={
                    recentTicket.find((item) => item.status === "InProgress")
                      ?.count
                  }
                />
                <OpenTicketCard
                  backgroundColor="#FFCD25"
                  status="OnHold"
                  count={
                    recentTicket.find((item) => item.status === "OnHold")?.count
                  }
                />
                <OpenTicketCard
                  backgroundColor="#8A2BE2"
                  status="Resolved"
                  count={
                    recentTicket.find((item) => item.status === "Resolved")
                      ?.count
                  }
                />
                <OpenTicketCard
                  backgroundColor="#229B11"
                  status="Closed"
                  count={
                    recentTicket.find((item) => item.status === "Closed")?.count
                  }
                />
              </Grid>

              <RecentTicketsGrid
              recentTicket={recentTicket}
              handleViewDetails={handleViewDetails}
              handleModifyAnswer={handleModifyAnswer}
              mapPriorityToPersian={mapPriorityToPersian}
              selectedTicket={selectedTicket}
              isDetailsModalOpen={isDetailsModalOpen}
              handleCloseDetailsModal={handleCloseDetailsModal}
              colors={colors}
            />
            {/* <RecentTicketsGrid/> */}
            {/* <TicketsTable/> */}
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;
