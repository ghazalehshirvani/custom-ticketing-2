import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import * as React from "react";

import CustomSidebar from "../global/SideBar";
import Topbar from "../global/TopBar";
import { staffListURL } from "../api/axios";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isSidebar, setIsSidebar] = useState(true);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  const getRowStyle = React.useCallback((params) => {
    const evenColor = "#f0f0f0";
    const oddColor = "#ffffff";
    const isEvenRow = params.index % 2 === 0;

    return { background: isEvenRow ? evenColor : oddColor };
  }, []);

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

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "registrarId",
      headerName: "شماره کاربری",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "نام",
      headerAlign: "center",
      align: "center",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "pic_profile",
      headerName: "عکس",
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => <Avatar alt="Photo" src={params.value} />,
    },
    {
      field: "phonenumber",
      headerAlign: "center",
      align: "center",
      headerName: "شماره تماس",
      flex: 1,
    },
    {
      field: "job_position",
      headerAlign: "center",
      align: "center",
      headerName: "عنوان شغلی",
      flex: 1,
    },
  ];
  useEffect(() => {
    const fetchStaffList = async () => {
      try {
        const response = await fetch(staffListURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch StaffList: ${response.statusText}`);
        }

        const data = await response.json();
        setStaffList(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchStaffList();
  }, []);
  return (
    <div className="pageContainer">
      <CustomSidebar isSidebar={isSidebar} texAlign="right" />
      <div className="dataContainer">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <Header title="کارکنان بخش IT" />
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
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[1000],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <DataGrid
              rows={mockDataContacts}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              getRowId={(row) => row.id}
              getRowStyle={getRowStyle}
            />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Contacts;
