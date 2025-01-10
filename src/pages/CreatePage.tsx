import { useNavigate } from "react-router-dom";
import FeedForm from "../components/FeedForm";

const CreatePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <FeedForm formTitle={"작성하기"}>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-auto"
          onClick={() => navigate("/")}
        >
          작성완료
        </button>
      </FeedForm>
    </>
  );
};

export default CreatePage;
