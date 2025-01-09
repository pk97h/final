const Feed = ({truncated = true}) => {
  return (
    <div className="flex bg-white p-6 rounded-lg h-46">
      <div className="flex flex-col justify-center text-sm mb-auto">
        <button>
          <img src="/heart-icon.svg" alt="좋아요" />
        </button>
        <p>100</p>
      </div>
      <div className="flex-1 px-10 flex flex-col gap-4 w-10/12">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold">글 제목</div>
          <div className={`text-sm ${truncated ? "truncate" : ""}`}>
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
          </div>
        </div>
        <div className="text-right text-xs text-gray-600">2025.01.01</div>
      </div>
      <div className="flex flex-col justify-center items-center p-3 gap-1">
        <img src="/comment-icon.svg" alt="댓글" />
        <p className="text-sm">5</p>
      </div>
    </div>
  );
};

export default Feed;
