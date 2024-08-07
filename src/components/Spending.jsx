import ExpenseTable from "./ExpenseTable";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import UpdateSettingsForm from "./UpdateSettingsForm";
import UpdateBudgetsForm from "./UpdateBudgetsForm";

const Dashboard = (props) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [budgetsOpen, setBudgetsOpen] = useState(false);

  return (
    <div>
      <Card className="m-24 w-fit min-w-[500px] max-w-[800px] shadow-md">
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
                <UpdateSettingsForm settings={props.settings} setSettings={props.setSettings} asChild/>
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
                <UpdateBudgetsForm categoryBudgets={props.categoryBudgets} setCategoryBudgets={props.setCategoryBudgets} />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
      <ExpenseTable {...props} />
    </div>
  );
};

export default Dashboard;
