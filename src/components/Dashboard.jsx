import ExpenseTable from "./ExpenseTable";
import ExpenseForm from "./ExpenseForm";
import { ExpenseLineChart } from "./LineChart";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "./ui/card";

const Dashboard = (props) => {
  return (
    <div>
      <ExpenseTable {...props} />
      <Card className="m-24 max-h-[600px] w-fit min-w-[400px] max-w-[800px] shadow-md">
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <ExpenseForm handleCreateExpense={props.handleCreateExpense} />
        </CardContent>
      </Card>
      <ExpenseLineChart expenses={props.expenses} />
    </div>
  );
};

export default Dashboard;
