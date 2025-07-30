/**
 * @filename App.js
 * @desc This file contains UI for CRUD operations of App
 * @auth Sehrish Naseer
 * @date 17/09/2022
 */

// ============= Start :: Imports =============
import React, { useEffect, useState, useMemo } from "react";
import ReactTable from "../../components/Table/ReactTable";
import PrimaryModal from "../../components/Model/PrimaryModal";
import { AppService } from "../../services/AuthorizationService/AppManagement";
import { handleEnterKeyPress } from "../../constants/enterKeyPress";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import CircularLoader from "../../components/Loader/circularLoader";
import Edit from "../../public/dist/img/Edit.svg";
import Trash from "../../public/dist/img/Trash.svg";
import Disable from "../../public/dist/img/Disable.svg";
import Enable from "../../public/dist/img/Enable.svg";
import Image from "next/image";
import PanelHeading from "../../components/PanelHeading";
import Router from "next/router";
import { APP_ROUTES } from "../../helpers/enums";
import { getOperatorFromCookie } from "../../helpers/cookie-parser";
import MaxCharacterLimit from "@/components/MaxCharacterLimit";
import useAuthorizedRoles from "@/hooks/useAuthorizedRoles";
import { checkElementRole, checkSectionRole } from "@/helpers/auth-helpers";
import {
  ONLY_ALPHABETS_PATTERN,
  PLAN_NAME_PATTERN,
} from "@/constants/regexPatterns";

// ============= End :: Imports =============

// ============= Start :: Initial States =============
// Initial values of form
const initialStateValue = {
  APP_NAME: "",
};

// Initial value to check if form is in edit mode
// or new mode and tracking id of being edited app
const initialEditValue = {
  isEdit: false,
  id: null,
};
// ============= End :: Initial States =============

// ============= Start :: Component =============
export default function AppTable({ id }) {
  // ============= Start :: States =============
  const queryClient = useQueryClient();
  const [showFormState, setShowFormState] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [appState, setAppState] = useState(initialStateValue);
  const [editMode, setEditMode] = React.useState(initialEditValue);
  const {
    authorizationState,
    sectionAuthorizationState,
    elementAuthorizationState,
    isAdmin,
    getAuthorizedRoles,
    loadingRoles,
  } = useAuthorizedRoles();
  const [deleteModal, setDeleteModal] = React.useState({
    show: false,
    id: null,
  });
  useEffect(() => {
    getAuthorizedRoles(id);
  }, [id]);

  const cols = React.useMemo(
    () => [
      {
        Header: "app name",
        accessor: "col_app_name",
      },
      {
        Header: "record status",
        accessor: "record_status",
      },
      {
        Header: "Last Updated By",
        accessor: "col_last_updated_by",
      },
      ...(checkElementRole("appEditBtn", elementAuthorizationState) ||
      checkElementRole("appDeleteBtn", elementAuthorizationState) ||
      checkElementRole("appEnableBtn", elementAuthorizationState) ||
      checkElementRole("appDisableBtn", elementAuthorizationState) ||
      isAdmin
        ? [
            {
              Header: "Actions",
              accessor: "col_actions",
            },
          ]
        : []),
    ],
    [loadingRoles]
  );
  const [tableDataState, setTableDataState] = useState([]);
  const [isMaxLengthExceeded, setIsMaxLengthExceeded] = useState(false);
  // =============  End :: States  =============

  useEffect(() => {
    prepareTableData();
  }, [loadingRoles]);

  //Sehrish Naseer Dated:04/10/22 -----Code Ended Authorization

  const closeEditForm = () => {
    setIsMaxLengthExceeded(null);
    handleShowFormNew(false);
    setEditMode(initialEditValue);
    setAppState(initialStateValue);
  };

  const handleDisable = async (dis_id) => {
    try {
      setShowLoader(true);
      const response = await AppService.disableApp(dis_id, {
        MODIFIED_BY: getOperatorFromCookie(),
      });
      if (response) {
        let jsonRes = await response.json();

        if (jsonRes.status === "SUCCESS") {
          // TODO : Reloading Table
          prepareTableData();
          queryClient.invalidateQueries(["app-active"]);
          toast.success(jsonRes.message);
        } else {
          toast.error(
            Array.isArray(jsonRes.message)
              ? jsonRes.message?.[0]
              : jsonRes.message
          );
        }
      } else {
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
      setShowLoader(false);
    } catch (error) {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const handleEnable = async (enable_id) => {
    try {
      setShowLoader(true);

      const response = await AppService.enableApp(enable_id, {
        MODIFIED_BY: getOperatorFromCookie(),
      });
      if (response) {
        let jsonRes = await response.json();

        if (jsonRes.status === "SUCCESS") {
          prepareTableData();
          queryClient.invalidateQueries(["app-active"]);
          toast.success(jsonRes.message);
        } else {
          toast.error(
            Array.isArray(jsonRes.message)
              ? jsonRes.message?.[0]
              : jsonRes.message
          );
        }
      } else {
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
      setShowLoader(false);
    } catch (error) {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };
  const handleInputChange = (e) => {
    const { name, value, dataset } = e.target;
    const maxChars = parseInt(dataset.maxchars, 10);
    if (value.length <= maxChars) {
      if (!ONLY_ALPHABETS_PATTERN.test(value)) return;
      setAppState({
        ...appState,
        [name]: value,
      });
      setIsMaxLengthExceeded(null);
    } else {
      setIsMaxLengthExceeded(name);
    }
  };

  const handleShowFormNew = () => {
    setShowFormState(!showFormState);
  };

  const deleteFun = async () => {
    try {
      setShowLoader(true);
      const response = await AppService.deleteApp(deleteModal.id, {
        MODIFIED_BY: getOperatorFromCookie(),
      });
      if (response) {
        let jsonRes = await response.json();

        if (jsonRes.status === "SUCCESS") {
          setTableDataState(
            tableDataState.filter((row) => row.id !== deleteModal.id)
          );
          toast.success(jsonRes.message);
        } else {
          toast.error(
            Array.isArray(jsonRes.message)
              ? jsonRes.message?.[0]
              : jsonRes.message
          );
        }
      } else {
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
      setShowLoader(false);
      handleDel();
    } catch (error) {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const handleEdit = (APP_NAME, APP_ID) => {
    setIsMaxLengthExceeded(null);
    setShowFormState(true);
    setEditMode({ isEdit: true, id: APP_ID });
    setAppState({
      APP_NAME,
    });
    window.scrollTo({ top: 50, left: 0, behavior: "smooth" });
  };

  const handleDel = (del_id = null) => {
    setDeleteModal({
      show: !deleteModal.show,
      id: del_id,
    });
  };

  const handleUpdateFormSubmit = async (e) => {
    try {
      e.preventDefault();

      const operator = getOperatorFromCookie();

      if (!appState.APP_NAME) {
        return toast.error("Enter App Name");
      }
      if (appState.APP_NAME.length > 30) {
        return toast.error("Maximum 30 characters allowed for App Name");
      }
      setShowLoader(true);
      const res = await AppService.updateApp(editMode.id, {
        ...appState,
        MODIFIED_BY: operator,
      });

      if (res) {
        let jsonRes = await res.json();

        if (jsonRes.status === "SUCCESS") {
          setIsMaxLengthExceeded(null);
          setShowLoader(false);
          prepareTableData();
          queryClient.invalidateQueries(["app-active"]);
          setEditMode(initialEditValue);
          setAppState(initialStateValue);
          handleShowFormNew(false);
          toast.success(jsonRes.message);
        } else {
          setShowLoader(false);
          toast.error(
            Array.isArray(jsonRes?.message)
              ? jsonRes?.message?.[0]
              : jsonRes.message
          );
        }
      } else {
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
    } catch (error) {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const handleNewAppFormSubmit = async (e) => {
    try {
      e.preventDefault();

      const operator = getOperatorFromCookie();

      if (!appState.APP_NAME) {
        return toast.error("Enter App Name");
      }
      if (appState.APP_NAME.length > 30) {
        return toast.error("Maximum 30 characters allowed for App Name");
      }
      setShowLoader(true);
      const res = await AppService.createApp({
        ...appState,
        OPERATOR: operator,
      });

      if (res) {
        let jsonRes = await res.json();

        if (jsonRes.status === "SUCCESS") {
          setIsMaxLengthExceeded(null);
          setShowLoader(false);
          prepareTableData();
          setAppState(initialStateValue);
          queryClient.invalidateQueries(["app-active"]);
          handleShowFormNew(false);
          // Show Success Toast
          toast.success(jsonRes.message);
        }
        // Other Statuses
        else {
          setShowLoader(false);
          toast.error(
            Array.isArray(jsonRes?.message)
              ? jsonRes?.message?.[0]
              : jsonRes.message
          );
        }
      } else {
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
    } catch (err) {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const prepareTableData = async () => {
    try {
      //getting all active apps from backend
      let response = await AppService.listApps();
      if (response) {
        let jsonRes = await response.json();

        let data = [];
        if (jsonRes.status === "SUCCESS") {
          jsonRes.data.forEach((element, i) => {
            data.push({
              SR: i + 1,
              id: element.APP_ID,
              col_app_name: element.APP_NAME,
              record_status:
                element.RECORD_STATUS === "active" ? "Enabled" : "Disabled",
              col_last_updated_by: element.MODIFIED_BY
                ? element.MODIFIED_BY
                : element.OPERATOR,

              col_actions: (
                <div>
                  {(checkElementRole("appEditBtn", elementAuthorizationState) ||
                    isAdmin) && (
                    <>
                      <a
                        style={{ cursor: "pointer" }}
                        className="text-dark p-0"
                        onClick={() =>
                          handleEdit(element.APP_NAME, element.APP_ID)
                        }
                      >
                        <Image title="Edit" src={Edit}></Image>
                      </a>
                      &nbsp;
                    </>
                  )}
                  {(checkElementRole(
                    "appDeleteBtn",
                    elementAuthorizationState
                  ) ||
                    isAdmin) && (
                    <>
                      <a
                        style={{ cursor: "pointer" }}
                        className="text-danger p-0"
                        onClick={() => handleDel(element.APP_ID)}
                      >
                        <Image title="Delete" src={Trash}></Image>
                      </a>
                      &nbsp;
                    </>
                  )}
                  {(checkElementRole(
                    "appDisableBtn",
                    elementAuthorizationState
                  ) ||
                    isAdmin) &&
                    (element.RECORD_STATUS !== "active" ? (
                      <a
                        style={{ cursor: "not-allowed" }}
                        className="text-warning p-0"
                      >
                        <Image title="Disable" src={Disable}></Image>
                      </a>
                    ) : (
                      <a
                        style={{ cursor: "pointer" }}
                        className="text-warning p-0"
                        onClick={() => handleDisable(element.APP_ID)}
                      >
                        <Image title="Disable" src={Disable}></Image>
                      </a>
                    ))}
                  {(checkElementRole(
                    "appEnableBtn",
                    elementAuthorizationState
                  ) ||
                    isAdmin) &&
                    (element.RECORD_STATUS === "active" ? (
                      <a
                        style={{ cursor: "not-allowed" }}
                        className="text-success p-0"
                      >
                        <Image title="Enable" src={Enable}></Image>
                      </a>
                    ) : (
                      <a
                        style={{ cursor: "pointer" }}
                        className="text-success p-0"
                        onClick={() => handleEnable(element.APP_ID)}
                      >
                        <Image title="Enable" src={Enable}></Image>
                      </a>
                    ))}
                </div>
              ),
            });
          });
        }

        setTableDataState(data);
      } else {
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
    } catch (error) {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };
  // ============= End :: Event Handlers =============

  return (
    !loadingRoles && (
      <>
        {showLoader && <CircularLoader />}
        {(checkSectionRole("appForm", sectionAuthorizationState) ||
          isAdmin ||
          editMode.isEdit) && (
          <div className="panel panel-inverse card-view">
            <div
              onClick={handleShowFormNew}
              className="panel-heading panel-heading-div custom-bg-color rounded-top"
            >
              <div className="pull-left">
                {editMode.isEdit == true ? (
                  <h6 className="panel-title text-white weight-400 font-16">
                    Update App Form
                  </h6>
                ) : (
                  <h6 className="panel-title text-white weight-400 font-16">
                    App Creation Form
                  </h6>
                )}
              </div>
              <div className="panel-heading-button">
                {!showFormState && (
                  <div>
                    <button
                      className="pull-right"
                      style={{
                        borderStyle: "none",
                        background: "#284E93",
                        borderRadius: "50%",
                        outline: "none",
                      }}
                      onClick={handleShowFormNew}
                    >
                      <i className="fa fa-angle-down text-white"></i>
                    </button>
                  </div>
                )}
                {showFormState && (
                  <div>
                    <button
                      className="pull-right"
                      style={{
                        borderStyle: "none",
                        background: "#284E93",
                        borderRadius: "50%",
                        outline: "none",
                      }}
                      onClick={handleShowFormNew}
                    >
                      <i className="fa fa-angle-up text-white"></i>
                    </button>
                  </div>
                )}
              </div>

              <div className="clearfix"> </div>
            </div>
            {showFormState === true && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (editMode.isEdit === false) {
                    handleNewAppFormSubmit(e);
                  } else {
                    handleUpdateFormSubmit(e);
                  }
                }}
                className="panel-wrapper collapse in"
                onKeyDown={handleEnterKeyPress}
              >
                <div className="panel-body">
                  <div className="">
                    <div className="row">
                      <div className="form-group col-md-6 col-sm-12">
                        <label className="required control-label mb-1 text-left font-14 weight-500">
                          App Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter App Name"
                          value={appState.APP_NAME}
                          onChange={handleInputChange}
                          name="APP_NAME"
                          data-maxchars="30"
                        ></input>
                        {isMaxLengthExceeded === "APP_NAME" && (
                          <MaxCharacterLimit characters={30} />
                        )}
                      </div>
                    </div>

                    <div
                      className="row mt-3"
                      style={{ float: "right", marginRight: "3px" }}
                    >
                      <button
                        type="button"
                        className="btn btn-default bg-white text-dark border-secondary btn-fixed-width"
                        onClick={closeEditForm}
                      >
                        Cancel
                      </button>
                      &nbsp;
                      {editMode.isEdit ? (
                        <button
                          type="submit"
                          className="btn btn-primary btn-fixed-width"
                          style={{ background: "#284E93" }}
                        >
                          Update{" "}
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-primary btn-fixed-width"
                          style={{ background: "#284E93" }}
                        >
                          Save{" "}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
        <PrimaryModal isOpenProp={deleteModal.show}>
          <div style={{ margin: "1rem 15px 2rem 15px", padding: "1rem 12rem" }}>
            <div className="d-flex justify-content-center">
              <img src="dist/img/cross-icon.svg" alt="delete icon" />
            </div>
            <div className="d-flex justify-content-center mt-4">
              <h5 className="font-16">Are you sure you want to delete?</h5>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <button
                className="btn btn-outline btn-secondary text-dark px-3 mr-1"
                onClick={handleDel}
              >
                Cancel
              </button>
              &nbsp;
              <button className="btn btn-danger px-3" onClick={deleteFun}>
                Delete
              </button>
            </div>
          </div>
        </PrimaryModal>
        {(isAdmin ||
          authorizationState.basicRole ||
          checkSectionRole("appForm", sectionAuthorizationState)) && (
          <div className="panel panel-inverse card-view">
            <PanelHeading text="Available Apps" />
            <div className="panel-wrapper collapse in">
              <div className="panel-body">
                <ReactTable columns={cols} data={tableDataState} />
              </div>
            </div>
          </div>
        )}
      </>
    )
  );
}
