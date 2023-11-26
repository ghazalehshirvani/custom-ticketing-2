import React, { useEffect, useState } from 'react';
import { departmentURL } from '../api/axios';


const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to fetch departments
        const response = await fetch(departmentURL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token 7f8da12588d09f8ec1a374c0e91f82a590774722`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch departments: ${response.statusText}`);
        }

        const data = await response.json();
        setDepartments(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h1>Department List</h1>
      {loading ? (
        <p>Loading departments...</p>
      ) : (
        <ul>
          {departments.map((department) => (
            <li key={department.id}>{department.id}:{department.DepName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DepartmentList;
