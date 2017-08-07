export function hotHeroes(heroes) {
  let data;
  data = _.filter(heroes, (hero) => hero.games >= 5);
  data = _.sortBy(data, ['winRate']);
  data = _.reverse(data);
  return _.take(data, 5);
}

export function coldHeroes(heroes) {
  let data;
  data = _.filter(heroes, (hero) => hero.games >= 5);
  data = _.sortBy(data, ['winRate']);
  return _.take(data, 5);
}

export function topFive(heroes, stat) {
  let data;
  data = _.filter(heroes, (hero) => hero.games >= 5);
  data = _.sortBy(data, [stat]);
  data = _.reverse(data);
  return _.take(data, 5);
}
