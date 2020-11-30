import React, { useEffect, useState } from "react";
import Post from "../post/Post";
// import posts from "../../test-data/posts";
import { db } from "../../db/firebase";

function Home() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    // try {
    //   const posts = db.collection("postss");
    //   posts.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
    //     setPost(
    //       snapshot.docs.map((document) => ({
    //         id: document.id,
    //         post: document.data(),
    //       }))
    //     );
    //   });
    // } catch (error) {
    //   console.log(error);
    //   alert(error);
    // }

    const unsubscribe = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs.map((document) => document.data()));
        setPost(
          snapshot.docs.map((document) => ({
            id: document.id,
            post: document.data(),
          }))
        );
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="bg-light min-vh-100">
        <div className="nav-height "></div>
        <div className="container mt-4">
          <div className="row gx-3">
            <div className="col-12 mx-auto post-width ">
              {!post.length > 0 ? (
                <p className="text-center p-5 text-muted">Nothing to Show</p>
              ) : (
                post.map((postdata) => {
                  return (
                    <Post
                      key={postdata.id}
                      imgUri={postdata.post.image}
                      username={db
                        .collection("users")
                        .doc(`${postdata.post.uid}`)}
                      caption={postdata.post.caption}
                    />
                  );
                })
              )}
            </div>
            <div className="col d-none d-lg-block sidebar ">
              <div className="p-3 border bg-white sticky-top lh-base">
                After the smash international success of On the Dancefloor and
                their album BREAKING BARRIERS charting #6 on the Top 10 Albums
                on iTunes U.K, North America's Best - The Bilz & Kashif are
                proud to release "Single" taken from their highly anticipated
                album - BREAKING BARRIERS. The video is about celebrating being
                single and enjoying the moment while it lasts. Summer love is
                what we all experience and this video was shot in beautiful Los
                Angeles California.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
