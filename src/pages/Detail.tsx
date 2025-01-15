import { Link, useNavigate, useParams } from "react-router-dom";
import Feed from "../components/Feed";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import { useQuery } from "@tanstack/react-query";
import { feedApi } from "../api/feedApi";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["feeds", id],
    queryFn: () => {
      if (!id) {
				throw new Error("id가 없습니다.")
			}
      return feedApi(id)
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        에러가 발생하였습니다. <br />
        {error.message}
      </div>
    );

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
        <Feed truncated={false} feed={data}/>
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
