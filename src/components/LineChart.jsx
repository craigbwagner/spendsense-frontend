import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import moment from "moment";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const thisMonth = moment().startOf("month");
const sixMonthsAgo = thisMonth.clone().subtract(6, "months");

const reverseMonthNames = Array.from({ length: 6 }, (_, i) => {
  return thisMonth.clone().subtract(i, "months").format("MMMM");
});

const monthNames = reverseMonthNames.reverse();

console.log(monthNames);

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
};

export function ExpenseLineChart(props) {
  const recentExpenses = props.expenses.filter((expense) => {
    const expenseDate = moment.utc(expense.date);
    return (
      expenseDate.isAfter(sixMonthsAgo) &&
      expenseDate.isBefore(thisMonth) &&
      expense.category !== "income"
    );
  });

  const chartData = monthNames.map((month) => {
    return {
      month,
      income: Math.floor(Math.random() * 1000),
      expenses: recentExpenses
        .filter((expense) => moment.utc(expense.date).format("MMMM") === month)
        .reduce((total, expense) => total + Number(expense.amount), 0),
    };
  });

  return (
    <Card className="min-w-[400px] max-w-[800px] shadow-md">
      <CardHeader>
        <CardTitle>Income and expenses</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h-[300px] min-h-96" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Line
              dataKey="income"
              type="monotone"
              stroke="var(--color-income)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="expenses"
              type="monotone"
              stroke="var(--color-expenses)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total income and expenses for the past 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
