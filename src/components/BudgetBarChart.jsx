import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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

const chartConfig = {
  expenses: {
    label: "Spending",
    color: "hsl(var(--chart-1))",
  },
  budget: {
    label: "Budget",
    color: "hsl(var(--chart-2))",
  },
};

export function BudgetBarChart(props) {
  const thisMonth = moment().startOf("month");

  const thisMonthTotalExpenses = props.expenses
    .filter((expense) => {
      const expenseDate = moment.utc(expense.date);
      return (
        expenseDate.isSameOrAfter(thisMonth) && expense.category !== "income"
      );
    })
    .reduce((total, expense) => {
      return total + Number(expense.amount);
    }, 0);

  const lastMonth = thisMonth.clone().subtract(1, "month");
  const lastMonthTotalExpenses = props.expenses
    .filter((expense) => {
      const expenseDate = moment.utc(expense.date);
      return (
        expenseDate.isSameOrAfter(lastMonth) && expense.category !== "income"
      );
    })
    .reduce((total, expense) => {
      return total + Number(expense.amount);
    }, 0);

  const chartData = [
    {
      month: lastMonth.format("MMMM"),
      expenses: lastMonthTotalExpenses,
      budget: props.settings.monthly_budget,
    },
    {
      month: thisMonth.format("MMMM"),
      expenses: thisMonthTotalExpenses,
      budget: props.settings.monthly_budget,
    },
  ];
  return (
    <Card className="flex flex-col justify-between shadow-md xl:min-w-[400px]">
      <CardHeader>
        <CardTitle>Budget and Spending</CardTitle>
        <CardDescription>
          {`${lastMonth.format("MMMM")} - ${thisMonth.format("MMMM")}, ${moment().year()} `}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
            <Bar dataKey="budget" fill="var(--color-budget)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          This month's spending compared to last month's spending
        </div>
      </CardFooter>
    </Card>
  );
}
