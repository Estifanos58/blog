import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStore from "../store/store";
import axios from "axios";
import { toast } from "react-toastify";

function Detail() {
  const { selectedPost, addComment, user } = useStore();
  const { id } = useParams();

  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/posts/${id}/comments`,
        { content: newComment },
        { withCredentials: true }
      );
      if (response.status === 201) {
        addComment(response.data);
        setNewComment("");
        setSubmitting(false);
        toast.success("Comment added successfully");
      } else {
        setSubmitting(false);
        toast.error("Failed to add comment");
        // console.log("error happend")
      }
    } catch (error) {
      setSubmitting(false);
      console.log("error:", error);
    }
  };
  return (
    <div className="px-4 py-10 flex flex-col items-center">
      {/* Main Post Box */}
      <div className="relative w-full max-w-5xl border border-black bg-white">
        {/* Featured Post Ribbon */}
        <div className="absolute -top-5 left-5 bg-white px-5 py-2 border border-black">
          <h2 className="uppercase tracking-[4px] text-2xl font-semibold">
            Featured Post
          </h2>
        </div>

        {/* Image */}
        <div className="w-full h-[300px] md:h-[400px] bg-gray-200 overflow-hidden">
          <img
            src={selectedPost.image || "/placeholder.jpg"}
            alt={selectedPost.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta */}
          <p className="text-sm text-gray-600 mb-1">
            Posted &middot;{" "}
            {new Date(selectedPost.createdAt || Date.now()).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )}{" "}
            &middot; 2 min read
          </p>

          {/* Title */}
          <h1 className="text-xl md:text-3xl font-bold mb-2">
            {selectedPost.title}
          </h1>

          {/* Description */}
          <p className="text-base text-gray-800 leading-relaxed mb-6">
            {selectedPost.description}
          </p>

          {/* PortableText (currently fallback as plain text) */}
          <p className="text-sm text-gray-950 whitespace-pre-line">
            {selectedPost.content}
          </p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="w-full max-w-5xl mt-12 p-6 bg-white border border-black rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>

        {/* New Comment Input */}
        <div className="flex flex-col gap-3 mb-6">
          <textarea
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          {user?.id ? (
            <button
              onClick={handleSubmitComment}
              disabled={submitting}
              className="self-end bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
            >
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          ) : (
            <p className="text-sm float-right">Create an Account To Comment</p>
          )}
        </div>

        {selectedPost.comments.length === 0 ? (
          <p className="text-gray-700 italic">Be the first to Comment</p>
        ) : (
          <div className="space-y-4 max-h-[300px] overflow-y-scroll">
            {selectedPost.comments.map((comment, index) => (
              <div key={index} className="border-b border-gray-200 pb-2">
                <p className="text-sm text-gray-800">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;
