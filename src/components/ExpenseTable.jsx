import { useState } from "react";
import moment from "moment";

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

  const isThisWeek = (dateString) => {
    const date = moment(dateString);
    const startOfWeek = moment().startOf("week");
    const endOfWeek = moment().endOf("week");
    return date.isBetween(startOfWeek, endOfWeek, null, "[]");
  };

  const isThisMonth = (dateString) => {
    const date = moment(dateString);
    const startOfMonth = moment().startOf("month");
    const endOfMonth = moment().endOf("month");
    return date.isBetween(startOfMonth, endOfMonth, null, "[]");
  };

  const isThisYear = (dateString) => {
    const date = moment(dateString);
    const startOfYear = moment().startOf("year");
    const endOfYear = moment().endOf("year");
    return date.isBetween(startOfYear, endOfYear, null, "[]");
  };

  const weeklyExpenses = props.expenses.filter((expense) => {
    return isThisWeek(expense.date);
  });

  const monthlyExpenses = props.expenses.filter((expense) => {
    return isThisMonth(expense.date);
  });

  const yearlyExpenses = props.expenses.filter((expense) => {
    return isThisYear(expense.date);
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

        <TabsContent value="Week"></TabsContent>
        <TabsContent value="Month"></TabsContent>
        <TabsContent value="Year"></TabsContent>
      </Tabs>
      <Card className="max-h-[600px] w-[800px] overflow-auto shadow-md">
        <CardHeader className="flex flex-row items-start justify-between pb-8">
          <div>
            <CardTitle>This {activeTab}'s expenses</CardTitle>
            <CardDescription>All expenses for this week </CardDescription>
          </div>
          <div className="m-0 flex items-center gap-4 p-0">
            <Label htmlFor="category-select">Category:</Label>
            <Select
              id="category-select"
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="m-0 w-48">
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
              {filteredExpenses(activeTab.toLowerCase())
                .sort((a, b) => {
                  return new Date(b.date) - new Date(a.date);
                })
                .map((expense) => {
                  return (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.name}</TableCell>
                      <TableCell>${expense.amount}</TableCell>
                      <TableCell>{formatDate(expense.date)}</TableCell>
                      <TableCell>
                        {expense.category == "food_groceries"
                          ? "food"
                          : expense.category}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
};

export default ExpenseTable;
