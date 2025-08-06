import { useState } from "react";
import axios from "axios";
import type { Comment } from "../types/index";

interface CommentsSectionProps {
  taskId: number;
  comments: Comment[];
  onCommentsUpdate: (comments: Comment[]) => void;
  t: (key: string) => string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  taskId,
  comments,
  onCommentsUpdate,
  t,
}) => {
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/comments/task/${taskId}`,
        { content: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/comments/task/${taskId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      onCommentsUpdate(res.data);
      setNewComment("");
      alert(t("comment_added_successfully") || "Comment added successfully!");
    } catch (err) {
      console.error("Error adding comment:", err);
      alert(t("error_adding_comment") || "Error adding comment");
    }
  };

  const handleEditComment = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditingCommentText(content);
  };

  const handleSaveComment = async (commentId: number) => {
    if (!editingCommentText.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/comments/${commentId}`,
        { content: editingCommentText },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/comments/task/${taskId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      onCommentsUpdate(res.data);
      setEditingCommentId(null);
      setEditingCommentText("");
      alert(
        t("comment_updated_successfully") || "Comment updated successfully!",
      );
    } catch (err) {
      console.error("Error updating comment:", err);
      alert(t("error_updating_comment") || "Error updating comment");
    }
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditingCommentText("");
  };

  const handleDeleteComment = async (commentId: number) => {
    const confirmDelete = window.confirm(
      t("confirm_delete_comment") ||
        "Are you sure you want to delete this comment?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/comments/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/comments/task/${taskId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      onCommentsUpdate(res.data);
      alert(
        t("comment_deleted_successfully") || "Comment deleted successfully!",
      );
    } catch (err) {
      console.error("Error deleting comment:", err);
      alert(t("error_deleting_comment") || "Error deleting comment");
    }
  };

  return (
    <>
      {/* Add Comment Form */}
      <div className="bg-card p-4 rounded-xl h-50">
        <textarea
          className="bg-project w-full rounded-xl p-3 text-sm mb-2 resize-none focus:outline-none h-28"
          placeholder={t("add_comment")}
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>

        <button
          onClick={handleAddComment}
          className="bg-btn-orange text-white rounded-xl px-4 py-2 text-sm font-medium float-right cursor-pointer transition-colors duration-300 ease-in-out hover:brightness-110"
        >
          {t("publish")}
        </button>
      </div>

      {/* Comments List */}
      <div className="clear-both mt-4">
        {comments.map((comment) => (
          <div key={comment.id} className="text-sm bg-card p-4 rounded-xl mb-4">
            <div className="flex items-start gap-3">
              <img
                src="/src/assets/images/arthur.svg"
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-medium text-black">
                    {comment.author || "Unknown"}{" "}
                    <span className="text-gray-400 ml-2">
                      {new Date(comment.created_at).toLocaleString()}
                      {comment.updated_at &&
                        comment.updated_at !== comment.created_at && (
                          <span className="ml-1">(edited)</span>
                        )}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleEditComment(comment.id, comment.content)
                      }
                      className="text-blue-500 hover:text-blue-700 text-xs"
                    >
                      {t("edit") || "Edit"}
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      {t("delete") || "Delete"}
                    </button>
                  </div>
                </div>
                {editingCommentId === comment.id ? (
                  <div>
                    <textarea
                      value={editingCommentText}
                      onChange={(e) => setEditingCommentText(e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 rounded text-sm mb-2"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveComment(comment.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                      >
                        {t("save") || "Save"}
                      </button>
                      <button
                        onClick={handleCancelEditComment}
                        className="bg-gray-500 text-white px-3 py-1 rounded text-xs hover:bg-gray-600"
                      >
                        {t("cancel") || "Cancel"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>{comment.content}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentsSection;
