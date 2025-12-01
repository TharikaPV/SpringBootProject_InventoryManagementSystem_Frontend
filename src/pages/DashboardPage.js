import React, { useEffect, useState } from "react";
import { getDashboard } from "../api";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, expired: 0, lowStock: 0 });

  useEffect(() => {
    (async () => {
      try {
        const data = await getDashboard();
        setStats(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, bgcolor: "primary.main", color: "#fff" }}>
            <Typography variant="h6">Total Products</Typography>
            <Typography variant="h3">{stats.total}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, bgcolor: "#ff6b6b", color: "#fff" }}>
            <Typography variant="h6">Expired</Typography>
            <Typography variant="h3">{stats.expired}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, bgcolor: "#ffb020", color: "#000" }}>
            <Typography variant="h6">Low Stock</Typography>
            <Typography variant="h3">{stats.lowStock}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
