import AddClause from "@/helpers/AddClause";
import { useEffect, useState } from 'react';

export default function Service2({ formData, setFormData, onNext, onPrev,formType, clauses, addClause, deleteClause, updateClause }) {



  const handleNext = () => onNext && onNext();
  const handlePrev = () => onPrev && onPrev();


  return (
<>
<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">7. Locking/Unlocking of Service </h6>
  <AddClause 
                clauses={clauses}
                addClause={addClause}
                deleteClause={deleteClause}
                updateClause={updateClause}
               currentNo={7}
               sectionName="Locking/Unlocking of Service" // Unique heading identifier
 
            />

</div>

<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">8. Charging Mechanism (Including MRC, OTC, VAS charges and Taxes)</h6>
   <AddClause 
                clauses={clauses}
                addClause={addClause}
                deleteClause={deleteClause}
                updateClause={updateClause}
               currentNo={8}
               sectionName="Charging Mechanism (Including MRC, OTC, VAS charges and Taxes)" // Unique heading identifier
 
            />

</div>

 
<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">9. Support (Troubleshooting, Fault types) </h6>
 <AddClause 
                clauses={clauses}
                addClause={addClause}
                deleteClause={deleteClause}
                updateClause={updateClause}
               currentNo={9}
               sectionName="Support (Troubleshooting, Fault types)" // Unique heading identifier
 
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
