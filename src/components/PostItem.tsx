import { Post } from "./PostList";

type PostItemProps = Post & {
  onRemoveItem: (id: number) => void;
};
const PostItem = ({ body, title, onRemoveItem, id }: PostItemProps) => {
  return (
    <div className="post-item">
      <h4>{title}</h4>
      <p>{body}</p>
      <button
        className="btn btn-primary"
        onClick={() => {
          onRemoveItem(id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default PostItem;
