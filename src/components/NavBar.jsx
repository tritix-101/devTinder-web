import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  console.log(user);

  return (
    <>
      <div className="navbar bg-neutral shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">👩‍💻DevTinder</Link>
        </div>
        <div className="flex gap-2">
          {user && (
            <div className="dropdown dropdown-end mx-5">
              {/* Trigger (photo + name) */}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost flex items-center gap-2 px-2"
              >
                {/* Avatar container */}
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    alt="user photo"
                    src={user.photoUrl}
                    className="w-full h-full object-cover rounded-full object-top"
                  />
                </div>
                <span className="font-medium">Welcome, {user.firstName}</span>
              </div>

              {/* Dropdown content */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
