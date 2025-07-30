/**
 * @filename UserRights.js
 * @desc This file contains UI for CRUD operations of UserRights
 * @auth Sehrish Naseer
 * @date 20/09/2022
 */

// ============= Start :: Imports =============
import React, { useEffect, useState, useRef } from "react";
import Cookie from "js-cookie";
import Select from "react-select";
import ReactTable from "../../components/Table/ReactTable";
import PrimaryModal from "../../components/Model/PrimaryModal";
import { AppService } from "../../services/AuthorizationService/AppManagement";
import { ModuleService } from "../../services/AuthorizationService/ModuleManagement";
import { SubModuleService } from "../../services/AuthorizationService/SubmoduleManagement";
import { RolesService } from "../../services/AuthorizationService/RolesManagement";

import { DeptDesignationService } from "../../services/UtilityService/DeptDesignation";
import { ProfessionalInfoService } from "../../services/UtilityService/ProfessionalInfo";
import { SectionService } from "../../services/AuthorizationService/SectionManagement";
import { ElementService } from "../../services/AuthorizationService/ElementManagement";
import { toast } from "react-toastify";
import { useActiveRoles } from "../../helpers/react_query_functions";
import CircularLoader from "../../components/Loader/circularLoader";
import {
  colourStyles,
  customTheme,
} from "../../components/SelectStyleComponent";
import PanelHeading from "../../components/PanelHeading";
import { APP_ROUTES } from "../../helpers/enums";
import Edit from "../../public/dist/img/Edit.svg";
import Trash from "../../public/dist/img/Trash.svg";
import Disable from "../../public/dist/img/Disable.svg";
import Enable from "../../public/dist/img/Enable.svg";
import Image from "next/image";
import { getOperatorFromCookie } from "../../helpers/cookie-parser";
import Router from "next/router";
import { handleEnterKeyPress } from "../../constants/enterKeyPress";
import useAuthorizedRoles from "@/hooks/useAuthorizedRoles";
import { checkElementRole, checkSectionRole } from "@/helpers/auth-helpers";
import { UserRightsService } from "@/services/AuthorizationService/UserRightsManagement";
import { ColorRing } from "react-loader-spinner";
// ============= End :: Imports =============

// ============= Start :: Initial States =============
// Initial values of form
const initialStateValue = {
  KEY: "",
  VALUE: "",
  RIGHT_LEVEL_KEY: "",
  RIGHT_LEVEL_VALUE: "",
  ROLE_ID: "",
  NEXT_LEVEL_RIGHTS_REQUIRED: "NO",
  FILTER_BY_MODULE: "",
  FILTER_BY_SUBMODULE: "",
};

// Initial values of Table Search Form
const initialSearchStateValue = {
  SEARCH_DEPARTMENT: "",
  SEARCH_DESIGNATION: "",
  SEARCH_SUBDEPARTMENT: "",
  SEARCH_TEAM: "",
  SEARCH_INDIVIDUAL: "",
};

// Initial value to check if form is in edit mode
// or new mode and tracking id of being edited userRights
const initialEditValue = {
  isEdit: false,
  id: null,
};

const initialOptionsArray = [
  { value: "", label: "Please Select...", isDisabled: true },
];
// ============= End :: Initial States =============

// ============= Start :: Component =============
export default function UserRights({ id }) {
  // ============= Start :: States =============
  const {
    isLoading,
    isError,
    error,
    data: dataClientActiveRoles,
    isFetching,
  } = useActiveRoles();
  const [showLoader, setShowLoader] = useState(false);
  const [showFormState, setShowFormState] = useState(true);
  const [userRightsState, setUserRightsState] = useState(initialStateValue);
  const [editMode, setEditMode] = React.useState(initialEditValue);
  const {
    authorizationState,
    sectionAuthorizationState,
    elementAuthorizationState,
    isAdmin,
    getAuthorizedRoles,
    loadingRoles,
  } = useAuthorizedRoles();
  const [rolesOption, setRolesOption] = useState([]);
  const [filteredRolesOption, setFilteredRolesOption] = useState([]);
  const [valueOptions, setValueOptions] = useState([]);
  const [rightLevelValueOptions, setRightLevelValueOptions] = useState([]);
  const [loadingUserRightDetails, setLoadingUserRightDetails] = useState(false);
  const [deleteModal, setDeleteModal] = React.useState({
    show: false,
    id: null,
  });
  const [tableDataState, setTableDataState] = useState([]);
  const [userRightsDataState, setUserRightsDataState] = useState([]);

  const [searchRightsState, setSearchRightsState] = useState(
    initialSearchStateValue
  );
  const [searchDeptOptions, setSearchDeptOptions] = useState([]);
  const [searchSubDeptOptions, setSearchSubDeptOptions] = useState([]);
  const [searchDesignationOptions, setSearchDesignationOptions] = useState([]);
  const [searchTeamOptions, setSearchTeamOptions] = useState([]);
  const [searchIndividualOptions, setSearchIndividualOptions] = useState([]);
  const [moduleOptions, setModuleOptions] = useState([]);
  const [subModuleOptions, setSubModuleOptions] = useState([]);
  const levelOptions = [
    ...initialOptionsArray,
    { value: "APP", label: "APP" },
    { value: "MODULE", label: "MODULE" },
    { value: "SUBMODULE", label: "SUBMODULE" },
    { value: "SECTION", label: "SECTION" },
    { value: "ELEMENT", label: "ELEMENT" },
  ];

  const rightLevelOptions = [
    ...initialOptionsArray,
    { value: "INDIVIDUAL", label: "INDIVIDUAL" },
    { value: "DESIGNATION", label: "DESIGNATION" },
    { value: "SUBDEPARTMENT", label: "SUBDEPARTMENT" },
    { value: "DEPARTMENT", label: "DEPARTMENT" },
    { value: "TEAM", label: "TEAM" },
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
        Header: "right level",
        accessor: "col_right_level",
      },
      {
        Header: "right level name",
        accessor: "col_right_level_name",
      },
      {
        Header: "role",
        accessor: "col_role",
      },
      {
        Header: "record status",
        accessor: "record_status",
      },
      {
        Header: "Last Updated By",
        accessor: "col_last_updated_by",
      },
      // {
      //   Header: "next level rights required",
      //   accessor: "col_next_level_rights_required",
      // },
      ...(checkElementRole("userRightsEditBtn", elementAuthorizationState) ||
      checkElementRole("userRightsDeleteBtn", elementAuthorizationState) ||
      checkElementRole("userRightsEnableBtn", elementAuthorizationState) ||
      checkElementRole("userRightsDisableBtn", elementAuthorizationState) ||
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

  const cookRolesOptions = (rawRolesData) => {
    let options = [{ value: "", label: "Please Select...", isDisabled: true }];
    rawRolesData.forEach((element) => {
      options.push({
        value: +element.ROLE_ID,
        label: element.ROLE_KEY,
      });
    });
    setRolesOption(options);
    setFilteredRolesOption(options);
  };

  // =============  End :: States  =============

  // ============= Start :: Event Handlers =============

  //Sehrish Naseer Dated:03/10/22 -----Code Started Authorization

  //listing all the active apps
  const getAllDepartments = async () => {
    try {
      const response = await DeptDesignationService.listDepartments();

      if (response) {
        const res = await response.json();
        const data = res.data;

        let options = [...initialOptionsArray];
        data.forEach((element) => {
          options.push({
            value: element.department,
            label: element.department,
          });
        });

        setSearchDeptOptions(options);
      } else {
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
    } catch (error) {
      console.log(error);
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  useEffect(() => {
    getAllDepartments();
  }, []);

  useEffect(() => {
    // getRoles();
    prepareTableData();
  }, [loadingRoles]);

  useEffect(() => {
    // getApps();
    if (dataClientActiveRoles?.data) {
      cookRolesOptions(dataClientActiveRoles.data);
    }
  }, [dataClientActiveRoles]);

  //Sehrish Naseer Dated:03/10/22 -----Code Ended Authorization

  const closeEditForm = () => {
    handleShowFormNew(false);
    setEditMode(initialEditValue);
    setUserRightsState(initialStateValue);
  };

  const handleDisable = async (dis_id) => {
    setShowLoader(true);
    const response = await UserRightsService.disableUserRights(dis_id, {
      MODIFIED_BY: getOperatorFromCookie(),
    });
    if (response) {
      const jsonRes = await response.json();
      if (jsonRes.status === "SUCCESS") {
        // TODO : Reloading Table
        prepareTableData();
        setSearchRightsState(initialSearchStateValue);
        toast.success(jsonRes.message);
      } else {
        toast.error(jsonRes.message);
      }
    } else {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
    setShowLoader(false);
  };

  const handleEnable = async (enable_id) => {
    setShowLoader(true);
    const response = await UserRightsService.enableUserRights(enable_id, {
      MODIFIED_BY: getOperatorFromCookie(),
    });
    if (response) {
      const jsonRes = await response.json();

      if (jsonRes.status === "SUCCESS") {
        // TODO : Reloading Table
        prepareTableData();
        setSearchRightsState(initialSearchStateValue);
        toast.success(jsonRes.message);
      } else {
        toast.error(jsonRes.message);
      }
    } else {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
    setShowLoader(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserRightsState({
      ...userRightsState,
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

      if (key === "APP") {
        const response = await AppService.listActiveApps();
        const res = await response.json();
        const data = res.data;

        data.forEach((element) => {
          options.push({
            value: +element.APP_ID,
            label: element.APP_NAME,
          });
        });
      } else if (key === "MODULE") {
        const response = await ModuleService.listActiveModule();
        const res = await response.json();
        const data = res.data;

        data.forEach((element) => {
          options.push({
            value: +element.MODULE_ID,
            label: element.MODULE_NAME,
          });
        });
      } else if (key === "SUBMODULE") {
        const response = await SubModuleService.listActiveSubModule();
        const res = await response.json();

        const data = res.data;

        data.forEach((element) => {
          options.push({
            value: +element.SUBMODULE_ID,
            label: element.SUBMODULE_NAME,
          });
        });
      }

      setValueOptions(options);
    } catch (error) {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const handleSelectRightLevelKeyChange = async (option, htmlElement) => {
    handleSelectChange(option, htmlElement);
    try {
      const key = option.value;
      let options = [
        { value: "", label: "Please Select...", isDisabled: true },
      ];
      if (key === "INDIVIDUAL") {
        options = [];
        const response = await ProfessionalInfoService.listIndividuals();
        const res = await response.json();
        const data = res.data;

        data.forEach((element) => {
          options.push({
            value: element.EMPID,
            label: element.EMPID,
          });
        });
      } else if (key === "DESIGNATION") {
        const response = await DeptDesignationService.listDesignations();
        const res = await response.json();
        const data = res;

        data.data.forEach((element) => {
          options.push({
            value: element.designation,
            label: element.designation,
          });
        });
      } else if (key === "SUBDEPARTMENT") {
        const response = await DeptDesignationService.listSubDepartments();
        const res = await response.json();

        const data = res.data;

        data.forEach((element) => {
          options.push({
            value: element.subdept,
            label: element.subdept,
          });
        });
      } else if (key === "DEPARTMENT") {
        const response = await DeptDesignationService.listDepartments();
        const res = await response.json();
        const data = res.data;

        data.forEach((element) => {
          options.push({
            value: element.department,
            label: element.department,
          });
        });
      } else if (key === "TEAM") {
        const response = await ProfessionalInfoService.listTeams();
        const res = await response.json();
        const data = res.data;

        data.forEach((element) => {
          options.push({
            value: element.organizationalunit,
            label: element.organizationalunit,
          });
        });
      }
      setRightLevelValueOptions(options);
    } catch (error) {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const getDesignationsByDepartment = async (department) => {
    const response = await DeptDesignationService.findDesignationsByDepartment(
      department
    );

    if (response) {
      const res = await response.json();
      if (res.status === "SUCCESS") {
        const data = res.data;

        let options = [
          { value: "", label: "Please Select...", isDisabled: true },
        ];

        data.forEach((element) => {
          options.push({
            value: element,
            label: element,
          });
        });

        setSearchDesignationOptions(options);
      } else {
        toast.error(res.message);
      }
    } else {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const getSubDeptsByDepartment = async (department) => {
    const response = await DeptDesignationService.getDepartmentSubdepartments(
      department
    );

    if (response) {
      const res = await response.json();
      if (res.status === "SUCCESS") {
        const data = res.data;

        let options = [
          { value: "", label: "Please Select...", isDisabled: true },
        ];

        data.forEach((element) => {
          options.push({
            value: element,
            label: element,
          });
        });

        setSearchSubDeptOptions(options);
      } else {
        toast.error(res.message);
      }
    } else {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const getTeamsBySubDepartment = async (subDept) => {
    const response = await ProfessionalInfoService.getSubDepartmentTeams(
      subDept
    );

    if (response) {
      const res = await response.json();
      if (res.status === "SUCCESS") {
        const data = res.data;

        let options = [
          { value: "", label: "Please Select...", isDisabled: true },
        ];

        data.forEach((element) => {
          options.push({
            value: element,
            label: element,
          });
        });

        setSearchTeamOptions(options);
      } else {
        toast.error(res.message);
      }
    } else {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const getIndividualsByTeamDesignation = async (team, designation) => {
    const response =
      await ProfessionalInfoService.getIndividualsByTeamDesignation({
        TEAM: team,
        DESIGNATION: designation,
      });

    if (response) {
      const res = await response.json();
      if (res.status === "SUCCESS") {
        const data = res.data;

        let options = [
          { value: "", label: "Please Select...", isDisabled: true },
        ];

        data.forEach((element) => {
          options.push({
            value: element,
            label: element,
          });
        });

        setSearchIndividualOptions(options);
      } else {
        toast.error(res.message);
        setSearchIndividualOptions([]);
      }
    } else {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const handleMultiChange = (options) => {
    setUserRightsState({
      ...userRightsState,
      RIGHT_LEVEL_VALUE: options,
    });
  };

  const handleSelectChange = async (option, htmlElement) => {
    if (htmlElement.name === "KEY") {
      let roleId = userRightsState.ROLE_ID;
      const modulesOptionArr = [
        { value: "", label: "Please Select...", isDisabled: true },
      ];
      if (option.value === "SECTION") {
        setSubModuleOptions(initialOptionsArray);
        setRolesOption(filteredRolesOption);
        let sectionRoleId = filteredRolesOption.find(
          (item) => item.label === "Section Admin"
        );
        if (sectionRoleId) {
          roleId = sectionRoleId.value;
        }
        let activeModulesRes =
          await ModuleService.getModulesWithSectionRights();
        const activeModulesJsonRes = await activeModulesRes.json();
        const activeModulesData = activeModulesJsonRes.data;
        activeModulesData.forEach((element) => {
          modulesOptionArr.push({
            value: +element.MODULE_ID,
            label: element.MODULE_NAME,
          });
        });

        setModuleOptions(modulesOptionArr);

        setUserRightsState({
          ...userRightsState,
          [htmlElement.name]: option.value,
          FILTER_BY_MODULE: "",
          FILTER_BY_SUBMODULE: "",
          VALUE: "",
          ROLE_ID: roleId,
        });
      } else if (option.value === "ELEMENT") {
        setSubModuleOptions(initialOptionsArray);
        setRolesOption(filteredRolesOption);
        let elementRoleId = filteredRolesOption.find(
          (item) => item.label === "Element Admin"
        );
        if (elementRoleId) {
          roleId = elementRoleId.value;
        }
        let activeModulesRes =
          await ModuleService.getModulesWithElementRights();
        const activeModulesJsonRes = await activeModulesRes.json();
        const activeModulesData = activeModulesJsonRes.data;
        activeModulesData.forEach((element) => {
          modulesOptionArr.push({
            value: +element.MODULE_ID,
            label: element.MODULE_NAME,
          });
        });

        setModuleOptions(modulesOptionArr);

        setUserRightsState({
          ...userRightsState,
          [htmlElement.name]: option.value,
          FILTER_BY_MODULE: "",
          FILTER_BY_SUBMODULE: "",
          VALUE: "",
          ROLE_ID: roleId,
        });
      } else {
        setRolesOption(
          filteredRolesOption.filter(
            (roleOption) =>
              !["Element Admin", "Section Admin"].includes(roleOption.label)
          )
        );
        setUserRightsState({
          ...userRightsState,
          [htmlElement.name]: option.value,
          VALUE: "",
          ROLE_ID: "",
        });
      }
    } else if (htmlElement.name === "RIGHT_LEVEL_KEY") {
      setUserRightsState({
        ...userRightsState,
        [htmlElement.name]: option.value,
        RIGHT_LEVEL_VALUE: "",
      });
    } else if (htmlElement.name === "FILTER_BY_MODULE") {
      setUserRightsState({
        ...userRightsState,
        [htmlElement.name]: option.value,
        FILTER_BY_SUBMODULE: "",
        VALUE: "",
      });
      const submodulesOptionArr = [
        { value: "", label: "Please Select...", isDisabled: true },
      ];
      const res = await SubModuleService.getSubmodulesByModuleId(+option.value);
      const jsonRes = await res.json();

      jsonRes.data.forEach((element) => {
        if (
          userRightsState.KEY === "SECTION" &&
          element.SECTION_LEVEL_RIGHTS_REQUIRED === "YES"
        ) {
          submodulesOptionArr.push({
            value: +element.SUBMODULE_ID,
            label: element.SUBMODULE_NAME,
          });
        } else if (
          userRightsState.KEY === "ELEMENT" &&
          element.ELEMENT_LEVEL_RIGHTS_REQUIRED === "YES"
        ) {
          submodulesOptionArr.push({
            value: +element.SUBMODULE_ID,
            label: element.SUBMODULE_NAME,
          });
        }
      });
      setSubModuleOptions(submodulesOptionArr);
    } else if (htmlElement.name === "FILTER_BY_SUBMODULE") {
      setUserRightsState({
        ...userRightsState,
        [htmlElement.name]: option.value,
        VALUE: "",
      });
      if (userRightsState.KEY === "SECTION") {
        const sectionOptions = [
          { value: "", label: "Please Select...", isDisabled: true },
        ];
        const res = await SectionService.listSectionsBySubModuleId(
          +option.value
        );
        const jsonRes = await res.json();
        if (jsonRes.status === "SUCCESS") {
          jsonRes.data.forEach((element) => {
            sectionOptions.push({
              value: +element.SECTION_ID,
              label: element.SECTION_NAME,
            });
          });
        } else {
          toast.error(jsonRes.message);
        }

        setValueOptions(sectionOptions);
      } else if (userRightsState.KEY === "ELEMENT") {
        const elementOptions = [
          { value: "", label: "Please Select...", isDisabled: true },
        ];

        const res = await ElementService.listElementsBySubModuleId(
          +option.value
        );
        const jsonRes = await res.json();
        if (jsonRes.status === "SUCCESS") {
          jsonRes.data.forEach((element) => {
            elementOptions.push({
              value: +element.ELEMENT_ID,
              label: element.ELEMENT_NAME,
            });
          });
        } else {
          toast.error(jsonRes.message);
        }

        setValueOptions(elementOptions);
      }
    } else {
      setUserRightsState({
        ...userRightsState,
        [htmlElement.name]: option.value,
      });
    }
  };

  const handleSearchChange = async (option, htmlElement) => {
    if (htmlElement.name === "SEARCH_DEPARTMENT") {
      setSearchRightsState({
        ...searchRightsState,
        [htmlElement.name]: option.value,
        SEARCH_DESIGNATION: "",
        SEARCH_SUBDEPARTMENT: "",
        SEARCH_TEAM: "",
        SEARCH_INDIVIDUAL: "",
      });
      if (option.value) {
        getDesignationsByDepartment(option.value);
        getSubDeptsByDepartment(option.value);
      }
    }

    if (htmlElement.name === "SEARCH_DESIGNATION") {
      setSearchRightsState({
        ...searchRightsState,
        [htmlElement.name]: option.value,
        SEARCH_INDIVIDUAL: "",
      });

      if (option.value) {
        getIndividualsByTeamDesignation(
          searchRightsState.SEARCH_TEAM,
          option.value
        );
      }
    }

    if (htmlElement.name === "SEARCH_SUBDEPARTMENT") {
      setSearchRightsState({
        ...searchRightsState,
        [htmlElement.name]: option.value,
        SEARCH_TEAM: "",
        SEARCH_INDIVIDUAL: "",
      });
      if (option.value) {
        getTeamsBySubDepartment(option.value);
      }
    }

    if (htmlElement.name === "SEARCH_TEAM") {
      setSearchRightsState({
        ...searchRightsState,
        [htmlElement.name]: option.value,
        SEARCH_INDIVIDUAL: "",
      });
      if (option.value) {
        getIndividualsByTeamDesignation(
          option.value,
          searchRightsState.SEARCH_DESIGNATION
        );
      }
    }

    if (htmlElement.name === "SEARCH_INDIVIDUAL") {
      setSearchRightsState({
        ...searchRightsState,
        [htmlElement.name]: option.value,
      });
    }

    let searchBy = htmlElement.name.split("_")[1];

    let filteredData = userRightsDataState.filter((item) => {
      if (searchBy === "DEPARTMENT") {
        return (
          item.col_right_level === searchBy &&
          item.col_right_level_name === option.value
        );
      } else if (searchBy === "DESIGNATION" || searchBy === "SUBDEPARTMENT") {
        return (
          (item.col_right_level === searchBy &&
            item.col_right_level_name === option.value) ||
          (item.col_right_level === "DEPARTMENT" &&
            item.col_right_level_name === searchRightsState.SEARCH_DEPARTMENT)
        );
      } else if (searchBy === "TEAM") {
        return (
          (item.col_right_level === searchBy &&
            item.col_right_level_name === option.value) ||
          (item.col_right_level === "DEPARTMENT" &&
            item.col_right_level_name ===
              searchRightsState.SEARCH_DEPARTMENT) ||
          (item.col_right_level === "DESIGNATION" &&
            item.col_right_level_name ===
              searchRightsState.SEARCH_DESIGNATION) ||
          (item.col_right_level === "SUBDEPARTMENT" &&
            item.col_right_level_name ===
              searchRightsState.SEARCH_SUBDEPARTMENT)
        );
      } else if (searchBy === "INDIVIDUAL") {
        return (
          (item.col_right_level === searchBy &&
            item.col_right_level_name === option.value) ||
          (item.col_right_level === "DEPARTMENT" &&
            item.col_right_level_name ===
              searchRightsState.SEARCH_DEPARTMENT) ||
          (item.col_right_level === "DESIGNATION" &&
            item.col_right_level_name ===
              searchRightsState.SEARCH_DESIGNATION) ||
          (item.col_right_level === "SUBDEPARTMENT" &&
            item.col_right_level_name ===
              searchRightsState.SEARCH_SUBDEPARTMENT) ||
          (item.col_right_level === "TEAM" &&
            item.col_right_level_name === searchRightsState.SEARCH_TEAM)
        );
      } else {
      }
    });

    setTableDataState(filteredData);
  };

  const handleShowFormNew = () => {
    setShowFormState(!showFormState);
  };
  const deleteFun = async () => {
    setShowLoader(true);
    const response = await UserRightsService.deleteUserRights(deleteModal.id, {
      MODIFIED_BY: getOperatorFromCookie(),
    });
    if (response) {
      const jsonRes = await response.json();

      if (jsonRes.status === "SUCCESS") {
        prepareTableData();

        setSearchRightsState(initialSearchStateValue);
        toast.success(jsonRes.message);
      } else {
        toast.error(jsonRes.message);
      }
    } else {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
    setShowLoader(false);
    handleDel();
  };

  const handleEdit = async (
    KEY,
    VALUE,
    RIGHT_LEVEL_KEY,
    RIGHT_LEVEL_VALUE,
    ROLE_ID,
    NEXT_LEVEL_RIGHTS_REQUIRED,
    USER_RIGHT_ID
  ) => {
    try {
      setShowFormState(true);
      let keyOptions = [
        { value: "", label: "Please Select...", isDisabled: true },
      ];
      const modulesOptionArr = [
        { value: "", label: "Please Select...", isDisabled: true },
      ];
      let keyData = null;
      let FILTER_BY_MODULE = "";
      let FILTER_BY_SUBMODULE = "";

      if (KEY === "APP") {
        let response = await AppService.listActiveApps();
        const res = await response.json();
        keyData = res.data;
        keyData.forEach((element) => {
          keyOptions.push({
            value: +element.APP_ID,
            label: element.APP_NAME,
          });
        });
      } else if (KEY === "MODULE") {
        let response = await ModuleService.listActiveModule();
        const res = await response.json();
        keyData = res;
        keyData.data.forEach((element) => {
          keyOptions.push({
            value: +element.MODULE_ID,
            label: element.MODULE_NAME,
          });
        });
      } else if (KEY === "SUBMODULE") {
        let response = await SubModuleService.listActiveSubModule();
        const res = await response.json();
        keyData = res.data;
        keyData.forEach((element) => {
          keyOptions.push({
            value: +element.SUBMODULE_ID,
            label: element.SUBMODULE_NAME,
          });
        });
      } else if (KEY === "SECTION") {
        let activeModulesRes =
          await ModuleService.getModulesWithSectionRights();
        const activeModulesJsonRes = await activeModulesRes.json();
        const activeModulesData = activeModulesJsonRes.data;
        activeModulesData.forEach((element) => {
          modulesOptionArr.push({
            value: +element.MODULE_ID,
            label: element.MODULE_NAME,
          });
        });
        setModuleOptions(modulesOptionArr);
        const moduleSubmoduleRes =
          await SubModuleService.getSubmoduleAndModuleBySectionId(VALUE);
        const moduleSubmoduleJsonRes = await moduleSubmoduleRes.json();
        FILTER_BY_MODULE = moduleSubmoduleJsonRes.data?.[0]?.["MODULE_ID"];
        FILTER_BY_SUBMODULE =
          moduleSubmoduleJsonRes.data?.[0]?.["SUBMODULE_ID"];

        const submodulesOptionArr = [
          { value: "", label: "Please Select...", isDisabled: true },
        ];
        const res = await SubModuleService.getSubmodulesByModuleId(
          +FILTER_BY_MODULE
        );
        const jsonRes = await res.json();

        jsonRes.data.forEach((element) => {
          if (element.SECTION_LEVEL_RIGHTS_REQUIRED === "YES") {
            submodulesOptionArr.push({
              value: +element.SUBMODULE_ID,
              label: element.SUBMODULE_NAME,
            });
          }
        });
        setSubModuleOptions(submodulesOptionArr);

        const sectionRes = await SectionService.listSectionsBySubModuleId(
          +FILTER_BY_SUBMODULE
        );
        const jsonSectionRes = await sectionRes.json();
        if (jsonSectionRes.status === "SUCCESS") {
          jsonSectionRes.data.forEach((element) => {
            keyOptions.push({
              value: +element.SECTION_ID,
              label: element.SECTION_NAME,
            });
          });
        } else {
          toast.error(jsonSectionRes.message);
        }
      } else if (KEY === "ELEMENT") {
        let activeModulesRes =
          await ModuleService.getModulesWithElementRights();
        const activeModulesJsonRes = await activeModulesRes.json();
        const activeModulesData = activeModulesJsonRes.data;
        activeModulesData.forEach((element) => {
          modulesOptionArr.push({
            value: +element.MODULE_ID,
            label: element.MODULE_NAME,
          });
        });

        setModuleOptions(modulesOptionArr);

        const moduleSubmoduleRes =
          await SubModuleService.getSubmoduleAndModuleByElementId(VALUE);
        const moduleSubmoduleJsonRes = await moduleSubmoduleRes.json();
        FILTER_BY_MODULE = moduleSubmoduleJsonRes.data?.[0]?.["MODULE_ID"];
        FILTER_BY_SUBMODULE =
          moduleSubmoduleJsonRes.data?.[0]?.["SUBMODULE_ID"];

        const submodulesOptionArr = [
          { value: "", label: "Please Select...", isDisabled: true },
        ];
        const res = await SubModuleService.getSubmodulesByModuleId(
          +FILTER_BY_MODULE
        );
        const jsonRes = await res.json();

        jsonRes.data.forEach((element) => {
          if (element.ELEMENT_LEVEL_RIGHTS_REQUIRED === "YES") {
            submodulesOptionArr.push({
              value: +element.SUBMODULE_ID,
              label: element.SUBMODULE_NAME,
            });
          }
        });
        setSubModuleOptions(submodulesOptionArr);

        const elementRes = await ElementService.listElementsBySubModuleId(
          +FILTER_BY_SUBMODULE
        );
        const elementJsonRes = await elementRes.json();
        if (elementJsonRes.status === "SUCCESS") {
          elementJsonRes.data.forEach((element) => {
            keyOptions.push({
              value: +element.ELEMENT_ID,
              label: element.ELEMENT_NAME,
            });
          });
        } else {
          toast.error(elementJsonRes.message);
        }
      }

      if (["APP", "MODULE", "SUBMODULE"].includes(KEY)) {
        setRolesOption(
          filteredRolesOption.filter(
            (roleOption) =>
              !["Element Admin", "Section Admin"].includes(roleOption.label)
          )
        );
      }

      setValueOptions(keyOptions);

      let rightLevelKeyOptions = [
        { value: "", label: "Please Select...", isDisabled: true },
      ];
      let rightLevelKeyData = null;

      if (RIGHT_LEVEL_KEY === "INDIVIDUAL") {
        let response = await ProfessionalInfoService.listIndividuals();
        const res = await response.json();
        rightLevelKeyData = res.data;
        rightLevelKeyData.forEach((element) => {
          rightLevelKeyOptions.push({
            value: element.EMPID,
            label: element.EMPID,
          });
        });
      } else if (RIGHT_LEVEL_KEY === "DESIGNATION") {
        let response = await DeptDesignationService.listDesignations();
        const res = await response.json();
        rightLevelKeyData = res;
        rightLevelKeyData.data.forEach((element) => {
          rightLevelKeyOptions.push({
            value: element.designation,
            label: element.designation,
          });
        });
      } else if (RIGHT_LEVEL_KEY === "SUBDEPARTMENT") {
        let response = await DeptDesignationService.listSubDepartments();
        const res = await response.json();
        rightLevelKeyData = res.data;
        rightLevelKeyData.forEach((element) => {
          rightLevelKeyOptions.push({
            value: element.subdept,
            label: element.subdept,
          });
        });
      } else if (RIGHT_LEVEL_KEY === "DEPARTMENT") {
        let response = await DeptDesignationService.listDepartments();
        const res = await response.json();
        rightLevelKeyData = res.data;
        rightLevelKeyData.forEach((element) => {
          rightLevelKeyOptions.push({
            value: element.department,
            label: element.department,
          });
        });
      } else if (RIGHT_LEVEL_KEY === "TEAM") {
        let response = await ProfessionalInfoService.listTeams();
        const res = await response.json();
        rightLevelKeyData = res.data;
        rightLevelKeyData.forEach((element) => {
          rightLevelKeyOptions.push({
            value: element.organizationalunit,
            label: element.organizationalunit,
          });
        });
      }

      setRightLevelValueOptions(rightLevelKeyOptions);
      setEditMode({ isEdit: true, id: USER_RIGHT_ID });
      setUserRightsState({
        KEY,
        VALUE,
        RIGHT_LEVEL_KEY,
        RIGHT_LEVEL_VALUE,
        ROLE_ID,
        NEXT_LEVEL_RIGHTS_REQUIRED,
        FILTER_BY_MODULE,
        FILTER_BY_SUBMODULE,
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
        setShowLoader(true);
        const operator = getOperatorFromCookie();
        delete userRightsState.FILTER_BY_MODULE;
        delete userRightsState.FILTER_BY_SUBMODULE;
        userRightsState.ROLE_ID = parseInt(userRightsState.ROLE_ID);
        userRightsState.VALUE = parseInt(userRightsState.VALUE);

        const res = await UserRightsService.updateUserRights(editMode.id, {
          ...userRightsState,
          MODIFIED_BY: operator,
        });
        if (res) {
          const jsonRes = await res.json();
          if (jsonRes.status === "SUCCESS") {
            setShowLoader(false);
            prepareTableData();
            setEditMode(initialEditValue);
            setUserRightsState(initialStateValue);
            setSearchRightsState(initialSearchStateValue);
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

  const handleNewUserRightsFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const fieldsAreValid = validateFields();
      if (fieldsAreValid) {
        const operator = getOperatorFromCookie();
        delete userRightsState.FILTER_BY_MODULE;
        delete userRightsState.FILTER_BY_SUBMODULE;
        userRightsState.ROLE_ID = parseInt(userRightsState.ROLE_ID);
        userRightsState.VALUE = parseInt(userRightsState.VALUE);

        if (userRightsState.RIGHT_LEVEL_KEY === "INDIVIDUAL") {
          setShowLoader(true);
          for (let i = 0; i < userRightsState.RIGHT_LEVEL_VALUE.length; i++) {
            const payLoad = {
              ...userRightsState,
              RIGHT_LEVEL_VALUE: userRightsState.RIGHT_LEVEL_VALUE[i].value,
              OPERATOR: operator,
            };
            const res = await UserRightsService.createUserRights(payLoad);
            if (res) {
              const jsonRes = await res.json();
              if (jsonRes.status === "SUCCESS") {
                toast.success(jsonRes.message);
              } else {
                setShowLoader(false);
                toast.error(
                  Array.isArray(jsonRes?.message)
                    ? jsonRes?.message?.[0]
                    : jsonRes.message
                );
              }
            }
          }

          setShowLoader(false);
          setUserRightsState(initialStateValue);
          handleShowFormNew(false);
          prepareTableData();
          setSearchRightsState(initialSearchStateValue);
        } else {
          setShowLoader(true);
          const res = await UserRightsService.createUserRights({
            ...userRightsState,
            OPERATOR: operator,
          });
          if (res) {
            const jsonRes = await res.json();

            if (jsonRes.status === "SUCCESS") {
              setShowLoader(false);
              setUserRightsState(initialStateValue);
              handleShowFormNew(false);
              // Show Success Toast
              toast.success(jsonRes.message);
              prepareTableData();
              setSearchRightsState(initialSearchStateValue);
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
      }
    } catch (error) {
      console.log(error);
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const validateFields = () => {
    const { KEY, VALUE, RIGHT_LEVEL_KEY, RIGHT_LEVEL_VALUE, ROLE_ID } =
      userRightsState;
    if (!KEY) {
      toast.error("Select a level");
      return false;
    } else if (!VALUE) {
      toast.error("Select level name");
      return false;
    } else if (!RIGHT_LEVEL_KEY) {
      toast.error("Select right level");
      return false;
    } else if (!RIGHT_LEVEL_VALUE || RIGHT_LEVEL_VALUE?.length < 1) {
      toast.error("Select right level name");
      return false;
    } else if (!ROLE_ID) {
      toast.error("Select a role");
      return false;
    } else {
      return true;
    }
  };
  // TODO::Radio Option
  const handleCheckboxChange = (e) => {
    const checkValue = userRightsState[e.target.name] === "YES" ? "NO" : "YES";
    setUserRightsState({
      ...userRightsState,
      [e.target.name]: checkValue,
    });
  };
  const prepareTableData = async () => {
    try {
      //getting all active userRights from backend
      setLoadingUserRightDetails(true);
      let response = await UserRightsService.listUserRightsDetails();
      if (response) {
        const jsonRes = await response.json();
        let data = [];
        if (jsonRes.status === "SUCCESS") {
          jsonRes.data.forEach((element, i) => {
            const roles = element.roles;
            const values = element.values;
            let levelName = null;
            if (element.KEY === "APP") {
              levelName = values?.APP_NAME || "";
            } else if (element.KEY === "MODULE") {
              levelName = values?.MODULE_NAME || "";
            } else if (element.KEY === "SUBMODULE") {
              levelName = values?.SUBMODULE_NAME || "";
            } else if (element.KEY === "SECTION") {
              levelName = values?.SECTION_NAME || "";
            } else if (element.KEY === "ELEMENT") {
              levelName = values?.ELEMENT_NAME || "";
            }

            data.push({
              SR: i + 1,
              id: element.USER_RIGHT_ID,
              col_level: element.KEY,
              col_level_name: levelName,
              col_right_level: element.RIGHT_LEVEL_KEY,
              col_right_level_name: element.RIGHT_LEVEL_VALUE,
              col_role: roles.ROLE_KEY,
              record_status:
                element.RECORD_STATUS === "active" ? "Enabled" : "Disabled",
              col_last_updated_by: element.MODIFIED_BY
                ? element.MODIFIED_BY
                : element.OPERATOR,
              // col_next_level_rights_required: element.NEXT_LEVEL_RIGHTS_REQUIRED,

              col_actions: (
                <div>
                  {(checkElementRole(
                    "userRightsEditBtn",
                    elementAuthorizationState
                  ) ||
                    isAdmin) && (
                    <>
                      <a
                        style={{ cursor: "pointer" }}
                        className="text-dark p-0"
                        onClick={() =>
                          handleEdit(
                            element.KEY,
                            element.VALUE,
                            element.RIGHT_LEVEL_KEY,
                            element.RIGHT_LEVEL_VALUE,
                            element.ROLE_ID,
                            element.NEXT_LEVEL_RIGHTS_REQUIRED,
                            element.USER_RIGHT_ID
                          )
                        }
                      >
                        <Image title="Edit" src={Edit}></Image>
                      </a>
                      &nbsp;
                    </>
                  )}
                  {(checkElementRole(
                    "userRightsDeleteBtn",
                    elementAuthorizationState
                  ) ||
                    isAdmin) && (
                    <>
                      <a
                        style={{ cursor: "pointer" }}
                        className="text-danger p-0"
                        onClick={() => handleDel(element.USER_RIGHT_ID)}
                      >
                        <Image title="Delete" src={Trash}></Image>
                      </a>
                      &nbsp;
                    </>
                  )}

                  {(checkElementRole(
                    "userRightsDisableBtn",
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
                        onClick={() => handleDisable(element.USER_RIGHT_ID)}
                      >
                        <Image title="Disable" src={Disable}></Image>
                      </a>
                    ))}

                  {(checkElementRole(
                    "userRightsEnableBtn",
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
                        onClick={() => handleEnable(element.USER_RIGHT_ID)}
                      >
                        <Image title="Enable" src={Enable}></Image>
                      </a>
                    ))}
                </div>
              ),
            });
          });
        }
        setUserRightsDataState(data);
        setTableDataState(data);
        setLoadingUserRightDetails(false);
      } else {
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
    } catch (error) {
      console.log(error);
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const clearAllFilters = () => {
    setSearchRightsState(initialSearchStateValue);
    setTableDataState(userRightsDataState);
  };
  // ============= End :: Event Handlers =============

  return (
    !loadingRoles && (
      <>
        {(checkSectionRole("userRightsForm", sectionAuthorizationState) ||
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
                    Update User Rights Form
                  </h6>
                ) : (
                  <h6 className="panel-title text-white weight-400 font-16">
                    User Rights Creation Form
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
                    handleNewUserRightsFormSubmit(e);
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
                          instanceId={1}
                          options={levelOptions}
                          onChange={handleSelectKeyChange}
                          name="KEY"
                          value={levelOptions.find(
                            (item) => item.value == userRightsState.KEY
                          )}
                          styles={colourStyles}
                        />
                      </div>

                      {(userRightsState.KEY === "SECTION" ||
                        userRightsState.KEY === "ELEMENT") && (
                        <>
                          <div className="form-group col-md-6">
                            <label className="required control-label mb-1 text-left font-14 weight-500">
                              Filter By Module
                            </label>
                            <Select
                              // className="form-control"
                              options={moduleOptions}
                              onChange={handleSelectChange}
                              styles={colourStyles}
                              name="FILTER_BY_MODULE"
                              value={moduleOptions.find(
                                (item) =>
                                  item.value == userRightsState.FILTER_BY_MODULE
                              )}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label className="required control-label mb-1 text-left font-14 weight-500">
                              Filter By SubModule
                            </label>
                            <Select
                              // className="form-control"
                              options={subModuleOptions}
                              onChange={handleSelectChange}
                              styles={colourStyles}
                              name="FILTER_BY_SUBMODULE"
                              value={subModuleOptions.find(
                                (item) =>
                                  item.value ==
                                  userRightsState.FILTER_BY_SUBMODULE
                              )}
                            />
                          </div>
                        </>
                      )}

                      <div className="form-group col-md-6">
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
                            (item) => item.value == userRightsState.VALUE
                          )}
                          styles={colourStyles}
                          isOptionDisabled={(option) => option.isDisabled}
                        />
                      </div>

                      <div className="form-group col-md-6 col-sm-12">
                        <label className="required control-label mb-1 text-left font-14 weight-500">
                          Right Level
                        </label>
                        <Select
                          // className="form-control"
                          instanceId={3}
                          options={rightLevelOptions}
                          onChange={handleSelectRightLevelKeyChange}
                          name="RIGHT_LEVEL_KEY"
                          value={rightLevelOptions.find(
                            (item) =>
                              item.value == userRightsState.RIGHT_LEVEL_KEY
                          )}
                          styles={colourStyles}
                        />
                      </div>
                      <div className="form-group col-md-6 col-sm-12">
                        <label className="required control-label mb-1 text-left font-14 weight-500">
                          Right Level Name
                        </label>

                        {!editMode.isEdit &&
                        userRightsState.RIGHT_LEVEL_KEY === "INDIVIDUAL" ? (
                          <Select
                            placeholder="Please Select..."
                            isMulti
                            options={rightLevelValueOptions}
                            value={userRightsState.RIGHT_LEVEL_VALUE}
                            onChange={handleMultiChange}
                            name="RIGHT_LEVEL_VALUE"
                            isOptionDisabled={(option) => option.disabled}
                            theme={customTheme}
                          />
                        ) : (
                          <Select
                            // className="form-control"
                            instanceId={4}
                            options={rightLevelValueOptions}
                            onChange={handleSelectChange}
                            name="RIGHT_LEVEL_VALUE"
                            value={rightLevelValueOptions.find(
                              (item) =>
                                item.value == userRightsState.RIGHT_LEVEL_VALUE
                            )}
                            styles={colourStyles}
                            isOptionDisabled={(option) => option.isDisabled}
                          />
                        )}
                      </div>

                      <div className="form-group col-md-6 col-sm-12">
                        <label className="required control-label mb-1 text-left font-14 weight-500">
                          Role
                        </label>

                        <Select
                          // className="form-control"
                          isDisabled={
                            userRightsState.KEY === "SECTION" ||
                            userRightsState.KEY === "ELEMENT"
                              ? true
                              : false
                          }
                          instanceId={5}
                          options={rolesOption}
                          onChange={handleSelectChange}
                          name="ROLE_ID"
                          value={
                            // userRightsState.KEY === "SECTION"
                            //   ? rolesOption.find(
                            //       (item) =>
                            //         item.label === "Section Admin" &&
                            //         item.value == userRightsState.ROLE_ID
                            //     )
                            //   : userRightsState.KEY === "ELEMENT"
                            //   ? rolesOption.find(
                            //       (item) =>
                            //         item.label === "Element Admin" &&
                            //         item.value == userRightsState.ROLE_ID
                            //     )
                            //   :

                            rolesOption.find(
                              (item) => item.value == userRightsState.ROLE_ID
                            )
                          }
                          styles={colourStyles}
                        />
                      </div>
                      {/* <div className="form-group col-md-6 col-sm-12">
                      <label className="required control-label mb-30"></label>
                      <div className="checkbox checkbox-primary checkbox-circle">
                        <input
                          id="userRightsID"
                          style={{ transform: "scale(1.5)" }}
                          type="checkbox"
                          name="NEXT_LEVEL_RIGHTS_REQUIRED"
                          checked={
                            userRightsState.NEXT_LEVEL_RIGHTS_REQUIRED === "YES"
                          }
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="required control-label mb-1 text-left font-14 weight-500"
                          for="userRightsID"
                        >
                          Next Level Rights Required
                        </label>
                      </div>
                    </div> */}
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
          checkSectionRole("userRightsForm", sectionAuthorizationState)) && (
          <div className="panel panel-inverse card-view">
            <PanelHeading text="Available User Rights API Mappings" />
            <div className="row px-4 pt-3">
              <div className="form-group col-md-6 col-sm-12">
                <label className="control-label mb-1 text-left font-14 weight-500">
                  Department
                </label>
                <Select
                  instanceId={6}
                  options={searchDeptOptions}
                  onChange={handleSearchChange}
                  name="SEARCH_DEPARTMENT"
                  value={searchDeptOptions.find(
                    (item) => item.value == searchRightsState.SEARCH_DEPARTMENT
                  )}
                  styles={colourStyles}
                  // isOptionDisabled={(option) => option.disabled}
                />
              </div>
              {searchRightsState.SEARCH_DEPARTMENT && (
                <>
                  <div className="form-group col-md-6 col-sm-12">
                    <label className="control-label mb-1 text-left font-14 weight-500">
                      Designation
                    </label>
                    <Select
                      instanceId={7}
                      options={searchDesignationOptions}
                      onChange={handleSearchChange}
                      name="SEARCH_DESIGNATION"
                      value={searchDesignationOptions.find(
                        (item) =>
                          item.value == searchRightsState.SEARCH_DESIGNATION
                      )}
                      styles={colourStyles}
                      // isOptionDisabled={(option) => option.disabled}
                    />
                  </div>
                  <div className="form-group col-md-6 col-sm-12">
                    <label className="control-label mb-1 text-left font-14 weight-500">
                      SubDepartment
                    </label>
                    <Select
                      instanceId={8}
                      options={searchSubDeptOptions}
                      onChange={handleSearchChange}
                      name="SEARCH_SUBDEPARTMENT"
                      value={searchSubDeptOptions.find(
                        (item) =>
                          item.value == searchRightsState.SEARCH_SUBDEPARTMENT
                      )}
                      styles={colourStyles}
                      // isOptionDisabled={(option) => option.disabled}
                    />
                  </div>
                  {searchRightsState.SEARCH_SUBDEPARTMENT && (
                    <>
                      <div className="form-group col-md-6 col-sm-12">
                        <label className="control-label mb-1 text-left font-14 weight-500">
                          Team
                        </label>
                        <Select
                          instanceId={9}
                          options={searchTeamOptions}
                          onChange={handleSearchChange}
                          name="SEARCH_TEAM"
                          value={searchTeamOptions.find(
                            (item) =>
                              item.value == searchRightsState.SEARCH_TEAM
                          )}
                          styles={colourStyles}
                          // isOptionDisabled={(option) => option.disabled}
                        />
                      </div>
                      {searchRightsState.SEARCH_TEAM &&
                        searchIndividualOptions.length > 0 && (
                          <>
                            <div className="form-group col-md-6 col-sm-12">
                              <label className="control-label mb-1 text-left font-14 weight-500">
                                Employees
                              </label>
                              <Select
                                instanceId={9}
                                options={searchIndividualOptions}
                                onChange={handleSearchChange}
                                name="SEARCH_INDIVIDUAL"
                                value={searchIndividualOptions.find(
                                  (item) =>
                                    item.value ==
                                    searchRightsState.SEARCH_INDIVIDUAL
                                )}
                                styles={colourStyles}
                                isOptionDisabled={(option) => option.disabled}
                              />
                            </div>
                          </>
                        )}
                    </>
                  )}
                </>
              )}
            </div>
            {searchRightsState.SEARCH_DEPARTMENT && (
              <div className="text-right mb-2 mt-3 mr-4">
                <button
                  className="btn custom-bg-color"
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </button>
              </div>
            )}

            <div className="panel-wrapper collapse in">
              <div className="panel-body">
                {loadingUserRightDetails ? (
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
