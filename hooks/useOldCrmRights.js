import { APP_ROUTES } from "@/helpers/enums";
import { UserRightsService } from "@/services/AuthorizationService/UserRightsManagement";
import Router from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useOldCrmRights() {
  const [loadingRights, setLoadingRights] = useState(false);
  const [oldCrmRights, setOldCrmRights] = useState([]);

  const getOldCrmRights = async (operator) => {
    try {
      const payload = {
        EMPID: operator,
        OPERATOR: operator,
      };
      setLoadingRights(true);
      const response = await UserRightsService.getOldCrmRights(payload);
      if (response) {
        const res = await response.json();
        if (res.status === "SUCCESS") {
          setOldCrmRights(res.data);
        } else {
          setOldCrmRights([]);
        }
      } else {
        toast.error("Failed to fetch old CRM rights");
      }
      setLoadingRights(false);
    } catch (error) {
      console.log(error);
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  return { loadingRights, oldCrmRights, getOldCrmRights };
}
