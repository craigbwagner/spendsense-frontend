import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

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
              <p>Details: This is the first expense</p>
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
