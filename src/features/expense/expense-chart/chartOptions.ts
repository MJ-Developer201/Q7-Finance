export const pieChartOptions = {
  title: "Financial Summary",
  pieHole: 0, // No pie hole for a full pie chart
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
