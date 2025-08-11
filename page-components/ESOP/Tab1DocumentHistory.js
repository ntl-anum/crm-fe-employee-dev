'use client';

export default function DocumentObjectiveForm({ formData, setFormData, onNext, onPrev }) {

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };

    setFormData(updatedData);
  };

  const handleNext = () => {
    onNext && onNext();
  };

  const labelStyle = {  marginBottom: '0.3rem' };
  const selectStyle = {
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #ced4da',
    backgroundColor: '#fff',
    width: '100%',
  };

  return (
    <div className="container mt-4 p-4 border rounded bg-light">
      <h3 className="mb-4">Document Objective</h3>

      <div className="row g-3" >
        <div className="col-md-6">
          <label style={labelStyle} className="form-label">Owner Department</label>
          <input type="text" name="ownerDepartment" className="form-control" value={formData.ownerDepartment} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label style={labelStyle} className="form-label">Stakeholders</label>
          <input type="text" name="stakeholders" className="form-control" value={formData.stakeholders} onChange={handleChange} />
        </div>

        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Sub Department</label>
          <input type="text" name="subDepartment" className="form-control" value={formData.subDepartment} onChange={handleChange} />
        </div>

        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">City</label>
          <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} />
        </div>

        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Version</label>
          <input type="text" name="version" className="form-control" value={formData.version} onChange={handleChange} />
        </div>

        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Criticality Level</label>
          <select name="criticality" style={selectStyle} value={formData.criticality} onChange={handleChange}>
            <option value="">Choose...</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Date of Approval</label>
          <input type="date" name="dateOfApproval" className="form-control" value={formData.dateOfApproval} onChange={handleChange} />
        </div>

        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Prepared By</label>
          <input type="text" name="preparedBy" className="form-control" value={formData.preparedBy} onChange={handleChange} />
        </div>

        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Reviewed Stakeholders</label>
          <input type="text" name="reviewedStakeholders" className="form-control" value={formData.reviewedStakeholders} onChange={handleChange} />
        </div>

        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Approved By</label>
          <input type="text" name="approvedBy" className="form-control" value={formData.approvedBy} onChange={handleChange} />
        </div>

        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Approver Name</label>
          <input type="text" name="approverName" className="form-control" value={formData.approverName} onChange={handleChange} />
        </div>

        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Reviewed By</label>
          <input type="text" name="reviewedBy" className="form-control" value={formData.reviewedBy} onChange={handleChange} />
        </div>

        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Reviewer Name</label>
          <input type="text" name="reviewerName" className="form-control" value={formData.reviewerName} onChange={handleChange} />
        </div>

        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Information Classification</label>
          <select name="infoClassification" style={selectStyle} value={formData.infoClassification} onChange={handleChange}>
            <option value="">Choose...</option>
            <option value="Confidential">Confidential</option>
            <option value="Internal">Internal</option>
            <option value="Public">Public</option>
          </select>
        </div>

        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Mannual Required</label>
          <select name="infoClassification" style={selectStyle} value={formData.manualRequired} onChange={handleChange}>
            <option value="">Choose...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>

          </select>
        </div>
      </div>

          <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
       
            <button onClick={handleNext} style={{ background: "#284E93", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>Next</button>
          </div>
    </div>
  );
}
