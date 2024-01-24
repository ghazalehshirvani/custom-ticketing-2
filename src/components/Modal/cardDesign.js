import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./cards.css";



const convertToPersianNumerals = (number=0) => {
    const persianNumerals = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  
    return  String(number).replace(/\d/g, (digit) => persianNumerals[digit]);

  }

const statusIcons = {
    Open: <img src="/assets/openticket.png" alt="My Icon" className="statusIconStyle"/>,
    InProgress: <img src="/assets/orange.png" alt="My Icon" className="statusIconStyle"/>,
    OnHold: <img src="/assets/zard.png" alt="My Icon" className="statusIconStyle"/>,
    Resolved: <img src="/assets/bnfsh.png" alt="My Icon" className="statusIconStyle"/>,
    Closed: <img src="/assets/sabz.png" alt="My Icon" className="statusIconStyle"/>,
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
const onClickDetails = (status) => {

}
const OpenTicketCard = ({ status, count, backgroundColor }) => {
  return (
       <Card  className="cardParent">
      {/* Row for SVG and count */}
      <CardContent className="cardContentt">
        {/* Big icon of open ticket */}
        {statusIcons[status]}
        <CardContent>
          {/* Typography for ticket count */}
          <Typography variant="h4" className="countTypography">
            {convertToPersianNumerals(count)||0}
          </Typography>
          {/* Typography for ticket status */}
          <Typography variant="h4" gutterBottom style={{color:backgroundColor}} className="statusTypography" >
            {mapStatusToPersian(status)}
          </Typography>
        </CardContent>
      </CardContent>

      {/* Row for ticket status */}

      {/* More details button */}
      <CardContent className="detailsButtonParent">
        <Button endIcon={<ArrowBackIcon />} size="small" className="detailsButton" onClick={onClickDetails(status)}>
          جزئیات بیشتر
        </Button>
      </CardContent>
    </Card>
  );
};

export default OpenTicketCard;
