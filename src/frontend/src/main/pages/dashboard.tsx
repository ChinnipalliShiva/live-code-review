// src/components/Dashboard.tsx
import React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  AppBar,
  IconButton,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice"; // adjust path if needed
import RoomModal from "../modals/room";

const drawerWidth = 240;

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<"create" | "join">("create");
  const handleOpenModal = (mode: "create" | "join") => {
    setModalMode(mode);
    setModalOpen(true);
  };

  const handleModalSubmit = (data: any) => {
    console.log(`${modalMode.toUpperCase()} ROOM DATA`, data);
    // TODO: Dispatch create/join room action here
  };

  const menuItems = ["Create Room", "Join Room", "Contact", "About"];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Code-Review
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}>
        <Toolbar />
        <Box
          sx={{
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleOpenModal("create")}>
                <ListItemText primary="Create Room" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleOpenModal("join")}>
                <ListItemText primary="Join Room" />
              </ListItemButton>
            </ListItem>
            {/* other menu items... */}
          </List>
          <Divider />
          {/* Logout button at the bottom */}
          <Box sx={{ mt: "auto", p: 2 }}>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4">Welcome, {user?.name || "User"}!</Typography>
        {/* You can show more content here */}
      </Box>

      <RoomModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        mode={modalMode}
      />
    </Box>
  );
};

export default Dashboard;
