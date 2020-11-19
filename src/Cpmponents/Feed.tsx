import React, { useState, useEffect } from "react";
import { db } from "../Firebase/index";
import TweetInput from "./TweetInput";
import styles from "./Feed.module.css";
import Post from "./Post";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState([
    {
      id: "",
      avatar: "",
      image: "",
      text: "",
      timestamp: null,
      userName: "",
    },
  ]);

  useEffect(() => {
    const unSub = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            image: doc.data().image,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
            userName: doc.data().userName,
          }))
        )
      );
    return () => unSub();
  }, []);

  return (
    <div className={styles.feed}>
      <TweetInput />
      {posts.length > 0 &&
        posts.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            avatar={post.avatar}
            text={post.text}
            image={post.image}
            timestamp={post.timestamp}
            userName={post.userName}
          />
        ))}
    </div>
  );
};

export default Feed;
