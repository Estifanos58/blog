import { create } from "zustand";

const useStore = create((set) => ({
  // User Data
  user: {},
  setUser: (user) => set({ user }),

  // All Posts
  posts: [],
  setPosts: (posts) => set({ posts }),

  // Selected Post
  selectedPost: null,
  setSelectedPost: (post) =>
    set({
      selectedPost: {
        ...post,
        comments: post.comments || [], // ensure comments exists
      },
    }),

  // Add a comment only to selected post
  addComment: (comment) =>
    set((state) => ({
      selectedPost: {
        ...state.selectedPost,
        comments: [...(state.selectedPost?.comments || []), comment],
      },
    })),

  // Selected Post for Update
  updatePost: null,
  setUpdatePost: (post) => set({ updatePost: post }),
}));

export default useStore;
