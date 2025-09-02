import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log("Redux feed state:", feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log("Full API response:", res); // 👈 see exact structure
      console.log("res.data:", res.data); // 👈 check what comes here
      console.log("res.data.data:", res.data?.data); // 👈 test if exists

      dispatch(addFeed(res.data)); // maybe it's res.data not res.data.data
    } catch (err) {
      console.error("Feed API Error:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;
  // Render only if feed exists AND has at least one user
  if (feed.length === 0) {
    return <h1 className="text-center mt-10">No New Users found</h1>;
  }

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
