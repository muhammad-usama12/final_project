import React from "react";
import CommentListItem from "./CommentListItem";

// STILL HARDCODED WILL NEED TO MAP OVER COMMENTS AND RETURN COMMENTLISTITEM
export default function CommentList(props) {
  return (
    <section className="comments-container">
      <h1>the discourse:</h1>
      <CommentListItem
        username="unagimaster88"
        comment="nathan fielder the man that you are nathan fielder the man that you are nathan fielder the man that you are"
        timestamp="10 mins ago"
        profile="https://i.kym-cdn.com/photos/images/newsfeed/002/069/850/076.jpg"
      />
      <CommentListItem
        username="lestatswalkies"
        comment="this man was my injury attorney and we lost"
        timestamp="4 hours ago"
        profile="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRReyhqGZwHLHLRL4YLcPNJ4FIcOC9QzxRNfQ&usqp=CAU"
      />
    </section>
  );
}