/**
 * @desc This file contains the Layout, and send ajax calls for authentication
 * @auth Mahnoor Mustajab
 * @modified by Mursleen and Sehrish
 * @date 27/07/2022
 */
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AuthService } from "../services/AuthService";
import { toast } from "react-toastify";
import { SessionService } from "../services/SessionService";
import { useRouter } from "next/router";
import { UserRightsService } from "../services/AuthorizationService/UserRightsManagement";
import Cookie from "js-cookie";
import { APP_ROUTES, STORAGE_IMAGES } from "../helpers/enums";
import Router from "next/router";
import { getOperatorFromCookie } from "../helpers/cookie-parser";
import { default as Sidebar } from "../components/Sidebar";
import { default as Footer } from "../components/Footer";
import { default as Navbar } from "../components/Navbar";
import { BACKEND_ROUTES } from "../helpers/backend_routes";
import GoBack from "./GoBack";
import { encryptData } from "../helpers/encrypt";
import Head from "next/head";

import { APP } from "../helpers/enums";
const Layout = ({ authorizedSubmoduleProp = null, children, title }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isLogIn, setIsLogIn] = useState(false);
  const router = useRouter();
  const [profileImage, setProfileImage] = useState("");
  const [navBarPropState, setNavBarPropState] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [sidebar, setSidebar] = useState(true);
  const operator = getOperatorFromCookie();

  // 🆕 Scroll to Top Button Logic
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const authorizedAppModule = async () => {
    const user = getOperatorFromCookie();
    const response = await UserRightsService.getAuthorizedAppModule({
      EMPID: user,
    });

    if (response) {
      const res = await response.json();

      if (res.status === "SUCCESS") {
        const data = res.data;
        setNavBarPropState(data);

        const currentPath = router.pathname;

        let modulesURLs = [];
        for (let i = 0; i < data.length; i++) {
          data[i].modules.map((module) => {
            if (module.URL) {
              modulesURLs.push(module.URL);
            }
          });
        }

        if (
          modulesURLs.includes(currentPath) ||
          currentPath === APP_ROUTES.LOGIN ||
          currentPath === APP_ROUTES.DASHBOARD
        ) {
          setIsAuthorized(true);
        } else {
          Router.push(APP_ROUTES.FORBIDDEN);
        }
      } else {
        if (Cookie.get(process.env.USER) && Cookie.get(process.env.TOKEN)) {
          Cookie.remove(process.env.USER);
          Cookie.remove(process.env.TOKEN);
        }
        Router.push(APP_ROUTES.FORBIDDEN);
      }
      setIsAuthenticating(false);
    } else {
      if (!user && !Cookie.get(process.env.TOKEN)) {
        Router.push(APP_ROUTES.SESSIONEXPIRED);
      } else {
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
    }
  };

  const checkTokenValidity = async () => {
    const response = await SessionService.checkSession();

    if (response) {
      if (
        response.status === "FAILURE" &&
        router.pathname != APP_ROUTES.LOGIN
      ) {
        if (Cookie.get(process.env.USER) && Cookie.get(process.env.TOKEN)) {
          Cookie.remove(process.env.USER);
          Cookie.remove(process.env.TOKEN);
        }
      } else {
        setIsLogIn(true);
        const res = await response.json();

        if (res.status === "SUCCESS") {
          const operator = encryptData(
            `operator=${res.data}`,
            process.env.ENCRYPT_KEY
          );

          Cookie.set("operator", operator);
          await authorizedAppModule();
          if (authorizedSubmoduleProp !== null) {
            authorizedSubmoduleProp();
          }
        }
      }
    } else {
      if (Cookie.get(process.env.USER) || Cookie.get(process.env.TOKEN)) {
        Cookie.remove(process.env.USER);
        Cookie.remove(process.env.TOKEN);
      }
    }
  };

  const findProfileImage = async (empID) => {
    try {
      const pfpResponse = await AuthService.fetchPfp(empID);

      if (pfpResponse) {
        const res = await pfpResponse.json();

        if (res.status === "SUCCESS") {
          setProfileImage(res.data);
        } else {
          setProfileImage(
            STORAGE_IMAGES.STORAGE_CRM_REVAMPING_IMAGES_URL +
              STORAGE_IMAGES.PROFILE_IMAGE
          );
        }
      } else {
        setProfileImage(
          STORAGE_IMAGES.STORAGE_CRM_REVAMPING_IMAGES_URL +
            STORAGE_IMAGES.PROFILE_IMAGE
        );
      }
    } catch (error) {
      setProfileImage(
        STORAGE_IMAGES.STORAGE_CRM_REVAMPING_IMAGES_URL +
          STORAGE_IMAGES.PROFILE_IMAGE
      );
    }
  };

  const logOutFunc = async () => {
    const userName = getOperatorFromCookie();
    const logoutRes = await AuthService.logoutUser();

    if (logoutRes) {
      const res = await logoutRes.json();
      if (res.status === "SUCCESS") {
        Router.push(BACKEND_ROUTES.AUTH.CRM_LOGIN);
        return;
      } else {
        toast.error("Logout Failed");
        return;
      }
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  useEffect(() => {
    if (operator) {
      findProfileImage(operator);
    }
  }, [operator]);

  useEffect(() => {
    const container = document.getElementById("main-content");
    if (container) {
      container.style.transform = "scale(0.7)";
      container.style.transformOrigin = "top left";
      container.style.width = "142.86%";
      container.style.height = "142.86%";
    }
    return () => {
      if (container) {
        container.style.transform = "";
        container.style.width = "";
        container.style.height = "";
        console.log("Page Title: ", pageTitle);
      }
    };
  }, []);

  const pageTitle = title ? `${title}` : APP.TITLE;

  return (
    !isAuthenticating && (
      <>
        <Head>
          <title>{pageTitle}</title>

          <meta name="description" content={APP.DESC} />

          <meta name="keywords" content={APP.KEYWORDS} />

          <meta name="author" content={APP.AUTHOR} />
        </Head>
        {isLogIn && isAuthorized ? (
          <>
            <div style={{ background: "#f7f7f7" }}>
              <div className="main">
                <div className={sidebar ? "mainSidebar" : "mainCollapsedbar"}>
                  <Sidebar
                    appModulesProp={navBarPropState}
                    sidebarProp={sidebar}
                  />
                </div>

                <div className="mainSection">
                  <div>
                    <Navbar
                      appModulesProp={navBarPropState}
                      setSidebarProp={setSidebar}
                      sidebarProp={sidebar}
                      operator={operator}
                      logOutFunc={logOutFunc}
                      profileImage={profileImage}
                    />
                    <div>
                      <div className="">{children}</div>
                      <Footer />
                    </div>
                  </div>

                  {/* 🆕 Go to Top Button */}
                  {showScrollButton && (
                    <button
                      onClick={scrollToTop}
                      style={{
                        position: "fixed",
                        bottom: "70px",
                        right: "30px",
                        zIndex: 1000,
                        padding: "8px 10px",
                        backgroundColor: "#284E93",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        fontSize: "16px", // smaller font
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                        cursor: "pointer",
                      }}
                      title="Scroll to Top"
                    >
                      ↑
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <GoBack />
        )}
      </>
    )
  );
};

export default Layout;
