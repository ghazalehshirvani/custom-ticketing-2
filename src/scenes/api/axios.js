import { useState, useEffect } from "react";

const baseURL = "http://127.0.0.1:8000";
const loginURL = "http://127.0.0.1:8000/api-token-auth/";
const departmentURL = "http://127.0.0.1:8000/api/department/";
const userProfileURL = "http://127.0.0.1:8000/api/profile/";
const ticketURL = "http://127.0.0.1:8000/api/tickets/";
const recentTicketURL = "http://127.0.0.1:8000/api/tickets/";
const ticketCountURL = "http://127.0.0.1:8000/api/ticket-status-count/";
const staffListURL = "http://127.0.0.1:8000/api/stafflist/";


export { baseURL, loginURL, departmentURL, userProfileURL, ticketURL, ticketCountURL, staffListURL, recentTicketURL };
