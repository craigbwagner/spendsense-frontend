import ExpenseTable from "./ExpenseTable";
import ExpenseForm from "./ExpenseForm";
import { ExpenseLineChart } from "./LineChart";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import CategoriesPieChart from "./CategoriesPieChart";
import { ExpensesRadialChart } from "./ExpensesRadialChart";
import { BudgetBarChart } from "./BudgetBarChart";

const Dashboard = (props) => {
  return (
    <main className="grid grid-cols-1 gap-16 bg-slate-50 px-24 py-12 lg:grid-cols-2">
      <div className="grid gap-8">
        <ExpenseTable {...props} />
        <div className="flex justify-between gap-8 overflow-auto">
          <Card className="max-h-fit w-fit max-w-[800px] shadow-md xl:min-w-[400px]">
            <CardHeader>
              <CardTitle>Add Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseForm handleCreateExpense={props.handleCreateExpense} />
            </CardContent>
          </Card>
          <BudgetBarChart expenses={props.expenses} settings={props.settings} />
        </div>
      </div>
      <div className="grid gap-8">
        <div className="flex justify-between gap-8">
          <CategoriesPieChart className="flex-1" expenses={props.expenses} />

          <ExpensesRadialChart
            className="flex-1"
            expenses={props.expenses}
            settings={props.settings}
          />
        </div>
        <ExpenseLineChart expenses={props.expenses} settings={props.settings} />
      </div>
    </main>
  );
};

export default Dashboard;
