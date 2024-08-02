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

  const weekExpenses = props.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const today = new Date();
    const diff = today - expenseDate;
    const days = diff / (1000 * 60 * 60 * 24);
    return days <= 7;
  });

  const monthExpenses = props.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const today = new Date();
    const diff = today - expenseDate;
    const days = diff / (1000 * 60 * 60 * 24);
    return days <= 30;
  });

  const yearExpenses = props.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const today = new Date();
    const diff = today - expenseDate;
    const days = diff / (1000 * 60 * 60 * 24);
    return days <= 365;
  });

  return (
    <>
      <h1>Expenses</h1>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-[400px]"
      >
        <TabsList className="w-[800px]">
          <TabsTrigger value="Week">Week</TabsTrigger>
          <TabsTrigger value="Month">Month</TabsTrigger>
          <TabsTrigger value="Year">Year</TabsTrigger>
        </TabsList>
        <div className="mb-6">
          <Label htmlFor="category-select" className="mb-2">
            Filter by Category
          </Label>
          <Select
            id="category-select"
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full max-w-[200px]"
          >
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Household">Household</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Utilities">Utilities</SelectItem>
              <SelectItem value="Housing">Housing</SelectItem>
              <SelectItem value="Transportation">Transportation</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Gifts">Gifts</SelectItem>
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
                  {weekExpenses.map((expense) => {
                    return (
                      <TableRow key={expense.id}>
                        <TableCell>{expense.name}</TableCell>
                        <TableCell>{expense.amount}</TableCell>
                        <TableCell>{expense.date}</TableCell>
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
                  {monthExpenses.map((expense) => {
                    return (
                      <TableRow key={expense.id}>
                        <TableCell>{expense.name}</TableCell>
                        <TableCell>{expense.amount}</TableCell>
                        <TableCell>{expense.date}</TableCell>
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
                  {yearExpenses.map((expense) => {
                    return (
                      <TableRow key={expense.id}>
                        <TableCell>{expense.name}</TableCell>
                        <TableCell>{expense.amount}</TableCell>
                        <TableCell>{expense.date}</TableCell>
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
    </>
  );
};

export default ExpenseTable;
