import { useNavigate } from "react-router-dom";
import FeedForm from "../components/FeedForm";

const UpdatePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <FeedForm formTitle={"수정하기"}>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-md ml-auto"
          onClick={() => navigate("/")}
        >
          수정완료
        </button>
      </FeedForm>
    </>
  );
};

export default UpdatePage;
