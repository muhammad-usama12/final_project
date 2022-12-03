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

export function getUser(state, userId) {
  const users = state.users;

  let foundUser = users.filter(user => user.id === userId);
  let foundUserObj = foundUser[0];

  return foundUserObj;
}

export function getPostsByUser(state, userId) {
  const posts = state.posts;

  let foundPostsArr = posts.filter(post => post.user_id === userId);

  return foundPostsArr;
}

export function getFavouritesByUser (state, userId) {
  const shows = state.shows;
  const favourites = state.favourites;

  let favouriteShowsForUser = favourites.filter(favourite => favourite.user_id === userId)

  let allFavouriteShows = favouriteShowsForUser.map(favourite => {
    let someShow;
    for (let show of shows) {
      if (show.id === favourite.tvshow_id) {
        someShow = show
      }
    }
    return someShow;
  })
  return allFavouriteShows;
}