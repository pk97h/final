import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { commentCountApi } from "../api/commentApi";
import { getUpvote, toggleUpvote, upvoteCountApi } from "../api/upvoteApi";
import useAuthStore from "../stores/useAuthStore";

export interface FeedProps {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

const Feed = ({ truncated, feed }: { truncated: boolean; feed: FeedProps }) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: commentsCount } = useQuery({
    queryKey: ["comments", feed.id, "count"],
    queryFn: () => commentCountApi(feed.id),
  });

  const { data: upvotesCount } = useQuery({
    queryKey: ["upvotes", feed.id, "count"],
    queryFn: () => upvoteCountApi(feed.id),
  });

  // 개별 upvote 가져오기
  const { data: upvotes } = useQuery({
    queryKey: ["upvotes", feed.id],
    queryFn: () => {
      if (!feed.id) {
        throw new Error("id가 없습니다.");
      }
      return getUpvote(feed.id);
    },
  });

  // 로그인 한 유저가 좋아요 했는지 확인
  const isUpvoted = upvotes?.some((upvote) => upvote.user_id === user?.id);

  const toggleMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        alert("로그인 후 이용 가능합니다.");
        return;
      }
      await toggleUpvote({
        feedId: feed.id,
        userId: user.id,
        isUpvoted: isUpvoted as boolean,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["upvotes", feed.id] });
    },
  });

  return (
    <>
      <div key={feed.id} className="flex bg-white p-6 rounded-lg h-46">
        <div className="flex flex-col justify-center items-center text-sm mb-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMutation.mutate();
            }}
          >
            <img src="/heart-icon.svg" alt="좋아요" />
          </button>
          <p className={isUpvoted ? "text-pink-600 font-bold" : ""}>
            {upvotesCount}
          </p>
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
