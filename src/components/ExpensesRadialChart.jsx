import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import moment from "moment";
import { TrendingUp } from "lucide-react";

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
    label: "Expenses",
    color: "hsl(var(--chart-1))",
  },
  projectedExpenses: {
    label: "Projected Expenses",
    color: "hsl(var(--chart-2))",
  },
};

export function ExpensesRadialChart(props) {
  const thisMonth = moment().startOf("month");
  const monthlyExpenses = props.expenses.filter((expense) => {
    const expenseDate = moment.utc(expense.date);
    return (
      expenseDate.isSameOrAfter(thisMonth) && expense.category !== "income"
    );
  });

  const totalExpenses = monthlyExpenses.reduce((total, expense) => {
    return total + Number(expense.amount);
  }, 0);

  const dayOfMonth = moment().date();
  const projectedExpenses = totalExpenses + (totalExpenses / dayOfMonth) * 31;

  const budget = props.settings.monthly_budget;

  const overShooting = budget - projectedExpenses;

  const chartData = [
    {
      month: thisMonth.format("MMMM"),
      expenses: totalExpenses,
      projectedExpenses,
    },
  ];

  return (
    <Card className="flex min-w-[300px] flex-col shadow-md">
      <CardHeader className="items-center pb-0">
        <CardTitle>Projected Monthly Expenses</CardTitle>
        <CardDescription>
          {thisMonth.format("MMMM")} {moment().year()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          ${String(projectedExpenses).split(".")[0]}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Projected Expenses
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="projectedExpenses"
              fill="var(--color-projectedExpenses)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="expenses"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-expenses)"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Projected to{" "}
          {overShooting > 0 ? "stay within budget" : "overshoot budget"}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing projected expenses for the month of {thisMonth.format("MMMM")}
        </div>
      </CardFooter>
    </Card>
  );
}
