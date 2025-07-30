/**
 * @filename BackendAPIs.js
 * @desc This file contains UI for CRUD operations of BackendAPIs
 * @auth Sehrish Naseer
 * @date 17/09/2022
 */

// ============= Start :: Imports =============
import React, { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import ReactTable from "../../components/Table/ReactTable";
import PrimaryModal from "../../components/Model/PrimaryModal";
import { BackendAPIsService } from "../../services/AuthorizationService/BackendAPIsManagement";
import MaxCharacterLimit from "@/components/MaxCharacterLimit";
import { toast } from "react-toastify";
import { RolesService } from "../../services/AuthorizationService/RolesManagement";
import { useActiveRoles } from "../../helpers/react_query_functions";
import { useQueryClient } from "react-query";
import CircularLoader from "../../components/Loader/circularLoader";
import { colourStyles } from "../../components/SelectStyleComponent";
import PanelHeading from "../../components/PanelHeading";
import Edit from "../../public/dist/img/Edit.svg";
import Trash from "../../public/dist/img/Trash.svg";
import Disable from "../../public/dist/img/Disable.svg";
import Enable from "../../public/dist/img/Enable.svg";
import Image from "next/image";
import Router from "next/router";
import { APP_ROUTES } from "../../helpers/enums";
import { getOperatorFromCookie } from "../../helpers/cookie-parser";
import { handleEnterKeyPress } from "../../constants/enterKeyPress";
import useAuthorizedRoles from "@/hooks/useAuthorizedRoles";
import { checkElementRole, checkSectionRole } from "@/helpers/auth-helpers";
import {
  API_URL_PATTERN,
  HOST_PORT_PATTERN,
  MODULE_URL_PATTERN,
  ONLY_ALPHABETS_PATTERN,
} from "@/constants/regexPatterns";

// ============= End :: Imports =============

// ============= Start :: Initial States =============
// Initial values of form
const initialStateValue = {
  API_URL: "",
  API_NAME: "",
  METHOD: "",
  ROLE_ID: "",
  HOST_PORT: "",
};

// Initial value to check if form is in edit mode
// or new mode and tracking id of being edited backendAPI
const initialEditValue = {
  isEdit: false,
  id: null,
};
// ============= End :: Initial States =============

// ============= Start :: Component =============
export default function BackendAPIs({ id }) {
  // ============= Start :: States =============
  const [showLoader, setShowLoader] = useState(false);
  const [showFormState, setShowFormState] = useState(true);
  const [backendAPIState, setBackendAPIsState] = useState(initialStateValue);
  const [editMode, setEditMode] = React.useState(initialEditValue);
  const {
    authorizationState,
    sectionAuthorizationState,
    elementAuthorizationState,
    isAdmin,
    getAuthorizedRoles,
    loadingRoles,
  } = useAuthorizedRoles();
  const { data: dataClientActiveRoles } = useActiveRoles();
  const queryClient = useQueryClient();
  const [rolesOption, setRolesOption] = useState([]);
  const [deleteModal, setDeleteModal] = React.useState({
    show: false,
    id: null,
  });
  const [isMaxLengthExceeded, setIsMaxLengthExceeded] = useState(false);
  const methodOptions = [
    { value: "", label: "Please Select...", isDisabled: true },
    { value: "GET", label: "GET" },
    { value: "POST", label: "POST" },
    { value: "PUT", label: "PUT" },
    { value: "DELETE", label: "DELETE" },
  ];
  useEffect(() => {
    getAuthorizedRoles(id);
  }, [id]);
  const cols = React.useMemo(
    () => [
      {
        Header: "api name",
        accessor: "col_api_name",
      },
      {
        Header: "api url",
        accessor: "col_api_url",
      },
      {
        Header: "method",
        accessor: "col_method",
      },
      {
        Header: "role",
        accessor: "col_role",
      },
      {
        Header: "host&port",
        accessor: "col_host_port",
      },
      {
        Header: "record status",
        accessor: "record_status",
      },
      {
        Header: "Last Updated By",
        accessor: "col_last_updated_by",
      },
      ...(checkElementRole("backendApisEditBtn", elementAuthorizationState) ||
      checkElementRole("backendApisDeleteBtn", elementAuthorizationState) ||
      checkElementRole("backendApisEnableBtn", elementAuthorizationState) ||
      checkElementRole("backendApisDisableBtn", elementAuthorizationState) ||
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
  // =============  End :: States  =============

  // ============= Start :: Event Handlers =============
  const cookRolesOptions = (rawRolesData) => {
    let options = [{ value: "", label: "Please Select...", isDisabled: true }];
    rawRolesData.forEach((element) => {
      options.push({
        value: +element.ROLE_ID,
        label: element.ROLE_KEY,
      });
    });
    setRolesOption(options);
  };

  useEffect(() => {
    // getRoles();
    prepareTableData();
  }, [loadingRoles]);

  useEffect(() => {
    // getApps();
    if (dataClientActiveRoles) {
      cookRolesOptions(dataClientActiveRoles.data);
    }
  }, [dataClientActiveRoles]);

  //Sehrish Naseer Dated:03/10/22 -----Code Ended Authorization

  const closeEditForm = () => {
    setIsMaxLengthExceeded(null);
    handleShowFormNew(false);
    setEditMode(initialEditValue);
    setBackendAPIsState(initialStateValue);
  };

  const handleDisable = async (dis_id) => {
    try {
      setShowLoader(true);
      const response = await BackendAPIsService.disableBackendAPIs(dis_id, {
        MODIFIED_BY: getOperatorFromCookie(),
      });
      if (response) {
        let jsonRes = await response.json();

        if (jsonRes.status === "SUCCESS") {
          // TODO : Reloading Table
          prepareTableData();
          queryClient.invalidateQueries(["backendAPIs-active"]);
          toast.success(jsonRes.message);
        } else {
          toast.error(jsonRes.message);
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
      const response = await BackendAPIsService.enableBackendAPIs(enable_id, {
        MODIFIED_BY: getOperatorFromCookie(),
      });
      if (response) {
        let jsonRes = await response.json();

        if (jsonRes.status === "SUCCESS") {
          // TODO : Reloading Table
          prepareTableData();
          queryClient.invalidateQueries(["backendAPIs-active"]);
          toast.success(jsonRes.message);
        } else {
          toast.error(jsonRes.message);
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
      if (name === "API_NAME" && !ONLY_ALPHABETS_PATTERN.test(value)) return;
      if (name === "HOST_PORT" && !HOST_PORT_PATTERN.test(value)) return;
      if (name === "API_URL" && !API_URL_PATTERN.test(value)) return;

      setBackendAPIsState({
        ...backendAPIState,
        [name]: value,
      });
      setIsMaxLengthExceeded(null);
    } else {
      setIsMaxLengthExceeded(name);
    }
  };

  const handleSelectChange = (option, htmlElement) => {
    setBackendAPIsState({
      ...backendAPIState,
      [htmlElement.name]: option.value,
    });
  };

  const handleShowFormNew = () => {
    setShowFormState(!showFormState);
  };
  const deleteFun = async () => {
    try {
      setShowLoader(true);
      const response = await BackendAPIsService.deleteBackendAPIs(
        deleteModal.id,
        {
          MODIFIED_BY: getOperatorFromCookie(),
        }
      );
      if (response) {
        let jsonRes = await response.json();

        if (jsonRes.status === "SUCCESS") {
          setTableDataState(
            tableDataState.filter((row) => row.id !== deleteModal.id)
          );
          toast.success(jsonRes.message);
        } else {
          toast.error(jsonRes.message);
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

  const handleEdit = (
    API_URL,
    API_NAME,
    METHOD,
    ROLE_ID,
    HOST_PORT,
    API_ID
  ) => {
    setIsMaxLengthExceeded(null);
    setShowFormState(true);
    setEditMode({ isEdit: true, id: API_ID });
    setBackendAPIsState({
      API_URL,
      API_NAME,
      METHOD,
      ROLE_ID,
      HOST_PORT,
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
      const fieldsAreValid = validateFields();
      if (fieldsAreValid) {
        setShowLoader(true);
        const operator = getOperatorFromCookie();

        backendAPIState.ROLE_ID = parseInt(backendAPIState.ROLE_ID);

        const res = await BackendAPIsService.updateBackendAPIs(editMode.id, {
          ...backendAPIState,
          MODIFIED_BY: operator,
        });
        if (res) {
          let jsonRes = await res.json();

          if (jsonRes.status === "SUCCESS") {
            setIsMaxLengthExceeded(null);
            setShowLoader(false);
            prepareTableData();
            queryClient.invalidateQueries(["backendAPIs-active"]);
            setEditMode(initialEditValue);
            setBackendAPIsState(initialStateValue);
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
      }
    } catch (error) {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const handleNewBackendAPIsFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const fieldsAreValid = validateFields();
      if (fieldsAreValid) {
        setShowLoader(true);

        const operator = getOperatorFromCookie();

        const res = await BackendAPIsService.createBackendAPIs({
          ...backendAPIState,
          OPERATOR: operator,
        });
        if (res) {
          let jsonRes = await res.json();

          if (jsonRes.status === "SUCCESS") {
            setIsMaxLengthExceeded(null);
            setShowLoader(false);
            prepareTableData();
            queryClient.invalidateQueries(["backendAPIs-active"]);
            setBackendAPIsState(initialStateValue);
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
      }
    } catch (error) {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };
  const validateFields = () => {
    const { API_NAME, API_URL, METHOD, ROLE_ID, HOST_PORT } = backendAPIState;
    if (!API_NAME) {
      toast.error("Enter Api Name");
      return false;
    } else if (API_NAME.length > 100) {
      toast.error("Maximum 100 characters allowed for Api Name");
      return false;
    } else if (!API_URL) {
      toast.error("Enter URL");
      return false;
    } else if (API_URL.length > 100) {
      toast.error("Maximum 100 characters allowed for URL");
      return false;
    } else if (!METHOD) {
      toast.error("Select Api Method");
      return false;
    } else if (!ROLE_ID) {
      toast.error("Select a Role");
      return false;
    } else if (!HOST_PORT) {
      toast.error("Enter Host & Port");
      return false;
    } else if (HOST_PORT.length > 100) {
      toast.error("Maximum 100 characters allowed for Host & Port");
      return false;
    } else {
      return true;
    }
  };

  const prepareTableData = async () => {
    //getting all active backendAPIs from backend
    let response = await BackendAPIsService.listBackendAPIs();
    if (response) {
      let jsonRes = await response.json();

      let data = [];
      if (jsonRes.status === "SUCCESS") {
        jsonRes.data.forEach((element, i) => {
          const role = element.roles;
          data.push({
            // SR:i+1,
            id: element.API_ID,
            col_api_name: element.API_NAME,
            col_api_url: element.API_URL,
            col_method: element.METHOD,
            col_role: role.ROLE_KEY,
            col_host_port: element.HOST_PORT,
            record_status:
              element.RECORD_STATUS === "active" ? "Enabled" : "Disabled",
            col_last_updated_by: element.MODIFIED_BY
              ? element.MODIFIED_BY
              : element.OPERATOR,
            col_actions: (
              <div style={{ whiteSpace: "nowrap" }}>
                {(checkElementRole(
                  "backendApisEditBtn",
                  elementAuthorizationState
                ) ||
                  isAdmin) && (
                  <>
                    <a
                      style={{ cursor: "pointer" }}
                      className="text-dark p-0"
                      onClick={() =>
                        handleEdit(
                          element.API_URL,
                          element.API_NAME,
                          element.METHOD,
                          element.ROLE_ID,
                          element.HOST_PORT,
                          element.API_ID
                        )
                      }
                    >
                      <Image title="Edit" src={Edit}></Image>
                    </a>
                    &nbsp;
                  </>
                )}
                {(checkElementRole(
                  "backendApisDeleteBtn",
                  elementAuthorizationState
                ) ||
                  isAdmin) && (
                  <>
                    <a
                      style={{ cursor: "pointer" }}
                      className="text-danger p-0"
                      onClick={() => handleDel(element.API_ID)}
                    >
                      <Image title="Delete" src={Trash}></Image>
                    </a>
                    &nbsp;
                  </>
                )}

                {(checkElementRole(
                  "backendApisDisableBtn",
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
                      onClick={() => handleDisable(element.API_ID)}
                    >
                      <Image title="Disable" src={Disable}></Image>
                    </a>
                  ))}

                {(checkElementRole(
                  "backendApisEnableBtn",
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
                      onClick={() => handleEnable(element.API_ID)}
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
  };
  // ============= End :: Event Handlers =============

  return (
    !loadingRoles && (
      <>
        {showLoader && <CircularLoader />}

        {(checkSectionRole("backendApisForm", sectionAuthorizationState) ||
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
                    Update Backend APIs Form
                  </h6>
                ) : (
                  <h6 className="panel-title text-white weight-400 font-16">
                    Backend APIs Creation Form
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
                    handleNewBackendAPIsFormSubmit(e);
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
                          API Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter API name"
                          value={backendAPIState.API_NAME}
                          onChange={handleInputChange}
                          name="API_NAME"
                          data-maxchars="100"
                        ></input>
                        {isMaxLengthExceeded === "API_NAME" && (
                          <MaxCharacterLimit characters={100} />
                        )}
                      </div>

                      <div className="form-group col-md-6 col-sm-12">
                        <label className="required control-label mb-1 text-left font-14 weight-500">
                          API URL
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter API URL"
                          value={backendAPIState.API_URL}
                          onChange={handleInputChange}
                          name="API_URL"
                          data-maxchars="100"
                        ></input>
                        {isMaxLengthExceeded === "API_URL" && (
                          <MaxCharacterLimit characters={100} />
                        )}
                      </div>

                      <div className="form-group col-md-6 col-sm-12">
                        <label className="required control-label mb-1 text-left font-14 weight-500">
                          API Method
                        </label>
                        <Select
                          // className="form-control"
                          instanceId={1}
                          options={methodOptions}
                          onChange={handleSelectChange}
                          name="METHOD"
                          value={methodOptions.find(
                            (item) => item.value == backendAPIState.METHOD
                          )}
                          styles={colourStyles}
                          isOptionDisabled={(option) => option.isDisabled}
                        />
                      </div>

                      <div className="form-group col-md-6 col-sm-12">
                        <label className="required control-label mb-1 text-left font-14 weight-500">
                          Role
                        </label>
                        <Select
                          // className="form-control"
                          instanceId={2}
                          options={rolesOption}
                          onChange={handleSelectChange}
                          name="ROLE_ID"
                          value={rolesOption.find(
                            (item) => item.value == backendAPIState.ROLE_ID
                          )}
                          styles={colourStyles}
                          isOptionDisabled={(option) => option.isDisabled}
                        />
                      </div>

                      <div className="form-group col-md-6 col-sm-12">
                        <label className="required control-label mb-1 text-left font-14 weight-500">
                          Host & Port
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Host & Port"
                          value={backendAPIState.HOST_PORT}
                          onChange={handleInputChange}
                          name="HOST_PORT"
                          data-maxchars="100"
                        ></input>
                        {isMaxLengthExceeded === "HOST_PORT" && (
                          <MaxCharacterLimit characters={100} />
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
                      {editMode.isEdit == true ? (
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
          checkSectionRole("backendApisForm", sectionAuthorizationState)) && (
          <div className="panel panel-inverse card-view">
            <PanelHeading text="Available Backend APIs" />
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
