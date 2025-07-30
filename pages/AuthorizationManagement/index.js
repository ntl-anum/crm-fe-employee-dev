/**
 * @author: Sehrish Naseer
 * @description: Authorization Front End
 * @datetime : 17-SEP-2022
 */
import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Cookie from "js-cookie";
import Layout from "../../components/Layout";
import AppTable from "./App";
import Module from "./Module";
import Submodule from "./Submodule";
import Section from "./Section";
import Element from "./Element";
import Roles from "./Roles";
import BackendAPIs from "./BackendAPIs";
import SubmoduleAPIMapping from "./SubmoduleAPIMapping";
import UserRights from "./UserRights";

import { getOperatorFromCookie } from "../../helpers/cookie-parser";
import { APP_ROUTES } from "@/helpers/enums";
import { UserRightsService } from "@/services/AuthorizationService/UserRightsManagement";
import BulkUserRights from "./BulkUserRights";

//Sehrish Naseer Dated:29/09/22 -----Code Started Authorization

export default function Authorization() {
  const { pathname } = useRouter();
  const [submoduleState, setSubmoduleState] = useState([]);
  const [selectedTab, setSelectedTab] = useState("app");

  const getSubmoduleComponent = (submoduleName, submoduleId) => {
    if (submoduleName === "app" && selectedTab === "app") {
      return <AppTable id={submoduleId} />;
    } else if (submoduleName === "module" && selectedTab === "module") {
      return <Module id={submoduleId} />;
    } else if (submoduleName === "submodule" && selectedTab === "submodule") {
      return <Submodule id={submoduleId} />;
    } else if (submoduleName === "section" && selectedTab === "section") {
      return <Section id={submoduleId} />;
    } else if (submoduleName === "element" && selectedTab === "element") {
      return <Element id={submoduleId} />;
    } else if (
      submoduleName === "backend apis" &&
      selectedTab === "backend apis"
    ) {
      return <BackendAPIs id={submoduleId} />;
    } else if (
      submoduleName === "submodule api mapping" &&
      selectedTab === "submodule api mapping"
    ) {
      return <SubmoduleAPIMapping id={submoduleId} />;
    } else if (submoduleName === "roles" && selectedTab === "roles") {
      return <Roles id={submoduleId} />;
    } else if (
      submoduleName === "user rights" &&
      selectedTab === "user rights"
    ) {
      return <UserRights id={submoduleId} />;
    } else if (
      submoduleName === "bulk user rights" &&
      selectedTab === "bulk user rights"
    ) {
      return <BulkUserRights id={submoduleId} />;
    }
  };

  const authorizedSubmodule = async () => {
    const user = getOperatorFromCookie();
    const response = await UserRightsService.getAuthorizedSubmodule({
      EMPID: user,
      URL: pathname,
    });
    if (response) {
      const res = await response.json();
      if (res.status === "SUCCESS") {
        setSubmoduleState(res.data);
        setSelectedTab(res.data?.[0]?.["SUBMODULE_NAME"]?.toLowerCase());
      } else {
        setSubmoduleState([]);
      }
    } else {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  return (
    <>
      <Layout
        authorizedSubmoduleProp={authorizedSubmodule}
        title="Authorization Management"
      >
        <div className="container">
          <div className="panel-heading">
            <div className="pull-left">
              <h6 className="panel-title txt-dark font-18 weight-500">
                Authorization
              </h6>
            </div>
          </div>
          <div className="panel-wrapper collapse in">
            <div className="panel-body">
              <div className="pills-struct mt-0">
                <ul
                  role="tablist"
                  className="nav nav-pills nav-pills-outline nav-pills-rounded mt-3"
                  id="authorization_management_ul"
                >
                  {submoduleState.map((element, i) => (
                    <li
                      key={i}
                      className={
                        "" +
                        (i === 0
                          ? "active col-sm-12 col-md-auto m-0 pr-1 pl-0 pt-1"
                          : "col-sm-12 col-md-auto m-0 pr-1 pl-0 pt-1")
                      }
                      role="presentation"
                    >
                      <a
                        aria-expanded="true"
                        data-toggle="tab"
                        role="tab"
                        id={element.frontend_id}
                        href={"#" + element.frontend_id + "Management"}
                        onClick={() =>
                          setSelectedTab(element.SUBMODULE_NAME?.toLowerCase())
                        }
                      >
                        {element.SUBMODULE_NAME}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="tab-content" id="authorization_management_div">
                  {submoduleState.map((element, i) => (
                    <div
                      key={i}
                      id={element.frontend_id + "Management"}
                      className={
                        "tab-pane fade" + (i === 0 ? " active in" : "")
                      }
                      role="tabpanel"
                    >
                      {getSubmoduleComponent(
                        element.SUBMODULE_NAME?.toLowerCase(),
                        element.SUBMODULE_ID
                      )}
                    </div>
                  ))}
                  {/* Sehrish Naseer Dated:29/09/22 -----Code Ended Authorization */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
