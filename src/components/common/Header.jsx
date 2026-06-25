import {
  BarChart3,
  LogOut,
  Menu,
  Search,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";

import logoUrl from "../../../assets/logo-main.svg";
import { logout } from "../../features/auth/authSlice.js";

const navItems = [
  { to: "/replays", label: "Replays", icon: BarChart3 },
  { to: "/players/compare", label: "Compare", icon: Search },
  { to: "/upload", label: "Upload", icon: Upload },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => Boolean(state.auth.token));

  function handleLogout() {
    dispatch(logout());
    navigate("/signin");
  }

  return (
    <header className="site-header">
      <div className="nav-shell">
        <NavLink className="brand-link" to="/" onClick={() => setIsOpen(false)}>
          <img src={logoUrl} alt="HotsData" />
        </NavLink>

        <button
          className="icon-button mobile-menu-button"
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav
          className={`primary-nav ${isOpen ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={17} aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
          {isAuthenticated ? (
            <>
              <NavLink to="/user-settings" onClick={() => setIsOpen(false)}>
                <UserRound size={17} aria-hidden="true" />
                <span>{user?.name || user?.email || "Account"}</span>
              </NavLink>
              <button
                className="nav-action"
                type="button"
                onClick={handleLogout}
              >
                <LogOut size={17} aria-hidden="true" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <NavLink to="/signin" onClick={() => setIsOpen(false)}>
              <UserRound size={17} aria-hidden="true" />
              <span>Sign in</span>
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
