import AddClause from "@/helpers/AddClause";
import { useEffect, useState } from 'react';

export default function Service1({ formData, setFormData, onNext, onPrev ,formType, clauses, addClause, deleteClause, updateClause}) {


  const handleNext = () => onNext && onNext();
  const handlePrev = () => onPrev && onPrev();

 
  return (
<>
<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">4. Provisioning of Service for Existing Customer</h6>
  <AddClause 
                clauses={clauses}
                addClause={addClause}
                deleteClause={deleteClause}
                updateClause={updateClause}
               currentNo={4}
               sectionName="Provisioning of Service for Existing Customer" // Unique heading identifier
 
            />
 

</div>

<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">5. Provisioning of Service for New Customer</h6>
  <AddClause 
                clauses={clauses}
                addClause={addClause}
                deleteClause={deleteClause}
                updateClause={updateClause}
               currentNo={5}
               sectionName="Provisioning of Service for New Customer" // Unique heading identifier
 
            />

</div>

 
<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">6. Packages</h6>
  <AddClause 
                clauses={clauses}
                addClause={addClause}
                deleteClause={deleteClause}
                updateClause={updateClause}
               currentNo={5}
               sectionName="Packages" // Unique heading identifier
 
            />

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
