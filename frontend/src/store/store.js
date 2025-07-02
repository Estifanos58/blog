import { create } from "zustand";

const useStore = create((set) => {
    return {

        //User Data
        user: null,
        setUser: (user) => set({ user }),


    }});

    export default useStore;