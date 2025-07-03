import { create } from "zustand";

const useStore = create((set) => {
    return {

        //User Data
        user: null,
        setUser: (user) => set({ user }),

        // Post Data
        posts: [],
        setPosts: (post) => set({ posts: post }),

        // Selected Post
        selectedPost: {},
        setSelectedPost: (post) => set({selectedPost: post}),

        // Seleced Post For Update
        updatePost: {},
        setUpdatePost: (post) => set({updatePost: post})


    }});

    export default useStore;