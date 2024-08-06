import ExpenseTable from "./ExpenseTable";
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
      <Card className="m-24 max-h-[600px] w-fit min-w-[400px] max-w-[800px] shadow-md">
        <CardHeader>
          <CardTitle>Configured Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <div className="flex flex-col gap-2">
              <h6 className="text-lg font-semibold">Monthly Budget</h6>
            </div>
          </CardDescription>
        </CardContent>
      </Card>
      <ExpenseTable {...props} />
    </div>
  );
};

export default Dashboard;
