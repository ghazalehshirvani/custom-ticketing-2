import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import {
  AddCircleOutline as AddCircleOutlineIcon,
  Timelapse as TimelapseIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Beenhere as BeenhereIcon,
  HighlightOff as HighlightOffIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const statusIcons = {
  Open: <AddCircleOutlineIcon className="iconStyle" />,
  InProgress: <TimelapseIcon className="iconStyle" />,
  OnHold: <CheckCircleOutlineIcon className="iconStyle" />,
  Resolved: <BeenhereIcon className="iconStyle" />,
  Closed: <HighlightOffIcon className="iconStyle" />,
};
const mapStatusToPersian = (status) => {
    switch(status) {
      case "Open":
        return "باز";
      case "Closed":
        return "بسته";
      case "InProgress":
        return "در دست بررسی";
      case "OnHold":
        return "در انتظار بررسی";
      case "Resolved":
        return "بررسی شده";
      default:
        return status;
    }
  }
const CardItem = ({ backgroundColor, status, count }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      // Navigate to a new URL with the status as a query parameter
      navigate(`/api/tickets/?status=${status}&priority=`);
  };

  return (
    <Grid item>
      <Card style={{ backgroundColor }} className="cardStyle" onClick={handleClick}>
        <CardContent className="cardContent">
          {statusIcons[status]}
          <Typography variant="h5" color="white" textAlign="center">
            تیکت های {mapStatusToPersian(status)}
            <br />
            <br />
            {count || 0}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CardItem;
