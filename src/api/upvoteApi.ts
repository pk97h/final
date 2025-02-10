import supabase from "../utils/supabase";

// 좋아요 가져오기
export const getUpvote = async (feedId: string) => {
  const { data } = await supabase
    .from("upvotes")
    .select("*")
    .eq("feed_id", feedId);
  return data;
};

// 좋아요 수 가져오기
export const upvoteCountApi = async (feedId: string) => {
  const { count } = await supabase
    .from("upvotes")
    .select("*", { count: "exact", head: true })
    .eq("feed_id", feedId);
  return count;
};

// 좋아요 추가
export const addUpvote = async ({
  feedId,
  userId,
}: {
  feedId: string;
  userId: string;
}) => {
  await supabase.from("upvotes").insert({ feed_id: feedId, user_id: userId });
};

// 좋아요 삭제
export const deleteUpvote = async ({
  feedId,
  userId,
}: {
  feedId: string;
  userId: string;
}) => {
  await supabase
    .from("upvotes")
    .delete()
    .eq("feed_id", feedId)
    .eq("user_id", userId);
};

// 좋아요 토글
export const toggleUpvote = async ({
  feedId,
  userId,
  isUpvoted,
}: {
  feedId: string;
  userId: string;
  isUpvoted: boolean;
}) => {
  if (!isUpvoted) {
    await addUpvote({ feedId, userId });
  } else {
    await deleteUpvote({ feedId, userId });
  }
};