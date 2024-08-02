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
import ExpenseForm from "./components/ExpenseForm";
import UnexpectedIncomeForm from "./components/UnexpectedIncomeForm";
import UpdateSettingsForm from "./components/UpdateSettingsForm";
import CategoryBudgetsForm from "./components/UpdateBudgetsForm";
export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [expenses, setExpenses] = useState([]);
  const [settings, setSettings] = useState([])
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
    }
    const fetchCategoryBudgets = async () => {
      const fetchedCategoryBudgets = await categoryBudgetsService.index();
      setCategoryBudgets(fetchedCategoryBudgets);
    }
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
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <Navbar handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<h1>Home</h1>} />
              <Route
                path="/expense"
                element={
                  <ExpenseForm handleCreateExpense={handleCreateExpense} />
                }
              />
              <Route
                path="/income"
                element={
                  <UnexpectedIncomeForm handleCreateExpense={handleCreateExpense} />
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/settings" element={<UpdateSettingsForm settings={settings} setSettings={setSettings} />} />
              <Route path="/budgets" element={<CategoryBudgetsForm categoryBudgets={categoryBudgets} setCategoryBudgets={setCategoryBudgets} />} />
            </>
          ) : (
            <>
              <Route path="/" element={<h1>Home</h1>} />
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
