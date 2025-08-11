'use client';
import { useEffect } from 'react';
import { initializeClauseFunctions } from "@/helpers/clause-utils";

export default function Tab2ObjectiveScope({ formData, setFormData, onNext, onPrev,  formType }) {
  useEffect(() => {
    initializeClauseFunctions();
  }, []);

     const handleNext = () => {
    onNext && onNext();
  };

   const handlePrev = () => {
    onPrev && onPrev();
  };

  useEffect(() => {


    window.addDepartmentRole = function () {
      const container = document.getElementById('department-roles');
      const div = document.createElement('div');
      div.className = 'row g-2 align-items-center mb-2';
      div.innerHTML = `
       <div class="col-md-1">
    <input type="text" class="form-control form-control-sm" placeholder="Ver.">
  </div>
  <div class="col-md-2">
    <input type="text" class="form-control form-control-sm" placeholder="Prepared By">
  </div>
  <div class="col-md-2">
    <input type="text" class="form-control form-control-sm" placeholder="Approved By">
  </div>
  <div class="col-md-2">
    <input type="date" class="form-control form-control-sm">
  </div>
   <div class="col-md-4">
    <textarea
      rows="3"
      class="form-control form-control-sm"
      placeholder="Additional Notes"
      style="resize: vertical; overflow-y: auto; max-height: 100px;"
    ></textarea>
  </div>
  <div class="col-md-1">
    <button type="button" class="btn btn-sm btn-outline-danger" style="padding:6px 10px" onclick="this.closest('.row').remove()">✖</button>
  </div>
 
      `;
      container.appendChild(div);
    };


  }, []);

  return (
    <div className="container mt-3">
      <div className="mb-4 p-3 border rounded shadow-sm">
        <h6 className="fw-bold mb-2">Document Objective</h6>
        <textarea
          className="form-control "  style={{ minHeight: "80px", resize: "vertical" }}
          rows="10"
          value={formData.documentObjective || ''}
          onChange={(e) =>
            setFormData({ ...formData, documentObjective: e.target.value })
          }
        />
      </div>

      <div className="mb-4 p-3 border rounded shadow-sm">
        <h6 className="fw-bold mb-2">Document History</h6>
        <div id="department-roles" className="mb-2"></div>
        <button
          type="button"
          className="btn btn-primary px-4"
          style={{
          background: "rgb(40, 78, 147)",
          color: "white",
          marginTop:"10px"
        }}
          onClick={() => window.addDepartmentRole()}
        >
          + Add History
        </button>
      </div>

         <div className="mb-4 p-3 border rounded shadow-sm">
        <h6 className="fw-bold mb-2">1. Scope</h6>
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
            onClick={() => window.addClause('clause-1', true)}
          >
            + Add Clause
          </button>
        </div>
        <ol id="clause-1"  className="clause-list ms-2" style={{ listStyleType: "none" }}></ol>
      </div>


           <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
            <button  onClick={handlePrev} style={{ background: "#aaa", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>Previous</button>
            <button onClick={handleNext} style={{ background: "#284E93", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>Next</button>
          </div>
    </div>
  );
}
