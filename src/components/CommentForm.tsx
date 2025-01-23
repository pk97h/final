import { useState } from "react";
import useAuthStore from "../stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../api/commentApi";

const CommentForm = ({ feedId }: { feedId: string | undefined }) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [comment, setComment] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const addCommentMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        throw new Error("로그인 후 이용해주세요.");
      }

      if (!feedId) {
        throw new Error("게시물 아이디가 없습니다.");
      }

      await addComment({
        feedId,
        userId: user.id,
        content: comment,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feeds", feedId, "comments"],
      });
      setComment("");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCommentMutation.mutate();
  };

  return (
    <>
      <div className="flex bg-white p-6 rounded-lg">
        <form className="flex flex-col flex-1 gap-3" onSubmit={handleSubmit}>
          <label htmlFor="comment" className="font-bold">
            댓글 작성
          </label>
          <textarea
            className="border rounded-lg border-gray-300 p-3 resize-none"
            id="comment"
            value={comment}
            onChange={handleChange}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              작성
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentForm;
