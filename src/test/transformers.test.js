import { describe, expect, it } from "vitest";

import { coldHeroes, hotHeroes, topFive } from "../lib/HeroStatsHelpers.js";
import { transformPlayerHeroData } from "../lib/PlayerHeroDataTransformer.js";
import { secondsToTimeString } from "../lib/TimeUtils.js";

describe("legacy data helpers", () => {
  it("formats seconds as mm:ss", () => {
    expect(secondsToTimeString(65)).toBe("01:05");
    expect(secondsToTimeString(0)).toBe("00:00");
  });

  it("transforms player hero stats into table-ready fields", () => {
    const result = transformPlayerHeroData({
      hero: "Valla",
      hero_stats: [
        { metric: "match_won", value: 6, games: 10 },
        { metric: "match_lost", value: 4, games: 10 },
        { metric: "takedowns", value: 180, games: 10 },
        { metric: "solokill", value: 20, games: 10 },
        { metric: "assists", value: 160, games: 10 },
        { metric: "deaths", value: 25, games: 10 },
        { metric: "timespentdead", value: 640, games: 10 },
      ],
    });

    expect(result.hero).toBe("Valla");
    expect(result.winRate).toBe(60);
    expect(result.takedowns).toBe(18);
    expect(result.timeDead).toBe("01:04");
  });

  it("ranks hot, cold, and top heroes while ignoring low-sample rows", () => {
    const heroes = [
      { hero: "Valla", games: 10, winRate: 60, takedowns: 18 },
      { hero: "Johanna", games: 9, winRate: 42, takedowns: 15 },
      { hero: "Rehgar", games: 12, winRate: 67, takedowns: 16 },
      { hero: "Tracer", games: 3, winRate: 100, takedowns: 21 },
    ];

    expect(hotHeroes(heroes)[0].hero).toBe("Rehgar");
    expect(coldHeroes(heroes)[0].hero).toBe("Johanna");
    expect(topFive(heroes, "takedowns")[0].hero).toBe("Valla");
  });
});
