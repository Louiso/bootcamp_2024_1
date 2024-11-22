import { useContext, useEffect, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Button,
  Container,
  Paper,
} from "@mui/material";
import { users } from "../../utils/defaultContent";
import MessageContext from "../../context/MessageContext";
import "./index.css";

const UserList = ({ onSelectUsers }) => {
  const { data } = useContext(MessageContext);
  const [selectedUsers, setSelectedUsers] = useState(data.sendTo);

  const _handleCheckboxChange = ({ target: { checked } }, user) => {
    setSelectedUsers((prevSelected) => {
      if (!checked)
        return prevSelected.filter(
          (selectedUser) => selectedUser.id !== user.id
        );
      const updatedUsers = [...prevSelected, user];
      return users.filter((u) =>
        updatedUsers.some((selected) => selected.id === u.id)
      );
    });
  };

  const _handleSelectUsers = () => {
    onSelectUsers(selectedUsers);
  };

  useEffect(() => {
    _handleSelectUsers();
  }, [selectedUsers]);

  const isSelected = (user) =>
    selectedUsers.some((selected) => selected.id === user.id);

  return (
    <>
      <div className="step-text">Selección de usuarios</div>
      {users?.map((user) => (
        <Paper
          key={user.id}
          className={`user-container ${isSelected(user) ? "selected" : ""}`}
          elevation={3}
        >
          <FormControlLabel
            className={`text-label ${
              isSelected(user) ? "text-selected" : ""
            }`}
            control={
              <Checkbox
                onChange={(e) => _handleCheckboxChange(e, user)}
                checked={selectedUsers.some((u) => u.id === user.id)}
              />
            }
            label={user.name}
          />
        </Paper>
      ))}
    </>
  );
};

export default UserList;
