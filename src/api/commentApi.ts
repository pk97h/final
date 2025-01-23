import supabase from "../utils/supabase";

// 개별 댓글 수 가져오기
export const commentCountApi = async (feedId: string) => {
  const { count } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("feed_id", feedId);
  return count;
};

// 개별 댓글 가져오기
export const commentApi = async (feedId: string) => {
  const { data } = await supabase
    .from("comments")
    .select(
      `*, 
    user:user_id (
      "*"
    )
  `
    )
    .eq("feed_id", feedId);
  return data;
};

// 댓글 추가
export const addComment = async ({
  feedId,
  userId,
  content,
}: {
  feedId: string;
  userId: string;
  content: string;
}) => {
  await supabase
    .from("comments")
    .insert({ content, feed_id: feedId, user_id: userId });
};

// 댓글 삭제
export const deleteComment = async (commentId: string) => {
  await supabase.from("comments").delete().eq("id", commentId);
};

// 댓글 수정
export const editComment = async ({
  content,
  commentId,
}: {
  content: string;
  commentId: string;
}) => {
  await supabase
    .from("comments")
    .update({
      content,
    })
    .eq("id", commentId);
};
