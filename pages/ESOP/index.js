import { useState } from "react";
import Layout from "@/components/Layout";
import Tab1DocumentHistory from "@/page-components/ESOP/Tab1DocumentHistory";
import Tab2ObjectiveScope from "@/page-components/ESOP/Tab2Objective";
import Tab3Processes from "@/page-components/ESOP/Tab3Processes";
import Tab4Responsibilities from "@/page-components/ESOP/Tab4Resonsibilities";
import Tab5ComplianceDocumentation from "@/page-components/ESOP/Tab5ComplianceDocumentation";
import Service1 from "@/page-components/ESOP/Service1";
import Service2 from "@/page-components/ESOP/Service2";
import Annexure from "@/page-components/ESOP/AnnexureTab";

export default function SOPForm() {
  const [formType, setFormType] = useState("");
  const [tab, setTab] = useState("overview");
  const [clauseCounter, setClauseCounter] = useState(1);

    const [formData, setFormData] = useState({
    ownerDepartment: '',
    stakeholders: '',
    subDepartment: '',
    city: '',
    version: '',
    criticality: '',
    dateOfApproval: '',
    preparedBy: '',
    reviewedStakeholders: '',
    approvedBy: '',
    approverName: '',
    reviewedBy: '',
    reviewerName: '',
    infoClassification: '',
    manualRequired: false,
  });

  const [clauses, setClauses] = useState([]); // for hierarchical data

  const [roles, setRoles] = useState([]); // roles & responsibilities

  const [escalationMatrix, setEscalationMatrix] = useState([]); // etc.

  const [docHistory, setDocHistory] = useState([]); // for document versioning

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
    <div style={{ marginTop: "5rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "3rem" }}>
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
      onPrev={goToPrev}></Tab1DocumentHistory>
        </div>
      )}

      {tab === "objectives" && (
        <div style={{ marginBottom: "2rem" }}>
      <Tab2ObjectiveScope
  formData={formData}
  setFormData={setFormData}
  onNext={goToNext}
  onPrev={goToPrev}
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
  formType={formType}
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
/>
        </div>
      )}
    </div>
  );

  return (
    <Layout>
    <div style={{padding:"20px"}}>
    <div style={{ padding: "1rem", maxWidth: "100%", margin: "auto", background: "#f9f9f9", borderRadius: "12px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", height:"209px" }}>
      <h7 className="font-18 weight-500">SOP Compliance Document</h7>
      <div style={{ marginBottom: "2rem" }}>
        <div style={{marginTop:"20px"}} className="col-md-4 col-md-offset-3">
        <label style={{  }}>Select Document Type</label>
        <select onChange={(e) => {setFormType(e.target.value),  setTab("overview") }}  style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}>
          <option value="">Choose Service or Product</option>
          <option value="service">Service</option>
          <option value="process">Process</option>
        </select>
        </div>
      </div>
      <br></br>
      {formType && renderTabs()}
    </div>
    </div>
    </Layout>
  );
}
