import { Link } from "react-router-dom";
import Feed from "../components/Feed";

const Home = () => {
  return (
    <>
      <div className="max-w-screen-lg mx-auto px-10 my-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">글 목록</h1>
          <Link
            to={"/feeds/create"}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            글쓰기
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <Link to={"/feeds/:id"}>
            <Feed />
          </Link>
          <Link to={"/feeds/:id"}>
            <Feed />
          </Link>
          <Link to={"/feeds/:id"}>
            <Feed />
          </Link>
          <Link to={"/feeds/:id"}>
            <Feed />
          </Link>
          <Link to={"/feeds/:id"}>
            <Feed />
          </Link>
          <Link to={"/feeds/:id"}>
            <Feed />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
