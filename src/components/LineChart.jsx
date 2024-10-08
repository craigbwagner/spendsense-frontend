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

const thisMonth = moment().endOf("month");
const sixMonthsAgo = thisMonth.clone().subtract(6, "months");

const reverseMonthNames = Array.from({ length: 6 }, (_, i) => {
  return thisMonth.clone().subtract(i, "months").format("MMMM");
});

const monthNames = reverseMonthNames.reverse();

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

  const recentIncome = props.expenses.filter((expense) => {
    const expenseDate = moment.utc(expense.date);
    return (
      expenseDate.isAfter(sixMonthsAgo) &&
      expenseDate.isBefore(thisMonth) &&
      expense.category === "income"
    );
  });

  const monthlyIncome = props.settings.monthly_income;

  let thisMonthExpenses = 0;
  let lastMonthExpenses = 0;

  recentExpenses.forEach((expense) => {
    if (moment.utc(expense.date).format("MMMM") === thisMonth.format("MMMM")) {
      thisMonthExpenses += Number(expense.amount);
    } else if (
      moment.utc(expense.date).format("MMMM") ===
      thisMonth.clone().subtract(1, "months").format("MMMM")
    ) {
      lastMonthExpenses += Number(expense.amount);
    }
  });

  const chartData = monthNames.map((month) => {
    return {
      month,
      income: recentIncome
        .filter((expense) => moment.utc(expense.date).format("MMMM") === month)
        .reduce(
          (total, expense) => total + Number(expense.amount) * -1,
          monthlyIncome,
        ),

      expenses: recentExpenses
        .filter((expense) => moment.utc(expense.date).format("MMMM") === month)
        .reduce((total, expense) => total + Number(expense.amount), 0),
    };
  });

  const percentageIncrease =
    ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;

  return (
    <Card className="min-w-[400px] shadow-md">
      <CardHeader>
        <CardTitle>Income and expenses</CardTitle>
        <CardDescription>{`${moment.utc(sixMonthsAgo).format("MMMM")} - ${moment.utc(thisMonth).subtract(1, "month").format("MMMM")}, ${moment.utc().year()} `}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h-[450px] w-full" config={chartConfig}>
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
              activeDot={{ r: 8 }}
            />
            <Line
              dataKey="expenses"
              type="monotone"
              stroke="var(--color-expenses)"
              strokeWidth={2}
              dot={true}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Expenses are trending {percentageIncrease > 0 ? "up" : "down"} by{" "}
              {String(percentageIncrease).split(".")[0].replace("-", "")}% this
              month <TrendingUp className="h-4 w-4" />
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
