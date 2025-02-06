import { useNavigate } from "react-router-dom";
import FeedForm from "../components/FeedForm";
import useAuthStore from "../stores/useAuthStore";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addFeed } from "../api/feedApi";

const CreatePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const addFeedMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        throw new Error("로그인 후 이용해주세요.");
      }
      await addFeed({
        title,
        content,
        userId: user.id,
      });
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addFeedMutation.mutate();
  };

  return (
    <>
      <FeedForm
        formTitle={"작성하기"}
        title={title}
        content={content}
        handleTitleChange={handleTitleChange}
        handleContentChange={handleContentChange}
        handleSubmit={handleSubmit}
      >
        <button
          type="submit"
          className="write-button ml-auto"
        >
          작성완료
        </button>
      </FeedForm>
    </>
  );
};

export default CreatePage;
