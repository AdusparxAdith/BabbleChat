import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import "./Global.css";

export default function NavBar() {
  const { user } = useContext(UserContext);
  return (
    <div className="navbar">
      <div className="navbar-user">{user.name}</div>

      <button
        className="navbar-button"
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
