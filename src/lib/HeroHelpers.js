export function urlName(hero) {
  return hero.toLowerCase()
    .replace(" ", "-")
    .replace("'", "")
    .replace(new RegExp("\\.", 'g'), "");
}
