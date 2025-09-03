import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Tab1DocumentHistory from "@/page-components/ESOP/Tab1DocumentHistory";
import Tab2ObjectiveScope from "@/page-components/ESOP/Tab2Objective";
import Tab3Processes from "@/page-components/ESOP/Tab3Processes";
import Tab4Responsibilities from "@/page-components/ESOP/Tab4Resonsibilities";
import Tab5ComplianceDocumentation from "@/page-components/ESOP/Tab5ComplianceDocumentation";
import Service1 from "@/page-components/ESOP/Service1";
import Service2 from "@/page-components/ESOP/Service2";
import Annexure from "@/page-components/ESOP/AnnexureTab";
import { getOperatorFromCookie } from "@/helpers/cookie-parser";
import PanelHeading from "@/components/PanelHeading";
import { ComplianceService } from "@/services/ComplianceService/ComplianceService";
import { useRouter } from "next/router";
import useURLParams from "@/hooks/useURLParams";
import { ProfessionalInfoService } from "@/services/UtilityService/ProfessionalInfo";
import { APP_ROUTES } from "../../helpers/enums";
import { DeptDesignationService } from "@/services/UtilityService/DeptDesignation";
import { departmentService } from "@/services/UtilityService/departmentService";
import Select from "react-select";

const user = getOperatorFromCookie();

export default function SOPForm() {

  const URLParams = useURLParams();
  const router = useRouter();

  const [formType, setFormType] = useState("");
  const [rightLevelValueOptions, setRightLevelValueOptions] = useState([]);
    const [searchDeptOptions, setSearchDeptOptions] = useState([]);
    const [searchDesignationOptions, setDesignationOptions] = useState([]);
const [processFiles, setProcessFiles] = useState([
  { sectionName: "Process Explanation", files: [] }
]);
 const [sop, setSop] = useState(null);
 const [historyData, sethistoryData] = useState(null);
 const [escalationData, setescalationData] = useState(null);
 const [rolesData, setRolesData] = useState(null);
 const [clauseData, setclauseData] = useState(null);
const [sopId, setSopId] = useState(null);


  const [tab, setTab] = useState("overview");

      useEffect(() => {
      getAllDesignation();
      getAllEmployees();
      getAllDepartments();
    }, []);

    const getAllDesignation= async () => {
   try {
            // options = [];
            const response = await DeptDesignationService.listDesignations();
            const res = await response.json();
            const data = res.data;
            
            let options = [...initialOptionsArray];
            data.forEach((element) => {
              options.push({
                value: element.designation,
                label: element.designation,
              });
            });
            setDesignationOptions(options);
          } catch (error) {
        console.log(error);
        router.push(APP_ROUTES.SERVER_ERROR);
      }
    };
   //get all departments
const getAllEmployees = async () => {
      try {
            // options = [];
            const response = await ProfessionalInfoService.listIndividuals();
            const res = await response.json();
            const data = res.data;
            
            let options = [...initialOptionsArray];
            data.forEach((element) => {
              options.push({
                value: element.EMPID,
                label: element.EMPID,
              });
            });
            setRightLevelValueOptions(options);
          } catch (error) {
        console.log(error);
        router.push(APP_ROUTES.SERVER_ERROR);
      }
          };

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
              router.push(APP_ROUTES.SERVER_ERROR);
            }
          } catch (error) {
            console.log(error);
            router.push(APP_ROUTES.SERVER_ERROR);
          }
        };
      

  const initialOptionsArray = [
    { value: "", label: "Please Select...", isDisabled: true },
  ];
  const initialEditValue = {
    isEdit: false,
    id: null,
  };

const sopTypeOptions = [
  { value: "service", label: "Service" },
  { value: "process", label: "Process" }
];


const infoClassificationOptions = [
  { value: "Internal", label: "Internal" },
  { value: "Public", label: "Public" },
  { value: "Confidential", label: "Confidential" }
];

const manualRequiredOptions = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" }
];




useEffect(() => {
  if (router.isReady && URLParams?.id) {
    setSopId(URLParams.id); // keep id in state for easy use
    const fetchData = async () => {
      try {
        const data1 = await ComplianceService.getSOPDataById(URLParams.id);
        const sopData = await data1.json();
        setSop(sopData.data); // store SOP separately

        const data2 = await ComplianceService.getHistoryById(URLParams.id);
        const historyData = await data2.json();
        console.log("history data is: ",historyData);
        sethistoryData(historyData.data); // store SOP separately

        const data3 = await ComplianceService.getEscalationById(URLParams.id);
        const escalationData = await data3.json();
        console.log("Escalation data is: ",escalationData);
        setescalationData(escalationData.data); // store SOP separately

        const data4 = await ComplianceService.getRolesById(URLParams.id);
        const rolesData = await data4.json();
        console.log("Roles data is: ",rolesData);
        setRolesData(rolesData.data); // store SOP separately

        const data5 = await ComplianceService.getClausesById(URLParams.id);
        const clauseData = await data5.json();
        console.log("Clause data is: ",clauseData);
        setclauseData(clauseData.data); // store SOP separately
      } catch (err) {
        console.error("Error fetching Clauses data:", err);
      }
    };

    fetchData();
  }
}, [URLParams, router.isReady]);
 
// second effect: runs only when both sop + rightLevelValueOptions exist
useEffect(() => {
  console.log("SOP Data",sop);
  if (sop  && rightLevelValueOptions.length > 0) {
     const preSelected = sop?.reviewed_stakeholders
     ? sop.reviewed_stakeholders
      .split(",")
      .map(s => s.trim()) // remove spaces
      .map(val => {
        const match = rightLevelValueOptions.find(opt => opt.value === val);
        return match || { value: val, label: val };
      }) : [];

    const preSelectedDepts = sop?.stakeholders
     ? sop.stakeholders
      .split(",")
      .map(s => s.trim()) // remove spaces
      .map(val => {
        const match = searchDeptOptions.find(opt => opt.value === val);
        return match || { value: val, label: val };
      }):[];

    console.log("Preselected values Dept:", preSelectedDepts); // 👀 check here

            setFormType(sop.sop_type);  // this will open correct tab
            // 2️⃣ Map each field explicitly into formData
      
            setFormData({
              sop_name: sop.sop_name || '',
              sopType: sopTypeOptions.find(
              opt => opt.value === sop.sop_type
            ) || "",
              ownerDepartment: sop.ownerDepartment ? { value: sop.ownerDepartment, label: sop.ownerDepartment } 
                : "",
              stakeholders: preSelectedDepts,
              subDepartment: sop.subDepartment ? { value: sop.subDepartment, label: sop.subDepartment } 
                : "",
              city: sop.city ? { value: sop.city, label: sop.city } 
                : "",
              version: sop.version || '',
              criticalityLevel: sop.criticalityLevel || '',
              dateOfApproval: sop.dateOfApproval || '',
              preparedBy: sop.preparedBy 
                ? { value: sop.preparedBy, label: sop.preparedBy } 
                : "",
              reviewedStakeholders: preSelected,
              infoClassification:  infoClassificationOptions.find(
              opt => opt.value === sop.informationClassification
            ) || "",
            manualRequired: manualRequiredOptions.find(
            opt => opt.value === sop.manualRequired
            ) || "",
              documentobjective: sop.documentobjective || ''
            });
  }

   if (historyData?.length > 0) {
      setHistory(
          historyData.map(h => ({
            version: h.version || "",
            preparedBy: h.preparedBy || "",
            approvedBy: h.approvedBy || "",
            datetime: h.datetime ? h.datetime.split("T")[0] : "",
            changes: h.changes || ""
          }))
        );
    }
}, [sop, rightLevelValueOptions]); // 👈 waits for both

const { en } = router.query;

useEffect(() => {
  if (!router.isReady) return; // wait until query params are ready
  setFormType('');
  if (!en) {
    // No SOP id, reset form
    setSopId(null);
    setFormData({
  sop_name: "",
  sopType: null,
  ownerDepartment: null,
  stakeholders: [],
  subDepartment: null,
  city: null,
  version: "",
  criticalityLevel: "",
  dateOfApproval: "",
  preparedBy: preparedByOption,
  reviewedStakeholders: [],
  infoClassification: "",
  manualRequired: "",
  documentobjective: "",
});
setRoles(
  (rolesData ?? []).map(h => ({
    dept: null,
    responsibility: null,
  }))
);
setEscalationRows(
  (escalationData ?? []).map(h => ({
    level: null,
    designation: null,
    duration: null,
  }))
);

setHistory(
  (historyData ?? []).map(h => ({
    version: null,
    preparedBy: null,
    approvedBy: null,
    datetime: null,
    changes: null,
  }))
);
setClauses(
  (clauseData ?? []).map(c => ({
    id: c.id || null,
    parent_id: c.parent_id || null,
    seq: c.seq || "",
    text: c.text || "",
    sectionName: c.sectionName || ""
  }))
);

  } },[en, router.isReady]);

useEffect(() => {
if (rolesData?.length > 0) {
      setRoles(
          rolesData.map(h => ({
            dept: h.dept || "",
            responsibility: h.responsibility || "",
          }))
        );
    }
}, [rolesData]); // 👈 waits for both

useEffect(() => {
if (escalationData?.length > 0) {
      setEscalationRows(
            escalationData.map(h => ({
            level: h.level || "",
            designation: h.designation || "",
            duration: h.duration || "",

          }))
        );
    }
}, [escalationData]); // 👈 waits for both

useEffect(() => {
if (clauseData?.length > 0) {
   setClauses(
      clauseData.map(c => ({
        id: c.id,
        parent_id: c.parent_id || null,
        seq: c.seq || "",
        text: c.text || "",
        sectionName: c.sectionName || ""
      }))
    );
    }
}, [clauseData]); // 👈 waits for both

  const preparedByOption = { value: user, label: user };

  // If you already have other options for preparedBy:
  const preparedByOptions = [
    preparedByOption,
    // ...other options
  ];


    const [formData, setFormData] = useState({
    sop_name:'',
    sopType: formType,
    ownerDepartment: '',
    stakeholders: [],
    subDepartment: '',
    city: '',
    version: '',
    criticalityLevel: '',
    dateOfApproval: '',
    preparedBy: preparedByOption,
    reviewedStakeholders: [],
    infoClassification: '',
    manualRequired: '',
    documentobjective:'',
  });
  // for history version management

    const [history, setHistory] = useState([]);

  // ✅ History state handlers
  const addHistoryRow = () => {
    setHistory(prev => [
      ...prev,
      { version: "", preparedBy: "", approvedBy: "", datetime: "", changes: "" }
    ]);
  };

  const removeHistoryRow = (index) => {
    setHistory(prev => prev.filter((_, i) => i !== index));
  };

  const updateHistoryField = (index, field, value) => {
    setHistory(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };
  // for history version management

  // roles & responsibility AND escalation matrix
   const [roles, setRoles] = useState([{ dept: "", responsibility: "" }]);
  const [escalationRows, setEscalationRows] = useState([
    { level: "", designation: "", duration: "" }
  ]);
  // roles & responsibility AND escalation matrix
  // for clauses of document
  const [clauses, setClauses] = useState([]);
// Add a top-level clause
  const addClause = (parentId = null, manualSectionNumber = null, sectionName = null) => {
    console.log("section name is: "+ sectionName);
    const newClause = {
      id: Date.now(), // temporary unique ID (replace with backend ID after save)
      parent_id: parentId,
      seq: manualSectionNumber || "",
      text: "",
      sectionName, // ✅ store section name
    };
    setClauses((prev) => [...prev, newClause]);
  };

  const deleteClause = (id) => {
    setClauses((prev) => prev.filter((clause) => clause.id !== id && clause.parent_id !== id));
  };

  const updateClause = (id, field, value, sectionName = null) => {
 setClauses((prev) =>
  prev.map((clause) =>
    clause.id === id
      ? {
          ...clause,
          [field]: value,
          ...(sectionName && { sectionName }), // only update if passed
        }
      : clause
  )
);
  }
    const getNextSeq = (parentId) => {
    const siblings = clauses.filter((c) => c.parent_id === parentId);
    return siblings.length + 1;
  };
  // for clauses of document


  const baseTabs = [
   "overview",
    "objectives",
    "process",  
];

const serviceExtraTabs = ["Service 1", "Service 2"]; // Replace with actual names

const annexures = ["responsibilities","compliance","annexure"]; // Replace with actual names

const productExtraTabs = []; // If any later

// Dynamic tab list based on selected formType
const tabList = formType === "service"
  ? [...baseTabs, ...serviceExtraTabs,...annexures]
  : [...baseTabs,...annexures];



  const goToNext = () => {
    const currentIndex = tabList.indexOf(tab);
    if (currentIndex < tabList.length - 1) {
      setTab(tabList[currentIndex + 1]);
    }
  };

  const goToPrev = () => {
    const currentIndex = tabList.indexOf(tab);
    if (currentIndex > 0) {
      setTab(tabList[currentIndex - 1]);
    }
  };

  const renderTabs = () => (
    <div style={{ marginTop: "1rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {tabList.map((t) => (
          <button
            key={t}
            style={{
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "6px",
              background: tab === t ? "#284E93" : "#e0e0e0",
              color: tab === t ? "white" : "black",
              cursor: "not-allowed",
              pointerEvents: "none"
            }}
            disabled
          >
            {t === 'overview' ? 'Document Overview' :
              t === 'objectives' ? 'Objectives & History' :
                t === 'process' ? 'Processes & Procedures' :
                  t === 'responsibilities' ? 'Responsibilities' :
                  t === 'annexure' ? 'Annexure' :
                   t === 'Service 1' ? 'Service Provisioning & Packages' :
                    t === 'Service 2' ? 'Service Operations & Support' :
                    'Compliance Documentation'}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div style={{ marginBottom: "2rem" }}>
          <Tab1DocumentHistory  formData={formData}
      setFormData={setFormData}  onNext={goToNext}
      onPrev={goToPrev}
      preparedByOptions={preparedByOptions}
      searchDeptOptions={searchDeptOptions}
      rightLevelValueOptions={rightLevelValueOptions}
      sopId={sopId}
        infoClassificationOptions={infoClassificationOptions}
        manualRequiredOptions={manualRequiredOptions}>
        
      </Tab1DocumentHistory>
        </div>
      )}

      {tab === "objectives" && (
        <div style={{ marginBottom: "2rem" }}>
      <Tab2ObjectiveScope
  formData={formData}
  setFormData={setFormData}
  onNext={goToNext}
  onPrev={goToPrev}
  history={history}
  addHistoryRow={addHistoryRow}
  removeHistoryRow={removeHistoryRow}
  updateHistoryField={updateHistoryField}
 clauses={clauses}
  addClause={addClause}
  deleteClause={deleteClause}
  updateClause={updateClause}
  preparedByOptions={preparedByOptions}
/>
        </div>
      )}

      {tab === "process" && (
        <div style={{ marginBottom: "2rem" }}>
           <Tab3Processes
          formData={formData}
          setFormData={setFormData}
          onNext={goToNext}
          onPrev={goToPrev}
            formType={formType}
             clauses={clauses}
  addClause={addClause}
  deleteClause={deleteClause}
  updateClause={updateClause}
  processFiles={processFiles}
  setProcessFiles={setProcessFiles}
        />
        </div>
      )}

      {tab === "responsibilities" && (
        <div style={{ marginBottom: "2rem" }}>
          <Tab4Responsibilities
          formData={formData}
          setFormData={setFormData}
          onNext={goToNext}
          onPrev={goToPrev}
          roles={roles}
          setRoles={setRoles}
          escalationRows={escalationRows}
          setEscalationRows={setEscalationRows}
          formType={formType}
          clauses={clauses}
          addClause={addClause}
          deleteClause={deleteClause}
          updateClause={updateClause}
          searchDeptOptions={searchDeptOptions}
          searchDesignationOptions={searchDesignationOptions}
        />
        </div>
      )}

      {tab === "compliance" && (
        <div style={{ marginBottom: "2rem" }}>
              <Tab5ComplianceDocumentation
        formData={formData}
        setFormData={setFormData}
        onNext={goToNext}
        onPrev={goToPrev}
        formType={formType}
         clauses={clauses}
  addClause={addClause}
  deleteClause={deleteClause}
  updateClause={updateClause}
/>
        </div>
      )}

       {tab === "annexure" && (
        <div style={{ marginBottom: "2rem" }}>
              <Annexure
        formData={formData}
        setFormData={setFormData}
        onNext={goToNext}
        onPrev={goToPrev}
        formType={formType}
        history={history}
        clauses={clauses}
        escalationRows={escalationRows}  
        roles={roles}
        sopId={sopId}
        processFiles={processFiles}
        setProcessFiles={setProcessFiles}

      />
        </div>
      )}

       {tab === "Service 1" && (
        <div style={{ marginBottom: "2rem" }}>
              <Service1
        formData={formData}
        setFormData={setFormData}
        onNext={goToNext}
        onPrev={goToPrev}
        formType={formType}
        clauses={clauses}
        addClause={addClause}
        deleteClause={deleteClause}
        updateClause={updateClause}
      />
        </div>
      )}


       {tab === "Service 2" && (
        <div style={{ marginBottom: "2rem" }}>
              <Service2
      formData={formData}
      setFormData={setFormData}
      onNext={goToNext}
      onPrev={goToPrev}
      formType={formType}
      clauses={clauses}
      addClause={addClause}
      deleteClause={deleteClause}
      updateClause={updateClause}
    />
        </div>
      )}
    </div>
  );

  return (
    <Layout>
    <div style={{padding:"20px"}}>
    <div style={{ padding: "1rem", maxWidth: "100%", margin: "auto", background: "#f9f9f9", borderRadius: "12px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", height:"200px" }}>
      <PanelHeading text="SOP Compliance Document" />
      {/* <div style={{ marginBottom: "2rem" }}> */}
        <div style={{marginTop:"25px"}} className="col-md-4 col-md-offset-3">
        <label style={{  }}>Select Document Type</label>
<Select
  options={sopTypeOptions}
  placeholder="Choose Service or Process"
  styles={{
    control: (provided) => ({
      ...provided,
      width: "100%",
      borderRadius: "6px",
      border: "1px solid #ccc"
      
    })
  }}
  value={formData.sopType || null}   // <-- direct object, no find()
  onChange={(selectedOption) => {
    setFormType(selectedOption.value);
    setTab("overview");
    setFormData((prev) => ({
      ...prev,
      sopType: selectedOption,  // store just the value in formData
    }));
  }
  }
  isDisabled={!!sopId} 
/>
        </div>
      </div>
      <br></br>
      {formType && renderTabs()}
    </div>
    {/* </div> */}
    </Layout>
  );
}
