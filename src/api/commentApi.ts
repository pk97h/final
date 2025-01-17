import supabase from "../utils/supabase";

// 개별 comment 수 가져오기
export const commentCountApi = async (feedId: string) => {
  const { count } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("feed_id", feedId);
  return count;
};

// 개별 comment 가져오기
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
