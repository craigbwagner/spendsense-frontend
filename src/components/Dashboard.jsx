import ExpenseTable from "./ExpenseTable";

const Dashboard = (props) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <ExpenseTable {...props} />
    </div>
  );
};

export default Dashboard;
