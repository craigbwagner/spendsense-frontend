import { useState, useEffect, createContext } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import * as authService from "./services/authService";
import * as expensesService from "./services/expensesService";
import Navbar from "./components/Navbar";
import ExpenseForm from "./components/ExpenseForm";
export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await expensesService.index();
      setExpenses(expenses);
    };
    if (user) fetchExpenses();
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
              <Route path="*" element={<Navigate to="/" />} />
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
