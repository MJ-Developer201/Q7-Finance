import React, { useEffect, useState, useContext } from "react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import { Chart } from "react-google-charts";
import axios from "axios";
import { AuthContext } from "../../../App"; // Adjust the import path as necessary

const PieChart = () => {
  const authContext = useContext(AuthContext);
  const apiGatewayUrl = import.meta.env.VITE_API_GATEWAY_URL;
  const userId = authContext?.userId;
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [difference, setDifference] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLedgerData = async () => {
      try {
        const response = await axios.get(`${apiGatewayUrl}/ledger/${userId}`);
        const ledgerData = response.data;

        let income = 0;
        let expense = 0;

        ledgerData.forEach((record: any) => {
          if (record.type === "income") {
            income += record.amount;
          } else if (record.type === "expense") {
            expense += record.amount;
          }
        });

        setTotalIncome(income);
        setTotalExpense(expense);
        setDifference(income - expense);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Typography color="error" variant="h6">
        Error fetching ledger data: {error}
      </Typography>
    );
  }

  const data = [
    ["Category", "Amount"],
    ["Income", totalIncome],
    ["Expense", totalExpense],
  ];

  const options = {
    title: "Financial Summary",
    pieHole: 0,
    slices: [
      { color: "#4caf50" }, // Income
      { color: "#f44336" }, // Expense
    ],
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#333",
        fontSize: 14,
      },
    },
    pieSliceText: "none",
    tooltip: {
      text: "value",
    },
    chartArea: {
      width: "90%",
      height: "80%",
    },
  };

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3, height: "100%" }}>
      <CardContent sx={{ height: "100%" }}>
        <Chart
          chartType="PieChart"
          width="100%"
          height="300px" // Adjust the height to make the chart bigger
          data={data}
          options={options}
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
