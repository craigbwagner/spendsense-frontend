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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Button } from "./ui/button";
import { Label } from "./ui/label";

import ExpenseForm from "./ExpenseForm";

const ExpenseTable = (props) => {
  const [activeTab, setActiveTab] = useState("Week");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [open, setOpen] = useState(false);

  const formatDate = (dateString) => {
    return moment.utc(dateString).format("MMM Do YYYY");
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

  const handleDelete = async (expenseId) => {
    try {
      await props.handleDeleteExpense(expenseId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="min-w-[300px]">
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
      <Card className="scrollbar-thin max-h-[500px] min-w-[300px] overflow-auto shadow-md">
        <CardHeader className="flex flex-row items-start justify-between pb-8">
          <div>
            <CardTitle>This {activeTab}'s transactions</CardTitle>
            <CardDescription>
              All transactions for this {activeTab}{" "}
            </CardDescription>
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

                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="insurance">Insurance</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="other">Other</SelectItem>
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
                <TableHead className="w-8"></TableHead>
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
                      <TableCell className="font-semibold">
                        {expense.name}
                      </TableCell>
                      <TableCell
                        className={
                          expense.category === "income"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        $ {""}
                        {expense.category === "income"
                          ? `+${String(expense.amount).split("-")[1]}`
                          : `-${expense.amount}`}
                      </TableCell>
                      <TableCell>{formatDate(expense.date)}</TableCell>
                      <TableCell>
                        {expense.category == "food_groceries"
                          ? "food"
                          : expense.category}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              ...
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              className="p-0"
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                  Edit
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit expense</DialogTitle>
                                  </DialogHeader>
                                  <DialogDescription></DialogDescription>
                                  <ExpenseForm
                                    expense={expense}
                                    handleUpdateExpense={
                                      props.handleUpdateExpense
                                    }
                                    setOpen={setOpen}
                                  />
                                </DialogContent>
                              </Dialog>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="p-0"
                              onSelect={(e) => e.preventDefault()}
                            >
                              <AlertDialog>
                                <AlertDialogTrigger className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-red-500 outline-none transition-colors hover:bg-gray-100 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                  Delete
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you sure you want to delete this?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will
                                      permanently delete the expense.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(expense.id)}
                                    >
                                      delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
