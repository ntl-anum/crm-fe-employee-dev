import AddClause from "@/helpers/AddClause";
import { useEffect, useState } from 'react';
import Select from "react-select";
import {
  colourStyles,
  customTheme,
} from "../../components/SelectStyleComponent";
import { toast } from "react-toastify";



export default function Tab4Resonsibilities({ formData, setFormData, onNext, onPrev , roles,
  setRoles,
  escalationRows,
  setEscalationRows,formType, clauses, addClause, deleteClause, updateClause,searchDeptOptions,searchDesignationOptions,validateClauses}) {
  

  const [invalidFields, setInvalidFields] = useState({ roles: [], escalation: [] });

   const getSelectStyles = (invalid) => ({
    control: (base) => ({
      ...base,
      border: invalid ? "1px solid red" : base.border,
      boxShadow: "none",
      "&:hover": {
        border: invalid ? "1px solid red" : base.border,
      },
      minHeight: "38px",
    }),
  });

  const validateForm = () => {
    const rolesInvalid = roles.map(role => ({
      dept: !role.dept,
      responsibility: !role.responsibility.trim(),
    }));

    const escalationInvalid = escalationRows.map(row => ({
      designation: !row.designation,
      duration: !row.duration.trim(),
    }));

    const hasInvalidRoles = rolesInvalid.some(r => r.dept || r.responsibility);
    const hasInvalidEscalation = escalationInvalid.some(e => e.designation || e.duration);

    if (roles.length === 0 || escalationRows.length === 0 ) {
      toast.error("Required at least one row in Roles and Escalation.");
      setInvalidFields({ roles: rolesInvalid, escalation: escalationInvalid });
      return false;
    }

    if(hasInvalidRoles || hasInvalidEscalation){
      //toast.error("Fill in all required fields.");
       setInvalidFields({ roles: rolesInvalid, escalation: escalationInvalid });
      return false;
    }

    setInvalidFields({ roles: [], escalation: [] });
    return true;
  };

    const handleNext = () => {
    if (!validateForm()) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Example: In "Scope Page"
      const pageSections = ["Logs Maintenance","KPI Monitoring","Reporting"
      ];

      const sopType = formData.sopType?.value;

        // ✅ Get enhanced validation results
  const validationResult = validateClauses(clauses, sopType, pageSections);
  
  if (!validationResult.isValid) {
    // 🔹 Check for security issues first
        const hasSecurityError = validationResult.invalidSections.some(sec => sec.error === "security");
        
        if (hasSecurityError) {
          // 🔹 Single generic security alert
          toast.error("Security alert: Please remove any scripts, HTML tags, or suspicious content from the clauses.");
          return;
        }
        
    // ✅ Set invalid clause IDs for red border styling
    setInvalidClauseIds(validationResult.invalidClauseIds);
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
    console.log(JSON.stringify(roles, null, 2)); // 2 spaces indentation
    console.log(JSON.stringify(escalationRows, null, 2)); // 2 spaces indentation

    onNext && onNext();
          return;

  };

// ✅ Add state to track invalid clause IDs (add this to your component state)
const [invalidClauseIds, setInvalidClauseIds] = useState({});

   const handlePrev = () => {
    onPrev && onPrev();
  };

     const addRole = () => {

  if (roles.length >= 20) {
    toast.error("You can only add up to 20 roles.");
    return;
  }
    setRoles([...roles, { dept: "", responsibility: "" }]);
  };

  const deleteRole = (index) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const handleRoleChange = (index, field, value) => {
    const updated = [...roles];

    if (field === "dept") {
    // check if department already exists in other rows
    const isDuplicate = roles.some((r, i) => i !== index && r.dept === value);

    if (isDuplicate) {
      toast.error("This dept is already assigned to Role.");
      // revert to blank / unselected
      updated[index][field] = "";
    } else {
      updated[index][field] = value;
    }
  } else {
    updated[index][field] = value;
  }

    setRoles(updated);
  };

const addEscalationRow = () => {
  if (escalationRows.length >= 4) {
  toast.error("You can only add up to 4 escalation levels.");
  return;
}

  setEscalationRows((prev) => [
    ...prev,
    { level: `Level ${prev.length + 1}`, designation: "", duration: "" }
  ]);
};

const removeEscalationRow = (index) => {
  const updated = escalationRows.filter((_, i) => i !== index);
  // reassign levels so they stay sequential after deletion
  const reindexed = updated.map((row, i) => ({
    ...row,
    level: `Level ${i + 1}`
  }));
  setEscalationRows(reindexed);
};

const handleInputChange = (index, field, value) => {
  const updated = [...escalationRows];
   if (field === "designation") {
    // check if department already exists in other rows
    const isDuplicate = escalationRows.some((r, i) => i !== index && r.designation === value);

    if (isDuplicate) {
      toast.error("This designation is already assigned to escalation.");
      // revert to blank / unselected
      updated[index][field] = "";
    } else {
      updated[index][field] = value;
    }
  } else {
    updated[index][field] = value;
  }
  setEscalationRows(updated);
};

  return (
    
    <div className="p-3 border rounded shadow-sm">
        {/* Roles and Responsibilities Section */}
        <div className="mb-4 mt-1 p-3 border rounded shadow-sm">
      <div className="mt-1">
         <div className="mb-0 ml-1 d-flex">
        <h5 className="fw-bold mb-4">{formType === 'service' ? '10. ': '5. '}Roles and Responsibilities</h5>
        <button
        type="button"
        className="btn custom-bg-color ml-3"
      style={{    padding: "1px 7px 1px 7px", color:"white", height:"28px" }}
        onClick={addRole}
      >
        <i className="fa fa-plus"></i>
      </button>
      </div>
        {roles.map((role, index) => (
          <div key={index} className="row g-2 align-items-start mb-2">
            <div className="col-md-4">
        
               <Select
                  instanceId={6}
                  options={searchDeptOptions}
                  name="dept"
                    value={searchDeptOptions.find(opt => opt.value === role.dept) || null}
                  onChange={(selectedOption) =>
                  handleRoleChange(index, 'dept', selectedOption ? selectedOption.value : "")
                }
                  styles={getSelectStyles(invalidFields.roles[index]?.dept)}
                  // isOptionDisabled={(option) => option.disabled}
                />
            </div>
            <div className="col-md-7">
              <textarea
                className="form-control"
                placeholder="Responsibility"
                rows={3}
                value={role.responsibility}
                onChange={(e) => handleRoleChange(index, 'responsibility', e.target.value)}
                 style={{
                  border: invalidFields.roles[index]?.responsibility ? '1px solid red' : '',width:"693px"
                }}
              />
            </div>
            <div className="d-flex justify-content-center align-items-start">
              <button
                type="button"
                 className="btn btn-danger ms-1"
                style={{ padding: "0.3rem 0.5rem", color:"white",marginLeft:"19px" }}
                onClick={() => deleteRole(index)}
                title="Remove"
              >
                 <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
        {/* <button className="btn btn-primary px-4"
          style={{
          background: "rgb(40, 78, 147)",
          color: "white",
          marginTop:"10px",
          marginBottom:"10px"
        }} onClick={addRole}>
          + Add Role
        </button> */}
      </div>
      </div>

        <div className="mb-4 mt-4 p-3 border rounded shadow-sm">
           <div className="mb-2 ml-1 d-flex">
          <h5 className="fw-bold mb-3">{formType === 'service' ? '11. ': '6. '} Escalation Matrix</h5>

        <button
        type="button"
        className="btn custom-bg-color ml-3"
      style={{    padding: "1px 7px 1px 7px", color:"white", height:"28px" }}
        onClick={addEscalationRow}
      >
        <i className="fa fa-plus"></i>
      </button>
      </div>
          {escalationRows.map((row, index) => (
            <div key={index} className="row g-2 mb-2">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Level"
                  // value={row.level}
                   value={row.level}
                  // onChange={(e) => handleInputChange(index, 'level', e.target.value)}
                  disabled
                />
              </div>
              <div className="col-md-4">
                {/* <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Designation"
                  value={row.designation}
                  onChange={(e) => handleInputChange(index, 'designation', e.target.value)}
                /> */}
                  <Select
                  instanceId={6}
                  options={searchDesignationOptions}
                  name="designation"
                   value={searchDesignationOptions.find(opt => opt.value === row.designation) || null}
                  onChange={(selectedOption) =>
                  handleInputChange(index, 'designation', selectedOption ? selectedOption.value : "")
                }
                   styles={getSelectStyles(invalidFields.escalation[index]?.designation)}
                  // isOptionDisabled={(option) => option.disabled}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Time Duration"
                  value={row.duration}
                  onChange={(e) => handleInputChange(index, 'duration', e.target.value)}
                     style={{
                  border: invalidFields.escalation[index]?.duration ? '1px solid red' : '',width:"400px"
                }}
                />
              </div>
              <div className="col-md-1 text-end">
                <button
                  type="button"
                  className="btn btn-danger ms-1"
                style={{ padding: "0.3rem 0.5rem", color:"white",marginLeft:"8px" }}
                  onClick={() => removeEscalationRow(index)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
          {/* <button  className="btn btn-primary px-4"
          style={{
          background: "rgb(40, 78, 147)",
          color: "white",
          marginTop:"10px",
          marginBottom:"10px"
        }} onClick={addEscalationRow}>
            + Add Level
          </button> */}
    
        </div>
<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  {/* <h6 className="fw-bold mb-2">{formType === 'service' ? '12. ': '7. '} Logs Maintenance</h6> */}
  <AddClause 
               clauses={clauses}
               addClause={addClause}
               deleteClause={deleteClause}
               updateClause={updateClause}
              currentNo={formType === 'service' ? 12 : 7}
              sectionName="Logs Maintenance" // Unique heading identifier
       invalidClauseIds={invalidClauseIds}   // 👈 pass this


           />

</div>






      {/* Navigation Buttons */}
      <div className="mt-4 d-flex justify-content-between">
        <button onClick={handlePrev} className="btn btn-secondary" style={{ background: "#aaa", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Previous
        </button>
        <button onClick={handleNext} className="btn btn-primary" style={{background: "#284E93", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Next
        </button>
      </div>
    </div>


  );

}
