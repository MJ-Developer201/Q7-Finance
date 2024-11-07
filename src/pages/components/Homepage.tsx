import { Box } from "@mui/material";
import ExpenseForm from "../../features/expense/expense-form/ExpenseForm";
import ExpenseList from "../../features/expense/expense-list/ExpenseList";
import PieChart from "../../features/expense/expense-chart/PieChart";

export default function Homepage() {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <ExpenseForm />
        </Box>
        <Box sx={{ flex: 1 }}>
          <PieChart />
        </Box>
      </Box>
      <ExpenseList />
    </>
  );
}
