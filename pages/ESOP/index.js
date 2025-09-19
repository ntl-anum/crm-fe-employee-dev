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
import { toast } from "react-toastify";
import { animateScroll } from "react-scroll";


const user = getOperatorFromCookie();
console.log("login user is: ",user);

export default function SOPForm() {

  const URLParams = useURLParams();
  const router = useRouter();
  const [deletedFiles, setDeletedFiles] = useState([]);
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

  // 🔹 Define options
const criticalityOptions = [
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" }
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

const docTypeOptions = [
  { value: "New", label: "New" },
  { value: "Migrated", label: "Migrated" }
];

const mandatorySections = {
  service: ["Scope", "Definition","Process Flow","Provisioning of Service for Existing Customer","Provisioning of Service for New Customer","Packages","Locking/Unlocking of Service","Charging Mechanism (Including MRC, OTC, VAS charges and Taxes)","Support (Troubleshooting, Fault types)","Terms & Conditions"],
  process: ["Scope", "Definition","Process Flow","Process Explanation"],    // Example
};

// ✅ Enhanced validation function that tracks specific invalid clauses
// const validateClauses = (clauses, formType, pageSections) => {
//   const mandatory = mandatorySections[formType] || [];
//   let invalidSections = [];
//   let invalidClauseIds = {}; // Track specific clause IDs that are invalid

//   pageSections.forEach(section => {
//     const sectionClauses = clauses.filter(c => c.sectionName === section);
//     const isMandatory = mandatory.includes(section);

//     if (isMandatory && sectionClauses.length === 0) {
//       // 🔹 Case 1: mandatory but no clause at all
//       invalidSections.push({ section, error: "missing" });
//     } else if (sectionClauses.length > 0) {
//       const emptyClauses = sectionClauses.filter(c => !c.text || !c.text.trim());

//       if (emptyClauses.length > 0) {
//         // 🔹 Case 2: clause(s) added but text is empty
//         invalidSections.push({ 
//           section, 
//           error: "empty", 
//           count: emptyClauses.length,
//           clauseIds: emptyClauses.map(c => c.id) // Track specific clause IDs
//         });
        
//         // Add clause IDs to the object for easy lookup
//         emptyClauses.forEach(c => {
//           invalidClauseIds[c.id] = true;
//         });
//       }
//     }
//   });

//   return {
//     invalidSections,
//     invalidClauseIds, // Now returns object like { clauseId1: true, clauseId2: true }
//     isValid: invalidSections.length === 0
//   };
// };
// ✅ Simplified validation function with basic security checks
const validateClauses = (clauses, formType, pageSections) => {
  const mandatory = mandatorySections[formType] || [];
  let invalidSections = [];
  let invalidClauseIds = {}; // Track specific clause IDs that are invalid

  // 🔹 Simple security pattern check
  const hasSecurityThreat = (text) => {
    // Check for script tags, SQL patterns, and suspicious content
  const dangerousPatterns = [
  /<script/i,                        // Script tags
  /<\/?meta/i,                       // Meta tags
  /javascript:/i,                    // JavaScript protocol
  /\balert\s*\(/i,                   // alert(...)
  /\bprompt\s*\(/i,                  // prompt(...)
  /\bconfirm\s*\(/i,                 // confirm(...)
  /(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bUNION\b|\bEXEC\b)/i, // SQL keywords
  /\b1\s*=\s*1\b/i,                  // SQL injection (1=1)
  /\b\d+\s*AND\s*\d+\b/i,            // 1 AND 1 style injection
  /<iframe/i,                        // Iframe tags
  /on\w+\s*=/i,                      // Inline event handlers (onclick, onerror, etc.)
  /__.*?__/,                         // Metadata-like tokens
  /\$\{.*?\}/,                       // Template literals / expression injection
];
    return dangerousPatterns.some(pattern => pattern.test(text));
  };

  pageSections.forEach(section => {
    const sectionClauses = clauses.filter(c => c.sectionName === section);
    const isMandatory = mandatory.includes(section);

    if (isMandatory && sectionClauses.length === 0) {
      // 🔹 Case 1: mandatory but no clause at all
      invalidSections.push({ section, error: "missing" });
    } else if (sectionClauses.length > 0) {
      const emptyClauses = sectionClauses.filter(c => !c.text || !c.text.trim());
      let hasSecurityIssues = false;

      // 🔹 Check each clause for security issues
      sectionClauses.forEach(clause => {
        if (clause.text && clause.text.trim()) {
          if (hasSecurityThreat(clause.text)) {
            hasSecurityIssues = true;
            // Mark clause as invalid for border highlighting
            invalidClauseIds[clause.id] = true;
          }
        }
      });

      if (emptyClauses.length > 0) {
        // 🔹 Case 2: clause(s) added but text is empty
        invalidSections.push({ 
          section, 
          error: "empty", 
          count: emptyClauses.length,
          clauseIds: emptyClauses.map(c => c.id)
        });
        
        // Add clause IDs to the object for easy lookup
        emptyClauses.forEach(c => {
          invalidClauseIds[c.id] = true;
        });
      }

      if (hasSecurityIssues) {
        // 🔹 Case 3: security threats detected
        invalidSections.push({
          section,
          error: "security"
        });
      }
    }
  });

  return {
    invalidSections,
    invalidClauseIds, // Now returns object like { clauseId1: true, clauseId2: true }
    isValid: invalidSections.length === 0
  };
};

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

           const preSelectedApprovedBy = sop?.approvedBy
     ? sop.approvedBy
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
              docType: docTypeOptions.find(
              opt => opt.value === sop.docType
              ) || "",
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
             criticalityLevel: criticalityOptions.find(
            opt => opt.value === sop.criticalityLevel
          ) || null,
              dateOfApproval: sop.dateOfApproval || '',
              preparedBy: sop.preparedBy 
                ? { value: sop.preparedBy, label: sop.preparedBy } 
                : "",
              reviewedStakeholders: preSelected,
              approvedBy:preSelectedApprovedBy,
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
  docType:"",
  sopType: null,
  ownerDepartment: null,
  stakeholders: [],
  subDepartment: null,
  city: null,
  version: "1.0",
  criticalityLevel: "",
  dateOfApproval: "",
  preparedBy: preparedByOption,
  reviewedStakeholders: reviewedStakeholders_option,
  infoClassification: "",
  manualRequired: "",
  documentobjective: "",
  approvedBy:""
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
    version: formData.version,
    preparedBy: null,
    approvedBy: null,
    datetime: null,
    changes: null,
  }))
);
setClauses(
  (clauseData ?? []).map(c => ({
    id:  null,
    parent_id:  null,
    seq:  "",
    text:  "",
    sectionName: ""
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

useEffect(() => {
  if (historyData?.length > 0) {
    setHistory(
      historyData.map(h => ({
        version: h.version || "",
        preparedBy: h.preparedBy || "",
        approvedBy: h.approvedBy || "",
        datetime: h.datetime || "",
        changes: h.changes || ""
      }))
    );
  } else {
    // Optional: start with one empty row if no history exists
    setHistory([{ version: formData.version, preparedBy:preparedByOptions[0]?.value || "", approvedBy: "", datetime: "", changes: "" }]);
  }
}, [historyData]); // 👈 historyData is the fetched history array
  const preparedByOption = { value: user, label: user };


  // If you already have other options for preparedBy:
  const preparedByOptions = [
    preparedByOption,
    // ...other options
  ];

  const reviewedStakeholders_option = [
    { value: "saad.asad", label: "saad.asad" }
  ];


    const [formData, setFormData] = useState({
    sop_name:'',
    sopType: formType,
    docType:'',
    ownerDepartment: '',
    stakeholders: [],
    subDepartment: '',
    city: '',
    version: '1.0',
    criticalityLevel: '',
    dateOfApproval: '',
    preparedBy: preparedByOption,
    reviewedStakeholders: reviewedStakeholders_option,
    infoClassification: '',
    manualRequired: '',
    documentobjective:'',
    approvedBy:'',
  });
  // for history version management

    const [history, setHistory] = useState([]);

  //     console.log("original sop Data:", formData);
  // console.log("fetched for editing: ",sop);
  // ✅ History state handlers
  const addHistoryRow = () => {
    if (history.length >= 5) {
    toast.error("You can only add up to 100 versions.");
    return;
  }
  //✅ Duplicate version check
  const versionToAdd =  "";
  // if (versionToAdd) {
    const isDuplicate = history.some((row) => row.version === versionToAdd);
    if (isDuplicate) {
      toast.error(`Version "${versionToAdd}" already exists. Please use a unique version.`);
      return;
    }
  // }

    setHistory(prev => [
      ...prev,
      { version:"" || "", preparedBy:  preparedByOption ? preparedByOption.value : "", approvedBy: "", datetime: "", changes: "" }
    ]);
  };

  const removeHistoryRow = (index) => {
    setHistory(prev => prev.filter((_, i) => i !== index));
  };

  const updateHistoryField = (index, field, value) => {
    setHistory(prev => {
      const updated = [...prev];
       // Check for duplicate version only when editing 'version' field
    if (field === 'version') {
      const isDuplicate = prev.some((row, i) => i !== index && row.version === value);
      if (isDuplicate) {
        toast.error(`Version "${value}" already exists. Please use a unique version.`);
        updated[index][field] = ""; // reset to blank
        return updated;
      }
    }
    
      updated[index][field] = value;
      return updated;
    });
  };
  // for history version management

  // roles & responsibility AND escalation matrix
   const [roles, setRoles] = useState([{ dept: "", responsibility: "" }]);
  const [escalationRows, setEscalationRows] = useState([
  { level: "Level 1", designation: "", duration: "" }
]);
  // roles & responsibility AND escalation matrix
  // for clauses of document
  const [clauses, setClauses] = useState([]);
// Add a top-level clause
  const addClause = (parentId = null, manualSectionNumber = null, sectionName = null) => {
    // console.log("section name is: "+ sectionName);
    // const newClause = {
    //   id: Date.now(), // temporary unique ID (replace with backend ID after save)
    //   parent_id: parentId,
    //   seq: manualSectionNumber || "",
    //   text: "",
    //   sectionName, // ✅ store section name
    // };
    // setClauses((prev) => [...prev, newClause]);

  console.log("section name is: " + sectionName);
    
  // Helper function to count hierarchy depth
  const getHierarchyDepth = (sectionNumber) => {
    if (!sectionNumber) return 0;
    return sectionNumber.toString().split('.').length;
  };
  
  // Helper function to get sibling prefix (everything except the last number)
  const getSiblingPrefix = (sectionNumber) => {
    if (!sectionNumber) return "";
    const parts = sectionNumber.toString().split('.');
    return parts.slice(0, -1).join('.');
  };
  
  // Helper function to count siblings with same prefix
const countSiblingsWithPrefix = (prefix) => {
  return clauses.filter(clause => {
    if (!clause.seq) return false;
    const clausePrefix = getSiblingPrefix(clause.seq);
    return clausePrefix === prefix && clause.sectionName === sectionName;
  }).length;
};
  
  // Check hierarchy depth limit 
  if (manualSectionNumber) {
    const depth = getHierarchyDepth(manualSectionNumber);
    
    // DEBUG: Log the section number and calculated depth
    console.log(`DEBUG - Section: "${manualSectionNumber}", Calculated Depth: ${depth}`);
    
    // Adjust this number based on your counting method
    if (depth >= 5) {
      toast.error(`Maximum hierarchy depth of 5 reached.Cannot add more sub-clauses.`);
      return;
    }
  }
  
  // Check sibling count limit (max 20 siblings at same level)
  if (manualSectionNumber) {
    const siblingPrefix = getSiblingPrefix(manualSectionNumber);
    const siblingCount = countSiblingsWithPrefix(siblingPrefix);
    
    if (siblingCount >= 5) {
      const levelDescription = siblingPrefix ? `level "${siblingPrefix}"` : "root level";
      toast.error(`Maximum of 5 clauses. Cannot add more siblings.`);
      return;
    }
  }
  
  // If all checks pass, create the new clause
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
          <Tab1DocumentHistory  
          formData={formData}
          setFormData={setFormData}  onNext={goToNext}
          onPrev={goToPrev}
          preparedByOptions={preparedByOptions}
          searchDeptOptions={searchDeptOptions}
          rightLevelValueOptions={rightLevelValueOptions}
          sopId={sopId}
          infoClassificationOptions={infoClassificationOptions}
          manualRequiredOptions={manualRequiredOptions}
          criticalityOptions={criticalityOptions}
          sopData={sop}
          docTypeOptions={docTypeOptions}
          >
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
  validateClauses={validateClauses}

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
          deletedFiles={deletedFiles}
          setDeletedFiles={setDeletedFiles}
          validateClauses={validateClauses}
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
          validateClauses={validateClauses}

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
  validateClauses={validateClauses}

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
        deletedFiles={deletedFiles}
        setDeletedFiles={setDeletedFiles}
        validateClauses={validateClauses}
        historyData={historyData}
        clauseData={clauseData}
        escalationData={escalationData}
        rolesData={rolesData}
        sopData={sop}
        // annexureData={annexureData}


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
        validateClauses={validateClauses}

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
      validateClauses={validateClauses}

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
