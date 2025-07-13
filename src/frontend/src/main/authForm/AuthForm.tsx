// src/components/AuthForm.tsx
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Tooltip,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginUser, signUpUser } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
interface GridProps {
  children: React.ReactNode;
  item?: boolean;
  container?: boolean;
  xs?: number;
  spacing?: number;
  justifyContent?: string;
  sx?: any;
}

const GridItem: React.FC<GridProps> = (props) => {
  return <Grid {...props} />;
};

const AuthForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    useremail: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    if (!isLogin) {
      navigate("/sign-up");
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Dispatch login action
      dispatch(loginUser(formData));
      navigate("/dashboard");
    } else {
      // Dispatch sign up action
      dispatch(signUpUser(formData));
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          {isLogin ? "Login" : "Sign Up"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <GridItem container spacing={2}>
            {!isLogin && (
              <GridItem item xs={12} sx={{ width: "100%" }}>
                <Tooltip title="Enter your full name" arrow>
                  <TextField
                    name="name"
                    label="Name"
                    fullWidth
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Tooltip>
              </GridItem>
            )}

            <GridItem item xs={12} sx={{ width: "100%" }}>
              <Tooltip title="Enter a valid email like user@example.com" arrow>
                <TextField
                  name="useremail"
                  label="Email Address"
                  fullWidth
                  required
                  type="email"
                  value={formData.useremail}
                  onChange={handleChange}
                />
              </Tooltip>
            </GridItem>

            <GridItem item xs={12} sx={{ width: "100%" }}>
              <Tooltip
                title="Password must include uppercase, lowercase, number, and special character"
                arrow>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </Tooltip>
            </GridItem>
          </GridItem>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            {isLogin ? "Login" : "Sign Up"}
          </Button>

          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            {isLogin && (
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            )}

            <GridItem container justifyContent="flex-end">
              <GridItem item>
                <Link href="#" onClick={toggleMode} variant="body2">
                  {isLogin
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Login"}
                </Link>
              </GridItem>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthForm;
