const Comment = () => {
  return (
    <>
      <div className="flex gap-3 items-start">
        <img src="/user-icon.svg" alt="유저 프로필 사진" className="w-10"></img>
        <div className="flex flex-col flex-1 gap-5">
          <div className="font-bold">유저 닉네임</div>
          <div>
            댓글 내용
            <br />
            댓글 내용
            <br />
            댓글 내용
            <br />
            댓글 내용
            <br />
            댓글 내용
          </div>
        </div>
        <div className="flex gap-2">
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
      <hr/>
    </>
  );
};

export default Comment;
