import ExpenseTable from "./ExpenseTable";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";

const Dashboard = (props) => {
  return (
    <div>
      <Card className="m-24 max-h-[600px] w-fit min-w-[500px] max-w-[800px] shadow-md">
        <CardHeader>
          <CardTitle>Configured Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <div className="flex flex-col gap-3">
              <h3 className="text-xl mb-3">User Settings</h3>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <h6 className="font-semibold">Monthly Income: ${props.settings.income}</h6>
                <h6 className="font-semibold">Monthly Budget: ${props.settings.budget}</h6>
                <h6 className="font-semibold">Monthly Savings Goal: ${props.settings.savingsGoal}</h6>
              </div>
              <Button className="bg-blue-500 text-white">Update Settings</Button>
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
              <Button className="bg-blue-500 text-white">Update Budgets</Button>
            </div>
          </CardDescription>
        </CardContent>
      </Card>
      <ExpenseTable {...props} />
    </div>
  );
};

export default Dashboard;
