// src/components/RoomModal.tsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { createRoomAsync } from "../../store/slices/roomSlice";
import { AppDispatch, RootState } from "../../store/store";

interface RoomModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  mode: "create" | "join";
}

const RoomModal: React.FC<RoomModalProps> = ({
  open,
  onClose,
  onSubmit,
  mode,
}): JSX.Element => {
  const [formData, setFormData] = React.useState({
    roomName: "",
    maxPeople: "",
    password: "",
    roomId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSubmit = async () => {
    if (mode === "create") {
      try {
        const result = await dispatch(
          createRoomAsync({
            name: formData.roomName,
            password: formData.password,
            maxParticipants: Number(formData.maxPeople),
            createdByEmail: user.email,
          })
        ).unwrap();

        onSubmit(result);
        onClose();
        setFormData({ roomName: "", maxPeople: "", password: "", roomId: "" });
      } catch (error) {
        console.error("Failed to create room:", error);
        // You might want to show an error message to the user here
      }
    } else {
      onSubmit(formData);
      onClose();
      setFormData({ roomName: "", maxPeople: "", password: "", roomId: "" });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        {mode === "create" ? "Create Room" : "Join Room"}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          {mode === "create" ? (
            <>
              <TextField
                name="roomName"
                label="Room Name"
                fullWidth
                value={formData.roomName}
                onChange={handleChange}
              />
              <TextField
                name="maxPeople"
                label="Number of People"
                type="number"
                fullWidth
                value={formData.maxPeople}
                onChange={handleChange}
              />
              <TextField
                name="password"
                label="Room Password"
                type="password"
                fullWidth
                value={formData.password}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <TextField
                name="roomId"
                label="Room ID"
                fullWidth
                value={formData.roomId}
                onChange={handleChange}
              />
              <TextField
                name="password"
                label="Room Password"
                type="password"
                fullWidth
                value={formData.password}
                onChange={handleChange}
              />
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {mode === "create" ? "Create" : "Join"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoomModal;
