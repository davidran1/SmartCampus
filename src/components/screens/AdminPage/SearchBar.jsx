import React from 'react';
import { TextField, Select, MenuItem, Box } from "@mui/material";

const SearchBar = ({ searchQuery, setSearchQuery, searchBy, setSearchBy }) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Select
        value={searchBy}
        onChange={(e) => setSearchBy(e.target.value)}
      >
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="email">Email</MenuItem>
      </Select>
    </Box>
  );
};

export default SearchBar;