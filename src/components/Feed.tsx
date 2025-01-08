import { Link } from "react-router-dom";

const Feed = () => {
  return (
    <Link to={"/feeds/:id"} className="flex bg-white p-6 rounded-lg min-h-48">
      <div className="flex flex-col justify-center text-sm ">
        <button>
          <img src="public/heart-icon.svg" alt="좋아요" />
        </button>
        <p>100</p>
      </div>
      <div className="flex-1 px-10 flex flex-col gap-16">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold">글 제목</div>
          <div>글 내용</div>
        </div>
        <div className="text-right text-xs text-gray-600">2025.01.01</div>
      </div>
      <div className="flex flex-col justify-center items-center p-3 gap-1">
        <img src="public/comment-icon.svg" alt="댓글" />
        <p className="text-sm">5</p>
      </div>
    </Link>
  );
};

export default Feed;
