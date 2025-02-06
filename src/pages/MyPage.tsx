import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../stores/useAuthStore";
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";

const MyPage = () => {
  const { user, setUser } = useAuthStore();
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // 유저 데이터 가져오기
  const { data } = useQuery({
    queryKey: ["users", user?.id],
    queryFn: async () => {
      if (!user) {
        throw new Error("로그인 후 이용해주세요.");
      }

      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user?.id);
      if (data) {
        return data[0];
      }
    },
  });

  useEffect(() => {
    if (data) {
      setNickname(data.nickname);
      setPreviewImage(data.img_url);
    }
  }, [data]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      const updateData = {
        nickname,
        img_url: previewImage,
      };

      if (profileImage) {
        // 확장자를 분리하고, 유저 별로 이미지 경로를 다르게 설정
        const fileExt = profileImage.name.split(".").pop();
        const filePath = `${user?.id}/profile_${Date.now()}.${fileExt}`;

        // storage에 데이터 추가
        const { error } = await supabase.storage
          .from("profileImage")
          .upload(filePath, profileImage);
        if (error) {
          throw new Error(`이미지 업로드에 실패했습니다. ${error.message}`);
        }

        // storage에서 데이터 가져오기
        const { data } = supabase.storage
          .from("profileImage")
          .getPublicUrl(filePath);
        updateData.img_url = data.publicUrl;
      }

      // users 테이블에 데이터 추가
      const { error: userError } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", user?.id);
      if (userError) {
        throw new Error(
          `유저 정보 업데이트에 실패했습니다. ${userError.message}`
        );
      }

      setUser({
        id: user?.id ?? "",
        email: user?.email ?? "",
        nickname: updateData.nickname ?? "",
        img_url: updateData.img_url ?? "",
      });
      

    } catch (error) {
      alert(`저장에 실패했습니다. ${error}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col px-10 my-10 gap-6 w-2/5 mx-auto">
      <h1 className="text-2xl font-bold">마이 페이지</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex relative w-24 h-24">
          <img
            src={previewImage || "/user-icon.svg"}
            alt="유저 프로필 사진"
            className="w-24 h-24 rounded-full object-cover"
          />
          <label htmlFor="profileImage" className="absolute bottom-0 right-0">
            <img
              src="/camera-icon.svg"
              alt="유저 프로필 사진 변경"
              className="w-10 bg-white rounded-3xl cursor-pointer"
            />
          </label>
          <input
            name="profileImage"
            id="profileImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileImageChange}
          />
        </div>
        <label htmlFor="email">이메일</label>
        <input
          name="email"
          id="email"
          type="email"
          disabled
          className="bg-gray-300 p-2 border rounded-md h-10 cursor-not-allowed"
          value={data?.email}
        />
        <label htmlFor="nickname">닉네임</label>
        <input
          name="nickname"
          id="nickname"
          type="text"
          className="p-2 border rounded-md h-10"
          value={nickname}
          onChange={handleNicknameChange}
        />
        <button
          disabled={isUploading}
          className={`bg-yellow-500 text-white px-4 py-2 rounded-md ml-auto ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isUploading ? "업로드 중..." : "저장하기"}
        </button>
      </form>
    </div>
  );
};

export default MyPage;
