import { useQuery } from "@tanstack/react-query";
import upvoteCountApi from "../api/upvoteApi";
import commentCountApi from "../api/commentApi";

export interface FeedProps {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

const Feed = ({ truncated, feed }: { truncated: boolean; feed: FeedProps }) => {
  const { data: commentsCount } = useQuery({
		queryKey: ["comments", feed.id],
		queryFn: () => commentCountApi(feed.id)
	});

	const { data: upvotesCount } = useQuery({
		queryKey: ["upvotes", feed.id],
		queryFn: () => upvoteCountApi(feed.id)
	})

  return (
    <>
      <div key={feed.id} className="flex bg-white p-6 rounded-lg h-46">
        <div className="flex flex-col justify-center items-center text-sm mb-auto">
          <button>
            <img src="/heart-icon.svg" alt="좋아요" />
          </button>
          <p>{upvotesCount}</p>
        </div>
        <div className="flex-1 px-10 flex flex-col gap-4 w-10/12">
          <div className="flex flex-col gap-2">
            <div className="text-xl font-bold">{feed.title}</div>
            <div className={`text-sm ${truncated ? "truncate" : ""}`}>
              {feed.content}
            </div>
          </div>
          <div className="text-right text-xs text-gray-600">
            {new Date(feed.created_at).toLocaleDateString()}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center p-3 gap-1">
          <img src="/comment-icon.svg" alt="댓글" />
          <p className="text-sm">{commentsCount}</p>
        </div>
      </div>
    </>
  );
};

export default Feed;
