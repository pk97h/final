import supabase from "../utils/supabase";

const upvoteCountApi = async (feedId: string) => {
  const { count } = await supabase
    .from("upvotes")
    .select("*", { count: "exact", head: true })
    .eq("feed_id", feedId);
  return count;
};

export default upvoteCountApi;