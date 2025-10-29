import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";


function Navbar() {
    const user = useSelector((store)=>store.user);
    let Navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () =>{
      try{
        axios.post(API_BASE_URL+"/logout",{},{
          withCredentials: true,
        })
        dispatch(removeUser());
        Navigate("/login");
      }catch(err){
        console.error("Error logging out:", err);
      }
    }
  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">👨🏻‍💻 DevTinder</Link>
        </div>
        <div className="flex gap-2">
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {
                user && (
                <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>)
              }
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/connections"}>Connections</Link>
              </li>
              <li>
                <Link to={"/requests"}>Connection Requests</Link>
              </li>
              <li>
                <a onClick={()=>handleLogout()}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
