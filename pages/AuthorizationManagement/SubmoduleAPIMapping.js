/**
 * @filename SubmoduleAPIMapping.js
 * @desc This file contains UI for CRUD operations of SubmoduleAPIMapping
 * @auth Sehrish Naseer
 * @date 19/09/2022
 */

// ============= Start :: Imports =============
import React, { useEffect, useState, useMemo } from "react";
import Cookie from "js-cookie";
import Select from "react-select";
import { handleEnterKeyPress } from "../../constants/enterKeyPress";
import ReactTable from "../../components/Table/ReactTable";
import PrimaryModal from "../../components/Model/PrimaryModal";
import { SubModuleAPIMappingService } from "../../services/AuthorizationService/SubmoduleAPIMappingManagement";
import { SubModuleService } from "../../services/AuthorizationService/SubmoduleManagement";
import { SectionService } from "../../services/AuthorizationService/SectionManagement";
import { ElementService } from "../../services/AuthorizationService/ElementManagement";

import { toast } from "react-toastify";
import {
  useActiveBackendAPIs,
  useActiveSubModules,
} from "../../helpers/react_query_functions";
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

import useAuthorizedRoles from "@/hooks/useAuthorizedRoles";
import { checkElementRole, checkSectionRole } from "@/helpers/auth-helpers";
import { ColorRing } from "react-loader-spinner";

// ============= End :: Imports =============

// ============= Start :: Initial States =============
// Initial values of form
const initialStateValue = {
  KEY: "",
  VALUE: "",
  API_ID: "",
};

// Initial value to check if form is in edit mode
// or new mode and tracking id of being edited submoduleAPIMapping
const initialEditValue = {
  isEdit: false,
  id: null,
};
// ============= End :: Initial States =============

// ============= Start :: Component =============
export default function SubmoduleAPIMapping({ id }) {
  // ============= Start :: States =============

  const { data: dataClientActiveSubmodules } = useActiveSubModules();

  const { data: dataClientActiveBackendApis } = useActiveBackendAPIs();

  const [showLoader, setShowLoader] = useState(false);
  const [showFormState, setShowFormState] = useState(true);
  const [submoduleAPIMappingState, setSubmoduleAPIMappingState] =
    useState(initialStateValue);
  const [editMode, setEditMode] = React.useState(initialEditValue);
  const {
    authorizationState,
    sectionAuthorizationState,
    elementAuthorizationState,
    isAdmin,
    getAuthorizedRoles,
    loadingRoles,
  } = useAuthorizedRoles();
  const [backendAPIsOption, setBackendAPIsOption] = useState([]);
  const [submodulesOption, setSubmodulesOption] = useState([]);

  const [valueOptions, setValueOptions] = useState([
    { value: "", label: "Please Select...", isDisabled: true },
  ]);

  const [deleteModal, setDeleteModal] = React.useState({
    show: false,
    id: null,
  });

  const levelOptions = [
    { value: "", label: "Please Select...", isDisabled: true },
    { value: "SUBMODULE", label: "SUBMODULE" },
    { value: "SECTION", label: "SECTION" },
    { value: "ELEMENT", label: "ELEMENT" },
  ];
  useEffect(() => {
    getAuthorizedRoles(id);
  }, [id]);
  const cols = React.useMemo(
    () => [
      {
        Header: "level",
        accessor: "col_level",
      },
      {
        Header: "level name",
        accessor: "col_level_name",
      },
      {
        Header: "api name",
        accessor: "col_api_name",
      },
      {
        Header: "api url",
        accessor: "col_api_url",
      },
      {
        Header: "record status",
        accessor: "record_status",
      },
      {
        Header: "Last Updated By",
        accessor: "col_last_updated_by",
      },
      ...(checkElementRole(
        "subModuleApiMappingEditBtn",
        elementAuthorizationState
      ) ||
      checkElementRole(
        "subModuleApiMappingDeleteBtn",
        elementAuthorizationState
      ) ||
      checkElementRole(
        "subModuleApiMappingEnableBtn",
        elementAuthorizationState
      ) ||
      checkElementRole(
        "subModuleApiMappingDisableBtn",
        elementAuthorizationState
      ) ||
      isAdmin
        ? [
            {
              Header: "actions",
              accessor: "col_actions",
            },
          ]
        : []),
    ],
    [loadingRoles]
  );
  const [tableDataState, setTableDataState] = useState([]);

  const cookSubmoduleOptions = (rawSubmodulesData) => {
    let options = [{ value: "", label: "Please Select...", isDisabled: true }];
    rawSubmodulesData.forEach((element) => {
      options.push({
        value: +element.SUBMODULE_ID,
        label: element.SUBMODULE_NAME,
      });
    });
    setSubmodulesOption(options);
  };

  const cookBackendAPIOptions = (rawBackendAPIsData) => {
    let options = [{ value: "", label: "Please Select...", isDisabled: true }];
    rawBackendAPIsData.forEach((element) => {
      options.push({
        value: +element.API_ID,
        label:
          element.API_NAME + " (" + element.HOST_PORT + element.API_URL + ")",
      });
    });
    setBackendAPIsOption(options);
  };

  // =============  End :: States  =============

  // ============= Start :: Event Handlers =============

  //Sehrish Naseer Dated:03/10/22 -----Code Started Authorization

  useEffect(() => {
    // getSubmodules();
    // getBackendAPIs();
    if (!loadingRoles) {
      prepareTableData();
    }
  }, [loadingRoles]);

  useEffect(() => {
    // getApps();
    if (dataClientActiveSubmodules?.data) {
      cookSubmoduleOptions(dataClientActiveSubmodules.data);
    }
  }, [dataClientActiveSubmodules]);

  useEffect(() => {
    // getApps();
    if (dataClientActiveBackendApis?.data) {
      cookBackendAPIOptions(dataClientActiveBackendApis.data);
    }
  }, [dataClientActiveBackendApis]);

  //Sehrish Naseer Dated:03/10/22 -----Code Ended Authorization

  const closeEditForm = () => {
    handleShowFormNew(false);
    setEditMode(initialEditValue);
    setSubmoduleAPIMappingState(initialStateValue);
  };

  const handleDisable = async (dis_id) => {
    try {
      setShowLoader(true);
      const response =
        await SubModuleAPIMappingService.disableSubModuleAPIMapping(dis_id, {
          MODIFIED_BY: getOperatorFromCookie(),
        });
      if (response) {
        const jsonRes = await response.json();

        if (jsonRes.status === "SUCCESS") {
          // TODO : Reloading Table
          prepareTableData();
          toast.success(jsonRes.message);
        } else {
          toast.error(jsonRes.message);
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
      const response =
        await SubModuleAPIMappingService.enableSubModuleAPIMapping(enable_id, {
          MODIFIED_BY: getOperatorFromCookie(),
        });
      if (response) {
        const jsonRes = await response.json();

        if (jsonRes.status === "SUCCESS") {
          // TODO : Reloading Table
          prepareTableData();
          toast.success(jsonRes.message);
        } else {
          toast.error(jsonRes.message);
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
    const { name, value } = e.target;
    setSubmoduleAPIMappingState({
      ...submoduleAPIMappingState,
      [name]: value,
    });
  };

  const handleSelectKeyChange = async (option, htmlElement) => {
    handleSelectChange(option, htmlElement);

    try {
      const key = option.value;

      let options = [
        { value: "", label: "Please Select...", isDisabled: true },
      ];

      if (key === "SUBMODULE") {
        const response = await SubModuleService.listActiveSubModule();
        const res = await response.json();

        const data = res.data;

        data.forEach((element) => {
          options.push({
            value: +element.SUBMODULE_ID,
            label: element.SUBMODULE_NAME,
          });
        });
      } else if (key === "SECTION") {
        const response = await SectionService.listActiveSections();
        const res = await response.json();

        const data = res.data;

        data.forEach((element) => {
          options.push({
            value: +element.SECTION_ID,
            label: `${element.SECTION_NAME} (${element.VALUE_NAME})`,
          });
        });
      } else if (key === "ELEMENT") {
        const response = await ElementService.listActiveElements();
        const res = await response.json();

        const data = res.data;

        data.forEach((element) => {
          options.push({
            value: +element.ELEMENT_ID,
            label: `${element.ELEMENT_NAME} (${element.VALUE_NAME})`,
          });
        });
      }

      setValueOptions(options);
    } catch (error) {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const handleSelectChange = (option, htmlElement) => {
    setSubmoduleAPIMappingState({
      ...submoduleAPIMappingState,
      [htmlElement.name]: option.value,
    });
  };

  const handleShowFormNew = () => {
    setShowFormState(!showFormState);
  };

  const deleteFun = async () => {
    try {
      setShowLoader(true);
      const response =
        await SubModuleAPIMappingService.deleteSubModuleAPIMapping(
          deleteModal.id,
          {
            MODIFIED_BY: getOperatorFromCookie(),
          }
        );
      if (response) {
        const jsonRes = await response.json();

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
    } catch (error) {
      console.log(error);
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
    handleDel();
  };

  const handleEdit = async (KEY, VALUE, API_ID, SUBMODULE_API_MAPPING_ID) => {
    try {
      let keyOptions = [];

      if (KEY === "SUBMODULE") {
        let response = await SubModuleService.listActiveSubModule();
        const res = await response.json();
        let keyData = res.data;
        keyData.forEach((element) => {
          keyOptions.push({
            value: +element.SUBMODULE_ID,
            label: element.SUBMODULE_NAME,
          });
        });
      } else if (KEY === "SECTION") {
        const response = await SectionService.listActiveSections();
        const res = await response.json();

        const data = res.data;

        data.forEach((element) => {
          keyOptions.push({
            value: +element.SECTION_ID,
            label: element.SECTION_NAME,
          });
        });
      } else if (KEY === "ELEMENT") {
        const response = await ElementService.listActiveElements();
        const res = await response.json();

        const data = res.data;

        data.forEach((element) => {
          keyOptions.push({
            value: +element.ELEMENT_ID,
            label: element.ELEMENT_NAME,
          });
        });
      }
      setValueOptions(keyOptions);

      setShowFormState(true);
      setEditMode({ isEdit: true, id: SUBMODULE_API_MAPPING_ID });
      setSubmoduleAPIMappingState({
        KEY,
        VALUE,
        API_ID,
      });
      window.scrollTo({ top: 50, left: 0, behavior: "smooth" });
    } catch (error) {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
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
        const operator = getOperatorFromCookie();

        submoduleAPIMappingState.VALUE = parseInt(
          submoduleAPIMappingState.VALUE
        );
        submoduleAPIMappingState.API_ID = parseInt(
          submoduleAPIMappingState.API_ID
        );

        const res = await SubModuleAPIMappingService.updateSubModuleAPIMapping(
          editMode.id,
          {
            ...submoduleAPIMappingState,
            MODIFIED_BY: operator,
          }
        );
        if (res) {
          const jsonRes = await res.json();

          if (jsonRes.status === "SUCCESS") {
            prepareTableData();
            setEditMode(initialEditValue);
            setSubmoduleAPIMappingState(initialStateValue);
            handleShowFormNew(false);
            toast.success(jsonRes.message);
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
      }
    } catch (error) {
      console.log(error);
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const handleNewSubmoduleAPIMappingFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const fieldsAreValid = validateFields();
      if (fieldsAreValid) {
        const operator = getOperatorFromCookie();

        submoduleAPIMappingState.VALUE = parseInt(
          submoduleAPIMappingState.VALUE
        );
        submoduleAPIMappingState.API_ID = parseInt(
          submoduleAPIMappingState.API_ID
        );

        const res = await SubModuleAPIMappingService.createSubModuleAPIMapping({
          ...submoduleAPIMappingState,
          OPERATOR: operator,
        });
        if (res) {
          const jsonRes = await res.json();

          if (jsonRes.status === "SUCCESS") {
            setSubmoduleAPIMappingState(initialStateValue);
            handleShowFormNew(false);
            // Show Success Toast
            toast.success(jsonRes.message);
            prepareTableData();
          }
          // Other Statuses
          else {
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
    const { KEY, VALUE, API_ID } = submoduleAPIMappingState;
    if (!KEY) {
      toast.error("Select a Level");
      return false;
    } else if (!VALUE) {
      toast.error("Select Level Name");
      return false;
    } else if (!API_ID) {
      toast.error("Select an Api");
      return false;
    } else {
      return true;
    }
  };

  const prepareTableData = async () => {
    //getting all active submoduleAPIMappings from backend
    setShowLoader(true);
    let response =
      await SubModuleAPIMappingService.listSubModuleAPIMappingDetails();
    if (response) {
      const jsonRes = await response.json();

      let data = [];
      if (jsonRes.status === "SUCCESS") {
        jsonRes.data.forEach((element, i) => {
          const backendAPIs = element.backendAPIs;
          const submodule = element.submodules;
          data.push({
            SR: i + 1,
            id: element.SUBMODULE_API_MAPPING_ID,
            col_level: element.KEY,
            col_level_name: element.VALUE_NAME,
            col_api_name: backendAPIs?.API_NAME,
            col_api_url: backendAPIs?.API_URL,
            record_status:
              element.RECORD_STATUS === "active" ? "Enabled" : "Disabled",
            col_last_updated_by: element.MODIFIED_BY
              ? element.MODIFIED_BY
              : element.OPERATOR,
            col_actions: (
              <div style={{ whiteSpace: "nowrap" }}>
                {(checkElementRole(
                  "subModuleApiMappingEditBtn",
                  elementAuthorizationState
                ) ||
                  isAdmin) && (
                  <>
                    <a
                      style={{ cursor: "pointer" }}
                      className="text-dark p-0"
                      onClick={() =>
                        handleEdit(
                          // "ELEMENT",
                          element.KEY,
                          element.VALUE,
                          element.API_ID,
                          element.SUBMODULE_API_MAPPING_ID
                        )
                      }
                    >
                      <Image title="Edit" src={Edit}></Image>
                    </a>
                    &nbsp;
                  </>
                )}
                {(checkElementRole(
                  "subModuleApiMappingDeleteBtn",
                  elementAuthorizationState
                ) ||
                  isAdmin) && (
                  <>
                    <a
                      style={{ cursor: "pointer" }}
                      className="text-danger p-0"
                      onClick={() =>
                        handleDel(element.SUBMODULE_API_MAPPING_ID)
                      }
                    >
                      <Image title="Delete" src={Trash}></Image>
                    </a>
                    &nbsp;
                  </>
                )}
                {(checkElementRole(
                  "subModuleApiMappingDisableBtn",
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
                      onClick={() =>
                        handleDisable(element.SUBMODULE_API_MAPPING_ID)
                      }
                    >
                      <Image title="Disable" src={Disable}></Image>
                    </a>
                  ))}

                {(checkElementRole(
                  "subModuleApiMappingEnableBtn",
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
                      onClick={() =>
                        handleEnable(element.SUBMODULE_API_MAPPING_ID)
                      }
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
      setShowLoader(false);
    } else {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };
  // ============= End :: Event Handlers =============

  return (
    !loadingRoles && (
      <>
        {(checkSectionRole(
          "subModuleApiMappingForm",
          sectionAuthorizationState
        ) ||
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
                    Update Submodule API Mapping Form
                  </h6>
                ) : (
                  <h6 className="panel-title text-white weight-400 font-16">
                    Submodule API Mapping Creation Form
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
                    handleNewSubmoduleAPIMappingFormSubmit(e);
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
                          Level
                        </label>
                        <Select
                          // className="form-control"
                          instanceId={2}
                          options={levelOptions}
                          onChange={handleSelectKeyChange}
                          name="KEY"
                          value={levelOptions.find(
                            (item) => item.value == submoduleAPIMappingState.KEY
                          )}
                          styles={colourStyles}
                        />
                      </div>

                      <div className="form-group col-md-6 col-sm-12">
                        <label className="required control-label mb-1 text-left font-14 weight-500">
                          Level Name
                        </label>
                        <Select
                          // className="form-control"
                          instanceId={2}
                          options={valueOptions}
                          onChange={handleSelectChange}
                          name="VALUE"
                          value={valueOptions.find(
                            (item) =>
                              item.value == submoduleAPIMappingState.VALUE
                          )}
                          styles={colourStyles}
                        />
                      </div>

                      <div className="form-group col-md-6 col-sm-12">
                        <label className="required control-label mb-1 text-left font-14 weight-500">
                          Backend API
                        </label>
                        <Select
                          // className="form-control"
                          instanceId={3}
                          options={backendAPIsOption}
                          onChange={handleSelectChange}
                          name="API_ID"
                          value={backendAPIsOption.find(
                            (item) =>
                              item.value == submoduleAPIMappingState.API_ID
                          )}
                          styles={colourStyles}
                        />
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
                      {editMode.isEdit === true ? (
                        <button
                          type="submit"
                          className="btn btn-primary btn-fixed-width"
                          style={{ background: "#284E93" }}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-primary btn-fixed-width"
                          style={{ background: "#284E93" }}
                        >
                          Save
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
          checkSectionRole(
            "subModuleApiMappingForm",
            sectionAuthorizationState
          )) && (
          <div className="panel panel-inverse card-view">
            <PanelHeading text="Available Sub-Module API Mappings" />
            <div className="panel-wrapper collapse in">
              <div className="panel-body">
                {showLoader ? (
                  <div style={{ textAlign: "center" }}>
                    <ColorRing
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={[
                        "#284E93",
                        "#284E93",
                        "#284E93",
                        "#284E93",
                        "#284E93",
                      ]}
                    />
                  </div>
                ) : (
                  <ReactTable columns={cols} data={tableDataState} />
                )}
              </div>
            </div>
          </div>
        )}
      </>
    )
  );
}
