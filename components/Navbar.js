/**
 * @desc This file contains the Top Navbar
 * @auth Mahnoor Mustajab
 * @date 27/07/2022
 */

import Link from "next/link";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { STORAGE_IMAGES } from "@/helpers/enums";
import LOCAL_MENU_ICON from "public/dist/img/newNavMenuIcon.svg";
import LOCAL_SEARCH_ICON from "public/dist/img/searchIcon.svg";
import LOCAL_DASHBOARD_ICON from "public/dist/img/Dashboard.svg";
import LOCAL_CRM_ICON from "public/dist/img/newNavCRM.svg";
import LOCAL_HRM_ICON from "public/dist/img/newNavHRM.svg";
import LOCAL_AUTHORIZE_ICON from "public/dist/img/newNavAuthorize.svg";
import LOCAL_FTTH_ICON from "public/dist/img/newNavFTTH.svg";
import LOCAL_FAV_ICON from "public/dist/img/newNavFavIcon.svg";
import LOCAL_BELL_ICON from "public/dist/img/newNavBellIcon.svg";
import LOCAL_PROFILE_IMAGE from "public/dist/img/avatar.jpg";
import ImageWithFallback from "./ImageWithFallback";
import useOldCrmRights from "@/hooks/useOldCrmRights";
import OldCrmRightsList from "./OldCrmRightsList";
import {
  CIS,
  EVALUATION,
  FAVOURITES,
  PORTALS,
  SERVICE_DESK,
  SRF,
} from "@/constants/NavbarConstants";
//Sehrish Naseer Dated:23/09/22 -----Code Started Authorization
export default function Navbar({
  appModulesProp,
  setSidebarProp,
  sidebarProp,
  operator,
  logOutFunc,
  profileImage,
}) {
  /**
   * This function will clear cookies and redirect user
   */
  const [sidebar, showSidebar] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [CRMList, showCRMList] = useState(false);

  const [activeAppItem, setActiveAppItem] = useState(null);
  const [activeModuleList, setActiveModuleList] = useState(null);
  const [openApp, setOpenApp] = useState(null);

  // states for collapsed sidebar
  const [openSubModule, setOpenSubModule] = useState(null);

  // state to show old CRM rights
  const [showOldRights, setShowOldRights] = useState("");
  // hook to get old CRM rights
  const { getOldCrmRights, loadingRights, oldCrmRights } = useOldCrmRights();
  const oldCrmRightsRef = useRef(null);
  const oldCrmRightsButtonsRef = useRef(null);
  const favouritesRef = useRef(null);
  const favouritesButtonRef = useRef(null);
  const srfRef = useRef(null);
  const srfButtonRef = useRef(null);
  const ServiceDeskRef = useRef(null);
  const ServiceDeskButtonRef = useRef(null);
  const EvalutionRef = useRef(null);
  const EvaluationButtonRef = useRef(null);
  const navRef = useRef(null);

  const PortalsRef = useRef(null);
  const portalsButtonButtonRef = useRef(null);
  const CISRef = useRef(null);
  const CISButtonRef = useRef(null);
  const navbarScrollRef = useRef(null);
  const handleClickOutside = (event) => {
    const clickedOutsideOldCrm =
      oldCrmRightsRef?.current &&
      !oldCrmRightsRef.current.contains(event.target) &&
      oldCrmRightsButtonsRef?.current &&
      !oldCrmRightsButtonsRef.current.contains(event.target);

    const clickedOutsideFavourites =
      favouritesRef?.current &&
      !favouritesRef.current.contains(event.target) &&
      favouritesButtonRef?.current &&
      !favouritesButtonRef.current.contains(event.target);

    const clickedOutsideSrf =
      srfRef?.current &&
      !srfRef.current.contains(event.target) &&
      srfButtonRef?.current &&
      !srfButtonRef.current.contains(event.target);

    const clickedOutsideServiceDesk =
      ServiceDeskRef?.current &&
      !ServiceDeskRef.current.contains(event.target) &&
      ServiceDeskButtonRef?.current &&
      !ServiceDeskButtonRef.current.contains(event.target);

    const clickedOutsideEvaluation =
      EvalutionRef?.current &&
      !EvalutionRef.current.contains(event.target) &&
      EvaluationButtonRef?.current &&
      !EvaluationButtonRef.current.contains(event.target);

    const clickedOutsideInternalPortals =
      PortalsRef?.current &&
      !PortalsRef.current.contains(event.target) &&
      portalsButtonButtonRef?.current &&
      !portalsButtonButtonRef.current.contains(event.target);

    const clickedOutsideCIS =
      CISRef?.current &&
      !CISRef.current.contains(event.target) &&
      CISButtonRef?.current &&
      !CISButtonRef.current.contains(event.target);

    const isScrollbarClick = () => {
      if (!navbarScrollRef.current) return false;
      const rect = navbarScrollRef.current.getBoundingClientRect();
      // Check if click is within the navbar but on the scrollbar
      return (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom &&
        event.clientX > rect.right - 15 // Scrollbar area
      );
    };

    if (
      clickedOutsideOldCrm ||
      clickedOutsideFavourites ||
      clickedOutsideSrf ||
      clickedOutsideServiceDesk ||
      clickedOutsideEvaluation ||
      clickedOutsideInternalPortals ||
      clickedOutsideCIS
    ) {
      setShowOldRights("");
    }

    if (isScrollbarClick()) {
      setShowOldRights("");
      return;
    }
  };
  useEffect(() => {
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showOldRights === "CRM" && oldCrmRightsRef?.current) {
      oldCrmRightsRef?.current?.focus();
    }
  }, [showOldRights, oldCrmRightsRef]);

  // a function that will handle the click event on the icon
  const handleIconClick = (modules) => {
    setOpenSubModule(openSubModule === modules ? null : modules);
  };

  // Collapsed sidebar outside click
  function handleBodyClick(event) {
    handleClickOutside(event);
    if (event.target.closest(".collapsed-sidebar-list") === null) {
      setOpenSubModule(null);
    }
  }
  useEffect(() => {
    if (operator) {
      getOldCrmRights(operator);
    }
  }, [operator]);

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClick);
    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  function handleAppItemClick(appItem, moduleList) {
    setActiveAppItem(appItem);
    setActiveModuleList(moduleList);
  }
  function handleAppClick(appName) {
    setOpenApp((prevOpenApp) => (prevOpenApp === appName ? null : appName));
  }

  const handleMenu = () => {
    setOpen(!isOpen);
  };

  const handleCRMDropdown = () => {
    if (CRMList == true) {
      showCRMList(false);
    } else {
      showCRMList(true);
    }
  };

  const handleOnClickCRM = () => {
    setSidebarProp(!sidebarProp);
  };

  const getDropdownPosition = (buttonRef) => {
    if (!buttonRef?.current) return {};

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const navbarRect = navbarScrollRef.current?.getBoundingClientRect() || {
      left: 0,
    };

    return {
      position: "fixed",
      top: `${buttonRect.bottom}px`,
      left: `${buttonRect.left}px`,
      zIndex: 1000,
      // Optional styling:
      background: "white",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      borderRadius: "4px",
    };
  };
  return (
    // <!-- Top Menu Items -->
    <nav
      className="mb-2"
      style={{
        background: "#ffffff",
        borderRadius: "8px",
        boxShadow: "rgba(0, 0, 0, 9%) 0px 3px 8px",
        marginRight: "20px",
        marginLeft: "20px",
      }}
    >
      <div>
        <div className="px-1 py-2 mainNavbar">
          <div className="row text-left">
            <div className="col-sm-6 col-md-10">
              <div
                ref={navbarScrollRef}
                className="d-flex  align-items-center mt-2"
                style={{
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                  paddingBottom: "12px",
                  scrollbarColor: "#A7C7E7 #e0e0e0",
                  scrollbarWidth: "thin",
                  gap: "22px",
                }}
              >
                <div className="px-2 cursor-pointer" onClick={handleOnClickCRM}>
                  <ImageWithFallback
                    fallbackSrc={LOCAL_MENU_ICON}
                    src={
                      STORAGE_IMAGES.STORAGE_CRM_REVAMPING_IMAGES_URL +
                      STORAGE_IMAGES.MENU_ICON
                    }
                    alt="menu-icon"
                    className={`pb-1 ${
                      sidebarProp ? "rotate-0" : "rotate-180"
                    }`}
                    width={24}
                    height={24}
                  />
                </div>

                <div
                  ref={oldCrmRightsButtonsRef}
                  className="cursor-pointer"
                  onClick={() =>
                    setShowOldRights((prevState) =>
                      prevState === "CRM" ? "" : "CRM"
                    )
                  }
                >
                  <ImageWithFallback
                    fallbackSrc={LOCAL_CRM_ICON}
                    src={LOCAL_CRM_ICON}
                    alt="CRM-Icon"
                    className="pb-1"
                    width={20}
                    height={20}
                  />
                  <span className="weight-500 font-12 text-dark">CRM</span>
                  <i
                    className={`ml-1 fa ${
                      showOldRights === "CRM" ? "fa-angle-up" : "fa-angle-down"
                    }`}
                  ></i>
                  {showOldRights === "CRM" && (
                    <OldCrmRightsList
                      ref={oldCrmRightsRef}
                      {...{ oldCrmRights, getOldCrmRights, loadingRights }}
                    />
                  )}
                </div>

                {/* <div
                  ref={favouritesButtonRef}
                  className="cursor-pointer d-flex align-items-center"
                  onClick={() =>
                    setShowOldRights((prevState) =>
                      prevState === "FAVOURITES" ? "" : "FAVOURITES"
                    )
                  }
                >
                  <i
                    className="fa fa-star-o"
                    style={{ fontSize: "16px", color: "#999" }}
                  ></i>
                  <span className="weight-500 font-12 text-dark">
                    &nbsp;Favourites&nbsp;
                  </span>
                  <i
                    className={`ml-1 fa ${
                      showOldRights === "FAVOURITES"
                        ? "fa-angle-up"
                        : "fa-angle-down"
                    }`}
                  ></i>
                  {showOldRights === "FAVOURITES" && (
                    <div style={getDropdownPosition(favouritesButtonRef)}>
                      <OldCrmRightsList
                        ref={favouritesRef}
                        loadingRights={false}
                        getOldCrmRights={() => null}
                        oldCrmRights={FAVOURITES}
                      />
                    </div>
                  )}
                </div> */}

                <div className="d-flex align-items-center">
                  <ImageWithFallback
                    fallbackSrc={LOCAL_HRM_ICON}
                    src={
                      STORAGE_IMAGES.STORAGE_CRM_REVAMPING_IMAGES_URL +
                      STORAGE_IMAGES.HRM_ICON
                    }
                    alt="hrm-icon"
                    width={18}
                    height={18}
                  />
                  <Link
                    href="https://crm.nayatel.com/nhrms/IndexController/loadDashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <span className=" weight-500 font-12 text-dark">
                      &nbsp;HRMS
                    </span>
                  </Link>
                </div>

                <div
                  ref={srfButtonRef}
                  className="cursor-pointer "
                  onClick={() =>
                    setShowOldRights((prevState) =>
                      prevState === "SRF" ? "" : "SRF"
                    )
                  }
                >
                  <i
                    className="fa fa-file-text-o"
                    style={{ fontSize: "13px", color: "rgb(153, 153, 153)" }}
                  ></i>
                  <span className="weight-500 font-12 text-dark">
                    &nbsp;SRF&nbsp;
                  </span>
                  <i
                    className={`ml-1 fa ${
                      showOldRights === "SRF" ? "fa-angle-up" : "fa-angle-down"
                    }`}
                  ></i>
                  {showOldRights === "SRF" && (
                    <div style={getDropdownPosition(srfButtonRef)}>
                      <OldCrmRightsList
                        ref={srfRef}
                        loadingRights={false}
                        getOldCrmRights={() => null}
                        oldCrmRights={SRF}
                      />
                    </div>
                  )}
                </div>

                <div className="">
                  <ImageWithFallback
                    fallbackSrc={LOCAL_FTTH_ICON}
                    src={
                      STORAGE_IMAGES.STORAGE_CRM_REVAMPING_IMAGES_URL +
                      STORAGE_IMAGES.FTTH_ICON
                    }
                    alt="fms-icon"
                    className="pb-1"
                    width={20}
                    height={20}
                  />
                  <Link
                    href="https://crm.nayatel.com/views/crmViews/nayatelCrm/FleetManagement"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <span className=" weight-500 font-12 text-dark">FMS</span>
                  </Link>
                </div>

                <div className="">
                  <i
                    className="fa fa-wifi"
                    style={{
                      fontSize: "15px",
                      color: "#999",
                      marginRight: "4px",
                    }}
                  ></i>

                  <Link
                    href="https://crm.nayatel.com/views/testZend/public/index/index"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <span className=" weight-500 font-12 text-dark">FTTH</span>
                  </Link>
                </div>

                <div
                  ref={ServiceDeskButtonRef}
                  className="cursor-pointer"
                  onClick={() =>
                    setShowOldRights((prevState) =>
                      prevState === "SERVICE_DESK" ? "" : "SERVICE_DESK"
                    )
                  }
                >
                  <i
                    className="fa fa-headphones "
                    style={{ fontSize: "15px", color: "#999" }}
                  ></i>
                  <span className="weight-500 font-12 text-dark">
                    &nbsp;Service Desk&nbsp;
                  </span>
                  <i
                    className={`ml-1 fa ${
                      showOldRights === "SERVICE_DESK"
                        ? "fa-angle-up"
                        : "fa-angle-down"
                    }`}
                  ></i>
                  {showOldRights === "SERVICE_DESK" && (
                    <div style={getDropdownPosition(ServiceDeskButtonRef)}>
                      <OldCrmRightsList
                        ref={ServiceDeskRef}
                        loadingRights={false}
                        getOldCrmRights={() => null}
                        oldCrmRights={SERVICE_DESK}
                      />
                    </div>
                  )}
                </div>

                <div
                  ref={EvaluationButtonRef}
                  className="cursor-pointer"
                  onClick={() =>
                    setShowOldRights((prevState) =>
                      prevState === "EVALUATION" ? "" : "EVALUATION"
                    )
                  }
                >
                  <i
                    className="fa fa-clipboard "
                    style={{ fontSize: "15px", color: "#999" }}
                  ></i>
                  <span className="weight-500 font-12 text-dark">
                    &nbsp;Evaluation&nbsp;
                  </span>
                  <i
                    className={`ml-1 fa ${
                      showOldRights === "EVALUATION"
                        ? "fa-angle-up"
                        : "fa-angle-down"
                    }`}
                  ></i>
                  {showOldRights === "EVALUATION" && (
                    <div style={getDropdownPosition(EvaluationButtonRef)}>
                      <OldCrmRightsList
                        ref={EvalutionRef}
                        loadingRights={false}
                        getOldCrmRights={() => null}
                        oldCrmRights={EVALUATION}
                      />
                    </div>
                  )}
                </div>

                <div
                  ref={portalsButtonButtonRef}
                  className="cursor-pointer"
                  onClick={() =>
                    setShowOldRights((prevState) =>
                      prevState === "PORTALS" ? "" : "PORTALS"
                    )
                  }
                >
                  <i
                    className="fa fa-home"
                    style={{ fontSize: "15px", color: "#999" }}
                  ></i>
                  <span className="weight-500 font-12 text-dark">
                    &nbsp;Internal Portals&nbsp;
                  </span>
                  <i
                    className={`ml-1 fa ${
                      showOldRights === "PORTALS"
                        ? "fa-angle-up"
                        : "fa-angle-down"
                    }`}
                  ></i>
                  {showOldRights === "PORTALS" && (
                    <div style={getDropdownPosition(portalsButtonButtonRef)}>
                      <OldCrmRightsList
                        ref={PortalsRef}
                        loadingRights={false}
                        getOldCrmRights={() => null}
                        oldCrmRights={PORTALS}
                      />
                    </div>
                  )}
                </div>

                <div
                  ref={CISButtonRef}
                  className="cursor-pointer"
                  onClick={() =>
                    setShowOldRights((prevState) =>
                      prevState === "CIS" ? "" : "CIS"
                    )
                  }
                >
                  <i
                    className="fa fa-envelope-o"
                    style={{ fontSize: "13px", color: "#999" }}
                  ></i>
                  <span className="weight-500 font-12 text-dark">
                    &nbsp;CIS&nbsp;
                  </span>
                  <i
                    className={`ml-1 fa ${
                      showOldRights === "CIS" ? "fa-angle-up" : "fa-angle-down"
                    }`}
                  ></i>
                  {showOldRights === "CIS" && (
                    <div style={getDropdownPosition(CISButtonRef)}>
                      <OldCrmRightsList
                        ref={CISRef}
                        loadingRights={false}
                        getOldCrmRights={() => null}
                        oldCrmRights={CIS}
                      />
                    </div>
                  )}
                </div>

                <div
                  style={{
                    position: "relative",
                    zIndex: 10,
                    userSelect: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Link
                    href="https://idea.nayatel.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                    className="d-flex align-items-center"
                  >
                    <ImageWithFallback
                      fallbackSrc={LOCAL_AUTHORIZE_ICON}
                      src={
                        STORAGE_IMAGES.STORAGE_CRM_REVAMPING_IMAGES_URL +
                        STORAGE_IMAGES.AUTHORIZE_ICON
                      }
                      alt="authorize-icon"
                      width={20}
                      height={20}
                    />
                    <span className="weight-500 font-12 text-dark ml-1">
                      IMS
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="col-sm-6 col-md-2 px-2"
              style={{ maxWidth: "14.66667%" }}
            >
              <div className="d-flex justify-content-end align-items-center">
                <div
                  className="dropdown auth-drp"
                  style={{ position: "relative" }}
                >
                  <Link
                    className="d-flex align-items-center"
                    href=""
                    data-toggle="dropdown"
                    style={{
                      textDecoration: "none",
                      color: "#333",
                    }}
                  >
                    <ImageWithFallback
                      src={profileImage}
                      fallbackSrc={LOCAL_PROFILE_IMAGE}
                      alt="user_auth"
                      className="user-auth-img img-circle mr-1 "
                      width={40}
                      height={40}
                    />
                    <span className="user-online-status"></span>
                    <span className="text-dark font-12 weight-500">
                      {operator}{" "}
                    </span>{" "}
                    &nbsp;&nbsp;
                    <i className="fa fa-angle-down weight-500 text-dark"></i>
                  </Link>
                  {/* profile part */}
                  <div className="dropdown-menu userDropdown">
                    <ul className="mb-0">
                      {/* Profile */}
                      <li
                        className="p-0"
                        style={{ borderBottom: "1px solid #d7d7d7" }}
                      >
                        <Link
                          href="https://crm.nayatel.com/nhrms/ProfileController/employeeprofile"
                          target="_blank"
                          className="text-dark d-flex align-items-center gap-3 py-2 px-3"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <i
                            className="zmdi zmdi-account"
                            style={{
                              fontSize: "13px",
                              width: "13px",
                              height: "13px",
                              display: "inline-block",
                            }}
                          ></i>
                          <span style={{ fontSize: "14px" }}>Profile</span>
                        </Link>
                      </li>

                      {/* Change Password */}
                      <li
                        className="p-0"
                        style={{ borderBottom: "1px solid #d7d7d7" }}
                      >
                        <Link
                          href="https://crm.nayatel.com/nhrms/AuthController/changepassword"
                          target="_blank"
                          className="text-dark d-flex align-items-center gap-3 py-2 px-3"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <img
                            src="/dist/img/Changepassword.svg"
                            alt="Change Password"
                            style={{ width: "10px", height: "10px" }}
                          />
                          <span className="ml-1" style={{ fontSize: "14px" }}>
                            Change Password
                          </span>
                        </Link>
                      </li>

                      {/* Log Out */}
                      <li className="p-0">
                        <a
                          onClick={logOutFunc}
                          className="d-flex align-items-center gap-3 py-2 px-3"
                          style={{
                            cursor: "pointer",
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <i
                            className="zmdi zmdi-power text-danger"
                            style={{
                              fontSize: "13px",
                              width: "10px",
                              height: "10px",
                              display: "inline-block",
                            }}
                          ></i>
                          <span
                            className="text-danger ml-1"
                            style={{ fontSize: "14px" }}
                          >
                            Log Out
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* responsive dropdown  */}
      <div>
        <div className="px-1 py-2 responsiveNavbar">
          <div className="d-flex justify-content-between">
            {/* Left Section: Hamburger + Menu Items */}
            <div>
              <div onClick={handleMenu}>
                <img
                  src={
                    STORAGE_IMAGES.STORAGE_CRM_REVAMPING_IMAGES_URL +
                    STORAGE_IMAGES.MENU_ICON
                  }
                  alt="menu-icon"
                  width={26}
                  height={26}
                />
              </div>

              {isOpen && (
                <Fragment>
                  {/* Dashboard */}
                  <div className="px-1 py-2">
                    <img
                      src={
                        STORAGE_IMAGES.STORAGE_CRM_REVAMPING_IMAGES_URL +
                        STORAGE_IMAGES.NEW_DASHBOARD
                      }
                      alt="dashboard-icon"
                      width={24}
                      height={24}
                    />
                    <Link href="/dashboard">
                      <span className="weight-500 font-12 text-dark">
                        {" "}
                        Dashboard
                      </span>
                    </Link>
                  </div>

                  {/* CRM */}
                  <div className="px-1 py-2">
                    <img
                      src={
                        STORAGE_IMAGES.STORAGE_CRM_REVAMPING_IMAGES_URL +
                        STORAGE_IMAGES.CRM_ICON
                      }
                      alt="CRM-Icon"
                      width={24}
                      height={24}
                    />
                    <span
                      className="weight-500 font-12 text-dark"
                      onClick={handleCRMDropdown}
                      style={{ cursor: "pointer" }}
                    >
                      CRM
                    </span>
                    {CRMList && (
                      <ul className="crm-main-menu px-0">
                        {appModulesProp?.map((element, i) => (
                          <Fragment key={i}>
                            <li
                              className="pt-2 pb-2"
                              onClick={() => {
                                handleAppItemClick(element, element.modules);
                                handleAppClick(element.modules);
                              }}
                            >
                              <span className="ml-2 text-dark font-12 weight-500">
                                {element.APP_NAME}
                              </span>
                            </li>
                            {openApp === element.modules && (
                              <ul
                                className={
                                  element.modules === activeModuleList
                                    ? "crm-main-submenu"
                                    : "collapsed-modules"
                                }
                              >
                                {element.modules.map((mod, j) => (
                                  <li key={j}>
                                    <Link
                                      href={mod.FULL_URL}
                                      className="font-12 weight-400 text-dark d-block py-2"
                                      style={{ textDecoration: "none" }}
                                    >
                                      {mod.MODULE_NAME}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </Fragment>
                        ))}
                      </ul>
                    )}
                  </div>

                  {[
                    {
                      name: "Favourites",
                      icon: STORAGE_IMAGES.FAV_LOGO,
                      dropdown: [
                        {
                          name: "Customer Detail",
                          href: "https://crmdev.nayatel.com/views/crmViews/nayatelCrm/customerdetail.php",
                        },
                        {
                          name: "Trouble Ticket New",
                          href: "https://crmdev.nayatel.com/views/crmViews/nayatelCrm/launchTT.php",
                        },
                      ],
                    },
                    {
                      name: "HRMS",
                      icon: STORAGE_IMAGES.HRM_ICON,
                      link: "https://crm.nayatel.com/nhrms/IndexController/loadDashboard",
                    },
                    {
                      name: "SRF",
                      icon: STORAGE_IMAGES.FAV_LOGO,
                      dropdown: [
                        {
                          name: "New SRF",
                          href: "https://crmdev.nayatel.com/views/crmViews/nayatelCrm/srf_automation/SRFController",
                        },
                        {
                          name: "SRF Report",
                          href: "https://crmdev.nayatel.com/views/crmViews/nayatelCrm/srf_automation/SRFController/ReportView",
                        },
                        {
                          name: "SRF Dashboard",
                          href: "https://crmdev.nayatel.com/views/crmViews/nayatelCrm/srf_automation/SRFController/Dashboard",
                        },
                      ],
                    },
                    { name: "FMS", icon: STORAGE_IMAGES.FTTH_ICON },
                    {
                      name: "FTTH",
                      icon: STORAGE_IMAGES.FTTH_ICON,
                      link: "https://crm.nayatel.com/views/testZend/public/index/index",
                    },
                    {
                      name: "Service Desk",
                      icon: STORAGE_IMAGES.FAV_LOGO,
                      dropdown: [
                        {
                          name: "Open Ticket",
                          href: "https://crmdev.nayatel.com/views/crmViews/nayatelCrm/msDesk/genMsTT.php",
                        },
                        {
                          name: "Ticket Summary",
                          href: "https://crmdev.nayatel.com/views/crmViews/nayatelCrm/msDesk/index2.php",
                        },
                        {
                          name: "Dept. Summary",
                          href: "https://crmdev.nayatel.com/views/crmViews/nayatelCrm/msDesk/index3.php",
                        },
                        {
                          name: "CRV Summary",
                          href: "https://crmdev.nayatel.com/views/crmViews/nayatelCrm/crv/FormController/viewCRVForm",
                        },
                        {
                          name: "GRN Summary",
                          href: "https://crmdev.nayatel.com/views/crmViews/nayatelCrm/crv/FormControllerGRN/viewGRNForm",
                        },
                        {
                          name: "NPS Comments",
                          href: "https://crmdev.nayatel.com/views/crmViews/nayatelCrm/msDesk/npsSummary.php",
                        },
                        {
                          name: "NPS Dashboard",
                          href: "https://crmdev.nayatel.com/views/crmViews/nayatelCrm/msDesk/Dashboard/dashboard_new.php",
                        },
                        {
                          name: "DPR Report",
                          href: "https://crmdev.nayatel.com/views/crmViews/nayatelCrm/msDesk/Dashboard/DPR.php",
                        },
                      ],
                    },
                    {
                      name: "Evaluation",
                      icon: STORAGE_IMAGES.FAV_LOGO,
                      link: "https://crmdev.nayatel.com/views/crmViews/nayatelCrm/empevaluation/public/index/dashboard",
                    },
                    {
                      name: "Authorize",
                      icon: STORAGE_IMAGES.AUTHORIZE_ICON,
                      link: "/AuthorizationManagement",
                    },
                    {
                      name: "Internal Portals",
                      icon: STORAGE_IMAGES.FAV_LOGO,
                      dropdown: [
                        {
                          name: "Community",
                          href: "https://community.nayatel.com/",
                        },
                        {
                          name: "Learning",
                          href: "https://learning.nayatel.com/",
                        },
                        {
                          name: "My Installations",
                          href: "https://insight.nayatel.com/home",
                        },
                      ],
                    },
                    {
                      name: "CIS",
                      icon: STORAGE_IMAGES.FAV_LOGO,
                      dropdown: [
                        {
                          name: "Send Email/SMS",
                          href: "https://crmdev.nayatel.com/CIS/CustomerEmail/index_Email.php",
                        },
                        {
                          name: "Manage Drafts",
                          href: "https://crmdev.nayatel.com/CIS/CustomerEmail/AddMessageTemplate.php",
                        },
                        {
                          name: "Donot Mail",
                          href: "https://crmdev.nayatel.com/CIS/dont_mail.php",
                        },
                        {
                          name: "Donot SMS",
                          href: "https://crmdev.nayatel.com/CIS/dont_sms.php",
                        },
                        {
                          name: "My Logs",
                          href: "https://crmdev.nayatel.com/CIS/CustomerEmail/my_email_sms_log.php",
                        },
                      ],
                    },
                    {
                      name: "IMS",
                      icon: STORAGE_IMAGES.AUTHORIZE_ICON,
                      link: "https://idea.nayatel.com/",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="px-1 py-2">
                      <img
                        src={
                          STORAGE_IMAGES.STORAGE_CRM_REVAMPING_IMAGES_URL +
                          item.icon
                        }
                        alt={`${item.name}-icon`}
                        width={24}
                        height={24}
                      />
                      {item.dropdown ? (
                        <Fragment>
                          <span className="weight-500 font-12 text-dark d-block">
                            {item.name}
                          </span>
                          <ul className="px-2">
                            {item.dropdown.map((link, i) => (
                              <li key={i}>
                                <a
                                  href={link.href}
                                  className="d-block font-12 text-dark py-1"
                                  style={{ textDecoration: "none" }}
                                >
                                  {link.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </Fragment>
                      ) : (
                        <a
                          href={item.link || "#"}
                          className="weight-500 font-12 text-dark"
                          style={{ textDecoration: "none" }}
                        >
                          &nbsp;{item.name}
                        </a>
                      )}
                    </div>
                  ))}
                </Fragment>
              )}
            </div>

            {/* Right Section: Profile Menu */}

            <div className="text-right">
              <div className="d-flex justify-content-end align-items-center">
                <div className="px-1">
                  <img
                    src={
                      STORAGE_IMAGES.STORAGE_CRM_REVAMPING_IMAGES_URL +
                      STORAGE_IMAGES.BELL_ICON
                    }
                    alt="bell-icon"
                    width={24}
                    height={24}
                  />
                </div>
                <div
                  className="dropdown auth-drp"
                  style={{ position: "relative" }}
                >
                  <Link
                    className="d-flex align-items-center"
                    href="#"
                    data-toggle="dropdown"
                    style={{ textDecoration: "none", color: "#333" }}
                  >
                    <ImageWithFallback
                      src={profileImage}
                      fallbackSrc={LOCAL_PROFILE_IMAGE}
                      alt="user_auth"
                      className="user-auth-img img-circle mr-1"
                      width={40}
                      height={40}
                    />
                    <span className="user-online-status"></span>
                    <span className="text-dark ml-1 font-12 weight-500">
                      {operator}{" "}
                    </span>
                    &nbsp;&nbsp;
                    <i className="fa fa-angle-down weight-500 text-dark"></i>
                  </Link>
                  <div className="dropdown-menu userDropdown">
                    <ul className="mb-0">
                      <li
                        className="p-0"
                        style={{ borderBottom: "1px solid #d7d7d7" }}
                      >
                        <Link
                          href="https://crm.nayatel.com/nhrms/ProfileController/employeeprofile"
                          target="_blank"
                          className="text-dark d-flex align-items-center gap-3 py-2 px-3"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <i
                            className="zmdi zmdi-account"
                            style={{ fontSize: "13px" }}
                          ></i>
                          <span className="ml-1" style={{ fontSize: "14px" }}>
                            Profile
                          </span>
                        </Link>
                      </li>
                      <li
                        className="p-0"
                        style={{ borderBottom: "1px solid #d7d7d7" }}
                      >
                        <Link
                          href="https://crm.nayatel.com/nhrms/AuthController/changepassword"
                          target="_blank"
                          className="text-dark d-flex align-items-center gap-3 py-2 px-3"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <img
                            src="/dist/img/Changepassword.svg"
                            alt="Change Password"
                            style={{ width: "13px", height: "13px" }}
                          />
                          <span style={{ fontSize: "14px" }}>
                            Change Password
                          </span>
                        </Link>
                      </li>
                      <li className="p-0">
                        <a
                          onClick={logOutFunc}
                          className="d-flex align-items-center gap-3 py-2 px-3"
                          style={{
                            cursor: "pointer",
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <i
                            className="zmdi zmdi-power text-danger"
                            style={{ fontSize: "13px" }}
                          ></i>
                          <span
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            Log Out
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
