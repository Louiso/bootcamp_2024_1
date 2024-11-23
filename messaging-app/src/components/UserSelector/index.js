import { useState } from "react";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import {usersDefault} from "../../utils/constants";

const UserSelector = ({onClickSendUser, selectedUsers, setSelectedUsers}) => {
  const [users, setUsers] = useState(usersDefault);
  const handleCheckboxUsersChange = (id) => {
    setSelectedUsers((prevSelected) => {
      const updated = new Set(prevSelected);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const handleOnClickSendUser = () => {
    onClickSendUser?.();
  }
  
  return (
    <div>
      <Button variant="contained" disabled={selectedUsers.size === 0} onClick={handleOnClickSendUser}>
        Enviar Mensaje
      </Button>
      <FormGroup>
        {users.map((user) => {
          return (
            <FormControlLabel
              key={user.id}
              control={
                <Checkbox
                  checked={selectedUsers.has(user.id)}
                  onChange={() => handleCheckboxUsersChange(user.id)}
                />
              }
              label={user.name}
            />
          );
        })}
      </FormGroup>
    </div>
  );
};

export default UserSelector;
