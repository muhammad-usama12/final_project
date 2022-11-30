import "./Profile.scss";

import Article from "../Article";

import { getCurrentUser, getPostsByUser, getShowForPost } from "../../helpers/selectors";

export default function Profile(props) {
const state = props.state;

const currentUser = getCurrentUser(state, props.user.userId);
const posts = getPostsByUser(state, props.user.userId)

const articleList = posts.map((post) => {
const show = getShowForPost(state, post.tvshow_id);

  return (
    <Article
      key={post.id}
      {...post}
      show={show}
      user={currentUser}
      spoiler={props.hideSpoiler && post.spoiler}
    />
  );
});

  return (
    <>
      <section className="profile-header">
        <img
          className="profile-display-picture"
          src={currentUser.icon_url}
          alt={currentUser.username}
        ></img>
        <div className="handle-and-bio">
          <div className="handle">
            <h1>@{currentUser.username}</h1>
          </div>
          <div className="bio">
            <p>
              {currentUser.bio}
            </p>
          </div>
        </div>
      </section>
      <section className="article-container">{articleList}</section>
    </>
  );
}
