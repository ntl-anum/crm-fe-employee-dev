import AddClause from "@/helpers/AddClause";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";


export default function Service2({ formData, setFormData, onNext, onPrev,formType, clauses, addClause, deleteClause, updateClause ,validateClauses}) {



 const handleNext = () => {
       // Example: In "Scope Page"
       const pageSections = ["Locking/Unlocking of Service","Charging Mechanism (Including MRC, OTC, VAS charges and Taxes)","Support (Troubleshooting, Fault types)"];
 
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
    // return;
  }
  // ✅ Clear invalid clause IDs if validation passes
    setInvalidClauseIds({});
      
     onNext && onNext();
   };
  const handlePrev = () => onPrev && onPrev();
  return (
<>
<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  {/* <h6 className="fw-bold mb-2">7. Locking/Unlocking of Service </h6> */}
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
  {/* <h6 className="fw-bold mb-2">8. Charging Mechanism (Including MRC, OTC, VAS charges and Taxes)</h6> */}
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
  {/* <h6 className="fw-bold mb-2">9. Support (Troubleshooting, Fault types) </h6> */}
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
