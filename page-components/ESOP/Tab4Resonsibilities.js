import AddClause from "@/helpers/AddClause";
import { useEffect, useState } from 'react';
import Select from "react-select";
import {
  colourStyles,
  customTheme,
} from "../../components/SelectStyleComponent";


export default function Tab4Resonsibilities({ formData, setFormData, onNext, onPrev , roles,
  setRoles,
  escalationRows,
  setEscalationRows,formType, clauses, addClause, deleteClause, updateClause,searchDeptOptions,searchDesignationOptions}) {
    
  const [image, setImage] = useState(null);
  const [explanationImage, setExplanationImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

const handleExplanationImageUpload = (e) => {
  if (e.target.files && e.target.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      setExplanationImage(reader.result);
      setShowModal(false);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
};


    const handleNext = () => {
    console.log(JSON.stringify(roles, null, 2)); // 2 spaces indentation
    console.log(JSON.stringify(escalationRows, null, 2)); // 2 spaces indentation

    onNext && onNext();
  };

   const handlePrev = () => {
    onPrev && onPrev();
  };

     const addRole = () => {
    setRoles([...roles, { department: "", responsibility: "" }]);
  };

  const deleteRole = (index) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const handleRoleChange = (index, field, value) => {
    const updated = [...roles];
    updated[index][field] = value;
    setRoles(updated);
  };

  const addEscalationRow = () => {
    setEscalationRows([...escalationRows, { level: "", designation: "", duration: "" }]);
  };

  const removeEscalationRow = (index) => {
    setEscalationRows(escalationRows.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...escalationRows];
    updated[index][field] = value;
    setEscalationRows(updated);
  };

  return (
    
    <div className="p-3 border rounded shadow-sm">
        {/* Roles and Responsibilities Section */}
        <div className="mb-4 mt-4 p-3 border rounded shadow-sm">
      <div className="mt-4">
        <h6 className="fw-bold mb-2">{formType === 'service' ? '10. ': '5. '}Roles and Responsibilities</h6>
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
                  styles={colourStyles}
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
              />
            </div>
            <div className="d-flex justify-content-center align-items-start">
              <button
                type="button"
                 className="btn btn-danger ms-1"
                style={{ padding: "0.3rem 0.5rem", color:"white",marginLeft:"10px" }}
                onClick={() => deleteRole(index)}
                title="Remove"
              >
                 <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
        <button className="btn btn-primary px-4"
          style={{
          background: "rgb(40, 78, 147)",
          color: "white",
          marginTop:"10px",
          marginBottom:"10px"
        }} onClick={addRole}>
          + Add Another Role
        </button>
      </div>
      </div>

        <div className="mb-4 mt-4 p-3 border rounded shadow-sm">
          <h6 className="fw-bold mb-3">{formType === 'service' ? '11. ': '6. '} Escalation Matrix</h6>
          {escalationRows.map((row, index) => (
            <div key={index} className="row g-2 mb-2">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Level"
                  value={row.level}
                  onChange={(e) => handleInputChange(index, 'level', e.target.value)}
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
                  styles={colourStyles}
                  // isOptionDisabled={(option) => option.disabled}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Time Duration"
                  value={row.duration}
                  onChange={(e) => handleInputChange(index, 'duration', e.target.value)}
                />
              </div>
              <div className="col-md-2 text-end">
                <button
                  type="button"
                  className="btn btn-danger ms-1"
                style={{ padding: "0.3rem 0.5rem", color:"white",marginLeft:"10px" }}
                  onClick={() => removeEscalationRow(index)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
          <button  className="btn btn-primary px-4"
          style={{
          background: "rgb(40, 78, 147)",
          color: "white",
          marginTop:"10px",
          marginBottom:"10px"
        }} onClick={addEscalationRow}>
            + Add Escalation Level
          </button>
    
        </div>
<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">{formType === 'service' ? '12. ': '7. '} Logs Maintenance</h6>
  <AddClause 
               clauses={clauses}
               addClause={addClause}
               deleteClause={deleteClause}
               updateClause={updateClause}
              currentNo={formType === 'service' ? 12 : 7}
              sectionName="Logs Maintenance" // Unique heading identifier

           />

</div>

<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">{formType === 'service' ? '13.': '8. '} KPI Monitoring</h6>
   <AddClause 
               clauses={clauses}
               addClause={addClause}
               deleteClause={deleteClause}
               updateClause={updateClause}
              currentNo={formType === 'service' ? 13 : 8}
              sectionName="KPI Monitoring" // Unique heading identifier

           />
</div>

<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">{formType === 'service' ? '14. ': '9. '} Reporting</h6>
   <AddClause 
               clauses={clauses}
               addClause={addClause}
               deleteClause={deleteClause}
               updateClause={updateClause}
              currentNo={formType === 'service' ? 14 : 9}
              sectionName="Reporting" // Unique heading identifier

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
