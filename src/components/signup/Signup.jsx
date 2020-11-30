import React, { useState, useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import { db, auth } from "../../db/firebase";
import firebase from "firebase";
import standout from "../../icons/wilderness.svg";

function Signup({ history }) {
  // const [email, setEmail] = useState("");
  // const [fullname, setfullName] = useState("");
  // const [username, setusername] = useState("");
  // const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  const submit = useCallback(
    async (event) => {
      event.preventDefault();
      setloading(true);
      const { email, fullname, username, password } = event.target.elements;
      console.log({
        email: email.value,
        fullname: fullname.value,
        username: username.value,
      });
      try {
        const users = db.collection("users");
        await auth
          .createUserWithEmailAndPassword(email.value, password.value)
          .then(async (authUser) => {
            console.log(authUser.user.email);
            authUser.user.updateProfile({
              displayName: username.value,
            });
            await users
              .doc(authUser.user.uid)
              .set({
                uid: authUser.user.uid,
                fullName: fullname.value,
                // email: authUser.user.email,
                username: username.value,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .catch((error) => {
                // Handle Errors here.
                console.log(error.code);
                console.log(error.message);
              });
            console.log(authUser);
          });
        history.push("/");
      } catch (error) {
        console.log(error);
        setloading(false);
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container-fluid px-0">
      <div className="row min-vh-100 mx-0 ">
        <div className="col d-none d-md-block">
          <div className="row min-vh-100 align-items-center mx-auto">
            <div className="col text-center">
              <img className="img-fluid w-50" src={standout} alt="React Logo" />
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-w bg-light">
          <div className="row min-vh-100 align-items-center mx-auto">
            <div className="col p-4">
              <div className="mb-5 text-center">
                <h1 className="title ">Reinstagram</h1>
                <h6 className="mt-4 text-muted">
                  Sign up to see photos and videos
                  <br /> from your friends.
                </h6>
              </div>
              <form onSubmit={submit}>
                <div className="mb-3">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email: example@email.com"
                    className="form-control"
                    autoComplete="false"
                    aria-describedby="emailHelp"
                    // value={email}
                    // onChange={(event) => {
                    //   setEmail(event.target.value);
                    //   console.log(email);
                    // }}
                  />
                  <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                  <input
                    name="fullname"
                    type="text"
                    placeholder="Full Name"
                    className="form-control"
                    autoComplete="false"
                    aria-describedby="emailHelp"
                    // value={fullname}
                    // onChange={(event) => {
                    //   setfullName(event.target.value);
                    // }}
                  />
                  <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                  <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="form-control"
                    autoComplete="false"
                    aria-describedby="emailHelp"
                    // value={username}
                    // onChange={(event) => {
                    //   setusername(event.target.value);
                    // }}
                  />
                  <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-4">
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="false"
                    className="form-control"
                    // value={password}
                    // onChange={(event) => {
                    //   setpassword(event.target.value);
                    // }}
                  />
                  <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-4">
                  {loading ? (
                    <button
                      disabled
                      className="btn btn-primary btn-block btn-sm"
                    >
                      <div className="loader mx-auto" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary btn-block btn-sm"
                    >
                      Sign up
                    </button>
                  )}
                </div>
              </form>
              <div className="text-center">
                Have an account?{" "}
                <Link className="link" to="/">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Signup);
