import React from "react";
import PostItem from "./PostItem";
import Spinner from "./Spinner";
import ItemForm from "./ItemForm";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
const PostList = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const fetchPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
          setError(false);
          setPosts(res.slice(0, 9));
        }, 500);
      })
      .catch(() => {
        setIsLoading(false);
        setError(true);
        setPosts([]);
      });
  };
  React.useEffect(() => {
    fetchPosts();
  }, []);
  const onRemoveItem = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== id));
  };

  const onAddItem = ({ title, body }: { title: string; body: string }) => {
    const id =
      Math.floor(Math.random() * 1000000) + Math.floor(Math.random() * 1000000);
    setPosts((p) => [...p, { id, title, body, userId: 1 }]);
  };

  if (isLoading) {
    return (
      <section id="posts">
        <div className="container">
          <h2 className="title">Featured Posts</h2>
          <div className="center">
            <Spinner />
          </div>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section id="posts">
        <div className="container">
          <h2 className="title">Something Went Wrong</h2>
          <div className="center">
            <button
              className="btn btn-success"
              onClick={() => {
                setIsLoading(true);
                setError(false);
                setPosts([]);
                fetchPosts();
              }}
            >
              Reload
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!posts.length) {
    return (
      <section id="posts">
        <div className="container">
          <h2 className="title">Featured Posts</h2>
          <ItemForm onSubmit={onAddItem} />
          <div className="center">
            <button
              className="btn btn-success"
              onClick={() => {
                setIsLoading(true);
                setError(false);
                setPosts([]);
                fetchPosts();
              }}
            >
              Reload
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="posts">
      <div className="container">
        <h2 className="title">Featured Posts</h2>
        <ItemForm onSubmit={onAddItem} />

        <div className="post-list">
          {posts.map((post) => {
            return (
              <PostItem onRemoveItem={onRemoveItem} {...post} key={post.id} />
            );
          })}
        </div>
        <div className="center">
          <button
            className="btn btn-danger"
            onClick={() => {
              setIsLoading(false);
              setError(false);
              setPosts([]);
            }}
          >
            Remove All
          </button>
        </div>
      </div>
    </section>
  );
};

export default PostList;
