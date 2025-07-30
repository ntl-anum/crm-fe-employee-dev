/**
 * @filename Section.js
 * @desc This file contains UI for CRUD operations of Section
 * @auth Sehrish Naseer
 * @date 18/10/2023
 */

// ============= Start :: Imports =============
import React, { useEffect, useState, useRef } from "react";
import Cookie from "js-cookie";
import Select from "react-select";
import ReactTable from "../../components/Table/ReactTable";
import PrimaryModal from "../../components/Model/PrimaryModal";
import MaxCharacterLimit from "@/components/MaxCharacterLimit";
import { SectionService } from "../../services/AuthorizationService/SectionManagement";
import { toast } from "react-toastify";
import CircularLoader from "../../components/Loader/circularLoader";
import { colourStyles } from "../../components/SelectStyleComponent";
import PanelHeading from "../../components/PanelHeading";
import { APP_ROUTES } from "../../helpers/enums";
import Edit from "../../public/dist/img/Edit.svg";
import Trash from "../../public/dist/img/Trash.svg";
import Disable from "../../public/dist/img/Disable.svg";
import Enable from "../../public/dist/img/Enable.svg";
import Image from "next/image";
import Router from "next/router";
import { useActiveSections } from "../../helpers/react_query_functions";
import { getOperatorFromCookie } from "../../helpers/cookie-parser";
import { handleEnterKeyPress } from "../../constants/enterKeyPress";
import useAuthorizedRoles from "@/hooks/useAuthorizedRoles";
import { checkElementRole, checkSectionRole } from "@/helpers/auth-helpers";
import { ColorRing } from "react-loader-spinner";
import { ONLY_ALPHABETS_PATTERN } from "@/constants/regexPatterns";
// ============= End :: Imports =============

// ============= Start :: Initial States =============
// Initial values of form
const initialStateValue = {
  SECTION_NAME: "",
  KEY: "SUBMODULE",
  VALUE: "",
};

// Initial value to check if form is in edit mode
// or new mode and tracking id of being edited userRights
const initialEditValue = {
  isEdit: false,
  id: null,
};
// ============= End :: Initial States =============

// ============= Start :: Component =============
export default function Section({ id }) {
  // ============= Start :: States =============
  const [showLoader, setShowLoader] = useState(false);
  const [loadingSectionDetails, setLoadingSectionDetails] = useState(false);
  const [showFormState, setShowFormState] = useState(true);
  const [sectionState, setSectionState] = useState(initialStateValue);
  const [editMode, setEditMode] = useState(initialEditValue);
  const {
    authorizationState,
    sectionAuthorizationState,
    elementAuthorizationState,
    isAdmin,
    getAuthorizedRoles,
    loadingRoles,
  } = useAuthorizedRoles();
  const [valueOptions, setValueOptions] = useState([]);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    id: null,
  });
  const [tableDataState, setTableDataState] = useState([]);
  const [userRightsDataState, setSectionDataState] = useState([]);
  const [isMaxLengthExceeded, setIsMaxLengthExceeded] = useState(false);
  const { data: dataClientActiveSections } = useActiveSections();
  useEffect(() => {
    getAuthorizedRoles(id);
  }, [id]);
  const cols = React.useMemo(
    () => [
      {
        Header: "section name",
        accessor: "col_section_name",
      },

      {
        Header: "key",
        accessor: "col_key",
      },
      {
        Header: "value",
        accessor: "col_value",
      },
      {
        Header: "record status",
        accessor: "record_status",
      },
      {
        Header: "Last Updated By",
        accessor: "col_last_updated_by",
      },

      ...(checkElementRole("sectionEditBtn", elementAuthorizationState) ||
      checkElementRole("sectionDeleteBtn", elementAuthorizationState) ||
      checkElementRole("sectionEnableBtn", elementAuthorizationState) ||
      checkElementRole("sectionDisableBtn", elementAuthorizationState) ||
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

  // =============  End :: States  =============

  // ============= Start :: Event Handlers =============

  //Sehrish Naseer Dated:03/10/22 -----Code Started Authorization

  useEffect(() => {
    prepareTableData();
  }, [loadingRoles]);

  //Sehrish Naseer Dated:03/10/22 -----Code Ended Authorization

  useEffect(() => {
    if (dataClientActiveSections?.data) {
      cookSectionOptions(dataClientActiveSections.data);
    }
  }, [dataClientActiveSections]);

  const cookSectionOptions = async (data) => {
    let options = [{ value: "", label: "Please Select...", isDisabled: true }];
    data.length > 0 &&
      data.forEach((element) => {
        options.push({
          value: +element.SUBMODULE_ID,
          label: element.SUBMODULE_NAME,
        });
      });
    setValueOptions(options);
  };

  const closeEditForm = () => {
    setIsMaxLengthExceeded(null);
    handleShowFormNew(false);
    setEditMode(initialEditValue);
    setSectionState(initialStateValue);
  };

  const handleDisable = async (dis_id) => {
    try {
      setShowLoader(true);
      const response = await SectionService.disableSection(dis_id, {
        MODIFIED_BY: getOperatorFromCookie(),
      });
      if (response) {
        const jsonRes = await response.json();
        if (jsonRes.status === "SUCCESS") {
          prepareTableData();
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
      setShowLoader(false);
    } catch (error) {
      console.log(error);
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const handleEnable = async (enable_id) => {
    try {
      setShowLoader(true);
      const response = await SectionService.enableSection(enable_id, {
        MODIFIED_BY: getOperatorFromCookie(),
      });
      if (response) {
        const jsonRes = await response.json();

        if (jsonRes.status === "SUCCESS") {
          // TODO : Reloading Table
          prepareTableData();

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
      if (name === "SECTION_NAME" && !ONLY_ALPHABETS_PATTERN.test(value))
        return;

      setSectionState({
        ...sectionState,
        [name]: value,
      });
      setIsMaxLengthExceeded(null);
    } else {
      setIsMaxLengthExceeded(name);
    }
  };

  const handleSelectChange = async (option, htmlElement) => {
    if (htmlElement.name === "KEY") {
      setSectionState({
        ...sectionState,
        [htmlElement.name]: option.value,
        VALUE: "",
      });
    } else {
      setSectionState({
        ...sectionState,
        [htmlElement.name]: option.value,
      });
    }
  };

  const handleShowFormNew = () => {
    setShowFormState(!showFormState);
  };

  const deleteFun = async () => {
    try {
      setShowLoader(true);
      const response = await SectionService.deleteSection(deleteModal.id, {
        MODIFIED_BY: getOperatorFromCookie(),
      });
      if (response) {
        const jsonRes = await response.json();

        if (jsonRes.status === "SUCCESS") {
          setTableDataState(
            userRightsDataState.filter((row) => row.id !== deleteModal.id)
          );
          setSectionDataState(
            userRightsDataState.filter((row) => row.id !== deleteModal.id)
          );

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
      setShowLoader(false);
      handleDel();
    } catch (error) {
      console.log(error);
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const handleEdit = async (SECTION_NAME, KEY, VALUE, SECTION_ID) => {
    setShowFormState(true);
    setIsMaxLengthExceeded(null);

    setEditMode({ isEdit: true, id: SECTION_ID });
    setSectionState({
      SECTION_NAME,
      KEY,
      VALUE,
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
        const updatePayLoad = {
          SECTION_NAME: sectionState.SECTION_NAME,
          KEY: sectionState.KEY,
          VALUE: parseInt(sectionState.VALUE),
          MODIFIED_BY: operator,
        };

        const res = await SectionService.updateSection(
          editMode.id,
          updatePayLoad
        );
        if (res) {
          const jsonRes = await res.json();
          if (jsonRes.status === "SUCCESS") {
            setIsMaxLengthExceeded(null);
            setShowLoader(false);
            prepareTableData();
            setEditMode(initialEditValue);
            setSectionState(initialStateValue);
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

  const handleNewSectionFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const fieldsAreValid = validateFields();
      if (fieldsAreValid) {
        setShowLoader(true);

        const operator = getOperatorFromCookie();

        sectionState.VALUE = parseInt(sectionState.VALUE);

        const res = await SectionService.createSection({
          ...sectionState,
          OPERATOR: operator,
        });
        if (res) {
          const jsonRes = await res.json();

          if (jsonRes.status === "SUCCESS") {
            setIsMaxLengthExceeded(null);
            setShowLoader(false);
            setSectionState(initialStateValue);
            handleShowFormNew(false);
            // Show Success Toast
            toast.success(jsonRes.message);
            prepareTableData();
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
    const { SECTION_NAME, VALUE } = sectionState;
    if (!SECTION_NAME) {
      toast.error("Enter Section Name");
      return false;
    } else if (SECTION_NAME.length > 100) {
      toast.error("Maximum 100 characters allowed for Section Name");
      return false;
    } else if (!VALUE) {
      toast.error("Select a Level Name");
      return false;
    } else {
      return true;
    }
  };

  const prepareTableData = async () => {
    //getting all active userRights from backend
    setLoadingSectionDetails(true);
    let response = await SectionService.listSectionDetails();
    if (response) {
      const jsonRes = await response.json();
      let data = [];
      if (jsonRes.status === "SUCCESS") {
        jsonRes.data.forEach((element, i) => {
          data.push({
            SR: i + 1,
            id: element.SECTION_ID,
            col_section_name: element.SECTION_NAME,
            col_key: element.KEY,
            col_value: element.VALUE_NAME,
            record_status:
              element.RECORD_STATUS === "active" ? "Enabled" : "Disabled",
            col_last_updated_by: element.MODIFIED_BY
              ? element.MODIFIED_BY
              : element.OPERATOR,

            col_actions: (
              <div>
                {(checkElementRole(
                  "sectionEditBtn",
                  elementAuthorizationState
                ) ||
                  isAdmin) && (
                  <>
                    <a
                      style={{ cursor: "pointer" }}
                      className="text-dark p-0"
                      onClick={() =>
                        handleEdit(
                          element.SECTION_NAME,
                          element.KEY,
                          element.VALUE,
                          element.SECTION_ID
                        )
                      }
                    >
                      <Image title="Edit" src={Edit}></Image>
                    </a>
                    &nbsp;
                  </>
                )}
                {(checkElementRole(
                  "sectionDeleteBtn",
                  elementAuthorizationState
                ) ||
                  isAdmin) && (
                  <>
                    <a
                      style={{ cursor: "pointer" }}
                      className="text-danger p-0"
                      onClick={() => handleDel(element.SECTION_ID)}
                    >
                      <Image title="Delete" src={Trash}></Image>
                    </a>
                    &nbsp;
                  </>
                )}

                {(checkElementRole(
                  "sectionDisableBtn",
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
                      onClick={() => handleDisable(element.SECTION_ID)}
                    >
                      <Image title="Disable" src={Disable}></Image>
                    </a>
                  ))}

                {(checkElementRole(
                  "sectionEnableBtn",
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
                      onClick={() => handleEnable(element.SECTION_ID)}
                    >
                      <Image title="Enable" src={Enable}></Image>
                    </a>
                  ))}
              </div>
            ),
          });
        });
      } else {
        toast.error(jsonRes.message);
      }
      setSectionDataState(data);
      setTableDataState(data);
      setLoadingSectionDetails(false);
    } else {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  // ============= End :: Event Handlers =============

  return (
    !loadingRoles && (
      <>
        {showLoader && <CircularLoader />}

        {(checkSectionRole("sectionForm", sectionAuthorizationState) ||
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
                    Update Section Form
                  </h6>
                ) : (
                  <h6 className="panel-title text-white weight-400 font-16">
                    Section Creation Form
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
                    handleNewSectionFormSubmit(e);
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
                          Section Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Section name"
                          value={sectionState.SECTION_NAME}
                          onChange={handleInputChange}
                          name="SECTION_NAME"
                          data-maxchars="100"
                        ></input>
                        {isMaxLengthExceeded === "SECTION_NAME" && (
                          <MaxCharacterLimit characters={100} />
                        )}
                      </div>

                      <div className="form-group col-md-6">
                        <label className="required control-label mb-1 text-left font-14 weight-500">
                          Level
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="KEY"
                          value={sectionState.KEY}
                          readonly
                        ></input>
                      </div>

                      <div className="form-group col-md-6">
                        <label className="required control-label mb-1 text-left font-14 weight-500">
                          Level Name
                        </label>
                        <Select
                          instanceId={2}
                          options={valueOptions}
                          onChange={handleSelectChange}
                          name="VALUE"
                          value={valueOptions.find(
                            (item) => item.value == sectionState.VALUE
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
          checkSectionRole("sectionForm", sectionAuthorizationState)) && (
          <div className="panel panel-inverse card-view">
            <PanelHeading text="Available Sections" />
            <div className="panel-wrapper collapse in">
              <div className="panel-body">
                {loadingSectionDetails ? (
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
