import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Tabs,
  Tab,
  Box,
  AppBar,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { usePostIncomeRecord } from "../api/apiPostLedger";
import { format } from "date-fns";
import { AuthContext } from "../../../App";
interface ExpenseFormProps {}

const ExpenseForm: React.FC<ExpenseFormProps> = () => {
  const authContext = useContext(AuthContext);
  const userId = authContext?.userId;
  console.log("userId", userId);

  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const { mutate: postIncomeRecord } = usePostIncomeRecord();

  const handleSubmit = () => {
    if (!userId) {
      setSnackbarMessage("User ID is missing.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const generateUniqueId = (): number => {
      return Date.now() + Math.floor(Math.random() * 1000);
    };

    const newRecord = {
      recordId: generateUniqueId(),
      userId,
      title,
      description,
      amount: tabIndex === 0 ? income : expense,
      type: tabIndex === 0 ? ("income" as const) : ("expense" as const),
      createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
    };

    postIncomeRecord(newRecord, {
      onSuccess: () => {
        setSnackbarMessage("Record submitted successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        handleClear();
      },
      onError: () => {
        setSnackbarMessage("Failed to submit record.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      },
    });
  };

  const handleClear = () => {
    setIncome(0);
    setExpense(0);
    setDescription("");
    setTitle("");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" sx={{ color: "#3f51b5" }}>
          Financial Input
        </Typography>
        <AppBar
          elevation={2}
          position="static"
          sx={{ backgroundColor: "white", borderRadius: 1.5 }}
        >
          <Tabs
            value={tabIndex}
            onChange={(e, value) => setTabIndex(value)}
            variant="fullWidth"
          >
            <Tab label="Income" />
            <Tab label="Expense" />
          </Tabs>
        </AppBar>
        <Box hidden={tabIndex !== 0}>
          <TextField
            label="Income"
            type="number"
            fullWidth
            margin="normal"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Title"
            type="text"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            type="text"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Box hidden={tabIndex !== 1}>
          <TextField
            label="Expense"
            type="number"
            fullWidth
            margin="normal"
            value={expense}
            onChange={(e) => setExpense(Number(e.target.value))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Title"
            type="text"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            type="text"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Box gap={"1rem"} display="flex" justifyContent="end" marginTop={2}>
          <Button variant="outlined" onClick={handleClear}>
            Clear
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#3f51b5", color: "#fff" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </CardContent>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ExpenseForm;
