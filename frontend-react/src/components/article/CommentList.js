import CommentForm from "./CommentForm";
import CommentListItem from "./CommentListItem";

import useApplicationData from "../../hooks/useApplicationData";
import { getCommentsForPost } from "../../helpers/selectors";

export default function CommentList(props) {
  const { state } = useApplicationData();
 
  const comments = getCommentsForPost(state, props.postId)
  const commentsList = comments.reverse().map((comment) => {
    return (
      <CommentListItem
        key={comment.id}
        text={comment.text}
        image={comment.icon_url}
        timestamp={comment.created_at}
      />
    )
  });

  return (
    <section className="comments-container">
      <h1>the discourse:</h1>
      <CommentForm postId={props.postId}/>
      <hr />
      {commentsList}
    </section>
  );
}