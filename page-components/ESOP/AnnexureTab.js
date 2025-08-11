import { initializeClauseFunctions } from "@/helpers/clause-utils";
import { useEffect, useState } from 'react';

export default function Service1({ formData, setFormData, onNext, onPrev ,formType}) {
  const [annexures, setAnnexures] = useState(['A']);
  const maxAnnexures = 'K'.charCodeAt(0);

  useEffect(() => {
    initializeClauseFunctions();
  }, []);

  const handleAddAnnexure = () => {
    const nextChar = String.fromCharCode(annexures[annexures.length - 1].charCodeAt(0) + 1);
    if (nextChar.charCodeAt(0) <= maxAnnexures) {
      setAnnexures([...annexures, nextChar]);
    }
  };

  const handleRemoveAnnexure = (letter) => {
    setAnnexures(annexures.filter((a) => a !== letter));
  };

  const handleNext = () => onNext && onNext();
  const handlePrev = () => onPrev && onPrev();

  return (
    <>


      {/* Annexure Section */}
      <div className="mb-4 mt-5">
        <h6 className="fw-bold mb-3">{formType=='service'? '':'14. '}14. Annexures</h6>
        <button
          className="btn btn-sm btn-outline-primary mb-3"
          onClick={handleAddAnnexure}
          disabled={annexures[annexures.length - 1].charCodeAt(0) >= maxAnnexures}
        >
          + Add Annexure
        </button>

        {annexures.map((letter) => (
          <div key={letter} className="border rounded p-3 mb-3 shadow-sm position-relative">
               {letter !== 'A' && (
              <button
                className="btn btn-sm btn-outline-danger "style={{margin: "-4px 3px 20px 10px",
                padding: "3px 8px;", float:"right",padding:"3px 7px"}}
                onClick={() => handleRemoveAnnexure(letter)}
                title="Remove"
              >
                ✖
              </button>
            )}
            <h6 className="fw-bold mb-2">Annexure {letter}</h6>

            {/* Delete icon (top-right) */}
         

            {/* Drag and drop upload area */}
            <div
              className="border border-secondary rounded p-4 text-center"
              style={{ background: '#f9f9f9', minHeight: '120px' }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files);
                console.log(`Dropped in Annexure ${letter}:`, files);
                // handle file upload logic here
              }}
            >
              <p className="text-muted">Drag & drop image here or click to upload</p>
              <input type="file" multiple accept="image/*" style={{display:"block"}} className="form-control form-control-sm mt-2" />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-4 d-flex justify-content-between">
        <button onClick={handlePrev} className="btn btn-secondary" style={{ background: "#aaa", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Previous
        </button>
        <button onClick={handleNext} className="btn btn-success" style={{ color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Submit
        </button>
      </div>
    </>
  );
}
