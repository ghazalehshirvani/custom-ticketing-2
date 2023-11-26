import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/header";
import CircularProgress from "@mui/joy/CircularProgress";

import TrafficIcon from "@mui/icons-material/Traffic";
import "./dashboard.css";
import { mockTransactions } from "../../data/mockData";

import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
  xAxis: [
    {
      label: 'تعداد تیکت های ثبت شده',
    },
  ],
  width: 500,
  height: 400,
};
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    کل: 21,
    month: 'فرودین',
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    کل: 28,
    month: 'اردیبهشت',
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    کل: 41,
    month: 'خرداد',
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    کل: 73,
    month: 'تیر',
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    کل: 99,
    month: 'مرداد',
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    کل: 144,
    month: 'شهریور',
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    کل: 319,
    month: 'مهر',
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    کل: 249,
    month: 'آبان',
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    اسفند: 131,
    month: 'آذر',
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    کل: 55,
    month: 'دی',
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    کل: 48,
    month: 'بهمن',
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    کل: 25,
    month: 'اسفند',
  },
];

const valueFormatter = (value) => `${value}mm`;

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
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
          gridColumn="span 1"
          gridRow="span 2"
          minWidth="600px"
          backgroundColor={colors.primary[1000]}
          overflow="auto"
          marginLeft="10px"
        >
          <Box
            gridColumn="span 1"
            gridRow="span 2"
            backgroundColor={colors.primary[1000]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              overflow="auto"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                تیکت ها اخیر
              </Typography>
            </Box>
            {mockTransactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                overflow="auto"
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.blueAccent[1000]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.txId}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box
                  backgroundColor={colors.blueAccent[1000]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  {transaction.issue}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box className="chartContainer" backgroundColor={colors.primary[1000]}>
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
              <div marginRight="100px">
                <CircularProgress determinate value={75} />
              </div>
              <div>
                <Typography
                  variant="h5"
                  color={colors.blueAccent[1000]}
                  textAlign="center"
                >
                  تیکت بررسی شده : ۳۰
                </Typography>
                <Typography sx={{ direction: "rtl", textAlign: "center" }}>
                  تیکت بررسی شده : ۱۰
                </Typography>
              </div>
            </div>
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[1000]}
          overflow="auto"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            تعداد تیکت ها
          </Typography>
          <Box height="250px" mt="-20px">
            {/* //barchart */}
            <BarChart
              colors={colors.blue}
              dataset={dataset}
              yAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[
                { dataKey: "کل", label: "تیکت های ثبت شده", valueFormatter },
              ]}
              layout="horizontal"
              {...chartSetting}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
