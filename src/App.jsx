import { useState, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import * as authService from "../services/authService";
import Navbar from "./components/Navbar";
export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const navigate = useNavigate();

  const handleSignout = () => {
    authService.signout();
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <Navbar handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <Route path="/" element={<h1>Home</h1>} />
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
            </>
          )}
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
