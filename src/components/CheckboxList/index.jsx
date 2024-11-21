import React, { useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

const users = [
  { id: 1, name: "Usuario 1" },
  { id: 2, name: "Usuario 2" },
  { id: 3, name: "Usuario 3" },
  { id: 4, name: "Usuario 4" },
  { id: 5, name: "Usuario 5" },
];

const CheckboxList = ({ selectedUsers, setSelectedUsers }) => {
 
  const handleCheckboxChange = (user) => {
    setSelectedUsers((prev) =>
      prev.some((selectedUser) => selectedUser.id === user.id)
        ? prev.filter((selectedUser) => selectedUser.id !== user.id)
        : [...prev, user] 
    );
  };
  const checkingBoxUser = (id) => {
 
      return selectedUsers.some((selectedUser) => selectedUser.id === id);
  };


  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Selecciona Usuarios:
      </Typography>
      <FormGroup>
        {users.map((user) => (
          <FormControlLabel
            key={user.id}
            control={
              <Checkbox
                checked={checkingBoxUser(user.id)}
                onChange={() => handleCheckboxChange(user)}
              />
            }
            label={user.name}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default CheckboxList;
