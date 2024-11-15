import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Container,
  Typography,
  IconButton
} from "@mui/material";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import EditUserDialog from "./Dialogs/EditUserDialog";
import DeleteUserDialog from "./Dialogs/DeleteUserDialog";
import SuccessScreen from "../SuccessScreen"
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useEditUserMutation,
} from "../../../redux/rtk/userData";
import { useSelector } from "react-redux";

const AdminUsersTable = () => {
  const token = useSelector((state) => state.userData.token); // storing the token of the users
  const { data: initialUsers = [], error, refetch } = useGetAllUsersQuery(token); // getting all users from the backend
  const [deleteUser] = useDeleteUserMutation(); // delete users mutation from backend
  const [editUserMutation] = useEditUserMutation(); // edit users mutation from backend
  const [users, setUsers] = useState(initialUsers); // state for the users
  const [editUser, setEditUser] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");//Sort direction (asc or desc)
  const [showSuccess, setShowSuccess] = useState(false);//If delete or edit will success
  const [isEdit , setIsEdit] = useState(false);//Success screen for edit  
  const [isDelete , setIsDelete] = useState(false);//Success screen for delete


  //when there is any change in users list it will be update
  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  //When delete or edit user sucess , the sucess screen will show up for 2 seconds
  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => {setShowSuccess(false); setIsDelete(false);setIsEdit(false)}, 2000);
    }
  }, [showSuccess]);

  //sort for each column , can sort ascending or desc
  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortField(field);
  };

  //edit specific user
  const handleEditClick = (user) => {
    setEditUser(user);
  };

  const handleClose = () => {
    setEditUser(null);
  };

  //save the new user detailes
  const handleSave = async (updatedUser) => {
    try {
      await editUserMutation({
        id: updatedUser.id,
        userData: {
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          role: updatedUser.role,
        },
        token,
      }).unwrap();
      await refetch();
      setIsEdit(true);
      setShowSuccess(true);
    } catch (error) {
      console.error("Failed to edit user:", error);
    }
  };

  //delete specific user
  const handleDeleteConfirm = async () => {
    if (deleteConfirmation) {
      try {
        await deleteUser({ id: deleteConfirmation.id, token }).unwrap();
        setDeleteConfirmation(null);
        await refetch();
        setIsDelete(true);
        setShowSuccess(true);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleDeleteClick = (user) => {
    setDeleteConfirmation(user);
  };

  const handleDeleteClose = () => {
    setDeleteConfirmation(null);
  };

  //show changes in the list if there is trying to sort or search
  const sortedUsers = useMemo(() => {
    const sorted = [...users];
    if (sortField) {
      sorted.sort((a, b) => {
        const aValue = a[sortField].toString().toLowerCase();
        const bValue = b[sortField].toString().toLowerCase();
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [users, sortField, sortDirection]);

  const filteredUsers = useMemo(() => {
    return sortedUsers.filter((user) => {
      const searchValue = searchQuery.toLowerCase();
      if (searchBy === "name") {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return fullName.includes(searchValue);
      } else if (searchBy === "email") {
        return user.email.toLowerCase().includes(searchValue);
      }
      return false;
    });
  }, [sortedUsers, searchQuery, searchBy]);

  if (error)
    return (
      <div>
        Error loading page! either you are not admin or there's an error{" "}
        {error.message}
      </div>
    );

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      {/* Main content container */}
      <Container
        sx={{
          mt: "60px",
          ml: "150px",
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 32px)", // Subtracting top margin
          overflow: "hidden", // Prevent scrolling on the container
        }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mb: 4,
            background: "linear-gradient(45deg, #2196F3, #21CBF3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}>
          Users Management
        </Typography>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchBy={searchBy}
          setSearchBy={setSearchBy} />
        {/*ofir*/}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              overflowY: 'auto',
              maxHeight: "400px",
            }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>ID
                    <IconButton onClick={() => handleSort("id")}>
                      {sortField === "id" ? (
                        sortDirection === "asc" ? <ArrowDropUp color="primary" /> : <ArrowDropDown color="primary" />
                      ) : (
                        <ArrowDropUp color="disabled" />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Name
                    <IconButton onClick={() => handleSort("firstName")} size="small">
                      {sortField === "firstName" ? (
                        sortDirection === "asc" ? <ArrowDropUp color="primary" /> : <ArrowDropDown color="primary" />
                      ) : (
                        <ArrowDropUp color="disabled" />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Email
                    <IconButton onClick={() => handleSort("email")}>
                      {sortField === "Email" ? (
                        sortDirection === "asc" ? <ArrowDropUp color="primary" /> : <ArrowDropDown color="primary" />
                      ) : (
                        <ArrowDropUp color="disabled" />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Role
                    <IconButton onClick={() => handleSort("role")}>
                      {sortField === "role" ? (
                        sortDirection === "asc" ? <ArrowDropUp color="primary" /> : <ArrowDropDown color="primary" />
                      ) : (
                        <ArrowDropUp color="disabled" />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Edit</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
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
                        onClick={() => handleEditClick(user)}>
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
                        onClick={() => handleDeleteClick(user)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <EditUserDialog
            open={Boolean(editUser)}
            user={editUser}
            onClose={handleClose}
            onSave={handleSave} />
          <DeleteUserDialog
            open={Boolean(deleteConfirmation)}
            onClose={handleDeleteClose}
            onDelete={handleDeleteConfirm} />
          {isEdit && showSuccess && (
          <SuccessScreen
            mainMessage="User Updated Successfully"
            message={`The user details have been updated in the system`}
          />
        )}  
        {isDelete && showSuccess && (
          <SuccessScreen
            mainMessage="User Deleted Successfully"
            message={`The user have been deleted from the system`}
          />
        )}  
        </Box>
      </Container>
    </div>
  );
};
export default AdminUsersTable;

