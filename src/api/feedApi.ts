import supabase from "../utils/supabase";

export const feedsApi = async () => {
  const { data } = await supabase.from("feeds").select();
  return data;
};

export const feedApi = async (id: string) => {
  const { data } = await supabase.from("feeds").select("*").eq("id", id);
  if (data) {
    return data[0];
  }
};
