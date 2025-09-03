import AddClause from "@/helpers/AddClause";
import { useEffect, useState } from 'react';

export default function Tab5ComplianceDocumentation({ formData, setFormData, onNext, onPrev,formType, clauses, addClause, deleteClause, updateClause }) {


  const handleNext = () => onNext && onNext();
  const handlePrev = () => onPrev && onPrev();

console.log(formType);
  return (
   <div>

    <div className="p-3 border rounded shadow-sm">   
<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">{formType=='service'? '15. ':'10. '} Technical Limitations</h6>
   <AddClause 
                clauses={clauses}
                addClause={addClause}
                deleteClause={deleteClause}
                updateClause={updateClause}
               currentNo={formType === 'service' ? 15 : 10}
               sectionName="Technical Limitations" // Unique heading identifier
 
            />
 

  <ol id="clause-15" className="clause-list ms-2" style={{ listStyleType: "none" }}></ol>

</div>

    {formType === 'service' && (
    <div className="mb-4 mt-4 p-3 border rounded shadow-sm">
      <h6 className="fw-bold mb-2">16. Terms & Conditions</h6>
        <AddClause 
                     clauses={clauses}
                     addClause={addClause}
                     deleteClause={deleteClause}
                     updateClause={updateClause}
                     currentNo={16}
                    sectionName="Process Explanation" // Unique heading identifier
                 />
    </div>
  )}  


<div className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">{formType === 'service' ? '16 ' : '11 '}Compliance (Non editable)</h6>

  <ol className="clause-list ms-2" style={{ listStyleType: "none" }}>
    <li>
      <strong>{formType === 'service' ? '16.1 ' : '11.1 '}</strong> This SOP will be officially monitored for compliance by the Owner Department and R&amp;PA. They can verify compliance through various methods, including but not limited to, random inspections, business tool reports, internal and external audits, and feedback to them.
    </li>
  </ol>
</div>



<div className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">{formType === 'service' ? '17 ' : '12 '}Compliance (Non editable)</h6>

  <ol className="clause-list ms-2" style={{ listStyleType: "none" }}>
    <li>
      <strong>{formType === 'service' ? '17.1 ' : '12.1 '}</strong> This SOP will be officially monitored for compliance by the Owner Department and R&amp;PA. They can verify compliance through various methods, including but not limited to, random inspections, business tool reports, internal and external audits, and feedback to them.
    </li>
  </ol>
</div>


<div className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">{formType === 'service' ? '18 ' : '13 '}Compliance (Non editable)</h6>

  <ol className="clause-list ms-2" style={{ listStyleType: "none" }}>
    <li>
      <strong>{formType === 'service' ? '18.1 ' : '13.1 '}</strong>The owner department must check and, if necessary, update the document at least once a year.
    </li>
  </ol>
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
