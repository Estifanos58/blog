import React, { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import axios from "axios";
import useStore from "../store/store";
import { PostDats } from "../dummydata";
import PostCard from "../components/PostCard";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = useStore();

  useEffect(() => {
    const fechData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/posts`,
          { withCredentials: true }
        );
        // console.log("Response:", response);
        if (response.status === 200) {
          setPosts(response.data);   
          setIsLoading(false);
        } else {
          setIsLoading(false);
          console.error("Failed to fetch posts", response.statusText);
        }
      } catch (error) {
        console.log("Error: ", error);
        setIsLoading(false);
      }
    };

    fechData();
  }, []);

  console.log("Posts:", posts);

  return (
    <div>
      <CreatePost />
      <hr className="mx-10 md:mx-20 lg:mx-40 my-10 " />
      <div className="mx-10 md:mx-20 lg:mx-40">
        <h1 className="text-3xl tracking-wide capitalize">
          What People Have Posted
        </h1>
        <hr className="w-[300px] my-5"/>
        <div>
          {!isLoading && posts.length == 0 && (
            <div className="flex items-center justify-center">
              No Data Found Create a Blog
            </div>
          )}
          {isLoading && <div className="text-center">Loading</div>}
          <div className="flex gap-5 flex-wrap">
            {posts &&
              posts.map((item) => <PostCard item={item} key={item.id} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
