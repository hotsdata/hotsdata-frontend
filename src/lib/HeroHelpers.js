export function urlName(hero) {
  if (hero == "Cho" || hero == "Gall") { hero = "chogall" }
  return hero.toLowerCase()
    .replace(" ", "-")
    .replace("'", "")
    .replace(new RegExp("\\.", 'g'), "");
}
