import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../stores/useAuthStore";
import { deleteComment, editComment } from "../api/commentApi";
import { useState } from "react";

interface CommentProps {
  id: string;
  content: string;
  created_at: string;
  feed_id: string;
  user_id: string;
  user: {
    id: string;
    nickname: string;
    email: string;
    img_url: string;
  };
}

const Comment = ({ comment }: { comment: CommentProps }) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  // 댓글 수정 상태 변경
  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
      setEditContent(comment.content);
    }
  };

  const editCommentMutation = useMutation({
    mutationFn: async () =>
      editComment({
        content: editContent,
        commentId: comment.id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feeds", comment.feed_id, "comments"],
      });
      setIsEditing(false);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleEditSubmit = () => {
    editCommentMutation.mutate();
  };

  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteComment(comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feeds", comment.feed_id, "comments"],
      });
    },
  });

  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteCommentMutation.mutate();
    }
  };

  return (
    <>
      <div className="flex gap-3 items-start">
        {comment.user.img_url ? (
          <img
            src={comment.user.img_url}
            alt="유저 프로필 사진"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <img src="/user-icon.svg" alt="유저 프로필 사진" className="w-10" />
        )}
        <div className="flex flex-col flex-1 gap-5">
          <div className="font-bold">{comment.user.nickname}</div>
          {isEditing ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className=" border border-gray-500 p-2 rounded-md resize-none"
            />
          ) : (
            <div>{comment.content}</div>
          )}
        </div>
        {user?.id === comment.user_id ? (
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button onClick={handleEdit}>취소</button>
                <button onClick={handleEditSubmit}>완료</button>
              </>
            ) : (
              <>
                <button onClick={handleEdit}>수정</button>
                <button onClick={handleDelete}>삭제</button>
              </>
            )}
          </div>
        ) : null}
      </div>
      <hr />
    </>
  );
};

export default Comment;
