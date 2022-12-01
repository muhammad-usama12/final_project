import CommentForm from "./CommentForm";
import CommentListItem from "./CommentListItem";
import { ApplicationContext } from "../App";
import { getCommentsForPost } from "../../helpers/selectors";
import { useContext } from "react";

export default function CommentList(props) {
  const { state } = useContext(ApplicationContext);

  const comments = getCommentsForPost(state, props.postId);
  const commentsList = comments.reverse().map((comment) => {
    return (
      <CommentListItem
        key={comment.id}
        text={comment.text}
        image={comment.icon_url}
        timestamp={comment.created_at}
      />
    );
  });

  return (
    <section className="comments-container">
      <h1>the discourse:</h1>
      {document.cookie && <CommentForm postId={props.postId} />}
      <hr />
      {commentsList}
    </section>
  );
}
