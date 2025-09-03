import AddClause from "@/helpers/AddClause";
import { useEffect, useRef, useState } from 'react';
import PrimaryModal from "@/components/Model/PrimaryModal";
import Image from "next/image";
import AddFile from "../../public/dist/img/AddFile.svg";
import { uploadToClient,uploadToServer  } from '@/helpers/fileUpload';
import { ComplianceService } from "@/services/ComplianceService/ComplianceService";
import { useRouter } from "next/router";
import useURLParams from "@/hooks/useURLParams";
import { FTP_Constants } from "@/constants/FTP_Constants";



export default function Tab3Processes({ formData, setFormData, onNext, onPrev, formType, clauses, addClause, deleteClause, updateClause,  processFiles,setProcessFiles }) {

    const URLParams = useURLParams();
  const router = useRouter();
  const [roles, setRoles] = useState([{ department: '', responsibility: '' }]);

  const fileInputRef = useRef(null);
  const previewFileTypes = ["image/png", "image/jpeg", "image/jpg"];

     const handleNext = () => {
    console.log(JSON.stringify(clauses, null, 2)); // 2 spaces indentation
    onNext && onNext();
  };

   const handlePrev = () => {
    onPrev && onPrev();
  };

   const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

// Handle File Upload
const handleProcessFileUpload = (e) => {
    uploadToClient(e, "Process Explanation", processFiles, setProcessFiles);
};
  // Remove File
  const removeProcessFile = (index) => {
    setProcessFiles((prev) =>
      prev.map((s) =>
        s.sectionName === "Process Explanation"
          ? {
              ...s,
              files: s.files.filter((_, i) => i !== index),
            }
          : s
      )
    );
  };

  // Preview File
  const handlePreviewProcessFile = (file) => {
    if (file.type.startsWith("image/")) {
      window.open(file.filepath, "_blank");
    } else {
      alert("Preview not available for this file type.");
    }
  };

  
function getFileType(filename) {
  if (!filename) return "";

  const ext = filename.split(".").pop().toLowerCase();

  switch (ext) {
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "bmp":
    case "svg":
      return "image/" + (ext === "jpg" ? "jpeg" : ext);
    case "pdf":
      return "application/pdf";
    case "doc":
    case "docx":
      return "application/msword";
    case "xls":
    case "xlsx":
      return "application/vnd.ms-excel";
    case "ppt":
    case "pptx":
      return "application/vnd.ms-powerpoint";
    case "zip":
    case "rar":
    case "7z":
      return "application/zip";
    default:
      return "application/octet-stream";
  }
}

useEffect(() => {
  if (!router.isReady || !URLParams?.id) return;

  const fetchData = async () => {
    try {
      const res = await ComplianceService.getProcessImages(URLParams.id);
    // If res is a native fetch Response
    const jsonRes = await res.json(); // ✅ parse body
    const processData = jsonRes.data || []; // access actual array

      console.log("Process images data is her: ",processData);
      if (processData.length > 0) {
        setProcessFiles([
          {
            sectionName: "Process Explanation",
            files: processData.map(item => ({
              filename: item.value,
              type: getFileType(item.value), // guess or default
              filepath: `${FTP_Constants.STORAGE_URL}/views/crmViews/storage/${FTP_Constants.NTL_COMPLIANCE_SOP_FOLDER}/${item.value}`,
              fileObject: null
            }))
          }
        ]);
      }
    } catch (err) {
      console.error("Error fetching Process Explanation files:", err);
    }
  };

  fetchData();
}, [URLParams, router.isReady]);

  

  return (
    <>
       <PrimaryModal isOpenProp={isOpen} onClose={closeModal}>
  <div className="modal-content" style={{ padding: "1rem", borderRadius: "0.3rem" }}>
    {/* Modal Header */}
    <div className="modal-header d-flex justify-content-between align-items-center">
      <h5 className="modal-title">Upload Process Explanation</h5>
      <button type="button" className="close btn btn-sm btn-outline-secondary" onClick={closeModal}>
        &times;
      </button>
    </div>

    {/* Modal Body */}
    <div className="border rounded p-3 mb-3 shadow-sm position-relative">
      <h6 className="fw-bold mb-2">Upload Image</h6>

      {/* Upload Box */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          fileInputRef.current?.click();
        }}
        className="text-center py-4 rounded"
        style={{
          border: "2px dashed rgb(190 190 192)",
          cursor: "pointer",
        }}
      >
        <Image src={AddFile} alt="add-file-icon" width={40} height={40} />
        <label className="inputfile-box custom-file-upload py-2 mb-0 text-dark">
          Upload a file for Process Explanation
        </label>
        <input
          type="file"
          className="inputfile"
          onChange={handleProcessFileUpload}
          ref={fileInputRef}
          multiple
        />
      </div>

    {/* Files Preview */}
<div>
  {processFiles
    .find((s) => s.sectionName === "Process Explanation")
    ?.files.map((file, i) => (
      <div
        key={i}
        className="my-2 mx-2 rounded d-flex align-items-center"
        style={{ border: "2px solid rgb(190 190 192)" }}
      >
        <p className="px-2 py-2 m-0 w-50">{file.filename}</p>
        <div className="w-50 text-right px-3">
          {previewFileTypes.includes(file.type) && (
            <i
              className="fa fa-eye text-standard mr-3"
              style={{ cursor: "pointer" }}
              onClick={() =>
                handlePreviewProcessFile(file)
              }
            ></i>
          )}
          <i
            className="fa fa-trash text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => removeProcessFile(i)}
          ></i>
        </div>
      </div>
    ))}
</div>
    </div>

    {/* Modal Footer */}
    <div className="modal-footer d-flex justify-content-end mt-3">
      <button className="btn custom-bg-color" onClick={closeModal}>
        Close
      </button>
    </div>
  </div>
</PrimaryModal>

    <div className="p-3 border rounded shadow-sm">
      
      {/* Process Flow Section */}
      
      <div className="mb-4 p-3 border rounded shadow-sm">
        <h6 className="fw-bold mb-2">2. Definition</h6>
         <AddClause 
               clauses={clauses}
               addClause={addClause}
               deleteClause={deleteClause}
               updateClause={updateClause}
               currentNo={2}
              sectionName="Definition" // Unique heading identifier

           />
      </div>
      
      <div className="mb-4 p-3 border rounded shadow-sm">
        <h6 className="fw-bold mb-2">3. Process Flow</h6>
         <AddClause 
               clauses={clauses}
               addClause={addClause}
               deleteClause={deleteClause}
               updateClause={updateClause}
               currentNo={3}
              sectionName="Process Flow" // Unique heading identifier

           />
      </div>

{/* Process Explanation Section */}
{formType === 'process' && (
<div
className="mb-4 mt-4 p-3 border rounded shadow-sm">
  <h6 className="fw-bold mb-2">4. Process Explanation</h6>
    <AddClause 
               clauses={clauses}
               addClause={addClause}
               deleteClause={deleteClause}
               updateClause={updateClause}
               currentNo={4}
              sectionName="Process Explanation" // Unique heading identifier
              openModal={openModal}
           />

  {/* Upload Image Button */}


  <ol id="clause-5" className="clause-list ms-2" style={{ listStyleType: "none" }}></ol>

</div>
)}

      {/* Navigation Buttons */}
      <div className="mt-4 d-flex justify-content-between">
        <button onClick={handlePrev} className="btn btn-secondary" style={{ background: "#aaa", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Previous
        </button>
        <button onClick={handleNext} className="btn btn-primary" style={{ background: "#284E93", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Next
        </button>
      </div>
    </div>

  </>
  );

}
