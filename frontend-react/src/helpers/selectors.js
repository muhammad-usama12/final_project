export function getShowForPost(state, tvShowId) {
  const shows = state.shows;

  let foundShow = shows.filter(show => show.id === tvShowId);
  let showObj = foundShow[0];

  return showObj;
}