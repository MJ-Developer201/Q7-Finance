import React, { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { AuthContext } from "../../../App";
import LoadSpinner from "../../../global/components/LoadSpinner";
import { useIncomeQuery } from "../api/apiGetLedger";
import { useDeleteLedgerRecord } from "../api/apiDeleteLedger";
import { useEditLedgerRecord } from "../api/apiEditLedger";

const ExpenseList = () => {
  const authContext = useContext(AuthContext);
  const userId = authContext?.userId;
  const [filter, setFilter] = useState("all");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editRecord, setEditRecord] = useState({
    userId: "",
    recordId: 0,
    title: "",
    description: "",
    amount: 0,
    type: "income" as "income" | "expense",
  });

  const { data, isLoading, error } = useIncomeQuery(userId || "");
  const { mutate: deleteLedgerRecord } = useDeleteLedgerRecord();
  const { mutate: editLedgerRecord } = useEditLedgerRecord();

  const handleDelete = (recordId: number) => {
    if (userId) {
      deleteLedgerRecord({ userId, recordId });
    }
  };

  const handleEdit = (record: any) => {
    setEditRecord(record);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    if (editRecord) {
      editLedgerRecord(editRecord);
      setEditDialogOpen(false);
    }
  };

  if (isLoading) {
    return <LoadSpinner />;
  }

  if (error) {
    return (
      <Typography color="error" variant="h6">
        Error fetching ledger data: {error.message}
      </Typography>
    );
  }

  const filteredData = data
    ? data.filter((transaction: any) =>
        filter === "all" ? true : transaction.type === filter
      )
    : [];

  return (
    <Box>
      {/* <Box display="flex" justifyContent="space-between" mb={2}>
        <FormControl sx={{ minWidth: "15rem" }}>
          <InputLabel>Filter</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Filter"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Box> */}
      {filteredData && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                <TableCell sx={{ fontWeight: "bold", paddingLeft: "2.2rem" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((transaction: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: "0.5rem" }}>
                      <IconButton
                        onClick={() => handleDelete(transaction.recordId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(transaction)}>
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Record</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit the details of the record.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={editRecord.title}
            onChange={(e) =>
              setEditRecord({ ...editRecord, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={editRecord.description}
            onChange={(e) =>
              setEditRecord({ ...editRecord, description: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={editRecord.amount}
            onChange={(e) =>
              setEditRecord({
                ...editRecord,
                amount: parseFloat(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            label="Type"
            type="text"
            fullWidth
            value={editRecord.type as "income" | "expense"}
            onChange={(e) =>
              setEditRecord({
                ...editRecord,
                type: e.target.value as "income" | "expense",
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExpenseList;
