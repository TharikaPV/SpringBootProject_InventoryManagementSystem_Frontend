import React, { useEffect, useState } from "react";
import { getUsers, addUser, deleteUser } from "../api";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ConfirmDialog from "../components/ConfirmDialog";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: "", password: "", roles: ["ROLE_USER"] });
  const [confirm, setConfirm] = useState({ open: false, id: null });

  const load = async () => {
    const data = await getUsers();
    setUsers(data || []);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    await addUser(form);
    setForm({ username: "", password: "", roles: ["ROLE_USER"] });
    load();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setConfirm({ open: false, id: null });
    load();
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Users</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs>
            <TextField label="Username" value={form.username} onChange={(e) => setForm(f => ({ ...f, username: e.target.value }))} fullWidth />
          </Grid>
          <Grid item xs>
            <TextField label="Password" value={form.password} onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))} fullWidth />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleCreate}>Add User</Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2}>
        {users.map(u => (
          <Grid item xs={12} md={6} key={u.id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{u.username}</Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                <Button variant="outlined" color="error" onClick={() => setConfirm({ open: true, id: u.id })}>Delete</Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <ConfirmDialog open={confirm.open} onClose={() => setConfirm({ open:false, id:null })} onConfirm={() => handleDelete(confirm.id)} title="Delete user?" />
    </div>
  );
}
