import { initializeClauseFunctions } from "@/helpers/clause-utils";
import { useEffect, useState } from 'react';

export default function Service2({ formData, setFormData, onNext, onPrev,formType }) {

  useEffect(() => {
    initializeClauseFunctions();
  }, []);

  const handleNext = () => onNext && onNext();
  const handlePrev = () => onPrev && onPrev();


  return (
<>
<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">7. Locking/Unlocking of Service </h6>
  <button
    type="button"
     className="btn btn-primary px-4"
          style={{
          background: "rgb(40, 78, 147)",
          color: "white",
          marginTop:"10px",
          marginBottom:"10px"
        }}
    onClick={() => window.addClause('clause-7', true)}
  >
    + Add Clause
  </button>

  <ol id="clause-7" className="clause-list ms-2" style={{ listStyleType: "none" }}></ol>

</div>

<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">8. Charging Mechanism (Including MRC, OTC, VAS charges and Taxes)</h6>
  <button
    type="button"
      className="btn btn-primary px-4"
          style={{
          background: "rgb(40, 78, 147)",
          color: "white",
          marginTop:"10px",
          marginBottom:"10px"
        }}
    onClick={() => window.addClause('clause-8', true)}
  >
    + Add Clause
  </button>

  <ol id="clause-8" className="clause-list ms-2" style={{ listStyleType: "none" }}></ol>

</div>

 
<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">9. Support (Troubleshooting, Fault types) </h6>
  <button
    type="button"
     className="btn btn-primary px-4"
          style={{
          background: "rgb(40, 78, 147)",
          color: "white",
          marginTop:"10px",
          marginBottom:"10px"
        }}
    onClick={() => window.addClause('clause-9', true)}
  >
    + Add Clause
  </button>

  <ol id="clause-9" className="clause-list ms-2" style={{ listStyleType: "none" }}></ol>

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
