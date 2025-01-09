const CommentForm = () => {
  return (
    <>
      <div className="flex bg-white p-6 rounded-lg">
        <form className="flex flex-col flex-1 gap-3">
          <label htmlFor="" className="font-bold">
            댓글 작성
          </label>
          <textarea className="border rounded-lg border-gray-300 p-3 resize-none" />
          <div className="flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              작성
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentForm;
