import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Room {
  id: number;
  name: string;
  password: string;
  maxParticipants: number;
  createdByEmail: string;
  createdAt?: string;
  updatedAt?: string;
}
interface RoomState {
  rooms: Room[];
  loading: boolean;
  error: string | null;
}
interface CreateRoomPayload {
  name: string;
  password: string;
  maxParticipants: number;
  createdByEmail: string;
}

const initialState: RoomState = {
  rooms: [],
  loading: false,
  error: null,
};
const createRoomAsync = createAsyncThunk(
  "room/createRoom",
  async ({
    name,
    password,
    maxParticipants,
    createdByEmail,
  }: CreateRoomPayload) => {
    const response = await axios.post("http://localhost:3001/create-room", {
      name,
      password,
      maxParticipants,
      createdByEmail,
    });
    if (response.status === 400) {
      throw new Error("Failed to create room");
    }
    return response.data.room as Room;
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRoomAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createRoomAsync.fulfilled,
        (state, action: PayloadAction<Room>) => {
          state.loading = false;
          state.rooms.push(action.payload);
        }
      )
      .addCase(createRoomAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create room";
      });
  },
});

export { createRoomAsync };
export default roomSlice.reducer;
