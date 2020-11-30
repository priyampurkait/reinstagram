import React, { useContext } from "react";
// import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import { auth } from "../../db/firebase";
import home from "../../icons/home.svg";
import upload from "../../icons/upload.svg";
import heart from "../../icons/heart.svg";
import instagram from "../../icons/instagram.svg";
import logo from "../../icons/logo.png";
import PostModel from "../postmodel/PostModel";

function Navbar() {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    console.log("User: true");
  } else {
    console.log("User: false");
  }
  return currentUser ? (
    <>
      <nav className="navbar navbar-expand-lg navbar-light globalnav fixed-top">
        <div className="container ">
          <div className="d-flex flex-row justify-content-between mx-auto cont-main">
            <div className="">
              {/* <a className="navbar-brand title">Reinstagram</a> */}
              <a className="navbar-brand" href="/">
                <img
                  src={logo}
                  // width="30"
                  height="30"
                  alt="logo"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="align-self-center">
              <form className="d-none d-sm-flex">
                <input
                  className="form-control form-control-sm text-centers"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </div>
            <div className="">
              <ul className="navbar-nav flex-row">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    <img src={home} alt="React Logo" />
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    type="button"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    <img src={upload} alt="React Logo" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <img src={heart} alt="React Logo" />
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src={instagram} alt="React Logo" />
                  </a>
                  <ul
                    className="dropdown-menu "
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li
                      className=""
                      style={{ borderBottom: "1px solid rgba(0,0,0,.15)" }}
                    >
                      <a className="dropdown-item py-2" href="#">
                        <strong>Profile</strong>
                      </a>
                    </li>
                    <li>
                      <a
                        type="button"
                        onClick={() => auth.signOut()}
                        className="dropdown-item py-2 text-danger"
                      >
                        <strong>Log out</strong>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* <!-- Modal --> */}
      <PostModel uid={auth.currentUser.uid} />
    </>
  ) : (
    <></>
  );
}

export default Navbar;
