/**
 * @filename Module.js
 * @desc This file contains UI for CRUD operations of Module
 * @auth Sehrish Naseer
 * @date 17/09/2022
 */

// ============= Start :: Imports =============
import React, { useEffect, useState, useMemo } from "react";
import Cookie from "js-cookie";
import Select from "react-select";
import ReactTable from "../../components/Table/ReactTable";
import PrimaryModal from "../../components/Model/PrimaryModal";
import { ModuleService } from "../../services/AuthorizationService/ModuleManagement";
import { toast } from "react-toastify";
import { AppService } from "../../services/AuthorizationService/AppManagement";
import { useActiveApps } from "../../helpers/react_query_functions";
import { useQueryClient } from "react-query";
import CircularLoader from "../../components/Loader/circularLoader";
import { colourStyles } from "../../components/SelectStyleComponent";
import PanelHeading from "../../components/PanelHeading";
import Edit from "../../public/dist/img/Edit.svg";
import Trash from "../../public/dist/img/Trash.svg";
import Disable from "../../public/dist/img/Disable.svg";
import Enable from "../../public/dist/img/Enable.svg";
import Image from "next/image";
import { handleEnterKeyPress } from "../../constants/enterKeyPress";
import Router from "next/router";
import { APP_ROUTES } from "../../helpers/enums";
import { getOperatorFromCookie } from "../../helpers/cookie-parser";
import MaxCharacterLimit from "@/components/MaxCharacterLimit";
import useAuthorizedRoles from "@/hooks/useAuthorizedRoles";
import { checkElementRole, checkSectionRole } from "@/helpers/auth-helpers";
import {
  HOST_PORT_PATTERN,
  MODULE_URL_PATTERN,
  ONLY_ALPHABETS_PATTERN,
} from "@/constants/regexPatterns";
// ============= End :: Imports =============

// ============= Start :: Initial States =============
// Initial values of form
const initialStateValue = {
  APP_ID: "",
  MODULE_NAME: "",
  URL: "",
  HOST_PORT: "",
  DISPLAY_IN_SIDEBAR: "NO",
  // SECTION_LEVEL_RIGHTS_REQUIRED: "NO",
  // ELEMENT_LEVEL_RIGHTS_REQUIRED: "NO",
};

// Initial value to check if form is in edit mode
// or new mode and tracking id of being edited module
const initialEditValue = {
  isEdit: false,
  id: null,
};
const initialDeleteValue = {
  show: false,
  id: null,
};
// ============= End :: Initial States =============

// ============= Start :: Component =============
export default function Module({ id }) {
  // ============= Start :: States =============
  const queryClient = useQueryClient();
  const [showFormState, setShowFormState] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [moduleState, setModuleState] = useState(initialStateValue);
  const [editMode, setEditMode] = React.useState(initialEditValue);
  const { data: dataClientActiveApps } = useActiveApps();
  const {
    authorizationState,
    sectionAuthorizationState,
    elementAuthorizationState,
    isAdmin,
    getAuthorizedRoles,
    loadingRoles,
  } = useAuthorizedRoles();
  const [appsOption, setAppsOption] = useState([]);
  const [deleteModal, setDeleteModal] = useState(initialDeleteValue);
  useEffect(() => {
    getAuthorizedRoles(id);
  }, [id]);
  const [isMaxLengthExceeded, setIsMaxLengthExceeded] = useState(false);
  const cols = React.useMemo(
    () => [
      {
        Header: "app name",
        accessor: "col_app_name",
      },
      {
        Header: "module name",
        accessor: "col_module_name",
      },
      {
        Header: "url",
        accessor: "col_url",
      },
      {
        Header: "host&port",
        accessor: "col_host_port",
      },
      {
        Header: "display in sidebar",
        accessor: "col_display",
      },
      {
        Header: "record status",
        accessor: "record_status",
      },
      {
        Header: "Last Updated By",
        accessor: "col_last_updated_by",
      },
      ...(checkElementRole("moduleEditBtn", elementAuthorizationState) ||
      checkElementRole("moduleDeleteBtn", elementAuthorizationState) ||
      checkElementRole("moduleEnableBtn", elementAuthorizationState) ||
      checkElementRole("moduleDisableBtn", elementAuthorizationState) ||
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

  const cookAppsOptions = (rawAppsData) => {
    let options = [{ value: "", label: "Please Select...", isDisabled: true }];
    rawAppsData.forEach((element) => {
      options.push({
        value: +element.APP_ID,
        label: element.APP_NAME,
      });
    });
    setAppsOption(options);
  };
  // =============  End :: States  =============

  // ============= Start :: Event Handlers =============

  //Sehrish Naseer Dated:03/10/22 -----Code Started Authorization

  useEffect(() => {
    prepareTableData();
  }, [loadingRoles]);

  useEffect(() => {
    if (dataClientActiveApps?.data) {
      cookAppsOptions(dataClientActiveApps.data);
    }
  }, [dataClientActiveApps]);

  //Sehrish Naseer Dated:03/10/22 -----Code Ended Authorization

  const closeEditForm = () => {
    setIsMaxLengthExceeded(null);
    handleShowFormNew(false);
    setEditMode(initialEditValue);
    setModuleState(initialStateValue);
  };

  const handleDisable = async (dis_id) => {
    try {
      setShowLoader(true);
      const response = await ModuleService.disableModule(dis_id, {
        MODIFIED_BY: getOperatorFromCookie(),
      });

      if (response) {
        let jsonRes = await response.json();

        if (jsonRes.status === "SUCCESS") {
          // TODO : Reloading Table
          prepareTableData();
          queryClient.invalidateQueries(["module-active"]);
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
      console.log(error);
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const handleEnable = async (enable_id) => {
    try {
      setShowLoader(true);
      const response = await ModuleService.enableModule(enable_id, {
        MODIFIED_BY: getOperatorFromCookie(),
      });
      if (response) {
        let jsonRes = await response.json();

        if (jsonRes.status === "SUCCESS") {
          // TODO : Reloading Table
          prepareTableData();
          queryClient.invalidateQueries(["module-active"]);
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
      console.log(error);
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };
  const handleInputChange = (e) => {
    const { name, value, dataset } = e.target;
    const maxChars = parseInt(dataset.maxchars, 10);
    if (value.length <= maxChars) {
      if (name === "MODULE_NAME" && !ONLY_ALPHABETS_PATTERN.test(value)) return;
      if (name === "HOST_PORT" && !HOST_PORT_PATTERN.test(value)) return;
      if (name === "URL" && !MODULE_URL_PATTERN.test(value)) return;
      setModuleState({
        ...moduleState,
        [name]: value,
      });
      setIsMaxLengthExceeded(null);
    } else {
      setIsMaxLengthExceeded(name);
    }
  };

  const handleSelectChange = (option, htmlElement) => {
    setModuleState({
      ...moduleState,
      [htmlElement.name]: option.value,
    });
  };
  const handleShowFormNew = () => {
    setShowFormState(!showFormState);
  };

  const deleteFun = async () => {
    try {
      setShowLoader(true);
      const response = await ModuleService.deleteModule(deleteModal.id, {
        MODIFIED_BY: getOperatorFromCookie(),
      });
      if (response) {
        let jsonRes = await response.json();

        if (jsonRes.status === "SUCCESS") {
          await prepareTableData();
          toast.success(jsonRes.message);
          handleCancel();
        } else {
          toast.error(
            Array.isArray(jsonRes?.message)
              ? jsonRes?.message?.[0]
              : jsonRes.message
          );
        }
      } else {
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
      setShowLoader(false);
    } catch (error) {
      console.log(error);
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const handleEdit = (
    APP_ID,
    MODULE_NAME,
    URL,
    HOST_PORT,
    DISPLAY_IN_SIDEBAR,
    // SECTION_LEVEL_RIGHTS_REQUIRED,
    // ELEMENT_LEVEL_RIGHTS_REQUIRED,
    MODULE_ID
  ) => {
    setIsMaxLengthExceeded(null);
    setShowFormState(true);
    setEditMode({ isEdit: true, id: MODULE_ID });
    setModuleState({
      APP_ID,
      MODULE_NAME,
      URL,
      HOST_PORT,
      DISPLAY_IN_SIDEBAR,
      // SECTION_LEVEL_RIGHTS_REQUIRED,
      // ELEMENT_LEVEL_RIGHTS_REQUIRED,
    });
    window.scrollTo({ top: 50, left: 0, behavior: "smooth" });
  };

  const handleDel = (del_id) => {
    setDeleteModal({
      show: true,
      id: del_id,
    });
  };
  const handleCancel = () => {
    setDeleteModal(initialDeleteValue);
  };

  const handleUpdateFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const operator = getOperatorFromCookie();
      const fieldsAreValid = validateFields();
      if (fieldsAreValid) {
        setShowLoader(true);
        const res = await ModuleService.updateModule(editMode.id, {
          ...moduleState,
          MODIFIED_BY: operator,
        });

        if (res) {
          let jsonRes = await res.json();

          if (jsonRes.status === "SUCCESS") {
            setIsMaxLengthExceeded(null);
            setShowLoader(false);
            prepareTableData();
            queryClient.invalidateQueries(["module-active"]);
            setEditMode(initialEditValue);
            setModuleState(initialStateValue);
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
      console.log(error);
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const handleNewModuleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const fieldsAreValid = validateFields();
      if (fieldsAreValid) {
        setShowLoader(true);

        const operator = getOperatorFromCookie();

        const res = await ModuleService.createModule({
          ...moduleState,
          OPERATOR: operator,
        });

        if (res) {
          let jsonRes = await res.json();

          if (jsonRes.status === "SUCCESS") {
            setIsMaxLengthExceeded(null);
            setShowLoader(false);
            prepareTableData();
            queryClient.invalidateQueries(["module-active"]);
            setModuleState(initialStateValue);
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
      console.log(error);
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const validateFields = () => {
    const { APP_ID, MODULE_NAME, URL, HOST_PORT } = moduleState;
    if (!APP_ID) {
      toast.error("Select an App");
      return false;
    } else if (!MODULE_NAME) {
      toast.error("Enter Module Name");
      return false;
    } else if (MODULE_NAME.length > 50) {
      toast.error("Maximum 50 characters allowed for Module Name");
      return false;
    } else if (!URL) {
      toast.error("Enter URL");
      return false;
    } else if (URL.length > 100) {
      toast.error("Maximum 100 characters allowed for URL");
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

  // TODO::Radio Option
  const handleCheckboxChange = (e) => {
    // const checkValue = promotionPoolState[e.target.name]==="YES" ? "NO" : "YES";
    setModuleState((prevState) => ({
      ...prevState,
      [e.target.name]: prevState[e.target.name] === "YES" ? "NO" : "YES",
    }));
  };

  const prepareTableData = async () => {
    //getting all active modules from backend
    let response = await ModuleService.listModuleDetails();
    if (response) {
      let jsonRes = await response.json();

      let data = [];
      if (jsonRes.status === "SUCCESS") {
        jsonRes.data.forEach((element, i) => {
          const app = element.apps;
          data.push({
            // SR:i+1,
            id: element.MODULE_ID,
            col_app_name: app.APP_NAME,
            col_module_name: element.MODULE_NAME,
            col_url: element.URL,
            col_host_port: element.HOST_PORT,
            // col_section_rights: (
            //   <div
            //     className={` ${
            //       element.SECTION_LEVEL_RIGHTS_REQUIRED ===
            //       ("YES" || "Yes" || "yes")
            //         ? "badgeSuccess"
            //         : element.SECTION_LEVEL_RIGHTS_REQUIRED ===
            //           ("NO" || "No" || "no" || null)
            //         ? "badgeDanger"
            //         : ""
            //     }`}
            //   >
            //     {element.SECTION_LEVEL_RIGHTS_REQUIRED}
            //   </div>
            // ),
            // col_element_rights: (
            //   <div
            //     className={` ${
            //       element.ELEMENT_LEVEL_RIGHTS_REQUIRED ===
            //       ("YES" || "Yes" || "yes")
            //         ? "badgeSuccess"
            //         : element.ELEMENT_LEVEL_RIGHTS_REQUIRED ===
            //           ("NO" || "No" || "no" || null)
            //         ? "badgeDanger"
            //         : ""
            //     }`}
            //   >
            //     {element.ELEMENT_LEVEL_RIGHTS_REQUIRED}
            //   </div>
            // ),
            col_display: element.DISPLAY_IN_SIDEBAR
              ? element.DISPLAY_IN_SIDEBAR
              : "N/A",
            record_status:
              element.RECORD_STATUS === "active" ? "Enabled" : "Disabled",
            col_last_updated_by: element.MODIFIED_BY
              ? element.MODIFIED_BY
              : element.OPERATOR,
            col_actions: (
              <div style={{ whiteSpace: "nowrap" }}>
                {(checkElementRole(
                  "moduleEditBtn",
                  elementAuthorizationState
                ) ||
                  isAdmin) && (
                  <>
                    <a
                      style={{ cursor: "pointer" }}
                      className="text-dark p-0"
                      onClick={() =>
                        handleEdit(
                          +element.APP_ID,
                          element.MODULE_NAME,
                          element.URL,
                          element.HOST_PORT,
                          element.DISPLAY_IN_SIDEBAR,
                          // element.SECTION_LEVEL_RIGHTS_REQUIRED,
                          // element.ELEMENT_LEVEL_RIGHTS_REQUIRED,
                          element.MODULE_ID
                        )
                      }
                    >
                      <Image title="Edit" src={Edit}></Image>
                    </a>
                    &nbsp;
                  </>
                )}
                {(checkElementRole(
                  "moduleDeleteBtn",
                  elementAuthorizationState
                ) ||
                  isAdmin) && (
                  <>
                    <a
                      style={{ cursor: "pointer" }}
                      className="text-danger p-0"
                      onClick={() => handleDel(element.MODULE_ID)}
                    >
                      <Image title="Delete" src={Trash}></Image>
                    </a>
                    &nbsp;
                  </>
                )}
                {(checkElementRole(
                  "moduleDisableBtn",
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
                      onClick={() => handleDisable(element.MODULE_ID)}
                    >
                      <Image title="Disable" src={Disable}></Image>
                    </a>
                  ))}

                {(checkElementRole(
                  "moduleDisableBtn",
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
                      onClick={() => handleEnable(element.MODULE_ID)}
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

        {(checkSectionRole("moduleForm", sectionAuthorizationState) ||
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
                    Update Module Form
                  </h6>
                ) : (
                  <h6 className="panel-title text-white weight-400 font-16">
                    Module Creation Form
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
                    handleNewModuleFormSubmit(e);
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
                        <Select
                          // className="form-control"
                          instanceId={1}
                          options={appsOption}
                          onChange={handleSelectChange}
                          name="APP_ID"
                          value={appsOption.find(
                            (item) => item.value == moduleState.APP_ID
                          )}
                          styles={colourStyles}
                          isOptionDisabled={(option) => option.isDisabled}
                        />
                      </div>
                      <div className="form-group col-md-6 col-sm-12">
                        <label className="required control-label mb-1 text-left font-14 weight-500">
                          Module Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Module Name"
                          value={moduleState.MODULE_NAME}
                          onChange={handleInputChange}
                          name="MODULE_NAME"
                          data-maxchars="50"
                        ></input>
                        {isMaxLengthExceeded === "MODULE_NAME" && (
                          <MaxCharacterLimit characters={50} />
                        )}
                      </div>

                      <div className="form-group col-md-6 col-sm-12">
                        <label className="required control-label mb-1 text-left font-14 weight-500">
                          URL
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter URL"
                          value={moduleState.URL}
                          onChange={handleInputChange}
                          name="URL"
                          data-maxchars="100"
                        ></input>
                        {isMaxLengthExceeded === "URL" && (
                          <MaxCharacterLimit characters={100} />
                        )}
                      </div>
                      <div className="form-group col-md-6 col-sm-12">
                        <label className="required control-label mb-1 text-left font-14 weight-500">
                          Host & Port
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Host & Port"
                          value={moduleState.HOST_PORT}
                          onChange={handleInputChange}
                          name="HOST_PORT"
                          data-maxchars="100"
                        ></input>
                        {isMaxLengthExceeded === "HOST_PORT" && (
                          <MaxCharacterLimit characters={100} />
                        )}
                      </div>

                      <div className="form-group col-md-3 col-sm-12 mt-3">
                        <div className="checkbox checkbox-primary checkbox-circle">
                          {/* TODO::Radio Option */}
                          <input
                            id="DISPLAY_IN_SIDEBAR"
                            type="checkbox"
                            name="DISPLAY_IN_SIDEBAR"
                            checked={moduleState.DISPLAY_IN_SIDEBAR === "YES"}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            className="control-label text-left weight-300"
                            for="DISPLAY_IN_SIDEBAR"
                          >
                            Display In Sidebar
                          </label>
                        </div>
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
                onClick={handleCancel}
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
          checkSectionRole("moduleForm", sectionAuthorizationState)) && (
          <div className="panel panel-inverse card-view">
            <PanelHeading text="Available Modules" />
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
