import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { AuthContext } from "../auth/AuthProvider";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Products", to: "/products" },
  { label: "Users", to: "/users" }
];

export default function Layout() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" color="primary" elevation={2}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Smart Inventory
          </Typography>
          <Button color="inherit" onClick={() => { logout(); navigate("/login"); }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 240 }} role="presentation" onClick={() => setOpen(false)}>
          <List>
            {navItems.map(i => (
              <ListItemButton key={i.to} onClick={() => navigate(i.to)}>
                <ListItemText primary={i.label} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <List>
            <ListItemButton onClick={() => { navigate("/dashboard"); }}>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
