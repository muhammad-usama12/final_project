import CommentForm from "./CommentForm";
import CommentListItem from "./CommentListItem";

import useApplicationData from "../../hooks/useApplicationData";

export default function CommentList(props) {
  const { state } = useApplicationData();
 
  const comments = state.comments.map((comment) => {
    return (
      <CommentListItem
        key={comment.id}
        text={comment.text}
        img={comment.icon_url}
        timestamp={comment.created_at}
      />
    )
  });

  return (
    <section className="comments-container">
      <h1>the discourse:</h1>
      <CommentForm />
      <hr />
      {comments}
    </section>
  );
}