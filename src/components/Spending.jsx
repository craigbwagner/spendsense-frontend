import ExpenseTable from "./ExpenseTable";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import UpdateSettingsForm from "./UpdateSettingsForm";
import UpdateBudgetsForm from "./UpdateBudgetsForm";
import IncomeNegativeBarChart from "./IncomeNegativeBarChart";
import UnexpectedIncomeForm from "./UnexpectedIncomeForm";

const Dashboard = (props) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [budgetsOpen, setBudgetsOpen] = useState(false);

  return (
    <section className="grid grid-cols-1 bg-slate-50 px-24 gap-16 py-12 xl:grid-cols-2">
      <div className="flex place-center m-auto my-8 w-fit min-w-[500px] max-w-[500px] shadow-md">
        <IncomeNegativeBarChart {...props} />
      </div>
      <ExpenseTable {...props} />
      <div className="flex place-center mx-auto">
        <Card className="m-auto max-h-[400px] min-w-[500px] max-w-[800px] shadow-md">
          <CardHeader>
            <CardTitle>Add Unplanned Income</CardTitle>
          </CardHeader>
          <CardContent>
            <UnexpectedIncomeForm handleCreateExpense={props.handleCreateExpense} />
          </CardContent>
        </Card>
      </div>
      <div className="flex place-center m-auto">
        <Card className="w-fit min-w-[500px] max-w-[800px] shadow-md">
          <CardHeader>
            <CardTitle>Configured Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <h3 className="text-xl mb-3">User Settings</h3>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <h6 className="font-semibold">Monthly Income: ${props.settings.monthly_income}</h6>
                <h6 className="font-semibold">Monthly Budget: ${props.settings.monthly_budget}</h6>
                <h6 className="font-semibold">Monthly Savings Goal: ${props.settings.savings_goal}</h6>
              </div>
              <Dialog open={settingsOpen} onOpenChange={setSettingsOpen} >
                <DialogTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
                  Edit User Settings
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update User Settings</DialogTitle>
                  </DialogHeader>
                  <DialogDescription />
                  <UpdateSettingsForm settings={props.settings} setSettings={props.setSettings} />
                </DialogContent>
              </Dialog>
              <h3 className="text-xl mb-3">Budgets by Category</h3>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <h6 className="font-semibold">Housing: ${props.categoryBudgets.housing}</h6>
                <h6 className="font-semibold">Transportation: ${props.categoryBudgets.transportation}</h6>
                <h6 className="font-semibold">Food/Groceries: ${props.categoryBudgets.food_groceries}</h6>
                <h6 className="font-semibold">Utilities: ${props.categoryBudgets.utilities}</h6>
                <h6 className="font-semibold">Clothing: ${props.categoryBudgets.clothing}</h6>
                <h6 className="font-semibold">Medical: ${props.categoryBudgets.medical}</h6>
                <h6 className="font-semibold">Insurance: ${props.categoryBudgets.insurance}</h6>
                <h6 className="font-semibold">Personal: ${props.categoryBudgets.personal}</h6>
                <h6 className="font-semibold">Education: ${props.categoryBudgets.education}</h6>
                <h6 className="font-semibold">Entertainment: ${props.categoryBudgets.entertainment}</h6>
                <h6 className="font-semibold">Other: ${props.categoryBudgets.other}</h6>
              </div>
              <Dialog open={budgetsOpen} onOpenChange={setBudgetsOpen}>
                <DialogTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
                  Update Category Budgets
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Category Budgets</DialogTitle>
                  </DialogHeader>
                  <DialogDescription />
                  <UpdateBudgetsForm categoryBudgets={props.categoryBudgets} setCategoryBudgets={props.setCategoryBudgets} />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;
