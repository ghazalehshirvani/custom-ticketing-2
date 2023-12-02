import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CustomSidebar from "../global/SideBar";
import Topbar from "../global/TopBar";


const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isSidebar, setIsSidebar] = useState(true);
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

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "شماره کاربری" },
    {
      field: "name",
      headerName: "نام",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "سن",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "شماره تماس",
      flex: 1,
    },
    {
      field: "email",
      headerName: "ایمیل",
      flex: 1,
    },
    {
      field: "address",
      headerName: "آدرس",
      flex: 1,
    },
    {
      field: "city",
      headerName: "دپارتمان",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
  ];

  return (
    <div className="pageContainer">
      <CustomSidebar isSidebar={isSidebar} texAlign="right" />
      <div className="dataContainer">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <Header
            title="کارکنان بخش IT"
          />
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
            />
          </Box>
        </Box>

      </div>
    </div>
  );
};

export default Contacts;
