import { Link } from "react-router";

import StatusPanel from "../components/common/StatusPanel.jsx";

export default function NotFoundPage() {
  return (
    <StatusPanel
      tone="error"
      title="Page not found"
      message="That HotsData route does not exist."
      action={
        <Link className="button secondary" to="/">
          Go home
        </Link>
      }
    />
  );
}
