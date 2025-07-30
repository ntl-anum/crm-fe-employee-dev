/**
 * @filename Submodule.js
 * @desc This file contains UI for CRUD operations of Submodule
 * @auth Sehrish Naseer
 * @date 17/09/2022
 */

// ============= Start :: Imports =============
import React, { useEffect, useState, useMemo } from "react";
import Cookie from "js-cookie";
import Select from "react-select";
import ReactTable from "../../components/Table/ReactTable";
import PrimaryModal from "../../components/Model/PrimaryModal";
import { SubModuleService } from "../../services/AuthorizationService/SubmoduleManagement";
import { toast } from "react-toastify";
import { handleEnterKeyPress } from "../../constants/enterKeyPress";
import { ModuleService } from "../../services/AuthorizationService/ModuleManagement";
import { useActiveModules } from "../../helpers/react_query_functions";
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
import MaxCharacterLimit from "@/components/MaxCharacterLimit";
import {
  NUMBERS_PATTERN,
  ONLY_ALPHABETS_PATTERN,
} from "@/constants/regexPatterns";
import useAuthorizedRoles from "@/hooks/useAuthorizedRoles";
import { checkElementRole, checkSectionRole } from "@/helpers/auth-helpers";
// ============= End :: Imports =============

// ============= Start :: Initial States =============
// Initial values of form
const initialStateValue = {
  MODULE_ID: "",
  SUBMODULE_NAME: "",
  SEQUENCE_NUMBER: "",
  SECTION_LEVEL_RIGHTS_REQUIRED: "NO",
  ELEMENT_LEVEL_RIGHTS_REQUIRED: "NO",
};

//Sehrish Naseer Dated:03/10/22 -----Code Started Authorization

// Initial value to check if form is in edit mode
// or new mode and tracking id of being edited submodule
const initialEditValue = {
  isEdit: false,
  id: null,
};
// ============= End :: Initial States =============

// ============= Start :: Component =============
export default function Submodule({ id }) {
  // ============= Start :: States =============
  const { data: dataClientActiveModules } = useActiveModules();
  const queryClient = useQueryClient();
  const [showLoader, setShowLoader] = useState(false);
  const [showFormState, setShowFormState] = useState(true);
  const [submoduleState, setSubmoduleState] = useState(initialStateValue);
  const [editMode, setEditMode] = React.useState(initialEditValue);
  const {
    authorizationState,
    sectionAuthorizationState,
    elementAuthorizationState,
    isAdmin,
    getAuthorizedRoles,
    loadingRoles,
  } = useAuthorizedRoles();
  const [modulesOption, setModulesOption] = useState([]);
  const [deleteModal, setDeleteModal] = React.useState({
    show: false,
    id: null,
  });
  const [isMaxLengthExceeded, setIsMaxLengthExceeded] = useState(false);
  const [rightsAtSubmoduleOrParentExist, setRightsAtSubmoduleOrParentExist] =
    useState(false);
  useEffect(() => {
    getAuthorizedRoles(id);
  }, [id]);
  const cols = React.useMemo(
    () => [
      {
        Header: "module name",
        accessor: "col_module_name",
      },
      {
        Header: "submodule name",
        accessor: "col_submodule_name",
      },
      {
        Header: "sequence",
        accessor: "col_sequence_number",
      },
      {
        Header: "section rights",
        accessor: "col_section_rights",
      },
      {
        Header: "element rights",
        accessor: "col_element_rights",
      },
      {
        Header: "record status",
        accessor: "record_status",
      },
      {
        Header: "Last Updated By",
        accessor: "col_last_updated_by",
      },
      ...(checkElementRole("subModuleEditBtn", elementAuthorizationState) ||
      checkElementRole("subModuleDeleteBtn", elementAuthorizationState) ||
      checkElementRole("subModuleEnableBtn", elementAuthorizationState) ||
      checkElementRole("subModuleDisableBtn", elementAuthorizationState) ||
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

  const cookModuleOptions = (rawModulesData) => {
    let options = [{ value: "", label: "Please Select...", isDisabled: true }];
    rawModulesData.forEach((element) => {
      options.push({
        value: +element.MODULE_ID,
        label: element.MODULE_NAME,
      });
    });
    setModulesOption(options);
  };

  // =============  End :: States  =============

  // ============= Start :: Event Handlers =============

  //Sehrish Naseer Dated:03/10/22 -----Code Started Authorization

  useEffect(() => {
    prepareTableData();
  }, [loadingRoles]);

  useEffect(() => {
    if (dataClientActiveModules?.data) {
      cookModuleOptions(dataClientActiveModules.data);
    }
  }, [dataClientActiveModules]);

  //Sehrish Naseer Dated:03/10/22 -----Code Ended Authorization

  const closeEditForm = () => {
    setIsMaxLengthExceeded(null);
    handleShowFormNew(false);
    setEditMode(initialEditValue);
    setSubmoduleState(initialStateValue);
  };

  const handleDisable = async (dis_id) => {
    try {
      setShowLoader(true);
      const response = await SubModuleService.disableSubModule(dis_id, {
        MODIFIED_BY: getOperatorFromCookie(),
      });
      if (response) {
        let jsonRes = await response.json();

        if (jsonRes.status === "SUCCESS") {
          // TODO : Reloading Table
          prepareTableData();
          queryClient.invalidateQueries(["submodule-active"]);
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
      const response = await SubModuleService.enableSubModule(enable_id, {
        MODIFIED_BY: getOperatorFromCookie(),
      });
      if (response) {
        let jsonRes = await response.json();

        if (jsonRes.status === "SUCCESS") {
          // TODO : Reloading Table
          prepareTableData();
          queryClient.invalidateQueries(["submodule-active"]);
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
      if (name === "SUBMODULE_NAME" && !ONLY_ALPHABETS_PATTERN.test(value))
        return;
      if (name === "SEQUENCE_NUMBER" && !NUMBERS_PATTERN.test(value)) return;
      setSubmoduleState({
        ...submoduleState,
        [name]: value,
      });
      setIsMaxLengthExceeded(null);
    } else {
      setIsMaxLengthExceeded(name);
    }
  };

  const handleSelectChange = (option, htmlElement) => {
    setSubmoduleState({
      ...submoduleState,
      [htmlElement.name]: option.value,
    });
  };

  const handleShowFormNew = () => {
    setShowFormState(!showFormState);
  };
  const deleteFun = async () => {
    try {
      setShowLoader(true);
      const response = await SubModuleService.deleteSubModule(deleteModal.id, {
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
      console.log(error);
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const handleEdit = async (
    MODULE_ID,
    SUBMODULE_NAME,
    SEQUENCE_NUMBER,
    SECTION_LEVEL_RIGHTS_REQUIRED,
    ELEMENT_LEVEL_RIGHTS_REQUIRED,
    SUBMODULE_ID
  ) => {
    setIsMaxLengthExceeded(null);
    setShowFormState(true);
    setEditMode({ isEdit: true, id: SUBMODULE_ID });
    await checkRightsAtSubModuleOrParentExist(+MODULE_ID, +SUBMODULE_ID);
    setSubmoduleState({
      MODULE_ID,
      SUBMODULE_NAME,
      SEQUENCE_NUMBER,
      SECTION_LEVEL_RIGHTS_REQUIRED,
      ELEMENT_LEVEL_RIGHTS_REQUIRED,
    });
    window.scrollTo({ top: 50, left: 0, behavior: "smooth" });
  };

  const checkRightsAtSubModuleOrParentExist = async (
    MODULE_ID,
    SUBMODULE_ID
  ) => {
    try {
      const res = await SubModuleService.checkRightsAtSubModuleOrParentExist({
        MODULE_ID,
        SUBMODULE_ID,
      });
      if (res) {
        const jsonRes = await res.json();
        if (jsonRes.status === "SUCCESS") {
          setRightsAtSubmoduleOrParentExist(true);
        } else {
          setRightsAtSubmoduleOrParentExist(false);
        }
      } else {
        setRightsAtSubmoduleOrParentExist(false);
      }
    } catch (error) {
      console.log(error);
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
        setShowLoader(true);
        const operator = getOperatorFromCookie();

        submoduleState.SEQUENCE_NUMBER = parseInt(
          submoduleState.SEQUENCE_NUMBER
        );

        const res = await SubModuleService.updateSubModule(editMode.id, {
          ...submoduleState,
          MODIFIED_BY: operator,
        });

        if (res) {
          let jsonRes = await res.json();

          if (jsonRes.status === "SUCCESS") {
            setIsMaxLengthExceeded(null);
            setShowLoader(false);
            prepareTableData();
            queryClient.invalidateQueries(["submodule-active"]);
            setEditMode(initialEditValue);
            setSubmoduleState(initialStateValue);
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

  const handleNewSubmoduleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const fieldsAreValid = validateFields();
      if (fieldsAreValid) {
        setShowLoader(true);

        const operator = getOperatorFromCookie();
        submoduleState.SEQUENCE_NUMBER = parseInt(
          submoduleState.SEQUENCE_NUMBER
        );

        const res = await SubModuleService.createSubModule({
          ...submoduleState,
          OPERATOR: operator,
        });
        if (res) {
          let jsonRes = await res.json();

          if (jsonRes.status === "SUCCESS") {
            setIsMaxLengthExceeded(null);
            setShowLoader(false);
            setSubmoduleState(initialStateValue);
            handleShowFormNew(false);
            // Show Success Toast
            toast.success(jsonRes.message);
            prepareTableData();
            queryClient.invalidateQueries(["submodule-active"]);
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
    const { MODULE_ID, SUBMODULE_NAME, SEQUENCE_NUMBER } = submoduleState;
    if (!MODULE_ID) {
      toast.error("Select a Module");
      return false;
    } else if (!SUBMODULE_NAME) {
      toast.error("Enter Sub Module Name");
      return false;
    } else if (SUBMODULE_NAME.length > 100) {
      toast.error("Maximum 100 characters allowed for Sub Module Name");
      return false;
    } else if (!SEQUENCE_NUMBER) {
      toast.error("Enter Sequence number");
      return false;
    } else if (SEQUENCE_NUMBER.length > 30) {
      toast.error("Maximum 30 characters allowed for Sequence number");
      return false;
    } else {
      return true;
    }
  };

  const handleCheckboxChange = (e) => {
    // const checkValue = promotionPoolState[e.target.name]==="YES" ? "NO" : "YES";
    setSubmoduleState((prevState) => ({
      ...prevState,
      [e.target.name]: prevState[e.target.name] === "YES" ? "NO" : "YES",
    }));
  };

  const prepareTableData = async () => {
    //getting all active submodules from backend
    let response = await SubModuleService.listSubModuleDetails();
    if (response) {
      let jsonRes = await response.json();
      let data = [];
      if (jsonRes.status === "SUCCESS") {
        jsonRes.data.forEach((element, i) => {
          data.push({
            SR: i + 1,
            id: element.SUBMODULE_ID,
            col_module_name: element.modules.MODULE_NAME,
            col_submodule_name: element.SUBMODULE_NAME,
            col_sequence_number: element.SEQUENCE_NUMBER,
            col_section_rights: (
              <div
                className={` ${
                  element.SECTION_LEVEL_RIGHTS_REQUIRED ===
                  ("YES" || "Yes" || "yes")
                    ? "badgeSuccess"
                    : element.SECTION_LEVEL_RIGHTS_REQUIRED ===
                      ("NO" || "No" || "no" || null)
                    ? "badgeDanger"
                    : ""
                }`}
              >
                {element.SECTION_LEVEL_RIGHTS_REQUIRED}
              </div>
            ),
            col_element_rights: (
              <div
                className={` ${
                  element.ELEMENT_LEVEL_RIGHTS_REQUIRED ===
                  ("YES" || "Yes" || "yes")
                    ? "badgeSuccess"
                    : element.ELEMENT_LEVEL_RIGHTS_REQUIRED ===
                      ("NO" || "No" || "no" || null)
                    ? "badgeDanger"
                    : ""
                }`}
              >
                {element.ELEMENT_LEVEL_RIGHTS_REQUIRED}
              </div>
            ),
            record_status:
              element.RECORD_STATUS === "active" ? "Enabled" : "Disabled",
            col_last_updated_by: element.MODIFIED_BY
              ? element.MODIFIED_BY
              : element.OPERATOR,
            col_actions: (
              <div>
                {(checkElementRole(
                  "subModuleEditBtn",
                  elementAuthorizationState
                ) ||
                  isAdmin) && (
                  <>
                    <a
                      style={{ cursor: "pointer" }}
                      className="text-dark p-0"
                      onClick={() =>
                        handleEdit(
                          +element.MODULE_ID,
                          element.SUBMODULE_NAME,
                          element.SEQUENCE_NUMBER,
                          element.SECTION_LEVEL_RIGHTS_REQUIRED,
                          element.ELEMENT_LEVEL_RIGHTS_REQUIRED,
                          element.SUBMODULE_ID
                        )
                      }
                    >
                      <Image title="Edit" src={Edit}></Image>
                    </a>
                    &nbsp;
                  </>
                )}
                {(checkElementRole(
                  "subModuleDeleteBtn",
                  elementAuthorizationState
                ) ||
                  isAdmin) && (
                  <>
                    <a
                      style={{ cursor: "pointer" }}
                      className="text-danger p-0"
                      onClick={() => handleDel(element.SUBMODULE_ID)}
                    >
                      <Image title="Delete" src={Trash}></Image>
                    </a>
                    &nbsp;
                  </>
                )}

                {(checkElementRole(
                  "subModuleDisableBtn",
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
                      onClick={() => handleDisable(element.SUBMODULE_ID)}
                    >
                      <Image title="Disable" src={Disable}></Image>
                    </a>
                  ))}

                {(checkElementRole(
                  "subModuleDisableBtn",
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
                      onClick={() => handleEnable(element.SUBMODULE_ID)}
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
        {(checkSectionRole("subModuleForm", sectionAuthorizationState) ||
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
                    Update Submodule Form
                  </h6>
                ) : (
                  <h6 className="panel-title text-white weight-400 font-16">
                    Submodule Creation Form
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
                    handleNewSubmoduleFormSubmit(e);
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
                          Module Name
                        </label>
                        <Select
                          isDisabled={
                            editMode.isEdit && rightsAtSubmoduleOrParentExist
                          }
                          // className="form-control"
                          instanceId={1}
                          options={modulesOption}
                          onChange={handleSelectChange}
                          name="MODULE_ID"
                          value={modulesOption.find(
                            (item) => item.value == submoduleState.MODULE_ID
                          )}
                          styles={colourStyles}
                          isOptionDisabled={(option) => option.isDisabled}
                        />
                      </div>
                      <div className="form-group col-md-6 col-sm-12">
                        <label className="required control-label mb-1 text-left font-14 weight-500">
                          Submodule Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Submodule name"
                          value={submoduleState.SUBMODULE_NAME}
                          onChange={handleInputChange}
                          name="SUBMODULE_NAME"
                          data-maxchars="100"
                        ></input>
                        {isMaxLengthExceeded === "SUBMODULE_NAME" && (
                          <MaxCharacterLimit characters={100} />
                        )}
                      </div>

                      <div className="form-group col-md-6 col-sm-12">
                        <label className="required control-label mb-1 text-left font-14 weight-500">
                          Sequence
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter sequence number"
                          value={submoduleState.SEQUENCE_NUMBER}
                          onChange={handleInputChange}
                          name="SEQUENCE_NUMBER"
                          data-maxchars="10"
                        ></input>
                        {isMaxLengthExceeded === "SEQUENCE_NUMBER" && (
                          <MaxCharacterLimit characters={10} />
                        )}
                      </div>
                    </div>

                    <label className="control-label text-left weight-500 font-14 mt-2">
                      Further Rights
                    </label>
                    <div className="row">
                      <div className="form-group col-md-3 col-sm-12 my-0">
                        <div className="checkbox checkbox-primary checkbox-circle">
                          <input
                            id="SECTION_LEVEL_RIGHTS_REQUIRED"
                            type="checkbox"
                            name="SECTION_LEVEL_RIGHTS_REQUIRED"
                            checked={
                              submoduleState.SECTION_LEVEL_RIGHTS_REQUIRED ===
                              "YES"
                            }
                            onChange={handleCheckboxChange}
                          />
                          <label
                            htmlFor="SECTION_LEVEL_RIGHTS_REQUIRED"
                            className="control-label text-left weight-300"
                          >
                            Section Rights Required
                          </label>
                        </div>
                      </div>
                      <div className="form-group col-md-3 col-sm-12 my-0">
                        <div className="checkbox checkbox-primary checkbox-circle">
                          <input
                            id="ELEMENT_LEVEL_RIGHTS_REQUIRED"
                            type="checkbox"
                            name="ELEMENT_LEVEL_RIGHTS_REQUIRED"
                            checked={
                              submoduleState.ELEMENT_LEVEL_RIGHTS_REQUIRED ===
                              "YES"
                            }
                            onChange={handleCheckboxChange}
                          />
                          <label
                            htmlFor="ELEMENT_LEVEL_RIGHTS_REQUIRED"
                            className="control-label text-left weight-300"
                          >
                            Element Rights Required
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
                      {editMode.isEdit == true ? (
                        showLoader === false ? (
                          <button
                            type="submit"
                            className="btn btn-primary btn-fixed-width"
                            style={{ background: "#284E93" }}
                          >
                            Update{" "}
                          </button>
                        ) : (
                          <CircularLoader />
                        )
                      ) : showLoader === false ? (
                        <button
                          type="submit"
                          className="btn btn-primary btn-fixed-width"
                          style={{ background: "#284E93" }}
                        >
                          Save{" "}
                        </button>
                      ) : (
                        <CircularLoader />
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
          checkSectionRole("subModuleForm", sectionAuthorizationState)) && (
          <div className="panel panel-inverse card-view">
            <PanelHeading text="Available Sub-Modules" />
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
