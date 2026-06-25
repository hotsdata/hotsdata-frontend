import { Outlet } from "react-router";

import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

export default function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="page-frame">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
