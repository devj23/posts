import React from "react";
import { Post } from "./PostList";

type ItemFormProps = {
  onSubmit: (data: { title: string; body: string }) => void;
};
const ItemForm = ({ onSubmit }: ItemFormProps) => {
  const [formState, setFormState] = React.useState<Partial<Post>>({
    title: "",
    body: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.title === "" || formState.body === "") return;
    onSubmit({ title: formState.title!, body: formState.body! });
    setFormState({ title: "", body: "" });
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setFormState((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          onChange={handleChange}
          value={formState.title}
          type="text"
          name="title"
          placeholder="Enter Title..."
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Body</label>
        <textarea
          onChange={handleChange}
          value={formState.body}
          name="body"
          placeholder="Enter Body..."
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Create Post
      </button>
    </form>
  );
};

export default ItemForm;
