'use client';
import { DeptDesignationService } from "../../services/UtilityService/DeptDesignation";
import { ProfessionalInfoService } from "../../services/UtilityService/ProfessionalInfo";
import { CityManagement } from "../../services/LocationManagement/CityManagement";
import { getOperatorFromCookie } from "@/helpers/cookie-parser";


import { useEffect, useState } from 'react';
import Select from "react-select";
import { APP_ROUTES } from "../../helpers/enums";
import Router from "next/router";
import { toast } from "react-toastify";
import {
  colourStyles,
  customTheme,
} from "../../components/SelectStyleComponent";
import { ComplianceService } from "@/services/ComplianceService/ComplianceService";

const getSelectStyles = (invalid) => ({
  ...colourStyles,
  control: (base, state) => ({
    ...base,
    border: invalid ? "1px solid red" : base.border,
    boxShadow: "none",
    "&:hover": {
      border: invalid ? "1px solid red" : base.border,
    },
  }),
});


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
const containsDangerousPattern = (str) => {
  return dangerousPatterns.some((pattern) => pattern.test(str));
};

export default function DocumentObjectiveForm({ formData, setFormData, onNext, onPrev ,preparedByOptions, rightLevelValueOptions, searchDeptOptions,sopId, infoClassificationOptions,manualRequiredOptions,criticalityOptions,sopData,docTypeOptions}) {

   
    console.log("form Data: ",formData); // 2 spaces indentation
    console.log("sopData is: ",sopData); // 2 spaces indentation

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };

    setFormData(updatedData);
  };


const handleSelectChange = (fieldName) => (selectedOption) => {
  setFormData((prev) => {
    let updated = { ...prev, [fieldName]: selectedOption };

    // 🔹 If department changes, clear subDepartment first
    if (fieldName === "ownerDepartment") {
      updated.subDepartment = null; // reset subDepartment

      // ✅ Also clear dropdown options immediately (empty dropdown)
      setSearchDesignationOptions([]);
      if (selectedOption) {
        getSubDeptsByDepartment(selectedOption.value); // fetch new sub depts
      }
    }

    return updated;
  });
};


  const handleNext = () => {

     const isValid = validateForm();
      if (!isValid) {
        toast.error("Fill in the required fields"); // one generalized error
        return; // stop navigation
      }

    onNext && onNext();
  };

  // const [searchDeptOptions, setSearchDeptOptions] = useState([]);
  const [searchDesignationOptions, setSearchDesignationOptions] = useState([]);
  // const [rightLevelValueOptions, setRightLevelValueOptions] = useState([]);
  const [cityValueOptions, setCityValueOptions] = useState([]);
  const [invalidFields, setInvalidFields] = useState({});
  

  const initialOptionsArray = [
    { value: "", label: "Please Select...", isDisabled: true },
  ];

     //get all departments
const getAllCities = async () => {
      try {
            // options = [];
            console.log("anum before function: ");

            const response = await CityManagement.listActiveCities();
            console.log("anum hi bye: "+ response);
            const res = await response.json();
            const data = res.data;
            
            let options = [...initialOptionsArray];
            data.forEach((element) => {
              options.push({
                value: element.CITY_NAME,
                label: element.CITY_NAME,
              });
            });
            setCityValueOptions(options);
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

    useEffect(() => {
      getAllCities();
    }, []);

  const labelStyle = {  marginBottom: '0.3rem' };
  const selectStyle = {
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #ced4da',
    backgroundColor: '#fff',
    width: '100%',
  };

const validateForm = () => {
  const newInvalids = {};

  if (!formData.sop_name.trim()) newInvalids.sop_name = true;
  if (!formData.ownerDepartment || !formData.ownerDepartment.value) newInvalids.ownerDepartment = true;
  // if (!formData.subDepartment || !formData.subDepartment.value) newInvalids.subDepartment = true;
  if (!formData.reviewedStakeholders || formData.reviewedStakeholders.length === 0) newInvalids.reviewedStakeholders = true;
  if (!formData.city || !formData.city.value) newInvalids.city = true;
  if (!formData.version.trim()) newInvalids.version = true;
  if (!formData.criticalityLevel) newInvalids.criticalityLevel = true;
  if (!formData.preparedBy || !formData.preparedBy.value) newInvalids.preparedBy = true;
    if (!formData.manualRequired) newInvalids.manualRequired = true;
    if (!formData.docType) newInvalids.docType = true;

  if (!formData.infoClassification || !formData.infoClassification) newInvalids.infoClassification = true;

  setInvalidFields(newInvalids);
  console.log("invalid fields are:  ",newInvalids);

  return Object.keys(newInvalids).length === 0; // ✅ valid if no invalid fields
};

<style jsx>{`
  .invalid-field {
    border: 1px solid red !important;
    border-radius: 4px;
  }
    
`}


</style>
  return (
    <div className="container mt-4 p-4 border rounded bg-light">
      <h3 className="mb-4">Document Objective</h3>

      
      <div className="row g-3" >
 <div className="col-md-6" >
          <label style={labelStyle} className="form-label required">Owner Department</label>
          {/* <input type="text" name="ownerDepartment" className="form-control" value={formData.ownerDepartment} onChange={handleChange} /> */}
            <Select
                  instanceId={6}
                  options={searchDeptOptions}
                  onChange={handleSelectChange("ownerDepartment")}
                  name="ownerDepartment"
                 value={formData.ownerDepartment}
                  styles={getSelectStyles(invalidFields.ownerDepartment)}
                  // className={`form-select`}
                  // isOptionDisabled={(option) => option.disabled}
                  isDisabled={!!sopId} 
                />
        </div>
 <div className="col-md-6 " >
 
          <label style={labelStyle} className="form-label">Sub Department</label>
          {/* <input type="text" name="subDepartment" className="form-control" value={formData.subDepartment} onChange={handleChange} /> */}
            <Select
                  instanceId={6}
                  options={searchDesignationOptions}
                  onChange={handleSelectChange("subDepartment")}
                  name="subDepartment"
                 value={formData.subDepartment}
                  styles={getSelectStyles(invalidFields.subDepartment)}
                  // styles={colourStyles}
                  isDisabled={!!sopId} 

                />
        </div>

          <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label required">SOP Name</label>
          <input type="text" name="sop_name" className="form-control" style={invalidFields.sop_name ? { border: "1px solid red", borderRadius: "4px" } : {}}   value={formData.sop_name} onChange={handleChange}
          onBlur={async () => {
              const name = formData.sop_name.trim();
               if (containsDangerousPattern(name)) {
                setInvalidFields((prev) => ({ ...prev, sop_name: true }));
                toast.error("SOP Name contains unsafe patterns (XSS/SQL injection detected)!");
                return;
              }
               // ✅ Check duplicate via backend
            if (name && !sopId) {
              try {
                const res = await ComplianceService.checkSOPByName(
                  name,
                  formData.ownerDepartment.value,
                  formData.subDepartment.value
                );
                const data= await res.json();
// console.log("taimoor",data);
               if (data.exists) {
                  setInvalidFields((prev) => ({ ...prev, sop_name: true }));
                  // setFormData((prev) => ({ ...prev, sop_name: "" })); // clear field
                 toast.error(
                  "SOP Name already exists in this Department/Sub-Department!"
                );
                } else {
                  setInvalidFields((prev) => ({ ...prev, sop_name: false }));
                //     toast.error(
                //   "SOP Name is correct"
                // );
                }
              } catch (err) {
                toast.error("Error checking SOP name. Please try again.");
                console.error("❌ SOP check failed:", err);
              }
            }
          }
          }
          disabled={!!sopId}   // ✅ use disabled instead of isDisabled
 />
        </div>

 <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label required">Document Type</label>
          {/* <input type="text" name="ownerDepartment" className="form-control" value={formData.ownerDepartment} onChange={handleChange} /> */}
           <Select
          options={docTypeOptions}
          
          placeholder="Select Doc Type"
          className={`form-select`}
          value={formData.docType || null}
          onChange={(selectedOption) => {
          setFormData(prev => ({
            ...prev,
            docType: selectedOption, // or selectedOption.value if you only need the value
          }));
        }}
        styles={getSelectStyles(invalidFields.docType)}
        isDisabled={!!sopId} 
  />
        </div>

       
 
        <div className="col-md-6 " style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Stakeholders</label>
            <Select
                  instanceId={6}
                  options={searchDeptOptions}
                  onChange={handleSelectChange("stakeholders")}
                  name="stakeholders"
                 value={formData.stakeholders}
                styles={getSelectStyles(invalidFields.stakeholders)}

                 isMulti // <-- makes it multi-select
                />
        </div>

       
        <div className="col-md-6 " style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label required">City</label>
             <Select
                  instanceId={6}
                  options={cityValueOptions}
                  onChange={handleSelectChange("city")}
                  name="city"
                 value={formData.city}
                 styles={getSelectStyles(invalidFields.city)}

                  
                  // isOptionDisabled={(option) => option.disabled}
                />
        </div>

     <div className="col-md-6 " style={{ marginTop: "10px" }}>
    <label style={labelStyle} className="form-label required">Version</label>
    <input
      type="text"
      name="version"
      className="form-control"
      style={invalidFields.version ? { border: "1px solid red", borderRadius: "4px" } : {}}
      value={formData.version}
      placeholder="e.g. 1.0, 2.0"
      onChange={(e) => {
        const value = e.target.value;

        // ✅ Allow only digits and one dot
        if (/^[0-9]*\.?[0-9]*$/.test(value)) {
          setFormData((prev) => ({
            ...prev,
            version: value,
          }));
        }
      }}
    />
  </div>


        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label required">Criticality Level</label>
          <Select
            options={criticalityOptions}
            name="criticalityLevel"
            placeholder="Select..."
            className="form-select"
            value={formData.criticalityLevel}   // 👈 direct object
            onChange={(selectedOption) =>
              setFormData(prev => ({
                ...prev,
                criticalityLevel: selectedOption   // 👈 always store object or null
              }))
            }
            styles={getSelectStyles(invalidFields.criticalityLevel)}

          />
        </div>

        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Date of Approval</label>
          <input type="date" name="dateOfApproval"  className="form-control" value={formData.dateOfApproval} onChange={handleChange} />
        </div>

        <div className="col-md-6 " style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label required">Prepared By</label>
          <Select
                  // instanceId={6}
                  options={preparedByOptions}
                  onChange={handleSelectChange("preparedBy")}
                  name="preparedBy"
                  value={formData.preparedBy}
                  styles={getSelectStyles(invalidFields.preparedBy)}
                  
                />
        </div>

        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label required">Reviewed Stakeholders</label>
           <Select
                  // instanceId={6}
                  options={rightLevelValueOptions}
                  onChange={handleSelectChange("reviewedStakeholders")}
                  name="reviewedStakeholders"
                 value={formData.reviewedStakeholders}
                  styles={getSelectStyles(invalidFields.reviewedStakeholders)}
                  isMulti
                />
        </div>

              <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Approved By</label>
           <Select
                  // instanceId={6}
                  options={rightLevelValueOptions}
                  onChange={handleSelectChange("approvedBy")}
                  name="approvedBy"
                 value={formData.approvedBy}
                  styles={colourStyles}
                  isMulti
                />
        </div>

        {/* <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Reviewed By (R&PA)</label>
           <Select
                  // instanceId={6}
                  options={rightLevelValueOptions}
                  onChange={handleSelectChange("reviewByRPA")}
                  name="reviewByRPA"
                 value={formData.reviewByRPA}
                  styles={colourStyles}
                  isMulti
                />
        </div> */}
        {/* <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Approved By (HOD)</label>
           <Select
                  // instanceId={6}
                  options={rightLevelValueOptions}
                  onChange={handleSelectChange("approvedByHOD")}
                  name="approvedByHOD"
                 value={formData.approvedByHOD}
                  styles={colourStyles}
                  isMulti
                />
        </div> */}

        {/* <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Approved By (CEO)</label>
              <Select
                  // instanceId={6}
                  options={rightLevelValueOptions}
                  onChange={handleSelectChange("approvedByCEO")}
                  name="approvedByCEO"
                 value={formData.approvedByCEO}
                  styles={colourStyles}
                  // isOptionDisabled={(option) => option.disabled}
                />
        </div> */}

      <div className="col-md-6" style={{marginTop: "10px"}}>
  <label style={labelStyle} className="form-label required" >Information Classification</label>
  <Select
    options={infoClassificationOptions}
    placeholder="Select Information Classification"
    value={formData.infoClassification || null}
    onChange={(selectedOption) => {
      setFormData(prev => ({
        ...prev,
        infoClassification: selectedOption
      }));
    }}
   styles={getSelectStyles(invalidFields.infoClassification)}

  />
</div>
      <div className="col-md-6" style={{marginTop: "10px"}}>
  <label style={labelStyle} className="form-label required">Mannual Required</label>
  <Select
    options={manualRequiredOptions}
    
    placeholder="Select Mannual Required"
    className={`form-select`}
    value={formData.manualRequired || null}
    onChange={(selectedOption) => {
      setFormData(prev => ({
        ...prev,
        manualRequired: selectedOption
      }));
    }}
    styles={getSelectStyles(invalidFields.manualRequired)}


  />
</div>
      </div>

          <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
       
            <button onClick={handleNext} style={{ background: "#284E93", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>Next</button>
          </div>
    </div>
  );
}
