import { ArrowRight, BarChart3, Search, Upload } from "lucide-react";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <section className="home-page">
      <div className="hero-panel">
        <div>
          <p className="eyebrow">Heroes of the Storm replay analytics</p>
          <h1>HotsData Beta</h1>
          <p className="hero-copy">
            Review match stats, compare player trends, and upload replays
            without digging through raw score screens.
          </p>
        </div>
        <div className="hero-actions">
          <Link className="button primary" to="/replays">
            <BarChart3 size={18} />
            View replays
          </Link>
          <Link className="button secondary" to="/upload">
            <Upload size={18} />
            Upload replay
          </Link>
        </div>
      </div>

      <div className="workflow-grid">
        <Link className="workflow-card" to="/replays">
          <BarChart3 aria-hidden="true" />
          <span>Replay review</span>
          <strong>
            Open match summaries, team stats, talents, and map-specific
            breakdowns.
          </strong>
          <ArrowRight aria-hidden="true" />
        </Link>
        <Link className="workflow-card" to="/players/compare">
          <Search aria-hidden="true" />
          <span>Player compare</span>
          <strong>
            Search players and compare hero performance side by side.
          </strong>
          <ArrowRight aria-hidden="true" />
        </Link>
        <Link className="workflow-card" to="/profile">
          <Upload aria-hidden="true" />
          <span>Profile trends</span>
          <strong>
            Track hot heroes, cold heroes, and the stats that need attention.
          </strong>
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
