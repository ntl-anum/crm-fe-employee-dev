import { initializeClauseFunctions } from "@/helpers/clause-utils";
import { useEffect, useState } from 'react';

export default function Tab4Resonsibilities({ formData, setFormData, onNext, onPrev,formType }) {
  const [roles, setRoles] = useState([{ department: '', responsibility: '' }]);
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


  useEffect(() => {
    initializeClauseFunctions();
  }, []);

  const handleNext = () => onNext && onNext();
  const handlePrev = () => onPrev && onPrev();

    const [escalationRows, setEscalationRows] = useState([
    { level: '', designation: '', duration: '' },
  ]);

  const addEscalationRow = () => {
    setEscalationRows([...escalationRows, { level: '', designation: '', duration: '' }]);
  };

  const removeEscalationRow = (index) => {
    const updated = [...escalationRows];
    updated.splice(index, 1);
    setEscalationRows(updated);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...escalationRows];
    updated[index][field] = value;
    setEscalationRows(updated);
  };

  const addRole = () => {
    setRoles([...roles, { department: '', responsibility: '' }]);
  };

  const deleteRole = (index) => {
    const updated = [...roles];
    updated.splice(index, 1);
    setRoles(updated);
  };

  const handleRoleChange = (index, field, value) => {
    const updated = [...roles];
    updated[index][field] = value;
    setRoles(updated);
  };
  return (
    
    <div className="p-3 border rounded shadow-sm">
        {/* Roles and Responsibilities Section */}
      <div className="mt-4">
        <h6 className="fw-bold mb-2">{formType === 'service' ? '10. ': '5. '}Roles and Responsibilities</h6>
        {roles.map((role, index) => (
          <div key={index} className="row g-2 align-items-start mb-2">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Department"
                value={role.department}
                onChange={(e) => handleRoleChange(index, 'department', e.target.value)}
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
               className="btn btn-primary px-4"
          style={{
          background: "rgb(40, 78, 147)",
          color: "white",
          marginTop:"10px",
          marginBottom:"10px"
        }}
                onClick={() => deleteRole(index)}
                title="Remove"
              >
                  ×
              </button>
            </div>
          </div>
        ))}
        <button  className="btn btn-sm btn-outline-primary mb-2" onClick={addRole}>
          + Add Another Role
        </button>
      </div>
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
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Designation"
                  value={row.designation}
                  onChange={(e) => handleInputChange(index, 'designation', e.target.value)}
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
                  className="btn btn-sm btn-outline-danger" style={{padding:"6px 10px"}}
                  onClick={() => removeEscalationRow(index)}
                >
                  ×
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
    
        
<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">{formType === 'service' ? '12. ': '7. '} Logs Maintenance</h6>
  <button
    type="button"
    className="btn btn-primary px-4"
          style={{
          background: "rgb(40, 78, 147)",
          color: "white",
          marginTop:"10px",
          marginBottom:"10px"
        }}
   onClick={() =>
  formType === 'service'
    ? window.addClause('clause-12', true)
    : window.addClause('clause-7', true)
}
  >
    + Add Clause
  </button>

  <ol id={formType==='service' ? 'clause-12':'clause-7'} className="clause-list ms-2" style={{ listStyleType: "none" }}></ol>

</div>

<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">{formType === 'service' ? '13.': '8. '} KPI Monitoring</h6>
  <button
    type="button"
    className="btn btn-primary px-4"
          style={{
          background: "rgb(40, 78, 147)",
          color: "white",
          marginTop:"10px",
          marginBottom:"10px"
        }}
     onClick={() =>
  formType === 'service'
    ? window.addClause('clause-13', true)
    : window.addClause('clause-8', true)
}
  >
    + Add Clause
  </button>

  <ol id={formType==='service' ? 'clause-13':'clause-8'} className="clause-list ms-2" style={{ listStyleType: "none" }}></ol>

</div>

<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">{formType === 'service' ? '14. ': '9. '} Reporting</h6>
  <button
    type="button"
   className="btn btn-primary px-4"
          style={{
          background: "rgb(40, 78, 147)",
          color: "white",
          marginTop:"10px",
          marginBottom:"10px"
        }}
   onClick={() =>
  formType === 'service'
    ? window.addClause('clause-14', true)
    : window.addClause('clause-9', true)
}
  >
    + Add Clause
  </button>

  <ol id={formType==='service' ? 'clause-14':'clause-9'} className="clause-list ms-2" style={{ listStyleType: "none" }}></ol>

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
