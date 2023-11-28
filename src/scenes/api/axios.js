import { useState, useEffect } from "react";

const baseURL = "http://127.0.0.1:8000";
const loginURL = "http://127.0.0.1:8000/api-token-auth/";
const departmentURL = "http://127.0.0.1:8000/api/department/";
const userProfileURL = "http://127.0.0.1:8000/api/profile/";
const ticketURL = "http://127.0.0.1:8000/api/tickets/";
const recentTicketURL = "http://127.0.0.1:8000/api/tickets/";


const FetchRecentTicket = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/tickets/"); // Replace with your actual API endpoint
        const data = await response.json();
        setTransactions(data); // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  // Rest of your component code using the `transactions` state
};

export { baseURL, loginURL, departmentURL, userProfileURL, FetchRecentTicket, ticketURL };
