import React from "react";
import { Modal, Typography, Paper, Button } from "@mui/material";

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

const TicketDetailsModal = ({ open, handleClose, ticket }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Paper
        style={{
          padding: "20px",
          maxWidth: "600px",
          margin: "50px auto",
          direction: "rtl",
          textAlign: "right",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          جزئیات تیکت
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>موضوع:</strong> {ticket.subject}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>اولویت:</strong> {mapPriorityToPersian(ticket.priority)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>زمان:</strong> {ticket.time_spent}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>وضعیت:</strong> {mapStatusToPersian(ticket.status)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>توضیحات:</strong>{" "}
          <span dangerouslySetInnerHTML={{ __html: ticket.description }} />
        </Typography>
        {/* Add other ticket details as needed */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          style={{ marginTop: "20px" }}
        >
          بستن
        </Button>
      </Paper>
    </Modal>
  );
};

export default TicketDetailsModal;
