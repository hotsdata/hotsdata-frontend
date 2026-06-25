import { Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

import DataTable from "../components/data/DataTable.jsx";
import StatusPanel from "../components/common/StatusPanel.jsx";
import {
  useGetHeroInfoQuery,
  useSearchPlayersQuery,
} from "../features/hotsdata/hotsdataApi.js";

export default function PlayerComparePage() {
  const [term, setTerm] = useState("");
  const [selectedHero, setSelectedHero] = useState("All");
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const { data: players = [] } = useSearchPlayersQuery(term);
  const { data: heroes = [] } = useGetHeroInfoQuery();

  const visiblePlayers = useMemo(() => {
    return players.filter(
      (player) =>
        !selectedPlayers.some(
          (selected) => selected.toonhandle === player.toonhandle,
        ),
    );
  }, [players, selectedPlayers]);

  function addPlayer(player) {
    setSelectedPlayers((current) => [...current, player].slice(0, 5));
  }

  function removePlayer(toonhandle) {
    setSelectedPlayers((current) =>
      current.filter((player) => player.toonhandle !== toonhandle),
    );
  }

  const comparisonRows = selectedPlayers.map((player, index) => ({
    ...player,
    hero: selectedHero === "All" ? player.favoriteHero : selectedHero,
    games: 42 - index * 3,
    winRate: `${58 - index * 4}%`,
    takedowns: 17 - index,
    deaths: (3.2 + index / 10).toFixed(1),
  }));

  return (
    <section className="content-section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Player comparison</p>
          <h1>Compare players</h1>
        </div>
      </div>

      <div className="toolbar">
        <label>
          Search player
          <input
            type="search"
            value={term}
            placeholder="Name or toon handle"
            onChange={(event) => setTerm(event.target.value)}
          />
        </label>
        <label>
          Hero
          <select
            value={selectedHero}
            onChange={(event) => setSelectedHero(event.target.value)}
          >
            <option>All</option>
            {heroes.map((hero) => (
              <option key={hero.name}>{hero.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="picker-grid">
        {visiblePlayers.slice(0, 6).map((player) => (
          <button
            className="picker-row"
            type="button"
            key={player.toonhandle}
            onClick={() => addPlayer(player)}
          >
            <span>
              <strong>{player.name}</strong>
              <small>{player.toonhandle}</small>
            </span>
            <Plus size={17} />
          </button>
        ))}
      </div>

      {selectedPlayers.length === 0 ? (
        <StatusPanel
          title="No players selected"
          message="Add players from the search results to build a comparison."
        />
      ) : (
        <>
          <div className="selected-chips">
            {selectedPlayers.map((player) => (
              <button
                type="button"
                key={player.toonhandle}
                onClick={() => removePlayer(player.toonhandle)}
              >
                {player.name}
                <X size={14} />
              </button>
            ))}
          </div>
          <DataTable
            columns={[
              { key: "name", label: "Player" },
              { key: "hero", label: "Hero" },
              { key: "games", label: "Games", numeric: true },
              { key: "winRate", label: "Win rate", numeric: true },
              { key: "takedowns", label: "Takedowns", numeric: true },
              { key: "deaths", label: "Deaths", numeric: true },
            ]}
            rows={comparisonRows}
          />
        </>
      )}
    </section>
  );
}
