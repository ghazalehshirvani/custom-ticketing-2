import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
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

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "submitted_by",
      headerName: "ارسال کننده",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "priority",
      headerName: "اولویت",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "time_spent",
      headerName: "زمان",
      flex: 1,
    },
    {
      field: "subject",
      headerName: "موضوع",
      flex: 1,
    },
    {
      field: "description",
      headerName: "توضیحات",
      flex: 1,
    },
  ];
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
                <Header title="تیکت های اخیر" />
                <Box
                  m="40px 0 0 0"
                  height="75vh"
                  sx={{
                    "& .MuiDataGrid-root": {
                      border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "none",
                    },
                    "& .name-column--cell": {
                      color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: colors.blueAccent[1000],
                      borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: colors.primary[1000],
                    },
                    "& .MuiDataGrid-footerContainer": {
                      borderTop: "none",
                      backgroundColor: colors.blueAccent[1000],
                    },
                    "& .MuiCheckbox-root": {
                      color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                      color: `${colors.grey[500]} !important`,
                    },
                  }}
                >
                  <DataGrid
                    rows={recentTicket}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                  />
                </Box>
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
                    <CircularProgressbar value={50} text={`${50}%`} />
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
