import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, User, Mail, Send, Clock, Heart } from "lucide-react";
import useGetComments from "@/hooks/comment/useGetComments";
import usePostComment from "@/hooks/comment/usePostComment";
import useLikeComment from "@/hooks/comment/useLikeComment";
import { IComment } from "@/types/comment.types";

interface CommentSectionProps {
  blogId: string;
}

export default function CommentSection({ blogId }: CommentSectionProps) {
  const { comments, isLoading, addComment } = useGetComments(blogId);
  const { postComment, isSubmitting } = usePostComment();

  const [formData, setFormData] = useState({
    author: "",
    email: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.author || !formData.email || !formData.content) {
      return;
    }

    const newComment = await postComment({
      ...formData,
      blogId,
    });

    if (newComment) {
      addComment(newComment);
      setFormData({ author: "", email: "", content: "" });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const CommentItem = ({
    comment,
    index,
  }: {
    comment: IComment;
    index: number;
  }) => {
    const {
      isLiked,
      likeCount,
      toggleLike,
      isLoading: isLikeLoading,
    } = useLikeComment(comment._id, comment.likes || 0);

    return (
      <motion.div
        key={comment._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
      >
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
            {comment.author.charAt(0).toUpperCase()}
          </div>

          {/* Comment Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">{comment.author}</h4>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{formatDate(comment.createdAt)}</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">
              {comment.content}
            </p>

            {/* Like Button */}
            <button
              onClick={toggleLike}
              disabled={isLikeLoading}
              className={`flex items-center gap-2 text-sm font-medium transition-all hover:scale-105 disabled:opacity-50 ${
                isLiked ? "text-pink-600" : "text-gray-500 hover:text-pink-600"
              }`}
            >
              <Heart
                className={`w-5 h-5 transition-all ${
                  isLiked ? "fill-pink-600" : ""
                }`}
              />
              <span>{likeCount > 0 ? likeCount : "Like"}</span>
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="w-6 h-6 text-pink-600" />
        <h2 className="text-2xl font-bold text-gray-900">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Comment Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-xl p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Leave a Comment
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="author"
                  required
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Comment *
            </label>
            <textarea
              id="content"
              required
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
              placeholder="Share your thoughts..."
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Posting...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Post Comment</span>
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-gray-50 rounded-xl"
          >
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">No comments yet</p>
            <p className="text-gray-500 text-sm mt-1">
              Be the first to share your thoughts!
            </p>
          </motion.div>
        ) : (
          comments.map((comment, index) => (
            <CommentItem key={comment._id} comment={comment} index={index} />
          ))
        )}
      </div>
    </div>
  );
}
