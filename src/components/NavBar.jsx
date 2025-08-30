import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogout=async()=>{
    try{
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
      dispatch(removeUser());
      return navigate("/login");
    }
    catch(error){
      console.log(error.message);
    }
  }

  return (
    <>
      <div className="navbar bg-neutral shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            👩‍💻DevTinder
          </Link>
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
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
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
