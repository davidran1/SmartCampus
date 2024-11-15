import { px } from "framer-motion";
import React from "react";

const StaffPage = () => {
  return (
    <div style={styles.lecturersAndTeamsContainer}>
      <h1 style={styles.lecturersAndTeamsHeading}>Lecturers and Teams</h1>
      <ul style={styles.cardList}>
        <li>
          <div style={styles.card}>
            <img
              src="https://via.placeholder.com/150"
              alt="Lecturer"
              style={styles.cardImg}
            />
            <h3 style={styles.cardTitle}>John Doe</h3>
            <p style={styles.cardText}>Computer Science</p>
          </div>
        </li>
        <li>
          <div style={styles.card}>
            <img
              src="https://via.placeholder.com/150"
              alt="Lecturer"
              style={styles.cardImg}
            />
            <h3 style={styles.cardTitle}>Jane Doe</h3>
            <p style={styles.cardText}>Information Systems</p>
          </div>
        </li>
        <li>
          <div style={styles.card}>
            <img
              src="https://via.placeholder.com/150"
              alt="Team"
              style={styles.cardImg}
            />
            <h3 style={styles.cardTitle}>Web Development Team</h3>
            <p style={styles.cardText}>Front-end and back-end developers</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  lecturersAndTeamsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5rem",
  },
  lecturersAndTeamsHeading: {
    fontSize: "3rem",
    marginBottom: "2rem",
  },
  cardList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "20rem",
    height: "20rem",
    margin: "2rem",
    padding: "2rem",
    borderRadius: "1rem",
    backgroundColor: "#fff",
    boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
    transition: "all 0.3s ease-in-out",
  },
  cardHover: {
    transform: "translateY(-0.5rem)",
    boxShadow: "0 1rem 2rem rgba(0, 0, 0, 0.15)",
  },
  cardBefore: {
    content: "",
    position: "absolute",
    top: "-0.25rem",
    left: "-0.25rem",
    width: "calc(100% + 0.5rem)",
    height: "calc(100% + 0.5rem)",
    borderRadius: "1rem",
    backgroundImage: "linear-gradient(to bottom right, #007eff, #00bff3)",
    zIndex: "-1",
    opacity: "0",
    transition: "all 0.3s ease-in-out",
  },
  cardBeforeHover: {
    opacity: "1",
  },
  cardImg: {
    width: "10rem",
    height: "10rem",
    borderRadius: "50%",
    marginBottom: "1.5rem",
    overflow: "hidden",
  },
  cardTitle: {
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
  },
  cardText: {
    fontSize: "1.2rem",
    textAlign: "center",
  },
};

export default StaffPage;
