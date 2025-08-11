import { initializeClauseFunctions } from "@/helpers/clause-utils";
import { useEffect, useState } from 'react';

export default function Service1({ formData, setFormData, onNext, onPrev ,formType}) {

  useEffect(() => {
    initializeClauseFunctions();
  }, []);

  const handleNext = () => onNext && onNext();
  const handlePrev = () => onPrev && onPrev();

 
  return (
<>
<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">4. Provisioning of Service for Existing Customer</h6>
  <button
    type="button"
   className="btn btn-primary px-4"
          style={{
          background: "rgb(40, 78, 147)",
          color: "white",
          marginTop:"10px",
          marginBottom:"10px"
        }}
    onClick={() => window.addClause('clause-4', true)}
  >
    + Add Clause
  </button>

  <ol id="clause-4" className="clause-list ms-2" style={{ listStyleType: "none" }}></ol>

</div>

<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">5. Provisioning of Service for New Customer</h6>
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

  <ol id="clause-5" className="clause-list ms-2" style={{ listStyleType: "none" }}></ol>

</div>

 
<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">6. Packages</h6>
  <button
    type="button"
    className="btn btn-primary px-4"
          style={{
          background: "rgb(40, 78, 147)",
          color: "white",
          marginTop:"10px",
          marginBottom:"10px"
        }}
    onClick={() => window.addClause('clause-6', true)}
  >
    + Add Clause
  </button>

  <ol id="clause-6" className="clause-list ms-2" style={{ listStyleType: "none" }}></ol>

</div>



      {/* Navigation Buttons */}
      <div className="mt-4 d-flex justify-content-between">
        <button onClick={handlePrev} className="btn btn-secondary" style={{ background: "#aaa", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Previous
        </button>
        <button onClick={handleNext} className="btn btn-primary" style={{ background: "#284E93", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Next
        </button>
      </div>
</>

  );

}
