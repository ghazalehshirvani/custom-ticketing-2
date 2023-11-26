import { useState, useEffect } from "react";

const baseURL = "http://127.0.0.1:8000";
const loginURL = "http://127.0.0.1:8000/api-token-auth/";
const departmentURL = "http://127.0.0.1:8000/api/department/";
const userProfileURL = "http://127.0.0.1:8000/api/profile/";

const FetchUserProfile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to fetch departments
        const response = await fetch(userProfileURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token 7f8da12588d09f8ec1a374c0e91f82a590774722`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch departments: ${response.statusText}`
          );
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once on mount
};

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

export { baseURL, loginURL, departmentURL, FetchUserProfile, FetchRecentTicket };
