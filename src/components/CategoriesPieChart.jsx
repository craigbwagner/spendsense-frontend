"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

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


const CategoriesPieChart = ({ expenses }) => {
  const categorySpending = {};
  const categories = ["housing", "transportation", "food_groceries", "utilities", "clothing", "medical", "insurance", "personal", "education", "entertainment", "other"];

  categories.forEach((category) => {
    const categoryExpenses = expenses.filter((expense) => {
      return expense.category === category});

    if (!categoryExpenses.length) {
      return;
    } else {
      categorySpending[category] = categoryExpenses.reduce((total, expense) => {
        return total + Number(expense.amount);
      }, 0);
    }
  });

const chartData = [
  { category: "Housing", amountSpent: categorySpending.housing, fill: "var(--color-housing)" },
  { category: "Transportation", amountSpent: categorySpending.transportation, fill: "var(--color-transportation)" },
  { category: "Food/Groceries", amountSpent: categorySpending.food_groceries, fill: "var(--color-foodGroceries)" },
  { category: "Utilities", amountSpent: categorySpending.utilities, fill: "var(--color-utilities)" },
  { category: "Clothing", amountSpent: categorySpending.clothing, fill: "var(--color-clothing)" },
  { category: "Medical", amountSpent: categorySpending.medical, fill: "var(--color-medical)" },
  { category: "Insurance", amountSpent: categorySpending.insurance, fill: "var(--color-insurance)" },
  { category: "Personal", amountSpent: categorySpending.personal, fill: "var(--color-personal)" },
  { category: "Education", amountSpent: categorySpending.education, fill: "var(--color-education)" },
  { category: "Entertainment", amountSpent: categorySpending.entertainment, fill: "var(--color-entertainment)" },
  { category: "other", amountSpent: categorySpending.housing, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  housing: {
    label: "Housing",
    color: "hsl(var(--chart-1))",
  },
  transportation: {
    label: "Transportation",
    color: "hsl(var(--chart-2))",
  },
  foodGroceries: {
    label: "Food/Groceries",
    color: "hsl(var(--chart-3))",
  },
  utilities: {
    label: "Utilities",
    color: "hsl(var(--chart-4))",
  },
  clothing: {
    label: "Clothing",
    color: "hsl(var(--chart-5))",
  },
  medical: {
    label: "Medical",
    color: "hsl(var(--chart-6))",
  },
  insurance: {
    label: "Insurance",
    color: "hsl(var(--chart-7))",
  },
  personal: {
    label: "Personal",
    color: "hsl(var(--chart-8))",
  },
  education: {
    label: "Education",
    color: "hsl(var(--chart-9))",
  },
  entertainment: {
    label: "Entertainment",
    color: "hsl(var(--chart-10))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-11))",
  },
}
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amountSpent"
              nameKey="category"
              innerRadius={0}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

export default CategoriesPieChart;
