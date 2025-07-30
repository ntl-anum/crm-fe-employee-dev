import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { STORAGE_IMAGES } from "../helpers/enums";
import LOCAL_NAYATEL_LOGO from "../public/dist/img/NayatelLogo.svg";
import LOCAL_DASHBOARD_ICON from "../public/dist/img/Dashboard.svg";
import LOCAL_CRM_ICON from "../public/dist/img/newNavCRM.svg";
import ImageWithFallback from "./ImageWithFallback";
import { getOperatorFromCookie } from "../helpers/cookie-parser";
import { AuthService } from "../services/AuthService";
import { BACKEND_ROUTES } from "../helpers/backend_routes";
import { toast } from "react-toastify";

export default function Sidebar({ appModulesProp, sidebarProp }) {
  const [activeAppItem, setActiveAppItem] = useState(null);
  const [activeModuleList, setActiveModuleList] = useState(null);
  const [openApp, setOpenApp] = useState(null);
  const [openSubModule, setOpenSubModule] = useState(null);
  const [didInitExpand, setDidInitExpand] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!appModulesProp || !router.pathname) return;

    const currentPath = router.asPath.split("?")[0];
    let matched = false;

    for (const appItem of appModulesProp) {
      for (const module of appItem.modules) {
        const modPath = module.URL || module.FULL_URL;
        if (currentPath === modPath || currentPath.startsWith(modPath + "/")) {
          setActiveAppItem(appItem);
          setActiveModuleList(appItem.modules);
          setOpenApp(appItem.APP_NAME);
          setOpenSubModule(appItem.APP_NAME);
          matched = true;
          break;
        }
      }
      if (matched) break;
    }

    if (!matched) {
      setActiveAppItem(null);
      setActiveModuleList(null);
      setOpenApp(null);
      setOpenSubModule(null);
    }
  }, [router.pathname, appModulesProp, didInitExpand]);

  const handleIconClick = (modules, appName) => {
    setOpenSubModule((prev) => (prev === appName ? null : appName));
    console.log("Clicked:", appName); // ✅ Add this
  };

  const handleAppItemClick = (appItem, moduleList) => {
    setActiveAppItem(appItem);
    setActiveModuleList(moduleList);
    setOpenApp((prev) => (prev === appItem.APP_NAME ? null : appItem.APP_NAME));
  };

  const logOutFunc = async () => {
    const logoutRes = await AuthService.logoutUser();

    if (logoutRes) {
      const res = await logoutRes.json();
      if (res.status === "SUCCESS") {
        router.push(BACKEND_ROUTES.AUTH.CRM_LOGIN);
      } else {
        toast.error("Logout Failed");
      }
    } else {
      toast.error("Logout Request Failed ");
    }
  };

  return (
    <Fragment>
      {sidebarProp ? (
        // ✅ Expanded Sidebar
        <div
          className="opened-sidebar d-flex flex-column"
          style={{
            height: "100vh",
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "thin",
            scrollbarColor: "#A7C7E7 transparent",
          }}
        >
          <div className="sticky-top bg-white px-2 pt-1 pb-3 mb-2">
            <Link href="/dashboard" className="text-white px-3">
              <ImageWithFallback
                fallbackSrc={LOCAL_NAYATEL_LOGO}
                src={LOCAL_NAYATEL_LOGO}
                style={{ width: "100px" }}
                alt="nayatel-logo"
                className="pt-2"
              />
            </Link>
          </div>

          <ul className="flex-grow-1">
            <li>
              <a className="custom-bg-color d-block font-16 weight-500 px-3 py-2 text-white">
                <ImageWithFallback
                  src={LOCAL_CRM_ICON}
                  fallbackSrc={LOCAL_CRM_ICON}
                  alt="crm-icon"
                  className="pb-1"
                  width={25}
                  height={29}
                  style={{
                    marginRight: "7px",
                    filter: "brightness(0) invert(1)",
                  }}
                />

                <span style={{ fontSize: "16px" }}>
                  NAYA
                  <span style={{ fontStyle: "italic" }}>tel </span> &nbsp;CRM
                </span>
              </a>

              <ul className="crm-main-menu">
                {appModulesProp &&
                  appModulesProp.map((element, i) => (
                    <Fragment key={i}>
                      <li
                        onClick={() =>
                          handleAppItemClick(element, element.modules)
                        }
                        style={{
                          background:
                            element === activeAppItem ? "#BDD4FF" : "",
                          borderRight:
                            element === activeAppItem
                              ? "3px solid rgb(17, 65, 153)"
                              : "",
                          paddingLeft: "35px",
                        }}
                        className="pt-2 pb-2"
                      >
                        <div className="font-14 weight-500 text-dark">
                          <ImageWithFallback
                            src={
                              STORAGE_IMAGES.STORAGE_CRM_REVAMPING_IMAGES_URL +
                              element.APP_NAME.replace(/\s+/g, "") +
                              ".svg"
                            }
                            fallbackSrc={LOCAL_DASHBOARD_ICON}
                            width={20}
                            alt="CRM-Icons"
                          />
                          <span className="ml-2">{element.APP_NAME}</span>
                          <span className="pull-right">
                            <i
                              className={`fa fa-angle-${
                                openApp === element.APP_NAME ? "up" : "down"
                              }`}
                            ></i>
                          </span>
                        </div>
                      </li>

                      {openApp === element.APP_NAME && (
                        <ul className="crm-main-submenu">
                          {element.modules.map((mod, i) => {
                            if (mod.DISPLAY_IN_SIDEBAR !== "YES") return null;

                            const modPath = mod.URL || mod.FULL_URL;
                            const currentPath = router.asPath.split("?")[0];
                            const isActive =
                              currentPath === modPath ||
                              currentPath.startsWith(modPath + "/");

                            return (
                              <li
                                key={i}
                                style={{
                                  background: isActive ? "#E5EFFF" : "",
                                  fontWeight: isActive ? "600" : "normal",
                                }}
                              >
                                <Link
                                  className="font-14 weight-400 text-dark pr-3 d-block py-2"
                                  style={{ textDecoration: "none" }}
                                  href={mod.FULL_URL}
                                >
                                  {mod.MODULE_NAME}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </Fragment>
                  ))}
              </ul>
            </li>
          </ul>

          <div className="mt-auto px-3 py-3">
            <button
              onClick={logOutFunc}
              className="btn opened-logout-btn w-100 d-flex align-items-center justify-content-center"
            >
              <i
                className="fa fa-power-off"
                style={{ marginRight: "10px" }}
              ></i>{" "}
              Logout
            </button>
          </div>
        </div>
      ) : (
        // ✅ Collapsed Sidebar
        <div
          className="collapsed-sidebar mx-2 bg-white parent-collapsed-listItem d-flex flex-column"
          style={{
            height: "100vh",
            overflowX: "visible",
            scrollbarWidth: "thin",
            scrollbarColor: "#A7C7E7 transparent",
            zIndex: "1000px",
          }}
        >
          <div className="sticky-top d-flex justify-content-center">
            <Link href="/dashboard" className="text-white">
              <ImageWithFallback
                fallbackSrc={LOCAL_DASHBOARD_ICON}
                src={
                  STORAGE_IMAGES.STORAGE_CRM_REVAMPING_IMAGES_URL +
                  STORAGE_IMAGES.NTL_LOGO
                }
                alt="nayatel-logo"
                className="pt-2"
                width={28}
                height={38}
              />
            </Link>
          </div>

          <div className="mt-4 text-center">
            <a className="custom-bg-color d-block font-16 weight-500 px-3 py-2 text-white">
              <ImageWithFallback
                fallbackSrc={LOCAL_DASHBOARD_ICON}
                src={
                  STORAGE_IMAGES.STORAGE_CRM_REVAMPING_IMAGES_URL +
                  STORAGE_IMAGES.CRM_ICON
                }
                alt="crm-icon"
                className="pb-1"
                width={20}
                height={24}
              />
            </a>
          </div>

          <ul className="mt-2 collapsed-sidebar-list flex-grow-1">
            {appModulesProp &&
              appModulesProp.map((element, i) => {
                const currentPath = router.asPath.split("?")[0];
                const isParentActive = element.modules?.some((mod) => {
                  const modPath = mod.URL || mod.FULL_URL;
                  return (
                    mod.DISPLAY_IN_SIDEBAR === "YES" &&
                    (currentPath === modPath ||
                      currentPath.startsWith(modPath + "/"))
                  );
                });

                return (
                  <li
                    className="pt-2 pb-2 collapsed-app-icons"
                    key={i}
                    style={{
                      position: "relative",
                      background: isParentActive ? "#E5EFFF" : "",
                      borderLeft: isParentActive
                        ? "4px solid #114199"
                        : "4px solid transparent",
                    }}
                  >
                    <div
                      className="text-center font-14 weight-500 text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const hasVisibleSubmodules = element.modules?.some(
                          (mod) => mod.DISPLAY_IN_SIDEBAR === "YES"
                        );

                        if (hasVisibleSubmodules) {
                          setOpenSubModule((prev) =>
                            prev === element.APP_NAME ? null : element.APP_NAME
                          );
                        } else {
                          setOpenSubModule(null);
                        }
                      }}
                      title={element.APP_NAME}
                    >
                      <ImageWithFallback
                        fallbackSrc={LOCAL_DASHBOARD_ICON}
                        src={
                          STORAGE_IMAGES.STORAGE_CRM_REVAMPING_IMAGES_URL +
                          element.APP_NAME.replace(/\s+/g, "") +
                          ".svg"
                        }
                        alt="CRM_APP_ICONS"
                      />
                    </div>

                    {openSubModule === element.APP_NAME && (
                      <ul className="child-collapsed-listItem">
                        {element.modules.map((mod, i) => {
                          if (mod.DISPLAY_IN_SIDEBAR !== "YES") return null;

                          const modPath = mod.URL || mod.FULL_URL;
                          const isActive =
                            currentPath === modPath ||
                            currentPath.startsWith(modPath + "/");

                          return (
                            <li
                              key={i}
                              style={{
                                background: isActive ? "#E5EFFF" : "",
                                fontWeight: isActive ? "600" : "normal",
                              }}
                            >
                              <Link
                                className="font-14 weight-400 text-dark pr-3 d-block py-2"
                                style={{ textDecoration: "none" }}
                                href={mod.FULL_URL}
                              >
                                {mod.MODULE_NAME}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
          </ul>

          <div className="mt-auto d-flex justify-content-center py-3">
            <button
              onClick={logOutFunc}
              className="collapsed-logout-btn"
              title="Logout"
            >
              <i className="fa fa-power-off"></i>
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
}
