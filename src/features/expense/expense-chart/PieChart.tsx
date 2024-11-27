import { useContext } from "react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import { Chart } from "react-google-charts";
import { useIncomeQuery } from "../api/apiGetLedger";
import { AuthContext } from "../../../App";
import { pieChartOptions } from "./chartOptions";
import LoadSpinner from "../../../global/components/LoadSpinner";

const PieChart = () => {
  const authContext = useContext(AuthContext);
  const userId = authContext?.userId;

  const { data, isLoading, error } = useIncomeQuery(userId || "");

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

  let totalIncome = 0;
  let totalExpense = 0;

  if (data) {
    data.forEach((record: any) => {
      if (record.type === "income") {
        totalIncome += record.amount;
      } else if (record.type === "expense") {
        totalExpense += record.amount;
      }
    });
  }

  const difference = totalIncome - totalExpense;

  const chartData = [
    ["Category", "Amount"],
    ["Income", totalIncome],
    ["Expense", totalExpense],
  ];

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3, height: "100%" }}>
      <CardContent sx={{ height: "100%" }}>
        <Chart
          chartType="PieChart"
          width="100%"
          height="18rem"
          data={chartData}
          options={pieChartOptions}
        />
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{
              paddingTop: "0.9rem",
              color: difference >= 0 ? "green" : "red",
            }}
          >
            Difference: ${difference.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PieChart;
