import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { auth } from "../../db/firebase";
import { AuthContext } from "../../AuthProvider";
import standout from "../../icons/standout.svg";
import { Link } from "react-router-dom";

function Login({ history }) {
  const [loading, setloading] = useState(false);
  const submit = useCallback(
    async (event) => {
      event.preventDefault();
      setloading(true);
      const { email, password } = event.target.elements;
      try {
        await auth.signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
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
              <div className="mb-5">
                <h1 className="title text-center">Reinstagram</h1>
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
                      Login
                    </button>
                  )}
                </div>
              </form>
              <div className="text-center">
                Don't have an account?{" "}
                <Link className="link" to="/signup">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
