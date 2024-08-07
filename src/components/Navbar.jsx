import { Link, NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthedUserContext } from "../App";

const Navbar = (props) => {
  const user = useContext(AuthedUserContext);

  const path = useLocation().pathname;

  return (
    <nav
      className={
        path !== "/"
          ? `flex items-center justify-between bg-neutral-900 p-4 text-white`
          : `absolute top-0 flex h-20 w-full items-center justify-between bg-transparent p-4 text-white`
      }
    >
      <Link to="/" className="z-10 text-3xl font-bold transition">
        Spend
        <span className={path === "/" ? "text-fuchsia-600" : ""}>Sense</span>
      </Link>
      <div className="flex gap-4">
        {user ? (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "z-10 text-sky-800"
                  : "group z-10 transition duration-300"
              }
            >
              Dashboard
              <span
                className={
                  path == "/"
                    ? "block h-0.5 max-w-0 bg-fuchsia-600 transition-all duration-500 group-hover:max-w-full"
                    : "block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"
                }
              ></span>
            </NavLink>
            <NavLink
              to="/spending"
              className={({ isActive }) =>
                isActive
                  ? "z-10 text-sky-800"
                  : "group z-10 transition duration-300"
              }
            >
              Spending
              <span
                className={
                  path == "/"
                    ? "block h-0.5 max-w-0 bg-fuchsia-600 transition-all duration-500 group-hover:max-w-full"
                    : "block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"
                }
              ></span>
            </NavLink>
            <button
              onClick={props.handleSignout}
              className="group z-10 bg-none text-white transition duration-300"
            >
              Sign out
              <span
                className={
                  path == "/"
                    ? "block h-0.5 max-w-0 bg-fuchsia-600 transition-all duration-500 group-hover:max-w-full"
                    : "block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"
                }
              ></span>
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className="z-10 text-white">
              Log in
            </Link>
            <Link to="/signup" className="z-10 text-white">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
