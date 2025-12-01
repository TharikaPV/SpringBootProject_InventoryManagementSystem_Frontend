import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function ProductFormDialog({ open, onClose, onCreate, onUpdate, editing }) {
  const [form, setForm] = useState({
    category: "",
    expiryDate: "",
    manufactureDate: "",
    price: 0,
    productName: "",
    quantity: 0,
    status: "Available",
    supplierName: ""
  });

  useEffect(() => {
    if (editing) {
      setForm({
        category: editing.category || "",
        expiryDate: editing.expiryDate || "",
        manufactureDate: editing.manufactureDate || "",
        price: editing.price || 0,
        productName: editing.productName || "",
        quantity: editing.quantity || 0,
        status: editing.status || "Available",
        supplierName: editing.supplierName || ""
      });
    } else {
      setForm({
        category: "",
        expiryDate: "",
        manufactureDate: "",
        price: 0,
        productName: "",
        quantity: 0,
        status: "Available",
        supplierName: ""
      });
    }
  }, [editing, open]);

  const handleChange = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = () => {
    if (editing) {
      onUpdate(editing.productId, form);
    } else {
      onCreate(form);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editing ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
          <TextField label="Product Name" value={form.productName} onChange={handleChange("productName")} fullWidth />
          <TextField label="Category" value={form.category} onChange={handleChange("category")} fullWidth />
          <TextField label="Supplier" value={form.supplierName} onChange={handleChange("supplierName")} fullWidth />
          <TextField label="Quantity" type="number" value={form.quantity} onChange={handleChange("quantity")} fullWidth />
          <TextField label="Price" type="number" value={form.price} onChange={handleChange("price")} fullWidth />
          <TextField label="Manufacture Date (YYYY-MM-DD)" value={form.manufactureDate} onChange={handleChange("manufactureDate")} fullWidth />
          <TextField label="Expiry Date (YYYY-MM-DD)" value={form.expiryDate} onChange={handleChange("expiryDate")} fullWidth />
          <TextField label="Status" value={form.status} onChange={handleChange("status")} fullWidth />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>{editing ? "Save" : "Create"}</Button>
      </DialogActions>
    </Dialog>
  );
}
