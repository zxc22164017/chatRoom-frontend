import Comment from "./Comment";
function CommentSection() {
  return (
    <div className="overflow-y-auto mb-2">
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
}

export default CommentSection;
