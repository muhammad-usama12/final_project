import CommentForm from "./CommentForm";
import CommentListItem from "./CommentListItem";
import { getCommentsForPost } from "../../helpers/selectors";

export default function CommentList(props) {
  const state = props.state;
  console.log("state in comment list" , state)

  const comments = getCommentsForPost(state, props.postId);
  const commentsList = comments.reverse().map((comment) => {
    return (
      <CommentListItem
        state={state}
        key={comment.id}
        user={comment.user_id}
        text={comment.text}
        image={comment.icon_url}
        timestamp={comment.created_at}
      />
    );
  });

  return (
    <section className="comments-container">
      <h1>the discourse:</h1>
      {document.cookie && (
        <CommentForm
          error={props.error}
          postId={props.postId}
          validate={props.validate}
        />
      )}
      <hr />
      {!document.cookie && <h5>log in to participate in the discourse :)</h5>}
      {commentsList}
    </section>
  );
}
