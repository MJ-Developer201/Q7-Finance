import React, { useEffect, useState, useContext } from "react";
import {
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DescriptionIcon from "@mui/icons-material/Description";
import axios from "axios";
import { AuthContext } from "../../../App"; // Adjust the import path as necessary

const ExpenseList = () => {
  const authContext = useContext(AuthContext);
  const apiGatewayUrl = import.meta.env.VITE_API_GATEWAY_URL;
  const userId = authContext?.userId;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchLedgerData = async () => {
      try {
        const response = await axios.get(`${apiGatewayUrl}/ledger/${userId}`);
        setData(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchLedgerData();
    }
  }, [userId, apiGatewayUrl]);

  const filteredData = data
    ? data.filter((transaction: any) =>
        filter === "all" ? true : transaction.type === filter
      )
    : [];

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography color="error" variant="h6">
        Error fetching ledger data: {error}
      </Typography>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        {/* <FormControl sx={{ minWidth: "15rem" }}>
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
        </FormControl> */}
      </Box>
      {filteredData && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((transaction: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ExpenseList;
