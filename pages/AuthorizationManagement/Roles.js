/**
 * @filename Roles.js
 * @desc This file contains UI for CRUD operations of Roles
 * @auth Sehrish Naseer
 * @date 17/09/2022
 */

// ============= Start :: Imports =============
import React, { useEffect, useState, useMemo } from "react";
import Cookie from "js-cookie";
import Select from "react-select";
import ReactTable from "../../components/Table/ReactTable";
import PrimaryModal from "../../components/Model/PrimaryModal";
import { RolesService } from "../../services/AuthorizationService/RolesManagement";
import { handleEnterKeyPress } from "../../constants/enterKeyPress";
import { toast } from "react-toastify";
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
import useAuthorizedRoles from "@/hooks/useAuthorizedRoles";
import { checkElementRole, checkSectionRole } from "@/helpers/auth-helpers";
import { ONLY_ALPHABETS_PATTERN } from "@/constants/regexPatterns";
// ============= End :: Imports =============

// ============= Start :: Initial States =============
// Initial values of form
const initialStateValue = {
  ROLE_KEY: "",
  ROLE_VALUE: "",
};

// Initial value to check if form is in edit mode
// or new mode and tracking id of being edited role
const initialEditValue = {
  isEdit: false,
  id: null,
};
// ============= End :: Initial States =============

// ============= Start :: Component =============
export default function Roles({ id }) {
  // ============= Start :: States =============
  const queryClient = useQueryClient();
  const [showLoader, setShowLoader] = useState(false);
  const [showFormState, setShowFormState] = useState(true);
  const [roleState, setRolesState] = useState(initialStateValue);
  const [editMode, setEditMode] = useState(initialEditValue);
  const {
    authorizationState,
    sectionAuthorizationState,
    elementAuthorizationState,
    isAdmin,
    getAuthorizedRoles,
    loadingRoles,
  } = useAuthorizedRoles();
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    id: null,
  });
  const roleActionsOption = [
    { value: "", label: "Please Select...", isDisabled: true },
    { value: "ALL", label: "All" },
    { value: "GET", label: "View" },
    { value: "POST", label: "Create & View" },
    { value: "PUT", label: "Update/Enable/Disable & View" },
    { value: "DELETE", label: "Delete & View" },
  ];
  const [isMaxLengthExceeded, setIsMaxLengthExceeded] = useState(false);
  useEffect(() => {
    getAuthorizedRoles(id);
  }, [id]);
  const cols = React.useMemo(
    () => [
      {
        Header: "role name",
        accessor: "col_role_name",
      },
      {
        Header: "role action",
        accessor: "col_role_action",
      },
      {
        Header: "record status",
        accessor: "record_status",
      },
      {
        Header: "Last Updated By",
        accessor: "col_last_updated_by",
      },
      ...(checkElementRole("rolesEditBtn", elementAuthorizationState) ||
      checkElementRole("rolesDeleteBtn", elementAuthorizationState) ||
      checkElementRole("rolesEnableBtn", elementAuthorizationState) ||
      checkElementRole("rolesDisableBtn", elementAuthorizationState) ||
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
  //Sehrish Naseer Dated:03/10/22 -----Code Started Authorization

  useEffect(() => {
    prepareTableData();
  }, [loadingRoles]);

  //Sehrish Naseer Dated:03/10/22 -----Code Ended Authorization

  const closeEditForm = () => {
    setIsMaxLengthExceeded(null);
    handleShowFormNew(false);
    setEditMode(initialEditValue);
    setRolesState(initialStateValue);
  };

  const handleDisable = async (dis_id) => {
    try {
      setShowLoader(true);
      const response = await RolesService.disableRoles(dis_id, {
        MODIFIED_BY: getOperatorFromCookie(),
      });
      if (response) {
        const jsonRes = await response.json();
        if (jsonRes.status === "SUCCESS") {
          await prepareTableData();
          queryClient.invalidateQueries(["roles-active"]);
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
      const response = await RolesService.enableRoles(enable_id, {
        MODIFIED_BY: getOperatorFromCookie(),
      });
      if (response) {
        const jsonRes = await response.json();

        if (jsonRes.status === "SUCCESS") {
          prepareTableData();
          queryClient.invalidateQueries(["roles-active"]);
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
    const { name, value, dataset } = e.target;
    const maxChars = parseInt(dataset.maxchars, 10);
    if (value.length <= maxChars) {
      if (name === "ROLE_KEY" && !ONLY_ALPHABETS_PATTERN.test(value)) return;

      setRolesState({
        ...roleState,
        [name]: value,
      });
      setIsMaxLengthExceeded(null);
    } else {
      setIsMaxLengthExceeded(name);
    }
  };

  const handleSelectChange = (option, htmlElement) => {
    setRolesState({
      ...roleState,
      [htmlElement.name]: option.value,
    });
  };

  const handleShowFormNew = () => {
    setShowFormState(!showFormState);
  };

  const deleteFun = async () => {
    try {
      setShowLoader(true);
      const response = await RolesService.deleteRoles(deleteModal.id, {
        MODIFIED_BY: getOperatorFromCookie(),
      });
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
      handleDel();
    } catch (error) {
      console.log(error);
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const handleEdit = (ROLE_KEY, ROLE_VALUE, ROLE_ID) => {
    setIsMaxLengthExceeded(null);
    setShowFormState(true);
    setEditMode({ isEdit: true, id: ROLE_ID });
    setRolesState({
      ROLE_KEY,
      ROLE_VALUE,
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

        const res = await RolesService.updateRoles(editMode.id, {
          ...roleState,
          MODIFIED_BY: operator,
        });
        if (res) {
          const jsonRes = await res.json();

          if (jsonRes.status === "SUCCESS") {
            setIsMaxLengthExceeded(null);
            setShowLoader(false);
            prepareTableData();
            queryClient.invalidateQueries(["roles-active"]);
            setEditMode(initialEditValue);
            setRolesState(initialStateValue);
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

  const handleNewRolesFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const fieldsAreValid = validateFields();
      if (fieldsAreValid) {
        setShowLoader(true);

        const operator = getOperatorFromCookie();

        const res = await RolesService.createRoles({
          ...roleState,
          OPERATOR: operator,
        });
        if (res) {
          const jsonRes = await res.json();

          if (jsonRes.status === "SUCCESS") {
            setIsMaxLengthExceeded(null);
            setShowLoader(false);
            prepareTableData();
            queryClient.invalidateQueries(["roles-active"]);
            setRolesState(initialStateValue);
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
    const { ROLE_KEY, ROLE_VALUE } = roleState;
    if (!ROLE_KEY) {
      toast.error("Enter Role Name");
      return false;
    } else if (ROLE_KEY.length > 30) {
      toast.error("Maximum 30 characters allowed for Role Name");
      return false;
    } else if (!ROLE_VALUE) {
      toast.error("Select role Action");
      return false;
    } else {
      return true;
    }
  };

  const prepareTableData = async () => {
    try {
      //getting all active roles from backend
      let response = await RolesService.listRoles();

      if (response) {
        const jsonRes = await response.json();
        let data = [];
        if (jsonRes.status === "SUCCESS") {
          jsonRes.data.forEach((element, i) => {
            data.push({
              SR: i + 1,
              id: element.ROLE_ID,
              col_role_name: element.ROLE_KEY,
              col_role_action: element.ROLE_VALUE,
              record_status:
                element.RECORD_STATUS === "active" ? "Enabled" : "Disabled",
              col_last_updated_by: element.MODIFIED_BY
                ? element.MODIFIED_BY
                : element.OPERATOR,
              col_actions: (
                <div>
                  {(checkElementRole(
                    "rolesEditBtn",
                    elementAuthorizationState
                  ) ||
                    isAdmin) && (
                    <>
                      <a
                        style={{ cursor: "pointer" }}
                        className="text-dark p-0"
                        onClick={() =>
                          handleEdit(
                            element.ROLE_KEY,
                            element.ROLE_VALUE,
                            element.ROLE_ID
                          )
                        }
                      >
                        <Image title="Edit" src={Edit}></Image>
                      </a>
                      &nbsp;
                    </>
                  )}
                  {(checkElementRole(
                    "rolesDeleteBtn",
                    elementAuthorizationState
                  ) ||
                    isAdmin) && (
                    <>
                      <a
                        style={{ cursor: "pointer" }}
                        className="text-danger p-0"
                        onClick={() => handleDel(element.ROLE_ID)}
                      >
                        <Image title="Delete" src={Trash}></Image>
                      </a>
                      &nbsp;
                    </>
                  )}

                  {(checkElementRole(
                    "rolesDisableBtn",
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
                        onClick={() => handleDisable(element.ROLE_ID)}
                      >
                        <Image title="Disable" src={Disable}></Image>
                      </a>
                    ))}

                  {(checkElementRole(
                    "rolesEnableBtn",
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
                        onClick={() => handleEnable(element.ROLE_ID)}
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
      console.log(error);
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };
  // ============= End :: Event Handlers =============

  return (
    !loadingRoles && (
      <>
        {showLoader && <CircularLoader />}

        {(checkSectionRole("rolesForm", sectionAuthorizationState) ||
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
                    Update Roles Form
                  </h6>
                ) : (
                  <h6 className="panel-title text-white weight-540 font-16">
                    Roles Creation Form
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
                    handleNewRolesFormSubmit(e);
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
                          Role Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter roles name"
                          value={roleState.ROLE_KEY}
                          onChange={handleInputChange}
                          name="ROLE_KEY"
                          data-maxchars="30"
                        ></input>
                        {isMaxLengthExceeded === "ROLE_KEY" && (
                          <MaxCharacterLimit characters={30} />
                        )}
                      </div>

                      <div className="form-group col-md-6 col-sm-12">
                        <label className="required control-label mb-1 text-left font-14 weight-500">
                          Role Action
                        </label>
                        <Select
                          // className="form-control"
                          instanceId={1}
                          options={roleActionsOption}
                          onChange={handleSelectChange}
                          name="ROLE_VALUE"
                          value={roleActionsOption.find(
                            (item) => item.value === roleState.ROLE_VALUE
                          )}
                          styles={colourStyles}
                          isOptionDisabled={(option) => option.isDisabled}
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
          checkSectionRole("rolesForm", sectionAuthorizationState)) && (
          <div className="panel panel-inverse card-view">
            <PanelHeading text="Available Roles" />
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
