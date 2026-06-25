export function hotHeroes(heroes) {
  return heroes
    .filter((hero) => hero.games >= 5)
    .sort((a, b) => b.winRate - a.winRate)
    .slice(0, 5);
}

export function coldHeroes(heroes) {
  return heroes
    .filter((hero) => hero.games >= 5)
    .sort((a, b) => a.winRate - b.winRate)
    .slice(0, 5);
}

export function topFive(heroes, stat) {
  return heroes
    .filter((hero) => hero.games >= 5)
    .sort((a, b) => b[stat] - a[stat])
    .slice(0, 5);
}
