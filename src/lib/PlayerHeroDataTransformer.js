import { secondsToTimeString } from './TimeUtils';

function findStat(stat_array, metric) {
  return _.find(stat_array, (s) => s.metric == metric)
}

function averageStat(stat_array, metric, roundPlaces = 1) {
  let stat = findStat(stat_array, metric);
  if (!stat) { return 0; }
  return _.round(stat.value / stat.games, roundPlaces);
}

export function transformAllPlayerHerosData(player, data) {
  if(!data) { return null; }
  let pdata = {
    player: player ? player.name : null,
    player_id: player ? player.player_id : null,
    toonhandle: player ?  player.toonhandle : null
  };

  pdata.heroes = data.stats.map(hero => {
    return transformPlayerHeroData(hero);
  });

  return pdata;
}

export function transformPlayerHeroData(data) {
  let tdata = {};
  tdata.hero = data.hero;
  tdata.games = _.max(_.map(data.hero_stats,s => s.games));
  let winStat = findStat(data.hero_stats, "match_won");
  tdata.wins = winStat ? winStat.value : 0;
  let lossStat = findStat(data.hero_stats, "match_lost");
  tdata.losses = lossStat ? lossStat.value : 0;
  tdata.winRate = _.round(tdata.wins / tdata.games * 100, 1);
  tdata.takedowns = averageStat(data.hero_stats, "takedowns");
  tdata.kills = averageStat(data.hero_stats, "solokill");
  tdata.assists = averageStat(data.hero_stats, "assists");
  tdata.deaths = averageStat(data.hero_stats, "deaths");
  tdata.kda = _.round(tdata.takedowns / tdata.deaths, 1);
  tdata.timeDead = secondsToTimeString(averageStat(data.hero_stats, "timespentdead"));
  tdata.heroDamage = averageStat(data.hero_stats, "herodamage", 0);
  tdata.siegeDamage = averageStat(data.hero_stats, "siegedamage", 0);
  tdata.healing = averageStat(data.hero_stats, "healing", 0);
  tdata.selfHealing = averageStat(data.hero_stats, "selfhealing", 0);
  tdata.damageTaken = averageStat(data.hero_stats, "damagetaken", 0);
  tdata.xp = averageStat(data.hero_stats, "experiencecontribution", 0);

  return tdata;
}
