import supabase from "../utils/supabase";

// 게시글 가져오기
export const feedsApi = async () => {
  const { data } = await supabase.from("feeds").select();
  return data;
};

// 개별 게시글 가져오기
export const feedApi = async (id: string) => {
  const { data } = await supabase.from("feeds").select("*").eq("id", id);
  if (data) {
    return data[0];
  }
};

// 게시글 추가
export const addFeed = async ({
  title,
  content,
  userId,
}: {
  title: string;
  content: string;
  userId: string;
}) => {
  await supabase.from("feeds").insert({
    title,
    content,
    user_id: userId,
  });
};

// 게시글 수정
export const editFeed = async ({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) => {
  await supabase
    .from("feeds")
    .update({
      id,
      title,
      content,
    })
    .eq("id", id);
};

// 게시글 삭제
export const deleteFeed = async ({ id }: { id: string }) => {
  await supabase.from("feeds").delete().eq("id", id);
};
