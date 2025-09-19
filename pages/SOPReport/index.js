// pages/ESOP/index.js
import { useState } from "react";
import Layout from "@/components/Layout";
import { DeptDesignationService } from "../../services/UtilityService/DeptDesignation";
import { getOperatorFromCookie } from "@/helpers/cookie-parser";
import PanelHeading from "../../components/PanelHeading";
import Edit from "../../public/dist/img/Edit.svg";
import Trash from "../../public/dist/img/Trash.svg";
import ViewIcon from "../../public/dist/img/View.svg";
import copyIcon from "/public/dist/img/Copy.svg";
import PrimaryModal from "@/components/Model/PrimaryModal";
import Select from "react-select";
import ReactTable from "../../components/Table/ReactTable";
import React from "react";
import { APP_ROUTES } from "../../helpers/enums";
import Router from "next/router";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { ComplianceService } from "@/services/ComplianceService/ComplianceService";
import Image from 'next/image';
import { colourStyles } from "@/components/SelectStyleComponent";
import { useRouter } from "next/navigation";
import useURLParams from "@/hooks/useURLParams";
import { encryptData } from "@/helpers/encrypt";
import { BlobProvider } from "@react-pdf/renderer";
import PreviewPDF from "@/page-components/ESOP/previewPDF";
// import { ComplianceService } from "@/services/ComplianceService/ComplianceService";

export default function SOPReport() {

  const [searchDeptOptions, setSearchDeptOptions] = useState([]);
  const [searchDesignationOptions, setSearchDesignationOptions] = useState([]);
  const [department, setDepartment] = useState(null);
  const [subdepartment, setsubdepartment] = useState(null);
  const [processFiles, setProcessFiles] = useState([]);
  const URLParams = useURLParams();
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    sop_name: null,
  });

   const handleDel = (del_name = null) => {
    setDeleteModal({
      show: !deleteModal.show,
      sop_name: del_name,
    });
  };

    const deleteFun = async () => {
      try {
        // setShowLoader(true);
        const response = await ComplianceService.deleteSOPByName(deleteModal.sop_name);
        if (response) {
          const jsonRes = await response.json();
  
          if (jsonRes.status === "SUCCESS") {
            setTableDataState(
              tableDataState.filter((row) => row.col_sop !== deleteModal.sop_name)
            );
            toast.success(jsonRes.message);
          } else {
            toast.error(jsonRes.message);
          }
        } else {
          Router.push(APP_ROUTES.SERVER_ERROR);
        }
        // setShowLoader(false);
        handleDel();
      } catch (error) {
        console.log(error);
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
    };
  
    const initialOptionsArray = [
    { value: "", label: "Please Select...", isDisabled: true },
  ];

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
  
    //get all subdepartments
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

        setSearchDesignationOptions(options);
      } else {
        toast.error(res.message);
      }
    } else {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

const handleSelectChange = (fieldName) => (selectedOption) => {
    if (fieldName === "department" && selectedOption) {
      setDepartment(selectedOption.value);
      setsubdepartment('');
    }

     if (fieldName === "subdepartment" && selectedOption) {
      setsubdepartment(selectedOption.value);
    }

    if (fieldName === "department" && selectedOption) {
    getSubDeptsByDepartment(selectedOption.value);
  }

  // If needed, do other stuff based on fieldName and selectedOption here
};
    useEffect(() => {
      getAllDepartments();
    }, []);

    const cols = React.useMemo(
      () => [
               {
          Header: "ID",
          accessor: "col_id",
        },
           {
          Header: "SOP",
          accessor: "col_sop",
           Cell: ({ value }) => (
    <div style={{ minWidth: "120px", whiteSpace: "normal" }}>{value}</div>
  ),
        },
                  {
          Header: "SOP Type",
          accessor: "col_sop_type",
        },
                  {
          Header: "DOC Type",
          accessor: "col_doc_type",
        },
        {
          Header: "Sub Department",
          accessor: "col_dept_name",
        },
        {
          Header: "Version",
          accessor: "col_version_name",
        },
        {
          Header: "Stakeholders",
          accessor: "col_stakeholders",
        },
        {
          Header: "City",
          accessor: "col_city",
        },
        {
          Header: "Criticality Level",
          accessor: "col_criticality",
        },
        {
          Header: "Approval Date",
          accessor: "col_approval",
        },
        {
          Header: "Reviwed Stakeholders",
          accessor: "col_reviewed_stakeholder",
        },
    {
          Header: "Prepared By",
          accessor: "col_preparedBy",
        },
        {
          Header: "Actions",
          accessor: "col_actions",
        },
      ]
    );
    const [tableDataState, setTableDataState] = useState([]);

      // Handle report generation
const prepareTableData = async () => {
    //getting all active modules from backend

  if(!department || !subdepartment){
    toast.error("Please Select Department");
  }

  let response = await ComplianceService.listComplianceByDept(
  department,
  subdepartment
);
    console.log("result data: ", response);
    if (response) {
      let jsonRes = await response.json();

      let data = [];
      if (jsonRes.status === "SUCCESS") {
       jsonRes.data.forEach((element, i) => {
          data.push({
             id: element.id,
             col_id: element.id || 'N/A',
             col_sop: element.sop_name || 'N/A',
             col_sop_type: element.sop_type || 'N/A',
             col_doc_type: element.doc_type || 'N/A',
            col_dept_name: element.owner_department || 'N/A',
            col_version_name: element.version || 'N/A',
            col_stakeholders: element.stakeholders || 'N/A',
            col_city: element.city || 'N/A',
            col_criticality: element.criticality_level || 'N/A',
            col_approval: element.date_of_approval? new Date(element.date_of_approval).toLocaleDateString() : "-",
            col_reviewed_stakeholder: element.reviewed_stakeholders || 'N/A',
            col_preparedBy: element.prepared_by || 'N/A',
            col_actions: (
            <div style={{ whiteSpace: "nowrap" }}>
              <a style={{ cursor: "pointer" }} title="Edit SOP" className="text-dark" onClick={() => handleEdit(element.id)}>
                <Image src={Edit} alt="Edit" width={20} height={20} />
              </a>
                  &nbsp;
               <a style={{ cursor: "pointer" }} title="View SOP"  className="text-primary" onClick={() => handlePreview(element.id)}>
                <Image src={ViewIcon} alt="Preview" width={15} height={15} />
              </a>
               &nbsp;
              <a style={{ cursor: "pointer" }} title="View Versions" className="text-primary" onClick={() => openTableModal(element.sop_name)}>
                <Image src={copyIcon} alt="Preview" width={15} height={15} />
              </a>
              &nbsp;
              <a style={{ cursor: "pointer" }} title="Delete SOP" onClick={() => handleDel(element.sop_name)}>
                <Image src={Trash} alt="Delete" width={20} height={20} />
              </a>
            </div>
          )
          });
        });
      }

      setTableDataState(data);
    } else {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  
  const handleEdit = (id) => {
    console.log("edit id is as follow: ",id);
   Router.push(
    `/ESOP?en=${encryptData(
      `id=${id}`, 
      process.env.ENCRYPT_KEY
    )}`
  );
  };

  const handlePreview = (id) => {
     console.log("Preview id is as follow: ",id);
   Router.push(
    `/ESOP/Preview?en=${encryptData(
      `id=${id}&fromReport=true`, 
      process.env.ENCRYPT_KEY
    )}`
  );
  }
//   const handlePreview = async (id) => {
//   try {
//     console.log("Preview id is:", id);

//     // Fetch all required SOP data
//     const data1 = await ComplianceService.getSOPDataById(id);
//     const sopData = (await data1.json()).data;

//     const data2 = await ComplianceService.getHistoryById(id);
//     const historyData = (await data2.json()).data;

//     const data3 = await ComplianceService.getEscalationById(id);
//     const escalationData = (await data3.json()).data;

//     const data4 = await ComplianceService.getRolesById(id);
//     const rolesData = (await data4.json()).data;

//     const data5 = await ComplianceService.getClausesById(id);
//     const clauseData = (await data5.json()).data;

//     const data6 = await ComplianceService.getAnnexureById(id);
//     const annexures = (await data6.json()).data;

//     const data7 = await ComplianceService.getProcessImages(id);
//     const processFiles = (await data7.json()).data;

//     // Open PDF in new tab
//     openPDFInNewTab({
//       sop: sopData,
//       historyData,
//       escalationData,
//       rolesData,
//       clauseData,
//       annexures,
//       processFiles,
//     });
//   } catch (err) {
//     console.error("Error generating PDF preview:", err);
//   }
// };



// // data contains sop, historyData, rolesData, escalationData, clauseData, annexures, processFiles
//  const openPDFInNewTab = (data) => {
//   const blobProvider = new BlobProvider({
//     document: (
//       <PreviewPDF
//         sop={data.sop}
//         historyData={data.historyData}
//         rolesData={data.rolesData}
//         escalationData={data.escalationData}
//         clauseData={data.clauseData}
//         annexures={data.annexures}
//         processFiles={data.processFiles}
//       />
//     ),
//   });

//   blobProvider.toBlob().then(({ blob }) => {
//     const url = URL.createObjectURL(blob);
//     window.open(url, "_blank"); // opens PDF in new tab
//   });
// };


   const [tableModal, setTableModal] = useState({ show: false, data: [] });

const openTableModal = async (sop_name) => {
  try {
    const response = await ComplianceService.listArchivedSOPs(sop_name); // API call
    console.log("archived sop data is:",response.data);
    if (response) {
      const jsonRes = await response.json();

      if (jsonRes.status === "SUCCESS") {
        const data = jsonRes.data.map((element, index) => ({
          srNo: index + 1,
          version: element.version || "N/A",
          status: element.status || "N/A",
          createdAt: element.createdAt || null,
          id:element.id,
        }));

        setTableModal((prev) => ({ ...prev, show: true, data }));
      }
    }
  } catch (err) {
    console.error("Error fetching archived SOPs:", err);
  }
};

const closeTableModal = () => {
  setTableModal({ show: false, data: [] });
};

// ✅ Memoized TableRow (only re-renders if props change)
const TableRow = React.memo(({ row }) => (
  <tr>
    <td>{row.srNo}</td>
    <td>{row.version}</td>
    <td>{row.status}</td>
    <td>{row.createdAt ? new Date(row.createdAt).toLocaleString() : "-"}</td>
     <td className="text-center">
     <a style={{ cursor: "pointer" }} onClick={() => handlePreview(row.id)}>
      <Image src={ViewIcon} height={17} width={17}/>
    </a>
    </td>
  </tr>
));

const TableBody = React.memo(({ data }) => {
  if (!data || data.length === 0) {
    return (
      <tr>
        <td colSpan={5} className="text-center">
          No data found
        </td>
      </tr>
    );
  }
  return data.map((row, index) => (<TableRow key={row.id || index} row={row} />));
});
  return(
  <Layout>
    
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
  <PrimaryModal isOpenProp={tableModal.show} onClose={closeTableModal}>
        <div className="modal-content" style={{ padding: "1rem", borderRadius: "0.3rem" }}>
          {/* Modal Header */}
          <div className="modal-header d-flex justify-content-between align-items-center">
            <h5 className="modal-title">SOP Versions</h5>
            <button type="button" className="close btn btn-sm btn-outline-secondary" onClick={closeTableModal}>
              &times;
            </button>
          </div>

          {/* Modal Body */}
          <div className="modal-body" style={{ maxHeight: "60vh", overflowY: "auto", marginTop: "1rem" }}>
            <table className="table table-bordered  mb-0">
              <thead className="thead-light">
                <tr>
                  <th>Sr No</th>
                  <th>Version</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>

                </tr>
              </thead>
              <tbody>
             
              <TableBody data={tableModal.data} />
         
              </tbody>
            </table>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer d-flex justify-content-end mt-3">
            <button className="btn custom-bg-color" onClick={closeTableModal}>
              Close
            </button>
          </div>
        </div>
      </PrimaryModal>

 
      <div style={{ padding: "24px 24px" }}>
        <div className="panel panel-inverse card-view">
          <PanelHeading text="Genrate Complaince Report" />
          <div className="panel-wrapper collapse in">
            <div className="panel-body">

              {/* 🔽 Filters + Button */}
              <div className="row mt-3 justify-content-center">
                <div class="form-group col-md-6 col-sm-12">
                   <label className="form-label required control-label mb-1 font-14 weight:500">Department</label>

                  <Select
                    options={searchDeptOptions}
                    placeholder="Select Department"
                    value={searchDeptOptions.find(opt => opt.value === department) || null}
                    styles={
                      colourStyles
                      }
                    name="department"
                    onChange={handleSelectChange("department")}
                  />
                </div>
                <div class="form-group col-md-6 col-sm-12">
                   <label className="form-label required control-label mb-1 font-14 weight:500">Sub Department</label>
                  <Select
                    options={searchDesignationOptions}
                    placeholder="Select Sub Dept"
                    value={searchDesignationOptions.find(opt => opt.value === subdepartment) || null}
                    name="subdepartment"
                    onChange={handleSelectChange("subdepartment")}
                  />
                </div>
              </div>

                <div className="row mt-2">
                 <div class="col-md-6 ">
                <button
                  onClick={prepareTableData}
                  className="btn custom-bg-color"
                >
                  Generate Report
                </button>
                </div>
                </div>

            
            </div>
          </div>
        </div>
      <div className="panel panel-inverse card-view">
         <PanelHeading text="Complaince Report" />
           <div className="panel-wrapper collapse in">
            <div className="panel-body">
           {/* Table */}
              <ReactTable columns={cols} data={tableDataState} />
              </div>
              </div>
      </div>

      
      </div>
    </Layout>
    
  );
}