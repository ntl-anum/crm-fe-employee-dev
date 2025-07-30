import { initialAuthorizationStateValue } from "@/constants/authRoles";
import { getOperatorFromCookie } from "@/helpers/cookie-parser";
import { APP_ROUTES } from "@/helpers/enums";
import { UserRightsService } from "@/services/AuthorizationService/UserRightsManagement";
import Router from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useAuthorizedRoles() {
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [authorizationState, setAuthorizationState] = useState(
    initialAuthorizationStateValue
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const [sectionAuthorizationState, setSectionAuthorizationState] = useState(
    []
  );
  const [elementAuthorizationState, setElementAuthorizationState] = useState(
    []
  );

  const getAuthorizedRoles = async (submoduleId) => {
    const authorizedSections = [];
    const authorizedElements = [];

    const user = getOperatorFromCookie();
    const payload = {
      EMPID: user,
      SUBMODULE_ID: +submoduleId,
    };
    const response = await UserRightsService.getAuthorizedRoles(payload);
    if (response) {
      const res = await response.json();
      if (res.status === "SUCCESS") {
        let basicRole = false;
        res.data.map((element) => {
          const { ROLE_KEY, KEY } = element;
          if (ROLE_KEY === "Admin") {
            setIsAdmin(true);
            basicRole = true;
          } else {
            setIsAdmin(false);
            if (KEY === "SECTION") {
              authorizedSections.push(element);
              basicRole = true;
            } else if (KEY === "ELEMENT") {
              authorizedElements.push(element);
              basicRole = true;
            }
            if (ROLE_KEY === "Basic Role") {
              basicRole = true;
            }
          }
        });

        setAuthorizationState({
          basicRole,
        });

        setSectionAuthorizationState(authorizedSections);
        setElementAuthorizationState(authorizedElements);
      } else {
        toast.error(res.message);
      }
    } else {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
    setLoadingRoles(false);
  };

  return {
    getAuthorizedRoles,
    loadingRoles,
    authorizationState,
    isAdmin,
    sectionAuthorizationState,
    elementAuthorizationState,
  };
}
