import ExpenseTable from "./ExpenseTable";
import ExpenseForm from "./ExpenseForm";
import { ExpenseLineChart } from "./LineChart";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import CategoriesPieChart from "./CategoriesPieChart";

const Dashboard = (props) => {
  return (
    <main className="grid grid-cols-1 gap-16 px-24 py-12 lg:grid-cols-2">
      <div className="grid gap-8">
        <ExpenseTable {...props} />
        <Card className="max-h-[600px] w-fit min-w-[400px] max-w-[800px] shadow-md">
          <CardHeader>
            <CardTitle>Add Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseForm handleCreateExpense={props.handleCreateExpense} />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-8">
        <CategoriesPieChart expenses={props.expenses} />
        <ExpenseLineChart expenses={props.expenses} settings={props.settings} />
      </div>
    </main>
  );
};

export default Dashboard;
