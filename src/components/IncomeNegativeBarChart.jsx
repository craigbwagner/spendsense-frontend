"use client"

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts";
import moment from "moment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const thisMonth = moment().endOf("month");
const threeMonthsAgo = thisMonth.clone().subtract(3, "months");

const reverseMonthNames = Array.from({ length: 3 }, (_, i) => {
  return thisMonth.clone().subtract(i, "months").format("MMMM");
});

const monthNames = reverseMonthNames.reverse();

const chartConfig = {
  netIncome: {
    label: "Net Income",
  },
}

const IncomeNegativeBarChart = (props) => {
  const recentExpenses = props.expenses.filter((expense) => {
    const expenseDate = moment.utc(expense.date);
    return (
      expenseDate.isAfter(threeMonthsAgo) &&
      expenseDate.isBefore(thisMonth) &&
      expense.category !== "income"
    );
  });

  const recentIncome = props.expenses.filter((expense) => {
    const expenseDate = moment.utc(expense.date);
    return (
      expenseDate.isAfter(threeMonthsAgo) &&
      expenseDate.isBefore(thisMonth) &&
      expense.category === "income"
    );
  });

  const monthlyIncome = props.settings.monthly_income;

  const monthlyIncomeAndExpenses = monthNames.map((month) => {
    return {
      month,
      income: recentIncome
        .filter((expense) => moment.utc(expense.date).format("MMMM") === month)
        .reduce(
          (total, expense) => total + Number(expense.amount),
          monthlyIncome,
        ),

      expenses: recentExpenses
        .filter((expense) => moment.utc(expense.date).format("MMMM") === month)
        .reduce((total, expense) => total + Number(expense.amount), 0),
    };
  })

  const chartData = monthlyIncomeAndExpenses.map((item) => {
    return {
      month: item.month,
      netIncome: item.income - item.expenses,
    };
  });


  return (
    <Card>
      <CardHeader>
        <CardTitle>Net Income</CardTitle>
        <CardDescription>{`${moment.utc(threeMonthsAgo).format("MMMM")} - ${moment.utc(thisMonth).format("MMMM")}, ${moment.utc().year()} `}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Bar dataKey="netIncome">
              <LabelList position="top" dataKey="month" fillOpacity={1} />
              {chartData.map((item) => (
                <Cell
                  key={item.month}
                  fill={
                    item.netIncome > 0
                      ? "hsl(var(--chart-2))"
                      : "hsl(var(--chart-11))"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing Net Income for the last 3 months
        </div>
      </CardFooter>
    </Card>
  )
}

export default IncomeNegativeBarChart;
