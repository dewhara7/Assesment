import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Admission = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [id, SetId] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getuser");
        setUsers(response.data); // Update state with the data
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);
  const editData = (id) => {
    navigate(`/updateUser/${id}`);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      console.log(id, newStatus);
      const response = await axios.put(
        `http://localhost:3000/updateStatus/${id}`,
        {
          status: newStatus,
        }
      );
      console.log("Status updated:", response.data);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const calculateStatusCounts = () => {
    const statusCounts = {
      Accepted: 0,
      Rejected: 0,
      Processing: 0,
    };

    users.forEach((user) => {
      if (statusCounts[user.status] !== undefined) {
        statusCounts[user.status]++;
      }
    });

    return statusCounts;
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/deleteUser/${id}`
      );
      console.log("User deleted:", response.data);

      // Update the users list on successful deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const { Accepted, Rejected, Processing } = calculateStatusCounts();
  return (
    <div style={styles.container}>
      <div style={styles.statusBox}>
        <p>
          Accepted: {Accepted} &nbsp;&emsp;&nbsp; Rejected: {Rejected}
          &nbsp;&emsp;&nbsp; Processing: {Processing}
        </p>
      </div>

      <h1 style={styles.h1}>User Details</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}></th>
            <th style={styles.tableHeader}>First Name</th>
            <th style={styles.tableHeader}>Last Name</th>
            <th style={styles.tableHeader}>Address</th>
            <th style={styles.tableHeader}>Birthday</th>
            <th style={styles.tableHeader}>Religion</th>
            <th style={styles.tableHeader}>Gender</th>
            <th style={styles.tableHeader}>Extracurricular</th>
            <th style={styles.tableHeader}>Course</th>
            <th style={styles.tableHeader}>Current Status</th>
            <th style={styles.tableHeader}>Change Status</th>
            <th style={styles.tableHeader}>Document</th>
            <th style={styles.tableHeader}></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              style={index % 2 === 0 ? styles.tableRowEven : undefined}
            >
              <td>
                {user.image ? (
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    style={styles.img}
                  />
                ) : (
                  <span style={styles.noImage}>No Image</span>
                )}
              </td>
              <td style={styles.tableCell}>{user.firstName}</td>
              <td style={styles.tableCell}>{user.lastName}</td>
              <td style={styles.tableCell}>{user.address}</td>
              <td style={styles.tableCell}>
                {new Date(user.birthday).toLocaleDateString()}
              </td>
              <td style={styles.tableCell}>{user.religion}</td>
              <td style={styles.tableCell}>{user.gender}</td>
              <td style={styles.tableCell}>
                {user.extracurricular.join(", ")}
              </td>
              <td style={styles.tableCell}>{user.course}</td>
              <td style={styles.tableCell}>{user.status}</td>
              <td style={styles.tableCell}>
                <select
                  style={styles.select}
                  value={user.status}
                  onChange={(e) => handleStatusChange(user._id, e.target.value)}
                >
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Processing">Processing</option>
                </select>
              </td>
              <td style={styles.tableCell}>
                <a href={user.document} style={styles.link}>
                  View
                </a>
              </td>
              <td style={styles.tableCell}>
                <button
                  style={styles.button}
                  onClick={() => editData(user._id)}
                >
                  Edit
                </button>
                
                <button
                  onClick={() => deleteUser(user._id)}
                  style={styles.button1}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    position: "relative",
  },
  statusBox: {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "1px solid #ccc",
    padding: "8px",
    borderRadius: "5px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
  },
  h1: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#555",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "30px",
  },
  tableHeader: {
    backgroundColor: "#f4f4f4",
    fontWeight: "bold",
    color: "#333",
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
  },
  tableCell: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
  },
  tableRowEven: {
    backgroundColor: "#f9f9f9",
  },
  tableRowHover: {
    backgroundColor: "#f1f1f1",
  },
  img: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "50%",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  button1: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    marginLeft:"5px",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  select: {
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
export default Admission;
