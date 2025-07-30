/**
 * @filename App.js
 * @desc This file contains UI for CRUD operations of User Dashlet Mapping
 * @auth Sehrish Naseer
 * @date 17/09/2022
 */

// ============= Start :: Imports =============
import React, { useEffect, useState, useMemo } from "react";
import Cookie from "js-cookie";
import ReactTable from "../../components/Table/ReactTable";
import PrimaryModal from "../../components/Model/PrimaryModal";
import { AppService } from "../../services/AuthorizationService/AppManagement";
import { UserRightsService } from "../../services/AuthorizationService/UserRightsManagement";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { DashletMappingService } from "../../services/DashboardCustomizationService/UserDashletMapping";
import Edit from "../../public/dist/img/Edit.svg";
import Trash from "../../public/dist/img/Trash.svg";
import Disable from "../../public/dist/img/Disable.svg";
import Enable from "../../public/dist/img/Enable.svg";
import Image from "next/image";
import { getOperatorFromCookie } from "@/helpers/cookie-parser";
import Router from "next/router";
import { APP_ROUTES } from "@/helpers/enums";
import useAuthorizedRoles from "@/hooks/useAuthorizedRoles";
import { checkElementRole, checkSectionRole } from "@/helpers/auth-helpers";
// ============= End :: Imports =============

// ============= Start :: Initial States =============
// Initial values of form
const initialStateValue = {
  EMP_ID: "",
  DASHLET_POOL_ID: "",
};

// Initial value to check if form is in edit mode
// or new mode and tracking id of being edited app
const initialEditValue = {
  isEdit: false,
  id: null,
};
// ============= End :: Initial States =============

// ============= Start :: Component =============
export default function UserDashletMapping({ id }) {
  // ============= Start :: States =============
  const queryClient = useQueryClient();
  const [showFormState, setShowFormState] = useState(true);
  const [dashletMappingState, setDashletMappingState] =
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
        Header: "Emp ID",
        accessor: "emp_id",
      },
      {
        Header: "DASHLET ID",
        accessor: "dashlet_id",
      },
      {
        Header: "DASHLET NAME",
        accessor: "dashlet_name",
      },
      ...(checkElementRole(
        "userDashletMappingEditBtn",
        elementAuthorizationState
      ) ||
      checkElementRole(
        "userDashletMappingDeleteBtn",
        elementAuthorizationState
      ) ||
      checkElementRole(
        "userDashletMappingEnableBtn",
        elementAuthorizationState
      ) ||
      checkElementRole(
        "userDashletMappingDisableBtn",
        elementAuthorizationState
      ) ||
      isAdmin
        ? [
            {
              Header: "col_Actions",
              accessor: "col_actions",
            },
          ]
        : []),
    ],
    [loadingRoles]
  );
  const [tableDataState, setTableDataState] = useState([]);

  useEffect(() => {
    prepareTableData();
  }, [loadingRoles]);

  const closeEditForm = () => {
    handleShowFormNew(false);
    setEditMode(initialEditValue);
    setDashletMappingState(initialStateValue);
  };

  const handleDisable = async (dis_id) => {
    try {
      const response = await DashletMappingService.disableDashletMapping(
        dis_id,
        {
          MODIFIED_BY: Cookie.get(process.env.USER),
        }
      );

      if (response) {
        let jsonRes = await response.json();
        if (jsonRes.status === "SUCCESS") {
          prepareTableData();
          toast.success(jsonRes.message);
        } else {
          toast.error(jsonRes.message);
        }
      } else {
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
    } catch (error) {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const handleEnable = async (enable_id) => {
    try {
      const response = await DashletMappingService.enableDashletMapping(
        enable_id,
        {
          MODIFIED_BY: Cookie.get(process.env.USER),
        }
      );
      if (response) {
        let jsonRes = await response.json();
        if (jsonRes.status === "SUCCESS") {
          prepareTableData();
          toast.success(jsonRes.message);
        } else {
          toast.error(jsonRes.message);
        }
      } else {
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
    } catch (error) {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDashletMappingState({
      ...dashletMappingState,
      [name]: value,
    });
  };

  const handleShowFormNew = () => {
    setShowFormState(!showFormState);
  };

  const deleteFun = async () => {
    try {
      const response = await DashletMappingService.deleteDashletMapping(
        deleteModal.id,
        {
          MODIFIED_BY: Cookie.get(process.env.USER),
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
        handleDel();
      } else {
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
    } catch (error) {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const handleEdit = (USER_DASHLET_MAPPING_ID, EMP_ID, DASHLET_POOL_ID) => {
    setShowFormState(true);
    setEditMode({ isEdit: true, id: USER_DASHLET_MAPPING_ID });
    setDashletMappingState({
      EMP_ID,
      DASHLET_POOL_ID,
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
      const operator = Cookie.get(process.env.USER);
      const isStateNull = Object.values(dashletMappingState).some((value) => {
        if (value === null || value === undefined || value === "") {
          return true;
        }
        return false;
      });

      if (isStateNull) {
        toast.warn("Please fill all fields");
        return;
      }
      dashletMappingState.DASHLET_POOL_ID = parseInt(
        dashletMappingState.DASHLET_POOL_ID
      );
      const res = await DashletMappingService.updateDashletMapping(
        editMode.id,
        {
          ...dashletMappingState,
          MODIFIED_BY: operator,
        }
      );

      if (res) {
        let jsonRes = await res.json();
        if (jsonRes.status === "SUCCESS") {
          prepareTableData();
          setEditMode(initialEditValue);
          setDashletMappingState(initialStateValue);
          setShowFormState(false);
          toast.success(jsonRes.message);
        } else {
          toast.error(
            Array.isArray(jsonRes?.message)
              ? jsonRes?.message?.[0]
              : jsonRes?.message
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

      const isStateNull = Object.values(dashletMappingState).some((value) => {
        if (value === null || value === undefined || value === "") {
          return true;
        }
        return false;
      });

      if (isStateNull) {
        toast.warn("Please fill all fields");
        return;
      }
      dashletMappingState.DASHLET_POOL_ID = parseInt(
        dashletMappingState.DASHLET_POOL_ID
      );
      const res = await DashletMappingService.createDashletMapping({
        ...dashletMappingState,
        OPERATOR: operator,
      });

      if (res) {
        let jsonRes = await res.json();

        if (jsonRes.status === "SUCCESS") {
          prepareTableData();
          setDashletMappingState(initialStateValue);
          handleShowFormNew(false);
          toast.success(jsonRes.message);
        } else {
          toast.error(
            Array.isArray(jsonRes?.message)
              ? jsonRes?.message?.[0]
              : jsonRes?.message
          );
        }
      } else {
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
    } catch (error) {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const prepareTableData = async () => {
    try {
      //getting all active apps from backend
      let response = await DashletMappingService.listDashletMapping();
      if (response) {
        let jsonRes = await response.json();
        let data = [];
        if (jsonRes.status === "SUCCESS") {
          jsonRes.data.forEach((element) => {
            const dashletPool = element.dashletPool;

            data.push({
              id: element.USER_DASHLET_MAPPING_ID,
              emp_id: element.EMP_ID,
              dashlet_id: dashletPool.DASHLET_ID,
              dashlet_name: dashletPool.DASHLET_NAME,

              col_actions: (
                <div>
                  {(checkElementRole(
                    "userDashletMappingEditBtn",
                    elementAuthorizationState
                  ) ||
                    isAdmin) && (
                    <>
                      <a
                        className="text-dark p-0"
                        onClick={() =>
                          handleEdit(
                            element.DASHLET_POOL_ID,
                            element.DASHLET_NAME,
                            element.DASHLET_ID,
                            element.TYPE
                          )
                        }
                      >
                        <Image src={Edit}></Image>
                      </a>
                      &nbsp;
                    </>
                  )}
                  {(checkElementRole(
                    "userDashletMappingDeleteBtn",
                    elementAuthorizationState
                  ) ||
                    isAdmin) && (
                    <>
                      <a
                        className="text-danger p-0"
                        onClick={() => handleDel(element.DASHLET_POOL_ID)}
                      >
                        <Image src={Trash}></Image>
                      </a>
                      &nbsp;
                    </>
                  )}

                  {(checkElementRole(
                    "userDashletMappingDisableBtn",
                    elementAuthorizationState
                  ) ||
                    isAdmin) && (
                    <>
                      <a
                        className="text-warning p-0"
                        onClick={() => handleDisable(element.DASHLET_POOL_ID)}
                        disabled={element.RECORD_STATUS !== "active"}
                      >
                        <Image src={Disable}></Image>
                      </a>
                      &nbsp;
                    </>
                  )}

                  {(checkElementRole(
                    "userDashletMappingEnableBtn",
                    elementAuthorizationState
                  ) ||
                    isAdmin) && (
                    <a
                      className="btn bg-light text-success p-0"
                      onClick={() => handleEnable(element.DASHLET_POOL_ID)}
                      disabled={element.RECORD_STATUS === "active"}
                    >
                      <Image src={Enable}></Image>
                    </a>
                  )}
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
        {(checkSectionRole(
          "userDashletMappingForm",
          sectionAuthorizationState
        ) ||
          isAdmin ||
          editMode.isEdit) && (
          <div className="panel panel-inverse card-view">
            <div className="panel-heading">
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
                onSubmit={
                  editMode.isEdit == false
                    ? handleNewAppFormSubmit
                    : handleUpdateFormSubmit
                }
                className="panel-wrapper collapse in"
              >
                <div className="panel-body">
                  <div className="">
                    <div className="row">
                      <div className="form-group col-md-6 col-sm-12">
                        <label className="control-label mb-1 text-left font-14 weight-500">
                          Employee ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Employee ID"
                          value={dashletMappingState.EMP_ID}
                          onChange={handleInputChange}
                          name="EMP_ID"
                        ></input>
                      </div>
                      <div className="form-group col-md-6 col-sm-12">
                        <label className="control-label mb-1 text-left font-14 weight-500">
                          Dashlet Pool ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Dashlet Pool ID"
                          value={dashletMappingState.DASHLET_POOL_ID}
                          onChange={handleInputChange}
                          name="DASHLET_POOL_ID"
                        ></input>
                      </div>
                    </div>

                    <div
                      className="row mt-3"
                      style={{ float: "right", marginRight: "3px" }}
                    >
                      <button
                        className="btn btn-default bg-white text-dark border-secondary btn-fixed-width"
                        onClick={closeEditForm}
                      >
                        Cancel
                      </button>
                      &nbsp;
                      {editMode.isEdit == true ? (
                        <button
                          className="btn btn-primary btn-fixed-width"
                          style={{ background: "#284E93", fontSize: "14px" }}
                        >
                          Update{" "}
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-fixed-width"
                          style={{ background: "#284E93", fontSize: "14px" }}
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
              <h5 className="font-16">Are you sure you want to decete?</h5>
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
            "userDashletMappingForm",
            sectionAuthorizationState
          )) && (
          <div className="panel panel-inverse card-view">
            <div className="panel-heading">
              <div className="pull-left">
                <h6 className="panel-title txt-dark font-18 weight-500">
                  Available Apps
                </h6>
              </div>
            </div>
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
