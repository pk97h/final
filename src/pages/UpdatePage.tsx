import { useNavigate, useParams } from "react-router-dom";
import FeedForm from "../components/FeedForm";
import { useEffect, useState } from "react";
import { editFeed, feedApi } from "../api/feedApi";
import { useMutation, useQuery } from "@tanstack/react-query";

const UpdatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data } = useQuery({
    queryKey: ["feed", id],
    queryFn: () => {
      if (!id) {
        throw new Error("id가 없습니다.");
      }
      return feedApi(id);
    },
  });

  useEffect(() => {
    setTitle(data?.title);
    setContent(data?.content);
  }, [data]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const updateFeedMutation = useMutation({
    mutationFn: () => {
      if (!id) {
        throw new Error("id가 없습니다.");
      }
      return editFeed({ id, title, content });
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
    updateFeedMutation.mutate();
  };

  return (
    <>
      <FeedForm
        formTitle={"수정하기"}
        title={title}
        content={content}
        handleTitleChange={handleTitleChange}
        handleContentChange={handleContentChange}
        handleSubmit={handleSubmit}
      >
        <button className="write-button ml-auto">
          수정완료
        </button>
      </FeedForm>
    </>
  );
};

export default UpdatePage;
