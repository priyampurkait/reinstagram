import React, { useState, useEffect } from "react";
import moment from 'moment';

function Post({ imgUri, username, caption,timestamp }) {
  let formatted= moment.unix(timestamp).format("LLLL ");

  const [uname, setuname] = useState("");
  useEffect(() => {
    username.get().then((doc) => {
      console.log(doc.data().username);
      setuname(doc.data().username);
    });
  }, []);

// var formatted = moment.format("dd.mm.yyyy hh:MM:ss");

  return (
    <div className="card mb-4">
      <div className="card-header py-3 bg-white d-inline-flex align-middle">
        <img
          className="avator p-0 d-block img-thumbnail rounded-circle"
          src="https://cdn.pixabay.com/photo/2020/07/21/17/48/love-5426977_960_720.jpg"
          alt="React Logo"
        />
        <span className="font-weight-bold ml-3 align-middle">{uname}</span>
      </div>
      <img src={imgUri} className="card-img-top img-fluid" alt="..." />
      <div className="card-body">
        <p className="card-text">
          <span className="font-weight-bold">{uname} </span>
          <span className="">{caption}</span>
        </p>
      </div>
      <div className="card-footer text-muted bg-white">{formatted}</div>
    </div>
  );
}

export default Post;
