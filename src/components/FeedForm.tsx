const FeedForm = ({
  formTitle,
  children,
  title,
  content,
  handleTitleChange,
  handleContentChange,
  handleSubmit,
}: {
  formTitle: string;
  children: React.ReactNode;
  title: string;
  content: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <>
      <div className="flex flex-col px-10 my-10 gap-6 max-w-screen-lg mx-auto">
        <h1 className="text-2xl font-bold">{formTitle}</h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label htmlFor="title" className="text-xl font-bold">
            제목
          </label>
          <input
            name="title"
            id="title"
            type="text"
            placeholder="제목을 입력해주세요."
            className="border rounded-lg border-gray-300 p-3"
            value={title}
            onChange={handleTitleChange}
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="text-xl font-bold">
              내용
            </label>
            <textarea
              name="content"
              id="content"
              placeholder="내용을 입력해주세요."
              className="h-96 border rounded-lg border-gray-300 p-3 resize-none"
              value={content}
              onChange={handleContentChange}
            />
          </div>
          {children}
        </form>
      </div>
    </>
  );
};

export default FeedForm;
