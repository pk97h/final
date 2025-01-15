import supabase from "../utils/supabase";

const commentCountApi = async (feedId: string) => {
  const { count } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("feed_id", feedId);
  return count;
};

export default commentCountApi;
