'use client';

import { useState, useEffect } from 'react';
import AddClause from "@/helpers/AddClause";
import { ProfessionalInfoService } from '@/services/UtilityService/ProfessionalInfo';
import { toast } from "react-toastify";
import { APP_ROUTES } from "../../helpers/enums";
import Router from "next/router";
import Select from "react-select";
import {
  colourStyles,
  customTheme,
} from "../../components/SelectStyleComponent";


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


export default function Tab2ObjectiveScope({ formData, setFormData, onNext, onPrev, history, addHistoryRow, removeHistoryRow, updateHistoryField, clauses, addClause, deleteClause, updateClause,preparedByOptions,validateClauses }) {

  useEffect(() => {
    setFormData(prev => ({
      documentObjective: '',
      ...prev
    }));
    getAllEmployees();
  }, []);

   const [rightLevelValueOptions, setRightLevelValueOptions] = useState([]);

  const initialOptionsArray = [
    { value: "", label: "Please Select...", isDisabled: true },
  ];

  const colourStyles = {
  control: (provided) => ({
    ...provided,
    width: "180px"   // fixed width
  }),
  menu: (provided) => ({
    ...provided,
    width: "180px"
  })
};

const [invalidFields, setInvalidFields] = useState({
  documentobjective: false,
  history: []
});

const validateForm = () => {
  let isValid = true;

  const newInvalidFields = {
    documentobjective: !formData.documentobjective?.trim(),
    history: []
  };

  if (newInvalidFields.documentobjective) isValid = false;

  if (!history || history.length === 0) {
    isValid = false;
    newInvalidFields.history.push({ noRow: true });
  } else {
    let validRowExists = false;

    history.forEach((row, idx) => {
      const rowInvalid = {
        version: !row.version?.trim(),
      preparedBy: !row.preparedBy?.trim(),
        approvedBy: !row.approvedBy,
        datetime: !row.datetime,
        changes: !row.changes?.trim()
      };

      const rowIsValid = !Object.values(rowInvalid).some(Boolean);

      if (rowIsValid) validRowExists = true;

      if (!rowIsValid) isValid = false;
      newInvalidFields.history[idx] = rowInvalid;
    });

    if (!validRowExists) {
      isValid = false;
      newInvalidFields.history.general = true;
    }
  }

  setInvalidFields(newInvalidFields);
  return { isValid, invalidFields: newInvalidFields }; // 👈 return both
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
           Router.push(APP_ROUTES.SERVER_ERROR);
         }
             };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };

    setFormData(updatedData);
  };

  const handleSelectChange = (fieldName) => (selectedOption) => {
  setFormData(prev => ({
    ...prev,
    [fieldName]: selectedOption,
  }));

    if (fieldName === "ownerDepartment" && selectedOption) {
    getSubDeptsByDepartment(selectedOption.value);
  }

  // If needed, do other stuff based on fieldName and selectedOption here
};

  //    const handleNext = () => {
  //     const { isValid, invalidFields } = validateForm();

  //     if (invalidFields.history?.some(h => h.noRow)) {
  //       toast.error("At least one history row must be added");
  //       return;
  //     } else if (invalidFields.history?.general) {
  //       toast.error("Please fill in all required fields");

  //       return;
  //     }

  //     if (!isValid) {
  //       toast.error("Please fill in all required fields");
  //       return;
  //     }

  //         // Example: In "Scope Page"
  //     const pageSections = ["Scope"];
  //     // ✅ Extract value from sopType object
  //     const sopType = formData.sopType?.value;

  //        // ✅ Get enhanced validation results
  // const validationResult = validateClauses(clauses, sopType, pageSections);
  
  // if (!validationResult.isValid) {
  //   // ✅ Set invalid clause IDs for red border styling
  //   setInvalidClauseIds(validationResult.invalidClauseIds);
    
  //   validationResult.invalidSections.forEach(sec => {
  //     if (sec.error === "missing") {
  //       toast.error(`Section "${sec.section}" is required.`);
  //     } else if (sec.error === "empty") {
  //       toast.error(`Section "${sec.section}" has ${sec.count} empty clause(s).`);
  //     }
  //   });
  //   return;
  // }

  // // ✅ Clear invalid clause IDs if validation passes
  //      setInvalidClauseIds({});
  

  //   console.log(JSON.stringify(clauses, null, 2)); // 2 spaces indentation
  //   onNext && onNext();
  //         return;
  // };
  
// ✅ Updated handleNext function with simple security alert
const handleNext = () => {
  const { isValid, invalidFields } = validateForm();

  if (invalidFields.history?.some(h => h.noRow)) {
    toast.error("At least one history row must be added");
    return;
  } else if (invalidFields.history?.general) {
    toast.error("Please fill in all required fields");
    return;
  }

  if (!isValid) {
    toast.error("Please fill in all required fields");
    return;
  }

  // Example: In "Scope Page"
  const pageSections = ["Scope"];
  // ✅ Extract value from sopType object
  const sopType = formData.sopType?.value;

  // ✅ Get enhanced validation results
  const validationResult = validateClauses(clauses, sopType, pageSections);
  
  if (!validationResult.isValid) {
    // ✅ Set invalid clause IDs for red border styling
    setInvalidClauseIds(validationResult.invalidClauseIds);
    
    // 🔹 Check for security issues first
    const hasSecurityError = validationResult.invalidSections.some(sec => sec.error === "security");
    
    if (hasSecurityError) {
      // 🔹 Single generic security alert
      toast.error("Security alert: Please remove any scripts, HTML tags, or suspicious content from the clauses.");
      return;
    }
    
    // 🔹 Handle other validation errors
    validationResult.invalidSections.forEach(sec => {
      if (sec.error === "missing") {
        toast.error(`Section "${sec.section}" is required.`);
      } else if (sec.error === "empty") {
        toast.error(`Section "${sec.section}" has ${sec.count} empty clause(s).`);
      }
    });
    return;
  }

  // ✅ Clear invalid clause IDs if validation passes
  setInvalidClauseIds({});

  console.log(JSON.stringify(clauses, null, 2)); // 2 spaces indentation
  onNext && onNext();
  return;
};

// ✅ Add state to track invalid clause IDs (add this to your component state)
const [invalidClauseIds, setInvalidClauseIds] = useState({});
   const handlePrev = () => {
    onPrev && onPrev();
  };


  useEffect(() => {

  



  }, []);
    //  console.log("preparedByOptions:", preparedByOptions);

    
  return (
    <div className="container mt-3">
      <div className="mb-4 p-3 border rounded shadow-sm">
        <h5 className="fw-bold mb-2 required">Document Objective</h5>
        <textarea
         name="documentobjective"
          className="form-control mt-3 "    
          style={{
          minHeight: "80px",
          resize: "vertical",
          border: invalidFields.documentobjective ? "1px solid red" : "1px solid #ced4da"
        }}
          rows="10"
          value={formData.documentobjective || ''}
          onChange={handleChange}
        />
      </div>

      
          {/* Document History */}
<div className="mb-4 p-3 border rounded shadow-sm">
  <div className="mb-0 ml-1 d-flex">
  <h5 className="fw-bold required">Document History </h5>
    <button
    type="button"
    className="btn custom-bg-color ml-3"
   style={{    padding: "1px 7px 1px 7px", color:"white", height:"28px" }}
    onClick={addHistoryRow}
  >
    <i className="fa fa-plus"></i>
  </button>
  </div>
  {history?.length > 0
    ? history.map((row, index) => (
        <div key={index} className="row g-2 align-items-center mb-2 mt-3">
          <div className="col-md-1">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Ver."
              value={row.version}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only digits + one dot
                if (/^[0-9]*\.?[0-9]*$/.test(value)) {
                  updateHistoryField(index, "version", value);
                }
              }}
              style={{
                border: invalidFields.history?.[index]?.version
                  ? "1px solid red"
                  : "1px solid #ced4da",
              }}
            />
          </div>

          <div className="col-md-2">
            <Select
              options={preparedByOptions}
              placeholder="Prepared By"
              className="ml-0"
              styles={getSelectStyles(
                invalidFields.history?.[index]?.preparedBy
              )}
           value={
    preparedByOptions.find(
      (opt) => opt.value === history[index]?.preparedBy
    ) || null
  }
              
              onChange={(selectedOption) =>
                updateHistoryField(
                  index,
                  "preparedBy",
                  selectedOption ? selectedOption.value : null
                )
              }
            />
          </div>

          <div className="col-md-2">
            <Select
              options={rightLevelValueOptions}
              placeholder="Approved By"
              className="ml-0 required"
              styles={getSelectStyles(
                invalidFields.history?.[index]?.approvedBy
              )}
              value={
                rightLevelValueOptions.find(
                  (opt) => opt.value === row.approvedBy
                ) || null
              }
              onChange={(selectedOption) =>
                updateHistoryField(index, "approvedBy", selectedOption.value)
              }
            />
          </div>

          <div className="col-md-2">
            <input
              type="date"
              className="form-control form-control-sm ml-0"
              value={row.datetime}
              onChange={(e) =>
                updateHistoryField(index, "datetime", e.target.value)
              }
              style={{
                border: invalidFields.history?.[index]?.datetime
                  ? "1px solid red"
                  : "1px solid #ced4da",
              }}
            />
          </div>

          <div className="col-md-4">
            <textarea
              rows="3"
              className="form-control form-control-sm ml-0"
              placeholder="Additional Notes"
              style={{
                resize: "vertical",
                maxHeight: "100px",
                width: "398px",
                border: invalidFields.history?.[index]?.changes
                  ? "1px solid red"
                  : "1px solid #ced4da",
              }}
              value={row.changes}
              onChange={(e) =>
                updateHistoryField(index, "changes", e.target.value)
              }
            />
          </div>

          <div className="col-md-1">
            <button
              type="button"
              className="btn btn-danger"
              style={{
                padding: "0.3rem 0.5rem",
                color: "white",
                marginLeft: "8px",
              }}
              onClick={() => removeHistoryRow(index)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
      ))
    : null}


</div>


      {/* Navigation */}

         <div className="mb-4 p-3 border rounded shadow-sm">
        {/* <h6 className="fw-bold mb-2">1. Scope</h6> */}
         <AddClause 
        clauses={clauses}
        addClause={addClause}
        deleteClause={deleteClause}
        updateClause={updateClause}
        currentNo={1}
        sectionName="Scope" // Unique heading identifier
           invalidClauseIds={invalidClauseIds}   // 👈 pass this

        
    />
      </div>


           <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
            <button  onClick={handlePrev} style={{ background: "#aaa", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>Previous</button>
            <button onClick={handleNext} style={{ background: "#284E93", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>Next</button>
          </div>
    </div>
  );
}
