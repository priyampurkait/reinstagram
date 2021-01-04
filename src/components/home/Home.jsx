import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import { db } from "../../db/firebase";

function Home() {
  const [post, setPost] = useState([]);

  useEffect(() => {

    const unsubscribe = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
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
                      timestamp={postdata.post.timestamp.seconds}
                    />
                  );
                })
              )}
            </div>
            <div className="col d-none d-lg-block sidebar ">
              <div className="p-3 border bg-white sticky-top lh-base">
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
