import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const ExpenseTable = (props) => {
  return (
    <>
      <h1>Expenses</h1>
      <Tabs defaultValue="Week" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="Week">Week</TabsTrigger>
          <TabsTrigger value="Month">Month</TabsTrigger>
          <TabsTrigger value="Year">Year</TabsTrigger>
        </TabsList>
        <TabsContent value="Week">Week</TabsContent>
        <TabsContent value="Month">Month</TabsContent>
        <TabsContent value="Year">Year</TabsContent>
      </Tabs>
    </>
  );
};

export default ExpenseTable;
