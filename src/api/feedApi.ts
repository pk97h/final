import supabase from "../utils/supabase";

const feedApi = async () => {
  const { data } = await supabase.from("feeds").select();
  return data;
};

export default feedApi;
