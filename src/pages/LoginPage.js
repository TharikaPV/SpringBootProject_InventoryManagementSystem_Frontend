import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, setToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const resp = await login(username, password);
      // login returns token if successful
      // setToken already handled by AuthProvider; navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setErr(error.response?.data?.message || error.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 12, p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Sign in</Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField margin="normal" label="Username" fullWidth required value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField margin="normal" label="Password" type="password" fullWidth required value={password} onChange={(e) => setPassword(e.target.value)} />
          {err && <Typography color="error" variant="body2">{err}</Typography>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Sign In</Button>
        </Box>
      </Paper>
    </Container>
  );
}
