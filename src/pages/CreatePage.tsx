import { useNavigate } from "react-router-dom";

const CreatePage = ({ isCreatePage = true }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col px-10 my-10 gap-6 max-w-screen-lg mx-auto">
        <h1 className="text-2xl font-bold">
          {isCreatePage ? "작성하기" : "수정하기"}
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-xl font-bold">
            제목
          </label>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            className="border rounded-lg border-gray-300 p-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-xl font-bold">
            내용
          </label>
          <textarea
            name=""
            id=""
            placeholder="내용을 입력해주세요."
            className="h-96 border rounded-lg border-gray-300 p-3 resize-none"
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-auto"
          onClick={() => navigate("/")}
        >
          글쓰기
        </button>
      </div>
    </>
  );
};

export default CreatePage;
