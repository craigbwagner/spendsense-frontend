import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

import { Label } from "./ui/label";

const ExpenseTable = (props) => {
  const [activeTab, setActiveTab] = useState("Week");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const weeklyExpenses = props.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const today = new Date();
    const diff = today - expenseDate;
    const days = diff / (1000 * 60 * 60 * 24);
    return days <= 7;
  });

  const monthlyExpenses = props.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const today = new Date();
    const diff = today - expenseDate;
    const days = diff / (1000 * 60 * 60 * 24);
    return days <= 30;
  });

  const yearlyExpenses = props.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const today = new Date();
    const diff = today - expenseDate;
    const days = diff / (1000 * 60 * 60 * 24);
    return days <= 365;
  });

  const filteredExpenses = (tab) => {
    switch (tab) {
      case "week":
        return selectedCategory === "all"
          ? weeklyExpenses
          : weeklyExpenses.filter(
              (expense) => expense.category === selectedCategory,
            );
      case "month":
        return selectedCategory === "all"
          ? monthlyExpenses
          : monthlyExpenses.filter(
              (expense) => expense.category === selectedCategory,
            );
      case "year":
        return selectedCategory === "all"
          ? yearlyExpenses
          : yearlyExpenses.filter(
              (expense) => expense.category === selectedCategory,
            );
      default:
        return [];
    }
  };

  return (
    <main className="m-24 w-[800px]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="Week">
            Week
          </TabsTrigger>
          <TabsTrigger className="w-full" value="Month">
            Month
          </TabsTrigger>
          <TabsTrigger className="w-full" value="Year">
            Year
          </TabsTrigger>
        </TabsList>
        <div className="mb-6">
          <Label htmlFor="category-select" className="mb-2">
            Filter by Category
          </Label>
          <Select
            id="category-select"
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="food_groceries">Food</SelectItem>
              <SelectItem value="transportation">Transportation</SelectItem>
              <SelectItem value="housing">Housing</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="medical">Medical</SelectItem>
              <SelectItem value="insurance">Insurance</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <TabsContent value="Week">
          <Card className="w-[800px]">
            <CardHeader>
              <CardTitle>This week's expenses</CardTitle>
              <CardDescription>All expenses for this week </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses("week").map((expense) => {
                    return (
                      <TableRow key={expense.id}>
                        <TableCell>{expense.name}</TableCell>
                        <TableCell>${expense.amount}</TableCell>
                        <TableCell>{formatDate(expense.date)}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Month">
          <Card className="w-[800px]">
            <CardHeader>
              <CardTitle>This month's expenses</CardTitle>
              <CardDescription>All expenses for this month</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses("month").map((expense) => {
                    return (
                      <TableRow key={expense.id}>
                        <TableCell>{expense.name}</TableCell>
                        <TableCell>{expense.amount}</TableCell>
                        <TableCell>{formatDate(expense.date)}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Year">
          <Card className="w-[800px]">
            <CardHeader>
              <CardTitle>This year's expenses</CardTitle>
              <CardDescription>All expenses for this year</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses("year").map((expense) => {
                    return (
                      <TableRow key={expense.id}>
                        <TableCell>{expense.name}</TableCell>
                        <TableCell>{expense.amount}</TableCell>
                        <TableCell>{formatDate(expense.date)}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default ExpenseTable;
