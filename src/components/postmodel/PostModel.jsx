import React, { useState } from "react";
import { db, storage, auth } from "../../db/firebase";
import firebase from "firebase";

function PostModel() {
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const selectImage = (event) => {
    console.log(auth.currentUser.uid);
    // replace the file path
    // const fileName = event.target.value.replace(/.*[\/\\]/, "");
    const file = event.target.files[0];
    setFile(file);
    setImage(event.target.files[0]);
    console.log(image);
  };

  const uploadPost = () => {
    const uploadTask = storage.ref(`images/${image?.name}`).put(image);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
      },
      (error) => {
        // Error function
        console.log(error.message);
      },
      () => {
        // complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              uid: auth.currentUser.uid,
              caption: caption,
              image: url,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            setCaption("");
            setImage(null);
            setProgress(0);
          });
      }
    );
  };
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      data-backdrop="static"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add New Post
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <textarea
                value={caption}
                onChange={(event) => {
                  setCaption(event.target.value);
                }}
                style={{
                  resize: "none",
                  overflow: "hidden",
                }}
                className="form-control"
                placeholder="Enter caption"
                id="exampleFormControlTextarea"
                // rows="2"
              ></textarea>
            </div>
            <div className="form-file">
              <input
                onChange={selectImage}
                accept="image/*"
                type="file"
                className="form-file-input"
                id="customFile"
                required
              />
              <label className="form-file-label">
                {file === "" ? (
                  <span className="form-file-text">Select Photo</span>
                ) : (
                  <span className="form-file-text">{file?.name}</span>
                )}
                <span className="form-file-button">Browse</span>
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={uploadPost}
              type="button"
              className="btn btn-primary"
            >
              Upload {progress} %
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostModel;
