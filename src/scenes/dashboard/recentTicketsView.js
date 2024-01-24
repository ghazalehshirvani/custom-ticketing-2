// // // RecentTicketsDashboard.jsx

// // import React, { useState } from 'react';

// // const RecentTicketsDashboard = () => {
// //   const [ticketsPerPage, setTicketsPerPage] = useState(10);
// //   const [currentPage, setCurrentPage] = useState(1);

// //   const recentTickets = [
// //     { id: 1, section: 'Section 1', subject: 'Ticket 1', status: 'Open', lastUpdate: '2022-01-15' },
// //     // Add more ticket data here
// //   ];

// //   const indexOfLastTicket = currentPage * ticketsPerPage;
// //   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
// //   const currentTickets = recentTickets.slice(indexOfFirstTicket, indexOfLastTicket);

// //   const handleTicketClick = (ticketId) => {
// //     console.log(`Redirecting to ticket details page for ticket ID ${ticketId}`);
// //     // Add your navigation logic here
// //   };

// //   const handlePageChange = (newPage) => {
// //     setCurrentPage(newPage);
// //   };

// //   return (
// //     <div className="recent-tickets-dashboard">
// //       <div className="dashboard-header">
// //         <h2>مشاهده</h2>
// //       </div>
// //       <div className="tickets-frame">
// //         <div className="tickets-header">
// //           <div>بخش</div>
// //           <div>موضوع</div>
// //           <div>وضعیت</div>
// //           <div>اخرین به‌روز‌رسانی</div>
// //         </div>
// //         <div className="tickets-body">
// //           {currentTickets.map((ticket) => (
// //             <div
// //               key={ticket.id}
// //               className="ticket-row"
// //               onClick={() => handleTicketClick(ticket.id)}
// //             >
// //               <div>{ticket.section}</div>
// //               <div>{ticket.subject}</div>
// //               <div>{ticket.status}</div>
// //               <div>{ticket.lastUpdate}</div>
// //             </div>
// //           ))}
// //         </div>
// //         <div className="tickets-footer">
// //           <div>
// //             نمایش
// //             <select
// //               value={ticketsPerPage}
// //               onChange={(e) => setTicketsPerPage(parseInt(e.target.value))}
// //             >
// //               <option value={10}>10</option>
// //               <option value={20}>20</option>
// //               {/* Add more options based on your preference */}
// //             </select>
// //             تیکت در هر صفحه
// //           </div>
// //           <div>
// //             صفحه {currentPage}
// //             <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
// //               قبلی
// //             </button>
// //             <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentTickets.length < ticketsPerPage}>
// //               بعدی
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RecentTicketsDashboard;
// // RecentTicketsGrid.js

import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  Paper,
  useTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import "./recentTicket.css"; // Import the CSS file
import { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import TicketDetailsModal from "../../components/Modal/ticketView";

const PAGE_SIZE = 5;

const RecentTicketsGrid = ({
  recentTicket,
  handleViewDetails,
  handleModifyAnswer,
  mapPriorityToPersian,
  selectedTicket,
  isDetailsModalOpen,
  handleCloseDetailsModal,
}) => {
  const theme = useTheme();
  const colors = theme.palette;
  const navigate = useNavigate();
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
    // <Box
    //   className="recentTicketParentBox"
    //   bgcolor={colors.background.default}
    //   borderRadius={8}
    //   boxShadow={4}
    //   margin={2}
    //   padding={2}
    // >
    //   <Box
    //     className="recentTicketBox3"
    //     borderBottom={`4px solid ${colors.primary.main}`}
    //     color={colors.grey[100]}
    //     marginBottom={2}
    //   >
    //     <Typography variant="h5" fontWeight="600">
    //       تیکت های اخیر
    //     </Typography>
    //   </Box>
    //   <Grid container spacing={2} className="recentTicketPaper">
    //     {/* Main Header */}
    //     <Grid item xs={12}>
    //       <Typography variant="h5" fontWeight="600">
    //         تیکت های اخیر
    //       </Typography>
    //     </Grid>

    //     {/* Column Headers */}
    //     <Grid item xs={4}>
    //       <Typography variant="subtitle1" fontWeight="600">
    //         بخش
    //       </Typography>
    //     </Grid>
    //     <Grid item xs={4}>
    //       <Typography variant="subtitle1" fontWeight="600">
    //         موضوع
    //       </Typography>
    //     </Grid>
    //     <Grid item xs={4}>
    //       <Typography variant="subtitle1" fontWeight="600">
    //         وضعیت | زمان صرف شده
    //       </Typography>
    //     </Grid>

    //     {/* Data Rows */}
    //     {visibleTickets.map((ticket, i) => (
    //       <Grid
    //         contai ner
    //         spacing={2}
    //         key={`${ticket.id}-${i}`}
    //         onClick={() => navigate(`/ticket/${ticket.id}`)}
    //       >
    //         <Grid item xs={4}>
    //           <Typography>{ticket.DepName}</Typography>
    //         </Grid>
    //         <Grid item xs={4}>
    //           <Typography>{ticket.subject}</Typography>
    //         </Grid>
    //         <Grid item xs={4}>
    //           <Typography>
    //             {ticket.status} | {ticket.time_spent}
    //           </Typography>
    //         </Grid>
    //       </Grid>
    //     ))}
    //   </Grid>

    //   <Box className="recentTicketPagination">
    //     <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
    //       <NavigateBeforeIcon />
    //     </IconButton>
    //     <Typography variant="h6" color="textSecondary" display="inline">
    //       صفحه {currentPage} از {totalPages}
    //     </Typography>
    //     <IconButton
    //       onClick={handleNextPage}
    //       disabled={currentPage === totalPages}
    //     >
    //       <NavigateNextIcon />
    //     </IconButton>
    //   </Box>
    //   {selectedTicket && (
    //     <TicketDetailsModal
    //       open={isDetailsModalOpen}
    //       handleClose={handleCloseDetailsModal}
    //       ticket={selectedTicket}
    //     />
    //   )}
    // </Box>
    <Box className="recentTicketParentBox">
    <Box
      className="recentTicketBox3"
      borderBottom={`4px solid ${colors.primary.main}`}
    >
      <Typography variant="h5" fontWeight="600">
        تیکت های اخیر
      </Typography>
    </Box>
  
    <Grid container className="recentTicketPaper">
      {/* Column Headers */}
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight="600">
          بخش
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight="600">
          موضوع
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight="600">
          وضعیت | زمان صرف شده
        </Typography>
      </Grid>
  
      {/* Data Rows */}
      {visibleTickets.map((ticket, i) => (
        <Grid
          container
          spacing={2}
          key={`${ticket.id}-${i}`}
          onClick={() => navigate(`/ticket/${ticket.id}`)}
        >
          <Grid item xs={4}>
            <Typography>{ticket.dep_id.DepName}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>{ticket.subject}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              {ticket.status} | {ticket.time_spent}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  
    <Box className="recentTicketPagination">
    <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
          <NavigateBeforeIcon />
        </IconButton>
        <Typography variant="h6" color="textSecondary" display="inline">
          صفحه {currentPage} از {totalPages}
        </Typography>
        <IconButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages} >
          <NavigateNextIcon />
        </IconButton>
      {/* Pagination Code */}
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
// import React from 'react';
// import './recentTicket.css';

// const TicketsTable = () => {
//   const tickets = [
//     // Array of ticket objects
//   ];

//   const handleTicketClick = (id) => {
//     // Handle click event for the ticket item
//   };

//   return (
//     <div className="tickets-container">
//       <div className="table-header">
//         {/* Your header content here */}
//       </div>
//       <div className="tickets-table">
//         <table>
//           <thead>
//             <tr>
//               <th>Time</th>
//               <th>Date</th>
//               <th>Status</th>
//               <th>Type</th>
//               <th>Number</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tickets.map((ticket) => (
//               <tr key={ticket.id} onClick={() => handleTicketClick(ticket.id)}>
//                 <td>{ticket.time}</td>
//                 <td>{ticket.date}</td>
//                 <td>{ticket.status}</td>
//                 <td>{ticket.type}</td>
//                 <td>{ticket.id}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="table-footer">
//         {/* Your footer content here */}
//       </div>
//     </div>
//   );
// };

// export default TicketsTable;
