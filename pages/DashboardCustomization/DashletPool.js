/**
 * @filename App.js
 * @desc This file contains UI for CRUD operations of Dashlet Pool
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
import { DashletPoolService } from "../../services/DashboardCustomizationService/DashletPool";
import Select from "react-select";
import Edit from "../../public/dist/img/Edit.svg";
import Trash from "../../public/dist/img/Trash.svg";
import Disable from "../../public/dist/img/Disable.svg";
import Enable from "../../public/dist/img/Enable.svg";
import Image from "next/image";
import useAuthorizedRoles from "@/hooks/useAuthorizedRoles";
import { checkElementRole, checkSectionRole } from "@/helpers/auth-helpers";
import Router from "next/router";
import { APP_ROUTES } from "@/helpers/enums";

// ============= End :: Imports =============

// ============= Start :: Initial States =============
// Initial values of form
const initialStateValue = {
  DASHLET_NAME: "",
  TYPE: "",
  DASHLET_ID: "",
};

// Initial value to check if form is in edit mode
// or new mode and tracking id of being edited app
const initialEditValue = {
  isEdit: false,
  id: null,
};
// ============= End :: Initial States =============

// ============= Start :: Component =============
export default function DashletPool({ id }) {
  // ============= Start :: States =============
  const queryClient = useQueryClient();
  const [showFormState, setShowFormState] = useState(true);
  const [dashletState, setDashletState] = useState(initialStateValue);
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
  const [dashletTypeState, setDashletTypeState] = useState(initialStateValue);
  useEffect(() => {
    getAuthorizedRoles(id);
  }, [id]);
  const cols = React.useMemo(
    () => [
      {
        Header: "dashlet name",
        accessor: "dashlet_name",
      },
      {
        Header: "dashlet ID",
        accessor: "dashlet_id",
      },
      {
        Header: "dashlet type",
        accessor: "dashlet_type",
      },
      ...(checkElementRole("dashletPoolEditBtn", elementAuthorizationState) ||
      checkElementRole("dashletPoolDeleteBtn", elementAuthorizationState) ||
      checkElementRole("dashletPoolEnableBtn", elementAuthorizationState) ||
      checkElementRole("dashletPoolDisableBtn", elementAuthorizationState) ||
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
  // =============  End :: States  =============

  // ============= Start :: Event Handlers =============

  useEffect(() => {
    prepareTableData();
  }, [loadingRoles]);

  //Sehrish Naseer Dated:04/10/22 -----Code Ended Authorization

  const closeEditForm = () => {
    handleShowFormNew(false);
    setEditMode(initialEditValue);
    setDashletState(initialStateValue);
  };

  const handleDisable = async (dis_id) => {
    try {
      const response = await DashletPoolService.disableDashletPool(dis_id, {
        MODIFIED_BY: Cookie.get(process.env.USER),
      });
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
      const response = await DashletPoolService.enableDashletPool(enable_id, {
        MODIFIED_BY: Cookie.get(process.env.USER),
      });

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
    setDashletState({
      ...dashletState,
      [name]: value,
    });
  };

  const handleSelectChange = (option, htmlElement) => {
    setDashletState({
      ...dashletState,
      [htmlElement.name]: option.value,
    });
  };

  const handleShowFormNew = () => {
    setShowFormState(!showFormState);
  };

  const deleteFun = async () => {
    try {
      const response = await DashletPoolService.deleteDashletPool(
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

  const handleEdit = (DASHLET_POOL_ID, DASHLET_NAME, DASHLET_ID, TYPE) => {
    setShowFormState(true);
    setEditMode({ isEdit: true, id: DASHLET_POOL_ID });
    setDashletState({
      DASHLET_NAME,
      DASHLET_ID,
      TYPE,
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
      const isStateNull = Object.values(dashletState).some((value) => {
        // 👇️ check for multiple conditions
        if (value === null || value === undefined || value === "") {
          return true;
        }
        return false;
      });

      if (isStateNull) {
        toast.warn("Please fill all fields");
        return;
      }
      const res = await DashletPoolService.updateDashletPool(editMode.id, {
        ...dashletState,
        MODIFIED_BY: operator,
      });

      if (response) {
        let jsonRes = await response.json();
        if (jsonRes.status === "SUCCESS") {
          prepareTableData();
          setEditMode(initialEditValue);
          setDashletState(initialStateValue);
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

      const operator = Cookie.get(process.env.USER);

      const isStateNull = Object.values(dashletState).some((value) => {
        // 👇️ check for multiple conditions
        if (value === null || value === undefined || value === "") {
          return true;
        }
        return false;
      });

      if (isStateNull) {
        toast.warn("Please fill all fields");
        return;
      }
      const res = await DashletPoolService.createDashletPool({
        ...dashletState,
        OPERATOR: operator,
      });

      if (response) {
        let jsonRes = await response.json();
        if (jsonRes.status === "SUCCESS") {
          prepareTableData();
          setDashletState(initialStateValue);
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
      let response = await DashletPoolService.listDashletPool();
      if (response) {
        let jsonRes = await response.json();
        let data = [];
        if (jsonRes.status === "SUCCESS") {
          jsonRes.data.forEach((element) => {
            data.push({
              dashlet_pool_id: element.DASHLET_POOL_ID,
              dashlet_id: element.DASHLET_ID,
              dashlet_name: element.DASHLET_NAME,
              dashlet_type: element.TYPE,
              col_actions: (
                <div>
                  {(checkElementRole(
                    "dashletPoolEditBtn",
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
                    "dashletPoolDeleteBtn",
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
                    "dashletPoolDisableBtn",
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
                    "dashletPoolEnableBtn",
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

  const dashletTypes = [
    {
      value: "Table",
      label: "Table",
    },
    {
      value: "Graph",
      label: "Graph",
    },
    {
      value: "Chart",
      label: "Chart",
    },
  ];
  // ============= End :: Event Handlers =============

  return (
    !loadingRoles && (
      <>
        {(checkSectionRole("dashletPoolForm", sectionAuthorizationState) ||
          isAdmin ||
          editMode.isEdit) && (
          <div className="panel panel-inverse card-view">
            <div className="panel-heading">
              <div className="pull-left">
                {editMode.isEdit == true ? (
                  <h6 className="panel-title text-white weight-400 font-16">
                    Update Dashlet Form
                  </h6>
                ) : (
                  <h6 className="panel-title text-white weight-400 font-16">
                    Dashlet Creation Form
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
                          Dashlet Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Dashlet Name"
                          value={dashletState.DASHLET_NAME}
                          onChange={handleInputChange}
                          name="DASHLET_NAME"
                        ></input>
                      </div>
                      <div className="form-group col-md-6 col-sm-12">
                        <label className="control-label mb-1 text-left font-14 weight-500">
                          Dashlet Type
                        </label>
                        <Select
                          instanceId={1}
                          options={dashletTypes}
                          onChange={handleSelectChange}
                          name="TYPE"
                          value={dashletTypes.find(
                            (item) => item.value == dashletTypeState.TYPE
                          )}
                        />
                      </div>
                      <div className="form-group col-md-6 col-sm-12">
                        <label className="control-label mb-1 text-left font-14 weight-500">
                          Enter Dashlet to be created
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Dashlet ID"
                          value={dashletState.DASHLET_ID}
                          onChange={handleInputChange}
                          name="DASHLET_ID"
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
                          style={{ background: "#284E93" }}
                        >
                          Update{" "}
                        </button>
                      ) : (
                        <button
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
          checkSectionRole("dashletPoolForm", sectionAuthorizationState)) && (
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
