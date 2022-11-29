export function getShowForPost(state, tvShowId) {
  const shows = state.shows;

  let foundShow = shows.filter(show => show.id === tvShowId);
  let showObj = foundShow[0];

  return showObj;
}

export function getCommentsForPost(state, postId) {
  const comments = state.comments;

  let foundCommentsArr = comments.filter(comment => comment.post_id === postId);

  return foundCommentsArr;
}

export function getUserForPost(state, userId) {
  const users = state.users;

  let foundUser = users.filter(user => user.id === userId);
  let foundUserObj = foundUser[0];

  return foundUserObj;
}