/**
 * @author: Mahnoor, Mursleen & Sehrish
 * @description: This is main Login page of the application
 * @datetime : 12-AUG-2022
 */

// ============= Start :: Imports =============
import { useState } from "react";
import React, { useEffect, useContext } from "react";
import Router from "next/router";
// import { SessionService } from "../services/SessionService";
import { AuthService } from "../services/AuthService";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APP_ROUTES } from "../helpers/enums";
import { getExpiryTime } from "../helpers/cookie-parser";
import Image from "next/image";
import loginImage from "../public/dist/img/Login-amico.svg";
import NayatelLogo from "../public/dist/img/NayatelLogo.svg";
import Loader from "../components/Loader/loader";
// ============= End :: Imports =============

// ============= Start :: Component =============
export default function Login() {
  // States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInState, setLoggedInState] = useState(false);

  // Function to be called on save
  const onSubmit = async (event) => {
    event.preventDefault();
    authentication();
    setLoggedInState(true);
  };

  /**
   * This function will authenticate user in database
   */
  const authentication = async () => {
    if (username && password) {
      const data = { username: username, password: password };
      const result = await AuthService.getToken(data);
      if (result) {
        const res = await result.json();
        if (res.httpStatus === 200 || res.httpStatus === 201) {
          if (res.status === "SUCCESS") {
            const accessToken = res.data.ACCESS_TOKEN;
            Cookie.set(process.env.TOKEN, accessToken, {
              expires: getExpiryTime(),
            });
            Cookie.set(process.env.USER, username, {
              expires: getExpiryTime(),
            });
            Router.push(APP_ROUTES.DASHBOARD);
          } else {
            setLoggedInState(false);
            toast.error(res.message);
          }
        } else {
          setLoggedInState(false);
          toast.error(res.message);
          return;
        }
      } else {
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
    } else {
      setLoggedInState(false);
      toast.error("Please enter valid username/password");
    }
  };

  /**
   * This function will check if user is already logged in or not
   */
  const checkTokenValidity = async () => {
    const userid = Cookie.get(process.env.USER);
    const token = Cookie.get(process.env.TOKEN);
    if (userid && token) {
      Router.push(APP_ROUTES.DASHBOARD);
    }
  };

  /**
   * Called on page load
   */
  useEffect(() => {
    checkTokenValidity();
  }, []);

  return (
    <>
      <div className="loginMainDiv">
        <ToastContainer />
        <div className="mt-5 pt-50">
          <div className="container h-auto rounded">
            <div
              className="row"
              style={{ boxShadow: "rgba(0, 0, 0, 0.14) 0px 3px 8px" }}
            >
              <div className="col-sm-12 col-md-6 col-lg-6 d-none d-md-block rounded-left custom-bg-color">
                <Image
                  src={loginImage}
                  width={400}
                  height={540}
                  alt="login-img"
                  style={{ maxWidth: "100%" }}
                />
              </div>

              <div
                className="col-sm-12 col-md-6 col-lg-6 "
                style={{ padding: "50px 20px" }}
              >
                <div className="text-sm-center text-lg-left">
                  <a href={APP_ROUTES.DASHBOARD} />
                  <Image
                    src={NayatelLogo}
                    width={150}
                    alt="logo"
                    className="brand-img mt-15 mb-15"
                  />
                </div>
                <h4 className="text-sm-center text-lg-left">Sign in</h4>

                <div className="form-wrap mt-20">
                  <form onSubmit={onSubmit}>
                    <div className="form-group">
                      <label className="control-label mb-1" htmlFor="username">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        required=""
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="">
                      <label
                        className="pull-left control-label mb-1"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        required=""
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-6">
                          <div className="checkbox checkbox-primary">
                            <input
                              id="checkbox_2"
                              required=""
                              type="checkbox"
                            />
                            <label
                              htmlFor="checkbox_2"
                              style={{ fontSize: "14px" }}
                            >
                              {" "}
                              Keep me logged in
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6">
                          <div className="d-flex justify-content-lg-end justify-content-md-start">
                            <a
                              className="text-primary pt-1"
                              href="forgot-password.html"
                            >
                              <u
                                className="font-italic"
                                style={{ fontSize: "14px" }}
                              >
                                Forgot password?
                              </u>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="form-group text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-block custom-bg-color xyz"
                        >
                          Sign In
                        </button>
                        {loggedInState === true ? <Loader /> : ""}
                        {/* <p className="pt-10">
                        Do not have an account?{" "}
                        <a href="signup.html" className="text-primary">
                          Sign up
                        </a>
                      </p> */}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
// ============= End :: Component ===============
