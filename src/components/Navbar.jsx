import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthedUserContext } from "../App";

const Navbar = (props) => {
  const user = useContext(AuthedUserContext);

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <Link to="/" className="text-2xl font-bold">
        SpendSense
      </Link>
      <div className="flex gap-4">
        {user ? (
          <>
            <NavLink to="/budget" className={({ isActive }) =>
              isActive ? "text-sky-800" : "" } >Budget</NavLink>
            <NavLink to="/spending" className={({ isActive }) =>
              isActive ? "text-sky-800" : "" } >Spending</NavLink>
            <button onClick={props.handleSignout} className="bg-none text-white">
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className="text-white">
              Log in
            </Link>
            <Link to="/signup" className="text-white">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
