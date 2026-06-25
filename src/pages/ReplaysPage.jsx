import { RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";

import DataTable from "../components/data/DataTable.jsx";
import StatusPanel from "../components/common/StatusPanel.jsx";
import StatCard from "../components/common/StatCard.jsx";
import { useGetReplaysQuery } from "../features/hotsdata/hotsdataApi.js";

function getReplayRows(data) {
  return data?.data || [];
}

function getWinRate(rows) {
  if (!rows.length) return "0%";
  const wins = rows.filter((row) => row.matchresult === "Victory").length;
  return `${Math.round((wins / rows.length) * 100)}%`;
}

export default function ReplaysPage() {
  const [endpoint, setEndpoint] = useState(null);
  const [term, setTerm] = useState("");
  const [matchType, setMatchType] = useState("All");
  const { data, error, isFetching, refetch } = useGetReplaysQuery(endpoint);

  const rows = useMemo(() => {
    const normalizedTerm = term.trim().toLowerCase();
    return getReplayRows(data).filter((replay) => {
      const matchesTerm =
        !normalizedTerm ||
        replay.heroname?.toLowerCase().includes(normalizedTerm) ||
        replay.mapname?.toLowerCase().includes(normalizedTerm);
      const matchesType = matchType === "All" || replay.gametype === matchType;
      return matchesTerm && matchesType;
    });
  }, [data, matchType, term]);

  const columns = [
    {
      key: "replayid",
      label: "Replay",
      render: (row) => (
        <Link to={`/replays/${row.replayid}`}>{row.replayid}</Link>
      ),
    },
    { key: "mapname", label: "Map" },
    { key: "heroname", label: "Hero" },
    { key: "gametype", label: "Match type" },
    {
      key: "matchresult",
      label: "Result",
      render: (row) => (
        <span
          className={
            row.matchresult === "Victory" ? "success-text" : "danger-text"
          }
        >
          {row.matchresult}
        </span>
      ),
    },
    { key: "uploaded_at", label: "Uploaded" },
  ];

  return (
    <section className="content-section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Replay library</p>
          <h1>Replays</h1>
        </div>
        <button className="button secondary" type="button" onClick={refetch}>
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          label="Showing"
          value={rows.length}
          detail="filtered replays"
        />
        <StatCard
          label="Win rate"
          value={getWinRate(rows)}
          detail="visible rows"
          tone="success"
        />
        <StatCard
          label="Source"
          value={data?.pages ? "API" : "Fixture"}
          detail="falls back when API is offline"
        />
      </div>

      <div className="toolbar">
        <label>
          Search
          <input
            type="search"
            placeholder="Hero or map"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
          />
        </label>
        <label>
          Match type
          <select
            value={matchType}
            onChange={(event) => setMatchType(event.target.value)}
          >
            <option>All</option>
            <option>QuickMatch</option>
            <option>Unranked</option>
            <option>Hero League</option>
            <option>Team League</option>
            <option>Custom Game</option>
          </select>
        </label>
      </div>

      {error ? (
        <StatusPanel
          tone="error"
          title="Replay request failed"
          message={error.message}
        />
      ) : (
        <DataTable
          columns={columns}
          rows={rows}
          emptyMessage={
            isFetching
              ? "Loading replays..."
              : "No replays match these filters."
          }
        />
      )}

      <div className="pagination-row">
        <button
          type="button"
          className="button secondary"
          disabled={!data?.pages?.prev}
          onClick={() => setEndpoint(data.pages.prev)}
        >
          Previous
        </button>
        <button
          type="button"
          className="button secondary"
          disabled={!data?.pages?.next}
          onClick={() => setEndpoint(data.pages.next)}
        >
          Next
        </button>
      </div>
    </section>
  );
}
