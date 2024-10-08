import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import * as authService from "./services/authService";
import * as expensesService from "./services/expensesService";
import * as settingsService from "./services/settingsService";
import * as categoryBudgetsService from "./services/categoryBudgetsService";
import Navbar from "./components/Navbar";
import UnexpectedIncomeForm from "./components/UnexpectedIncomeForm";
import Dashboard from "./components/Dashboard";
import Spending from "./components/Spending";
import Landing from "./components/Landing";
import { toast } from "sonner";
export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [expenses, setExpenses] = useState([]);
  const [settings, setSettings] = useState([]);
  const [categoryBudgets, setCategoryBudgets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      const fetchedExpenses = await expensesService.index();
      setExpenses(fetchedExpenses);
    };
    const fetchSettings = async () => {
      const fetchedSettings = await settingsService.index();
      setSettings(fetchedSettings);
    };
    const fetchCategoryBudgets = async () => {
      const fetchedCategoryBudgets = await categoryBudgetsService.index();
      setCategoryBudgets(fetchedCategoryBudgets);
    };
    if (user) {
      fetchExpenses();
      fetchSettings();
      fetchCategoryBudgets();
    }
  }, [user]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
    navigate("/");
  };

  const handleCreateExpense = async (expenseFormData) => {
    try {
      const createdExpense = await expensesService.create(expenseFormData);
      setExpenses([...expenses, createdExpense]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateExpense = async (expenseId, expenseFormData) => {
    try {
      const updatedExpense = await expensesService.update(
        expenseId,
        expenseFormData,
      );
      const updatedExpenses = expenses.map((expense) =>
        expense.id === expenseId ? updatedExpense : expense,
      );
      setExpenses(updatedExpenses);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await expensesService.deleteExpense(expenseId);
      const updatedExpenses = expenses.filter(
        (expense) => expense.id !== expenseId,
      );
      setExpenses(updatedExpenses);
      toast.success("Expense deleted successfully", {
        cancel: {
          label: "Dismiss",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    } catch (err) {
      console.log(err);
      console.log("error");
      toast.error("Error deleting expense", {
        cancel: {
          label: "Dismiss",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    }
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <Navbar handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Landing />} />
              <Route
                path="/income"
                element={
                  <UnexpectedIncomeForm
                    handleCreateExpense={handleCreateExpense}
                  />
                }
              />
              <Route
                path="/budget"
                element={
                  <Spending
                    expenses={expenses}
                    settings={settings}
                    setSettings={setSettings}
                    categoryBudgets={categoryBudgets}
                    setCategoryBudgets={setCategoryBudgets}
                    handleDeleteExpense={handleDeleteExpense}
                    handleUpdateExpense={handleUpdateExpense}
                    handleCreateExpense={handleCreateExpense}
                  />
                }
              />
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    expenses={expenses}
                    handleDeleteExpense={handleDeleteExpense}
                    handleUpdateExpense={handleUpdateExpense}
                    handleCreateExpense={handleCreateExpense}
                    settings={settings}
                  />
                }
              />
            </>
          ) : (
            <>
              <Route path="/" element={<Landing />} />
              <Route
                path="/signup"
                element={<SignupForm setUser={setUser} />}
              />
              <Route
                path="/signin"
                element={<SigninForm setUser={setUser} />}
              />
              <Route path="*" element={<Navigate to="/signin" />} />
            </>
          )}
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
