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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const ExpenseTable = (props) => {
  return (
    <>
      <h1>Expenses</h1>
      <Tabs defaultValue="Week" className="w-full">
        <TabsList className="w-[800px]">
          <TabsTrigger value="Week">Week</TabsTrigger>
          <TabsTrigger value="Month">Month</TabsTrigger>
          <TabsTrigger value="Year">Year</TabsTrigger>
        </TabsList>
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {props.expenses.map((expense) => {
                    return (
                      <TableRow key={expense.id}>
                        <TableCell>{expense.name}</TableCell>
                        <TableCell>{expense.amount}</TableCell>
                        <TableCell>{expense.date}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Month">Month</TabsContent>
        <TabsContent value="Year">Year</TabsContent>
      </Tabs>
    </>
  );
};

export default ExpenseTable;
