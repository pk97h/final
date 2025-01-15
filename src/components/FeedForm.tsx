const FeedForm = ({
  formTitle,
  children,
}: {
  formTitle: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className="flex flex-col px-10 my-10 gap-6 max-w-screen-lg mx-auto">
        <h1 className="text-2xl font-bold">{formTitle}</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-xl font-bold">
            제목
          </label>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            className="border rounded-lg border-gray-300 p-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-xl font-bold">
            내용
          </label>
          <textarea
            name=""
            id=""
            placeholder="내용을 입력해주세요."
            className="h-96 border rounded-lg border-gray-300 p-3 resize-none"
          />
        </div>
        {children}
      </div>
    </>
  );
};

export default FeedForm;
