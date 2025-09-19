import AddClause from "@/helpers/AddClause";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";


export default function Tab5ComplianceDocumentation({ formData, setFormData, onNext, onPrev,formType, clauses, addClause, deleteClause, updateClause,validateClauses }) {


  const handleNext = () => {
       // Example: In "Scope Page"
       const pageSections = ["Technical Limitations","Terms & Conditions"];
 
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
     onNext && onNext();
   };

const [invalidClauseIds, setInvalidClauseIds] = useState({});

  const handlePrev = () => onPrev && onPrev();

console.log(formType);
  return (
   <div>

    <div className="p-3 border rounded shadow-sm">   
<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  {/* <h6 className="fw-bold mb-2">{formType=='service'? '15. ':'10. '} Technical Limitations</h6> */}
   <AddClause 
                clauses={clauses}
                addClause={addClause}
                deleteClause={deleteClause}
                updateClause={updateClause}
               currentNo={formType === 'service' ? 15 : 10}
               sectionName="Technical Limitations" // Unique heading identifier
       invalidClauseIds={invalidClauseIds}   // 👈 pass this

 
            />
 

  <ol id="clause-15" className="clause-list ms-2" style={{ listStyleType: "none" }}></ol>

</div>

    {formType === 'service' && (
    <div className="mb-4 mt-4 p-3 border rounded shadow-sm">
      {/* <h6 className="fw-bold mb-2">16. Terms & Conditions</h6> */}
        <AddClause 
              clauses={clauses}
              addClause={addClause}
              deleteClause={deleteClause}
              updateClause={updateClause}
              currentNo={16}
            sectionName="Terms & Conditions" // Unique heading identifier
       invalidClauseIds={invalidClauseIds}   // 👈 pass this

          />
    </div>
  )}  

{/* 
<div className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h5 className="fw-bold mb-2">{formType === 'service' ? '16. ' : '11. '}Compliance (Non editable)</h5>

  <ol className="clause-list ms-2 mt-3" style={{ listStyleType: "none" }}>
    <li>
      <strong>{formType === 'service' ? '16.1 ' : '11.1 '}</strong> This SOP will be officially monitored for compliance by the Owner Department and R&amp;PA. They can verify compliance through various methods, including but not limited to, random inspections, business tool reports, internal and external audits, and feedback to them.
    </li>
  </ol>
</div>



<div className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h5 className="fw-bold mb-2">{formType === 'service' ? '17. ' : '12. '}Compliance (Non editable)</h5>

  <ol className="clause-list ms-2 mt-3" style={{ listStyleType: "none" }}>
    <li>
      <strong>{formType === 'service' ? '17.1 ' : '12.1 '}</strong> This SOP will be officially monitored for compliance by the Owner Department and R&amp;PA. They can verify compliance through various methods, including but not limited to, random inspections, business tool reports, internal and external audits, and feedback to them.
    </li>
  </ol>
</div>


<div className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h5 className="fw-bold mb-2">{formType === 'service' ? '18. ' : '13. '}Compliance (Non editable)</h5>

  <ol className="clause-list ms-2 mt-3" style={{ listStyleType: "none" }}>
    <li>
      <strong>{formType === 'service' ? '18.1 ' : '13.1 '}</strong>The owner department must check and, if necessary, update the document at least once a year.
    </li>
  </ol>
</div>
 */}

<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  {/* <h6 className="fw-bold mb-2">{formType === 'service' ? '13.': '8. '} KPI Monitoring</h6> */}
   <AddClause 
               clauses={clauses}
               addClause={addClause}
               deleteClause={deleteClause}
               updateClause={updateClause}
              currentNo={formType === 'service' ? 13 : 8}
              sectionName="KPI Monitoring" // Unique heading identifier
       invalidClauseIds={invalidClauseIds}   // 👈 pass this


           />
</div>

<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  {/* <h6 className="fw-bold mb-2">{formType === 'service' ? '14. ': '9. '} Reporting</h6> */}
   <AddClause 
               clauses={clauses}
               addClause={addClause}
               deleteClause={deleteClause}
               updateClause={updateClause}
              currentNo={formType === 'service' ? 14 : 9}
              sectionName="Reporting" // Unique heading identifier
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
</div>

  );

}
