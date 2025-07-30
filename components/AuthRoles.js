import { getOperatorFromCookie } from "@/helpers/cookie-parser";
import { APP_ROUTES } from "@/helpers/enums";
import { UserRightsService } from "@/services/AuthorizationService/UserRightsManagement";
import Router from "next/router";
import { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import { toast } from "react-toastify";

function AuthRoles({
  authorizationState,
  setAuthorizationState,
  setIsAdmin = () => null,
  setSectionAuthorizationState = () => null,
  setElementAuthorizationState = () => null,
  submoduleId,
  editMode = { isEdit: false, id: null },
  children,
}) {
  const [loadingRoles, setLoadingRoles] = useState(false);
  const getAuthorizedRoles = async () => {
    const authorizedSections = [];
    const authorizedElements = [];
    setLoadingRoles(true);
    const user = getOperatorFromCookie();
    const payload = {
      EMPID: user,
      SUBMODULE_ID: +submoduleId,
    };
    const response = await UserRightsService.getAuthorizedRoles(payload);
    if (response) {
      const res = await response.json();
      if (res.status === "SUCCESS") {
        let viewRole = false;
        let createRole = false;
        let editRole = false;
        let enableRole = false;
        let disableRole = false;
        let deleteRole = false;

        res.data.map((element) => {
          const { ROLE_KEY, KEY } = element;
          if (ROLE_KEY === "Admin") {
            setIsAdmin(true);
            viewRole = true;
            createRole = true;
            editRole = true;
            enableRole = true;
            disableRole = true;
            deleteRole = true;
          } else {
            setIsAdmin(false);
            if (KEY === "SECTION") {
              authorizedSections.push(element);
            } else if (KEY === "ELEMENT") {
              authorizedElements.push(element);
            }
            if (ROLE_KEY === "Viewer") {
              viewRole = true;
            } else if (ROLE_KEY === "Creator") {
              createRole = true;
            } else if (ROLE_KEY === "Editor") {
              editRole = true;
            } else if (ROLE_KEY === "Enable Role") {
              enableRole = true;
            } else if (ROLE_KEY === "Disable Role") {
              disableRole = true;
            } else if (ROLE_KEY === "Delete Role") {
              deleteRole = true;
            }
          }
        });

        setAuthorizationState({
          viewRole,
          createRole,
          editRole,
          enableRole,
          disableRole,
          deleteRole,
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

  useEffect(() => {
    if (submoduleId) {
      getAuthorizedRoles();
    }
  }, [submoduleId]);

  return (
    <>
      {loadingRoles ? (
        <CircleLoader />
      ) : (
        ((authorizationState.editRole && editMode.isEdit === true) ||
          authorizationState.createRole) &&
        children
      )}
    </>
  );
}

export default AuthRoles;
