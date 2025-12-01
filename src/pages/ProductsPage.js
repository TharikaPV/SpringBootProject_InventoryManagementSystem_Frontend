import React, { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from "../api";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductFormDialog from "../components/ProductFormDialog";
import ConfirmDialog from "../components/ConfirmDialog";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, id: null });

  const load = async () => {
    const data = await getProducts();
    setProducts(data || []);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (payload) => {
    await addProduct(payload);
    setOpenForm(false);
    load();
  };

  const handleUpdate = async (id, payload) => {
    await updateProduct(id, payload);
    setEditing(null);
    setOpenForm(false);
    load();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setConfirm({ open: false, id: null });
    load();
  };

  const filtered = products.filter(p =>
    p.productName?.toLowerCase().includes(q.toLowerCase()) ||
    p.category?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Products</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <TextField fullWidth placeholder="Search product or category..." value={q} onChange={(e)=>setQ(e.target.value)} />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => { setEditing(null); setOpenForm(true); }}>
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2}>
        {filtered.map(p => (
          <Grid item xs={12} md={6} lg={4} key={p.productId}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{p.productName}</Typography>
              <Typography variant="body2" color="text.secondary">{p.category} • {p.supplierName}</Typography>
              <Typography sx={{ mt: 1 }}><strong>Qty:</strong> {p.quantity} • <strong>Price:</strong> ₹{p.price}</Typography>
              <Typography sx={{ mt: 1 }} color={p.status === "EXPIRED" || p.status === "Expired" ? "error.main" : "text.secondary"}>
                <strong>Expiry:</strong> {p.expiryDate}
              </Typography>

              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <IconButton color="primary" onClick={() => { setEditing(p); setOpenForm(true); }}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => setConfirm({ open: true, id: p.productId })}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <ProductFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onCreate={handleAdd}
        onUpdate={handleUpdate}
        editing={editing}
      />

      <ConfirmDialog open={confirm.open} onClose={() => setConfirm({ open:false, id:null })} onConfirm={() => handleDelete(confirm.id)} title="Delete product?" />
    </Box>
  );
}
