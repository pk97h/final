interface CommentProps {
	id: string;
	content: string;
	created_at: string;
	feed_id: string;
	user_id: string;
	user: {
		id: string;
		nickname: string;
		email: string;
		img_url: string;
	}
}

const Comment = ({ comment }: { comment: CommentProps }) => {

  return (
    <>
      <div className="flex gap-3 items-start">
				{comment.user.img_url ?
					<img src={comment.user.img_url} alt="유저 프로필 사진" className="w-10 h-10 rounded-full" /> :
					<img src="/user-icon.svg" alt="유저 프로필 사진" className="w-10"/>}
        <div className="flex flex-col flex-1 gap-5">
          <div className="font-bold">{comment.user.nickname}</div>
          <div>{comment.content}</div>
        </div>
        <div className="flex gap-2">
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Comment;
