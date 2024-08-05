import ExpenseTable from "./ExpenseTable";
import ExpenseForm from "./ExpenseForm";

const Dashboard = (props) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <ExpenseTable {...props} />
      <ExpenseForm handleCreateExpense={props.handleCreateExpense} />
    </div>
  );
};

export default Dashboard;
