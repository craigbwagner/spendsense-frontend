import ExpenseTable from "./ExpenseTable";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "./ui/card";
import IncomeNegativeBarChart from "./IncomeNegativeBarChart";
import UnexpectedIncomeForm from "./UnexpectedIncomeForm";
import SettingsCard from "./SettingsCard";

const Dashboard = (props) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [budgetsOpen, setBudgetsOpen] = useState(false);

  return (
    <section className="grid grid-cols-1 bg-slate-50 px-24 gap-16 py-12 xl:grid-cols-2">
      <IncomeNegativeBarChart className="flex place-center m-auto min-w-[500px] max-w-[800px] shadow-md"{...props} />
      <ExpenseTable {...props} />
      <div className="flex place-center mx-auto">
        <Card className="m-auto max-h-[400px] min-w-[500px] max-w-[800px] shadow-md">
          <CardHeader>
            <CardTitle>Add Unplanned Income</CardTitle>
          </CardHeader>
          <CardDescription />
          <CardContent>
            <UnexpectedIncomeForm handleCreateExpense={props.handleCreateExpense} />
          </CardContent>
        </Card>
      </div>
      <SettingsCard {...props} settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} budgetsOpen={budgetsOpen} setBudgetsOpen={setBudgetsOpen} />
    </section>
  );
};

export default Dashboard;
