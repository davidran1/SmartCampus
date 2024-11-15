import React from 'react';
import { TableRow, TableCell, Button } from "@mui/material";

const UserRow = ({ user, handleEdit, handleDelete }) => {
  return (
    <TableRow
      sx={{
        "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
        "&:hover": { backgroundColor: "#f1f1f1" },
      }}
    >
      <TableCell>{user.id}</TableCell>
      <TableCell>
        {user.firstName} {user.lastName}
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#21CBF3",
            "&:hover": { backgroundColor: "#1e88e5" },
            borderRadius: "20px",
            textTransform: "none",
          }}
          size="small"
          onClick={() => handleEdit(user)}
        >
          Edit
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ff4444",
            "&:hover": { backgroundColor: "#cc0000" },
            borderRadius: "20px",
            textTransform: "none",
          }}
          size="small"
          onClick={() => handleDelete(user.id)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;