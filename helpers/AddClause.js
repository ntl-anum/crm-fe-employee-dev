import React from "react";

export default function AddClause({ clauses, addClause, deleteClause, updateClause,currentNo,sectionName,openModal,invalidClauseIds }) {
  const renderClauses = (parentId = null, parentNumber = currentNo) => {
    return clauses
    .filter(c => c.parent_id === parentId && c.sectionName === sectionName) // ✅ filter by section name
      .sort((a, b) => a.seq - b.seq)
      .map((clause, index) => {
        const clauseNumber =
          parentId === null
            ? `${parentNumber}.${index + 1}` // Top-level always "1.x"
            : `${parentNumber}.${index + 1}`; // Children extend parent's number

        return (
          <li
            key={clause.id}
            style={{ marginLeft: parentId ? 10 : 0, marginTop: "15px" }}
          >
            <div className="d-flex align-items-center mb-2">
              {/* Number in bold */}
              <strong   style={{
              minWidth: `${clauseNumber.length * 6 + 5 }px`, // dynamic width
              fontWeight: "bold",
              flexShrink: 0,
            }}>
            {clauseNumber}</strong>

              {/* Clause text */}
              <textarea
                className="form-control"
                placeholder={`Clause ${clauseNumber}`}
                value={clause.text}
                onChange={(e) =>
                  updateClause(clause.id, "text", e.target.value,sectionName)
                }
                  style={{
                // minHeight: "80px",
                resize: "vertical",
                // 👈 Use invalidClauseIds prop exactly like your documentobjective pattern
                border: invalidClauseIds?.[clause.id] ? "1px solid red" : "1px solid #ced4da"
              }}
                rows={2}
              />

              {/* Add Subclause */}
              <button
                type="button"
                 className="btn custom-bg-color"
                 style={{ background: "rgb(40, 78, 147)",padding: "0.3rem 0.5rem",marginLeft:"5px"  }}
                onClick={() => addClause(clause.id,clauseNumber,sectionName)}
                title="Add Subclause"
              >
                <i className="fa fa-plus"></i>
              </button>

              {/* Delete Clause */}
              <button
                type="button"
                className="btn btn-danger ms-1"
                style={{ padding: "0.3rem 0.5rem", color:"white",marginLeft:"2px" }}
                onClick={() => deleteClause(clause.id)}
                title="Delete Clause"
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>

            {/* Recursive render for children */}
            {renderClauses(clause.id, clauseNumber)}
          </li>
        );
      });
  };

  return (
  <div>
      {/* Add Clause Button Always at the Top */}
      <div className="row">
      
      <div className="mb-0 ml-3 d-flex justify-content-between align-items-center">
  <h5 className="fw-bold mb-0">
    {currentNo}. {sectionName}
  </h5>

  <button
    type="button"
    className="btn custom-bg-color ml-3"
    onClick={() => addClause(null, currentNo, sectionName)}
  style={{    padding: "1px 7px 1px 7px", color:"white" }}
  title="Add Clause"
  >
  <i className="fa fa-plus"></i>
  </button>

      {sectionName === "Process Explanation" && (
        <button
          type="button"
      className="btn custom-bg-color ml-1 mt-2 mb-2"
          onClick={openModal}   // calls modal
          style={{ padding: "1px 7px 1px 7px", color:"white" }}
          title="Upload Image"
        >
      <i className="fa fa-file"></i>
        </button>
      )}
      </div>
      </div>

      {/* Remove bullets and padding */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {renderClauses()}
      </ul>
    </div>
  );
}
