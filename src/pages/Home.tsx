import { Link, useNavigate } from "react-router-dom";
import Feed from "../components/Feed";
import { useQuery } from "@tanstack/react-query";
import { feedsApi } from "../api/feedApi";
import useAuthStore from "../stores/useAuthStore";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["feeds"],
    queryFn: feedsApi,
  });
  if (error)
    return (
      <div>
        에러가 발생하였습니다. <br />
        {error.message}
      </div>
    );

  return (
    <>
      <div className="max-w-screen-lg mx-auto px-10 my-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">글 목록</h1>
          {user ? (
            <Link to={"/feeds/create"} className="write-button">
              글쓰기
            </Link>
          ) : null}
        </div>
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              <div className="h-36 bg-gray-200 animate-pulse rounded-lg" />
              <div className="h-36 bg-gray-200 animate-pulse rounded-lg" />
              <div className="h-36 bg-gray-200 animate-pulse rounded-lg" />
              <div className="h-36 bg-gray-200 animate-pulse rounded-lg" />
            </div>
          ) : (
            data?.map((feed) => (
              <div
                key={feed.id}
                onClick={() => navigate(`/feeds/${feed.id}`)}
                className="cursor-pointer"
              >
                <Feed feed={feed} truncated={true} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
