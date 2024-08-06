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
import CategoriesPieChart from "./CategoriesPieChart";

const Dashboard = (props) => {
  return (
    <div>
      <ExpenseTable {...props} />
      <Card className="m-24 max-h-[600px] w-fit min-w-[400px] max-w-[800px] shadow-md">
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseForm handleCreateExpense={props.handleCreateExpense} />
        </CardContent>
      </Card>
      <CategoriesPieChart expenses={props.expenses} />
      <ExpenseLineChart expenses={props.expenses} />
    </div>
  );
};

export default Dashboard;
