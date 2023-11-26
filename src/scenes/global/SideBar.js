import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { userProfileURL } from "../api/axios";

const Item = ({ title, to, icon, selected, setSelected , colors, onClick }) => {


  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        direction: "right",
      }}
      onClick={() => {
        onClick && onClick()
        setSelected(title)}
      }
      icon={icon}
    >
      <Link to={to}>
        <Typography sx={{ marginRight: "10px", fontWeight: "bold" }}>
          {title}
        </Typography>
      </Link>
    </MenuItem>
  );
};

const CustomSidebar = () => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(userProfileURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch User Profile: ${response.statusText}`
          );
        }
        const data = await response.json();
        setProfile(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[1000]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "20px 20px 20px 10px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        ".pro-sidebar": {
          position: "relative",
          height: "window.innerHeight",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 30px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mr="20px"
              >
                <Typography variant="h2" color={colors.grey[100]}></Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 20px 0" }}
                >
                  {profile.name}
                </Typography>
                <Typography variant="h4" color={colors.grey[200]}>
                  {/* {""#2A2E36"}> "} */}
                  {profile.job_position}
                </Typography>
              </Box>
            </Box>
          )}

          <Box
            paddingRight={isCollapsed ? undefined : "10%"}
            textAlign={"right"}
          >
            <Item
              title="داشبورد"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              colors={colors}
            />
            <Item
              title="ثبت تیکت"
              to="/ticket"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              colors={colors}
            />
            <Item
              title="پایگاه دانش"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              colors={colors}
            />
            <Item
              title="خروج "
              to="/login"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              colors={colors}
              onClick={()=> localStorage.clear("accessToken")
              }
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default CustomSidebar;
