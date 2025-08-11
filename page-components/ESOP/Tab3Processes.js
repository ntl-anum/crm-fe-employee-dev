import { initializeClauseFunctions } from "@/helpers/clause-utils";
import { useEffect, useState } from 'react';

export default function Tab3Processes({ formData, setFormData, onNext, onPrev, formType }) {
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
      
      {/* Process Flow Section */}
      
      <div className="mb-4 p-3 border rounded shadow-sm">
        <h6 className="fw-bold mb-2">2. Definition</h6>
        <div className="mb-2">
          <button
             type="button"
          className="btn btn-primary px-4"
          style={{
          background: "rgb(40, 78, 147)",
          color: "white",
          marginTop:"10px",
          marginBottom:"10px"
        }}
            onClick={() => window.addClause('clause-2', true)}
          >
            + Add Clause
          </button>
        </div>
        <ol id="clause-2" className="clause-list ms-2" style={{ listStyleType: "none" }}></ol>
      </div>
      
      <div className="mb-4 p-3 border rounded shadow-sm">
        <h6 className="fw-bold mb-2">3. Process Flow</h6>
        <button
          type="button"
            className="btn btn-primary px-4"
          style={{
          background: "rgb(40, 78, 147)",
          color: "white",
          marginTop:"10px",
          marginBottom:"10px"
        }}
          onClick={() => window.addClause('clause-3', true)}
        >
          + Add Clause
        </button>
        <ol id="clause-3" className="clause-list ms-2" style={{ listStyleType: "none" }}></ol>
      </div>

{/* Process Explanation Section */}
{formType === 'process' && (
<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">4. Process Explanation</h6>
  <button
    type="button"
     className="btn btn-primary px-4"
          style={{
          background: "rgb(40, 78, 147)",
          color: "white",
          marginTop:"10px",
          marginBottom:"10px"
        }}
    onClick={() => window.addClause('clause-5', true)}
  >
    + Add Clause
  </button>

  {/* Upload Image Button */}
  <button
    type="button"
     className="btn btn-primary px-4"
          style={{
          background: "rgb(40, 78, 147)",
          color: "white",
          marginTop:"10px",
          marginBottom:"10px"
        }}
    onClick={() => setShowModal(true)}
  >
    Upload Image
  </button>

  <ol id="clause-5" className="clause-list ms-2" style={{ listStyleType: "none" }}></ol>

  {/* Show uploaded image (optional) */}
  {explanationImage && (
    <img
      src={explanationImage}
      alt="Explanation"
      className="img-fluid mt-3 border rounded"
      style={{ maxHeight: '250px' }}
    />
  )}
</div>
)};
{showModal && (
  <div
    className="modal fade show"
    tabIndex="-1"
    style={{
      display: 'block',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 1050,
    }}
  >
    <div
      className="modal-dialog modal-sm"
      style={{
        margin: '10% auto',
        maxWidth: '400px',
        pointerEvents: 'auto',
      }}
    >
      <div className="modal-content">
        {/* Header */}
        <div className="modal-header">
          <h5 className="modal-title">Upload Explanation Image</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowModal(false)}
            aria-label="Close"
          ></button>
        </div>

        {/* Body */}
        <div className="modal-body text-center">
          <input
            type="file"
            accept="image/*"
            className="form-control"
            style={{
              width: '75%',
              margin: '0 auto',
            }}
            onChange={handleExplanationImageUpload}
          />
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}


     

      {/* Navigation Buttons */}
      <div className="mt-4 d-flex justify-content-between">
        <button onClick={handlePrev} className="btn btn-secondary" style={{ background: "#aaa", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Previous
        </button>
        <button onClick={handleNext} className="btn btn-primary" style={{ background: "#284E93", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Next
        </button>
      </div>
    </div>


  );

}
