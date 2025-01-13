import { Link, useNavigate } from "react-router-dom";
import Feed from "../components/Feed";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";

const Detail = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col max-w-screen-lg mx-auto px-10 my-10 gap-4">
        <div className="flex justify-between">
          <button className="text-left" onClick={() => navigate(-1)}>
            {"< 뒤로가기"}
          </button>
          <div className="flex gap-2">
            <Link to={"/feeds/update/:id"}>수정</Link>
            <button>삭제</button>
          </div>
        </div>

        <Feed truncated={false} />
        <div className="flex flex-col bg-white p-6 rounded-lg gap-5">
          <div className="font-bold mb-7">10 Comments</div>
          <Comment />
          <Comment />
          <Comment />
        </div>
        <CommentForm />
      </div>
    </>
  );
};

export default Detail;
