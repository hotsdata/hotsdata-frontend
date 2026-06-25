import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>HotsData</span>
      <nav aria-label="Footer navigation">
        <Link to="/about">About</Link>
        <Link to="/changelog">Changelog</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </footer>
  );
}
