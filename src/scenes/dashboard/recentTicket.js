// RecentTicketsGrid.js
import React from "react";
import { Box, Grid, Typography, IconButton, Tooltip, Pagination } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import TicketDetailsModal from "../../components/Modal/ticketView";
import "./dashboard.css";
import { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const PAGE_SIZE = 5;

const RecentTicketsGrid = ({
  recentTicket,
  handleViewDetails,
  handleModifyAnswer,
  mapPriorityToPersian,
  selectedTicket,
  isDetailsModalOpen,
  handleCloseDetailsModal,
  colors
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(recentTicket.length / PAGE_SIZE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const visibleTickets = recentTicket.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <Box
      className="recentTicketParentBox"
      backgroundColor={colors.primary[400]}
      
    >
      <Box
        className="recentTicketBox3 "
        borderBottom={`4px solid ${colors.primary[500]}`}
        colors={colors.grey[100]}
      >
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          تیکت های اخیر
        </Typography>
      </Box>
      {visibleTickets.map((ticket, i) => (
        <Grid
          container
          spacing={1}
          key={`${ticket.id}-${i}`}
          borderBottom={`4px solid ${colors.primary[500]}`}
        >
          <Grid item xs={3}>
            <Box textAlign="right" padding="15px" >
              <Typography color={colors.grey[100]}>{ticket.subject}</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box textAlign="center">
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
                marginTop= "15px"
              >
                {mapPriorityToPersian(ticket.priority)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              textAlign="center"
              backgroundColor={colors.greenAccent[500]}
              p="5px 10px"
              borderRadius="4px"
              marginTop= "11px"
            >
              ${ticket.time_spent}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box textAlign="left" marginTop= "11px">
              {/* Buttons to view ticket details and modify/answer ticket */}
              <Tooltip title="View Details">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => handleViewDetails(ticket)}
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Modify/Answer">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => handleModifyAnswer(ticket)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
          
        </Grid>
        
    ))}
     {/* Pagination controls */}
      {/* Next and Previous buttons */}
      <Box textAlign="center" marginTop="20px">
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
          <NavigateBeforeIcon />
        </IconButton>
        <Typography variant="h6" color="textSecondary" display="inline">
          صفحه {currentPage} از {totalPages}
        </Typography>
        <IconButton onClick={handleNextPage} disabled={currentPage === totalPages}>
          <NavigateNextIcon />
        </IconButton>
      </Box>
      {selectedTicket && (
        <TicketDetailsModal
          open={isDetailsModalOpen}
          handleClose={handleCloseDetailsModal}
          ticket={selectedTicket}
        />
      )}
      
    </Box>
  );
};

export default RecentTicketsGrid;


