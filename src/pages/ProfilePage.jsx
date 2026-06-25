import { useParams } from "react-router";

import StatusPanel from "../components/common/StatusPanel.jsx";
import StatCard from "../components/common/StatCard.jsx";
import DataTable from "../components/data/DataTable.jsx";
import { useGetPlayerHeroesQuery } from "../features/hotsdata/hotsdataApi.js";

function flattenHeroes(data) {
  return (
    data?.stats?.map((hero) => {
      const games = Math.max(...hero.hero_stats.map((stat) => stat.games));
      const wins =
        hero.hero_stats.find((stat) => stat.metric === "match_won")?.value || 0;
      const deaths =
        hero.hero_stats.find((stat) => stat.metric === "deaths")?.value || 0;
      const takedowns =
        hero.hero_stats.find((stat) => stat.metric === "takedowns")?.value || 0;

      return {
        id: hero.hero,
        hero: hero.hero,
        games,
        winRate: games ? Math.round((wins / games) * 100) : 0,
        takedowns: Math.round(takedowns / games),
        deaths: Number((deaths / games).toFixed(1)),
      };
    }) || []
  );
}

export default function ProfilePage() {
  const { toonhandle } = useParams();
  const { data, error, isFetching } = useGetPlayerHeroesQuery(toonhandle || "");
  const heroes = flattenHeroes(data);
  const bestHero = [...heroes].sort((a, b) => b.winRate - a.winRate)[0];

  if (error) {
    return (
      <StatusPanel
        tone="error"
        title="Profile unavailable"
        message={error.message}
      />
    );
  }

  return (
    <section className="content-section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Player profile</p>
          <h1>{data?.name || toonhandle || "Your profile"}</h1>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard label="Tracked heroes" value={heroes.length} />
        <StatCard
          label="Best hero"
          value={bestHero?.hero || "-"}
          detail={bestHero ? `${bestHero.winRate}% win rate` : ""}
        />
        <StatCard label="Status" value={isFetching ? "Loading" : "Ready"} />
      </div>

      <DataTable
        columns={[
          { key: "hero", label: "Hero" },
          { key: "games", label: "Games", numeric: true },
          {
            key: "winRate",
            label: "Win rate",
            numeric: true,
            render: (row) => `${row.winRate}%`,
          },
          { key: "takedowns", label: "Takedowns", numeric: true },
          { key: "deaths", label: "Deaths", numeric: true },
        ]}
        rows={heroes}
        emptyMessage={
          isFetching ? "Loading hero stats..." : "No hero stats available."
        }
      />
    </section>
  );
}
