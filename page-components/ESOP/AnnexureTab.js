
import { useEffect, useRef, useState } from 'react';
import { ComplianceService } from "@/services/ComplianceService/ComplianceService";
import { toast } from "react-toastify";
import AddFile from "../../public/dist/img/AddFile.svg";
import Image from "next/image";
import { APP_ROUTES } from "../../helpers/enums";
import { FTP_Constants } from "../../constants/FTP_Constants";
import { useRouter } from "next/router";
import useURLParams from "@/hooks/useURLParams";
import { uploadToClient,uploadToServer  } from '@/helpers/fileUpload';
import isEqual from "lodash/isEqual";
import _ from "lodash";

export default function AnnexureTab({ formData, setFormData, onNext, onPrev ,formType, history, clauses, escalationRows, roles,sopId,  processFiles,setProcessFiles,deletedFiles,setDeletedFiles, historyData,clauseData,escalationData,rolesData,sopData }) {

  
  // Remove id before comparison
  const URLParams = useURLParams();
  const router = useRouter();
  const [annexures, setAnnexures] = useState([
    { letter: "A", files: [] }
  ]);
  const [showLoader, setShowLoader] = useState(false);
  const proofFileUploadRefs = useRef({});
  // const [deletedFiles, setDeletedFiles] = useState([]);

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

  // Allowed preview file types
  const previewFileTypes = ["image/png", "image/jpeg", "image/jpg"];

  const [annexureData, setAnnexureData] =useState([]);
  useEffect(() => {
    if (router.isReady && URLParams?.id) {
      // setSopId(URLParams.id); // keep id in state for easy use
      const fetchData = async () => {
        try {
          const data1 = await ComplianceService.getAnnexureById(URLParams.id);
          const Data = await data1.json();
          let anxData = Data.data || [];

        // ✅ filter out deleted annexure files before setting state
        const filtered = anxData.filter(
          (item) =>
            !deletedFiles.some(
              (df) =>
                df.subValue === item.subValue && df.value === item.value
            )
        );

        setAnnexureData(filtered);
        } catch (err) {
          console.error("Error fetching Annexure data:", err);
        }
      };
  
      fetchData();
    }
  }, [URLParams, router.isReady]);

  // ✅ group data only when annexureData changes
  useEffect(() => {
    if (annexureData.length === 0) return;

    const grouped = annexureData.reduce((acc, item) => {
      const letter = item.subValue;  // like "A", "B"
      if (!acc[letter]) {
        acc[letter] = { letter, files: [] };
      }
     // Normalize backend item → match shape used in UI
    acc[letter].files.push({
      filename: item.value,                           // stored filename
      type: getFileType(item.value),                              // 🔹 guess or set default, backend doesn’t send it
      filepath: `${FTP_Constants.STORAGE_URL}/views/crmViews/storage/${FTP_Constants.NTL_COMPLIANCE_SOP_FOLDER}/${item.value}`, // build file URL
      fileObject: null                                // since it's not freshly uploaded
    });

      return acc;
    }, {});

    console.log("grouped data: ",grouped);
    console.log("Annexyure annexureData: ",annexureData)
    setAnnexures(Object.values(grouped));
  }, [annexureData]); // run only when API data changes




useEffect(() => {
  console.log("Updated Annexures:", annexures);
}, [annexures]);

const handlePreViewFile = (filename, type, filepath) => {
  if (!filepath) return;

  // For images, open in new tab
  if (type.startsWith("image/")) {
    window.open(filepath, "_blank");
    return;
  }

  // For PDF, open in new tab
  if (type === "application/pdf") {
    window.open(filepath, "_blank");
    return;
  }

  // For other file types, alert user or implement download
  alert(`Cannot preview this file type: ${type}\nFile: ${filename}`);
};


const removeFile = (annexureLetter, fileIndex) => {
  setAnnexures((prev) =>
    prev.map((annexure) => {
      if (annexure.letter === annexureLetter) {
        const removedFile = annexure.files[fileIndex]; // grab the file being deleted

        // store deleted file (so backend can delete later)
        setDeletedFiles((prevDeleted) => [
          ...prevDeleted,
          {
            subValue: annexureLetter,
            value: removedFile.filename, // the old name stored in DB
          },
        ]);

        return {
          ...annexure,
          files: annexure.files.filter((_, idx) => idx !== fileIndex),
        };
      }
      return annexure;
    })
  );
};

const handleAddAnnexure = () => {
  const maxAnnexures = "K".charCodeAt(0);
  // Get last annexure letter safely
  const lastLetter =
    annexures.length > 0
      ? annexures[annexures.length - 1]?.letter || "A"
      : "A";
  // Compute next letter
  const nextLetter = String.fromCharCode(lastLetter.charCodeAt(0) + 1);
  // Stop if exceeds max
  if (nextLetter.charCodeAt(0) > maxAnnexures) return;
  // Add new annexure
  setAnnexures((prev) => [...prev, { letter: nextLetter, files: [] }]);
};

  const handleRemoveAnnexure = (letter) => {
    setAnnexures(annexures.filter((a) => a.letter !== letter));
  };

  // const handleNext = () => onNext && onNext();
  const handlePrev = () => onPrev && onPrev();

  const handleSubmit = async () => {
  try {
    //code to save images
     const allAnnexureFiles = [];
    // toast.success("All annexure files uploaded and saved successfully!");

    // Prepare the payload to send to backend
    const payload = {
      ...formData,
    };
   const dataToSend = mapPayloadForBackend(payload);

   const response = await ComplianceService.CreateSOPDocument(  
   dataToSend // convert to JSON
    );
    console.log("after insertion: "+response);
  if (response) {
     if (!response.ok) {
        toast.error("Something went wrong");
        return;
      }
        const jsonRes = await response.json();
        if (jsonRes.id) { 
           const documentId = jsonRes.id;
          //toast.success("Document inserted successfully");
          
            for (let annexure of annexures) {
              if (annexure.files.length === 0) continue;

              // Upload files for this annexure
              const uploadedFiles = await uploadToServer(
                annexure.files.map(f => f.fileObject),
                annexure.letter,
                documentId
              );

              allAnnexureFiles.push(...uploadedFiles);
            }

            console.log("Files ready for DB:", allAnnexureFiles);

            console.log("process files are:: ",processFiles);
            let uploadedProcessFiles = []; // declare here
            const processSection = processFiles.find(
              p => p.sectionName === "Process Explanation"
            );

            if (processSection && processSection.files.length > 0) {
                // map fileObject for actual upload
              const filesToUpload = processSection.files.map(f => f.fileObject).filter(Boolean);
              if (filesToUpload.length > 0) {
              uploadedProcessFiles = await uploadToServer(
                filesToUpload,
                "Process Explanation",
                documentId
              );
              // append uploaded files to main DB array
              allAnnexureFiles.push(...uploadedProcessFiles);
                      }
                    }
            
            const annexureWithDocId = allAnnexureFiles.map((h) => ({
              ...h,
              documentId,
            }));
            // 2️⃣ Append documentId to related arrays
            const historyWithDocId = history.map((h) => ({
              ...h,
              documentId,
            }));

            const escalationsWithDocId = escalationRows.map((e) => ({
              ...e,
              documentId,
            }));

            const rolesWithDocId = roles.map((r) => ({
              ...r,
              documentId,
            }));

            const clausesWithDocId = clauses.map((c) => ({
              ...c,
              documentId,
            }));
          
            console.log("Hitsory Data:" + historyWithDocId);
            console.log("Escalation Data:" + escalationsWithDocId);
            console.log("Roles Data:" + rolesWithDocId);
            console.log("Clause Data:" + clausesWithDocId);
            console.log("Annexure Data:" + clausesWithDocId);
          try{
          await Promise.all([
              // 👈 wrap it in an array
              ComplianceService.CreateHistory( {histories: historyWithDocId }),
              ComplianceService.CreateEscalations({escalations: escalationsWithDocId}),
              ComplianceService.CreateRoles({responsibilities: rolesWithDocId}),
              ComplianceService.CreateClauses({clauses:clausesWithDocId}),
              ComplianceService.addDocDetails( {details: annexureWithDocId }),

            ]);

          toast.success("SOP Document inserted successfully");
          window.location.href = "/SOPReport";
           }catch(error){
            console.error("Error saving SOP document:", error);
            toast.error("Failed to update SOP document. Please try again.");
          }

        } else {
          toast.error("Error in saving document");
        }
      } else {
        router.push(APP_ROUTES.SERVER_ERROR); // ✅ fix
      }
  } catch (error) {
    console.error("Save failed:", error);
    toast.error("Error in saving document");
  }
};
// new handle edit

// const handleEdit = async () => {
//   try {
//     const payload = { ...formData };
//     const dataToSend = mapPayloadForBackend(payload);

//     const normalizedSOPData = normalizeSOPData(sopData);
//     const normalizedformData = normalizeFormData(formData);
//     const normalizedHistory = normalizeHistory(historyData);
//     const normalizedEscalation = normalizeArray(escalationData);
//     const normalizedRoles = normalizeArray(rolesData);

//   console.log("original formadata in ANnexure:", normalizedformData);
// console.log("fetched sop data for editing in Annexure:", JSON.stringify(normalizedSopData, null, 2));


//   console.log("original history in ANnexure:", history);
// console.log("fetched sop data for editing in Annexure:", JSON.stringify(normalizedHistory, null, 2));


//   console.log("original clauses in ANnexure:", clauses);
//   console.log("fetched clausesData for editing in Annexure: ",clauseData);

//     console.log("original escalationRows in ANnexure:", escalationRows);
// console.log("fetched sop data for editing in Annexure:", JSON.stringify(normalizedEscalation, null, 2));


  
//     console.log("original roles in ANnexure:", roles);
// console.log("fetched sop data for editing in Annexure:", JSON.stringify(normalizedRoles, null, 2));


//       // 🔍 Detect changes between original states and current states
//     const onlyFormDataChanged =
//       !isEqual(normalizedformData, normalizedSOPData) &&
//       isEqual(clauses, clausesData) &&
//       isEqual(history, normalizedHistory) &&
//       isEqual(escalationRows, normalizedEscalation) &&
//       isEqual(roles, normalizedRoles) &&
//       isEqual(annexures, annexureData);
//     // ✅ Case 1: only formData changed
//     console.log("Form Data: ",formData);
//     console.log("SOP Data: ",sopData)
//     console.log("onlyFormDataChanged: ",onlyFormDataChanged);
//     if (onlyFormDataChanged) {
//       const response = await ComplianceService.UpdateSOP(sopId, dataToSend);
//       if (!response.ok) {
//         toast.error("Error in saving SOP Document");
//         return;
//       }else{
//         toast.success("SOP Document updated successfully");
//         window.location.href = "/SOPReport";
//       }

//     }else{
//       // step 1: update main SOP
//       const response = await ComplianceService.UpdateSOPDocument(sopId, dataToSend);
//     if (!response.ok) {
//           toast.error("Error in saving SOP Document");
//           return;
//         }
//       const jsonRes = await response.json();
//       if (!jsonRes.id) {
//         toast.error("Error in updating document");
//         return;
//       }

//       const documentId = jsonRes.id;
//       const allAnnexureFiles = [];

//       // step 2: handle annexures
//       for (let annexure of annexures) {
//         if (!annexure.files.length) continue;

//         // upload ONLY new files
//         const newFiles = annexure.files.filter(f => f.fileObject);
//         if (newFiles.length > 0) {
//           const uploadedFiles = await uploadToServer(newFiles.map(f => f.fileObject), annexure.letter, documentId);
//           allAnnexureFiles.push(...uploadedFiles);
//         }

//         // keep old files as-is (no re-upload)
//         const oldFiles = annexure.files.filter(f => !f.fileObject);
//         for (let old of oldFiles) {
//           allAnnexureFiles.push({
//             subValue: annexure.letter,
//             documentId,
//             value: old.filename,
//             key: "IMAGE",
//             status: "ACTIVE",
//           });
//         }
//       }

//       // step 3: handle process section
//       const processSection = processFiles.find(p => p.sectionName === "Process Explanation");
//       if (processSection && processSection.files.length > 0) {
//         const newFiles = processSection.files.filter(f => f.fileObject);
//         if (newFiles.length > 0) {
//           const uploadedFiles = await uploadToServer(newFiles.map(f => f.fileObject), "Process Explanation", documentId);
//           allAnnexureFiles.push(...uploadedFiles);
//         }
//         const oldFiles = processSection.files.filter(f => !f.fileObject);
//         for (let old of oldFiles) {
//           allAnnexureFiles.push({
//             subValue: "Process Explanation",
//             documentId,
//             value: old.filename,
//             key: "IMAGE",
//             status: "ACTIVE",
//           });
//         }
//       }

//       // step 4: send deleted files
//       if (deletedFiles.length > 0) {
//         await ComplianceService.deleteAnnexureFiles({
//         documentId,
//         files: deletedFiles
//       });
//       }

//       try {
//     await Promise.all([
//       ComplianceService.UpdateAnnexure(sopId, { details: allAnnexureFiles }),
//       ComplianceService.UpdateHistory(sopId, { histories: history.map(h => ({ ...h, documentId })) }),
//       ComplianceService.UpdateEscalations(sopId, { escalations: escalationRows.map(e => ({ ...e, documentId })) }),
//       ComplianceService.UpdateRoles(sopId, { responsibilities: roles.map(r => ({ ...r, documentId })) }),
//       ComplianceService.UpdateClauses(sopId, { clauses: clauses.map(c => ({ ...c, documentId })) }),
//     ]);

  
//       toast.success("SOP Document updated, and a new version has been saved.");
//       window.location.href = "/SOPReport";
//     }catch(error){
//       console.error("Error updating document:", error);
//       toast.error("Failed to update document. Please try again.");
//     }
//     } //else in case there is change in history,clauses, escalation data and need versioning
//   } catch (err) {
//     console.error("Update failed:", err);
//     toast.error("Error in updating document");
//   }
// };
const handleEdit = async () => {
  try {
    const payload = { ...formData };
    const dataToSend = mapPayloadForBackend(payload);

    const normalizedSOPData = normalizeSOPData(sopData);
    const normalizedformData = normalizeFormData(formData);
    const normalizedHistory = normalizeHistoryData(historyData);
    const normalizedEscalation = normalizeEscalationData(escalationData);
    const normalizedRoles = normalizeRolesData(rolesData);
    const normalizeOriginalClausesData=normalizeClausesData(clauses);
    const normalizeClauses =normalizeClausesData(clauseData);

    // const normalizeOriginalAnnexureData = annexures;
    const normalizeAnnexureDataa = normalizeAnnexureData(annexureData);

    console.log("original formadata in ANnexure:", normalizedformData);
    console.log("fetched sop data for editing in Annexure:", JSON.stringify(normalizedSOPData, null, 2));

    console.log("original history in ANnexure:",JSON.stringify(history, null, 2));
    console.log("fetched history data for editing in Annexure:", JSON.stringify(normalizedHistory, null, 2));

    console.log("original clauses in ANnexure:", normalizeOriginalClausesData);
    console.log("fetched clausesData for editing in Annexure: ", normalizeClauses);

    console.log("original escalationRows in ANnexure:", JSON.stringify(escalationRows, null, 2));
    console.log("fetched escalation data for editing in Annexure:", JSON.stringify(normalizedEscalation, null, 2));

    console.log("original roles in ANnexure:", JSON.stringify(roles, null, 2));
    console.log("fetched roles data for editing in Annexure:", JSON.stringify(normalizedRoles, null, 2));

        console.log("original Annexure in ANnexure:", JSON.stringify(annexures, null, 2));
    console.log("fetched Annexure data for editing in Annexure:", JSON.stringify(normalizeAnnexureDataa, null, 2));

    // 🔍 Detect changes between original states and current states
    const onlyFormDataChanged =
      !isEqual(normalizedformData, normalizedSOPData) &&
      isEqual(normalizeOriginalClausesData, normalizeClauses) &&
      isEqual(history, normalizedHistory) &&
      isEqual(escalationRows, normalizedEscalation) &&
      isEqual(roles, normalizedRoles) &&
      isEqual(annexures, normalizeAnnexureDataa);

    const nothingChanged =
      isEqual(normalizedformData, normalizedSOPData) &&
      isEqual(normalizeOriginalClausesData, normalizeClauses) &&
      isEqual(history, normalizedHistory) &&
      isEqual(escalationRows, normalizedEscalation) &&
      isEqual(roles, normalizedRoles) &&
      isEqual(annexures, normalizeAnnexureDataa);

    // ✅ Case 1: only formData changed
// Log each comparison
console.log("Form Data === SOP Data:", _.isEqual(normalizedformData, normalizedSOPData));
console.log("History === History Data:", _.isEqual(history, normalizedHistory));
console.log("Escalation === Escalation Data:", _.isEqual(escalationRows, normalizedEscalation));
console.log("clauses === Clauses Data:", _.isEqual(normalizeOriginalClausesData, normalizeClauses));
console.log("Roles === Roles Data:", _.isEqual(roles, normalizedRoles));
console.log("annexure === annexure Data:", _.isEqual(annexures, normalizeAnnexureDataa));

    console.log("onlyFormDataChanged: ", onlyFormDataChanged);

    if(nothingChanged){
      toast.warning("Noting has been updated");
      return;
    }
    else if (onlyFormDataChanged) {
      const response = await ComplianceService.UpdateSOP(sopId, dataToSend);
      if (!response.ok) {
        toast.error("Error in saving SOP Document");
        return;
      } else {
        toast.success("SOP Document updated successfully");
        window.location.href = "/SOPReport";
      }
    } else {
      // step 1: update main SOP
      const response = await ComplianceService.UpdateSOPDocument(sopId, dataToSend);
      if (!response.ok) {
        toast.error("Error in saving SOP Document");
        return;
      }
      const jsonRes = await response.json();
      if (!jsonRes.id) {
        toast.error("Error in updating document");
        return;
      }

      const documentId = jsonRes.id;
      const allAnnexureFiles = [];

      // step 2: handle annexures
      for (let annexure of annexures) {
        if (!annexure.files.length) continue;

        // upload ONLY new files
        const newFiles = annexure.files.filter(f => f.fileObject);
        if (newFiles.length > 0) {
          const uploadedFiles = await uploadToServer(newFiles.map(f => f.fileObject), annexure.letter, documentId);
          allAnnexureFiles.push(...uploadedFiles);
        }

        // keep old files as-is (no re-upload)
        const oldFiles = annexure.files.filter(f => !f.fileObject);
        for (let old of oldFiles) {
          allAnnexureFiles.push({
            subValue: annexure.letter,
            documentId,
            value: old.filename,
            key: "IMAGE",
            status: "ACTIVE",
          });
        }
      }

      // step 3: handle process section
      const processSection = processFiles.find(p => p.sectionName === "Process Explanation");
      if (processSection && processSection.files.length > 0) {
        const newFiles = processSection.files.filter(f => f.fileObject);
        if (newFiles.length > 0) {
          const uploadedFiles = await uploadToServer(newFiles.map(f => f.fileObject), "Process Explanation", documentId);
          allAnnexureFiles.push(...uploadedFiles);
        }
        const oldFiles = processSection.files.filter(f => !f.fileObject);
        for (let old of oldFiles) {
          allAnnexureFiles.push({
            subValue: "Process Explanation",
            documentId,
            value: old.filename,
            key: "IMAGE",
            status: "ACTIVE",
          });
        }
      }

      // step 4: send deleted files
      if (deletedFiles.length > 0) {
        await ComplianceService.deleteAnnexureFiles({
          documentId,
          files: deletedFiles
        });
      }

      try {
        await Promise.all([
          ComplianceService.UpdateAnnexure(sopId, { details: allAnnexureFiles }),
          ComplianceService.UpdateHistory(sopId, { histories: history.map(h => ({ ...h, documentId })) }),
          ComplianceService.UpdateEscalations(sopId, { escalations: escalationRows.map(e => ({ ...e, documentId })) }),
          ComplianceService.UpdateRoles(sopId, { responsibilities: roles.map(r => ({ ...r, documentId })) }),
          ComplianceService.UpdateClauses(sopId, { clauses: clauses.map(c => ({ ...c, documentId })) }),
        ]);

        toast.success("SOP Document updated, and a new version has been saved.");
        // window.location.href = "/SOPReport";
      } catch (error) {
        console.error("Error updating document:", error);
        toast.error("Failed to update document. Please try again.");
      }
    } //else in case there is change in history,clauses, escalation data and need versioning
  } catch (err) {
    console.error("Update failed:", err);
    toast.error("Error in updating document");
  }
};

// Fixed normalization functions
function normalizeFormData(formData) {
  return {
    sop_name: formData.sop_name || "",
    version: formData.version || "",
    dateOfApproval: formData.dateOfApproval || "",
    documentobjective: formData.documentobjective || "",
    ownerDepartment: formData.ownerDepartment?.value || formData.ownerDepartment || "",
    subDepartment: formData.subDepartment?.value || formData.subDepartment || "",
    sopType: formData.sopType?.value || formData.sopType || "",
    infoClassification: formData.infoClassification?.value || formData.infoClassification || "",
    criticalityLevel: formData.criticalityLevel?.value || formData.criticalityLevel || "",
    manualRequired: formData.manualRequired?.value || formData.manualRequired || "",
    preparedBy: formData.preparedBy?.value || formData.preparedBy || "",
    city: formData.city?.value || formData.city || "",
    approvedBy: Array.isArray(formData.approvedBy)
      ? formData.approvedBy.map(a => a.value || a).join(", ")
      : formData.approvedBy || "",
    stakeholders: Array.isArray(formData.stakeholders)
      ? formData.stakeholders.map(s => s.value || s).join(", ")
      : formData.stakeholders || "",
    reviewedStakeholders: Array.isArray(formData.reviewedStakeholders)
      ? formData.reviewedStakeholders.map(r => r.value || r).join(", ")
      : formData.reviewedStakeholders || "",
  };
}

function normalizeSOPData(sopData) {
  // Create a new object with only the fields we want to compare
  return {
    sop_name: sopData.sop_name || "",
    version: sopData.version || "",
    dateOfApproval: sopData.dateOfApproval || "",
    documentobjective: sopData.documentobjective || "",
    ownerDepartment: sopData.ownerDepartment || "",
    subDepartment: sopData.subDepartment || "",
    sopType: sopData.sop_type || "",
    infoClassification: sopData.informationClassification || "",
    criticalityLevel: sopData.criticalityLevel || "",
    manualRequired: sopData.manualRequired || "",
    preparedBy: sopData.preparedBy || "",
    city: sopData.city || "",
    approvedBy: sopData.approvedBy || "",
    stakeholders: sopData.stakeholders || "",
    reviewedStakeholders: sopData.reviewed_stakeholders || "",
  };
}

function normalizeHistoryData(historyArr = []) {
  return historyArr.map(h => ({
    version: h.version || "",
    preparedBy: h.preparedBy || "",
    approvedBy: h.approvedBy || "",
    changes: h.changes || "",
    datetime: h.datetime ? new Date(h.datetime).toISOString().split("T")[0] : "",
    // ? new Date(h.datetime).toISOString().split("T")[0] : "",
  }));
}

function normalizeEscalationData(escalationArr = []) {
  return escalationArr.map(e => ({
    level: e.level || "",
    duration: e.duration || "",
    designation: e.designation || "",
  }));
}
function normalizeRolesData(rolesArr = []) {
  return rolesArr.map(r => ({
    dept: r.dept || "",
    responsibility: r.responsibility || "",
  }));
}

function normalizeClausesData(clausesArr) {
  if (!Array.isArray(clausesArr)) return [];
  
  return clausesArr.map(c => {
    return {
      id:c.id,
     seq: c.seq != null ? String(c.seq) : "",
      text: c.text.trim() || "",
      sectionName: c.sectionName || "",
      parent_id: c.parent_id || null,
    };
  });
}

function normalizeAnnexureData(fetchedData) {
 if (!Array.isArray(fetchedData)) return [];

  const grouped = {};

  fetchedData.forEach(item => {
    const letter = item.subValue || "";
    if (!grouped[letter]) grouped[letter] = [];

    grouped[letter].push({
      filename: item.value,
      type: "image/png", // you can enhance this if type is stored in DB
      filepath: `https://storage.nayatel.com/views/crmViews/storage/budgetapproval/${item.value}`,
      fileObject: null
    });
  });

  return Object.entries(grouped).map(([letter, files]) => ({
    letter,
    files
  }));
}

//new handle edit

  return (
    <>
<div className="p-3 mb-4 mt-5">

      <div className="mb-2 ml-1 d-flex">
           <h5 className="fw-bold mb-3">
    {formType === "service" ? "" : "14. "} Annexures
  </h5>

        <button
        type="button"
        className="btn custom-bg-color ml-3"
      style={{    padding: "1px 7px 1px 7px", color:"white", height:"25px" }}
        onClick={handleAddAnnexure}
          disabled={
    annexures.length > 0 &&
    annexures[annexures.length - 1]?.letter?.charCodeAt(0) >=
      "K".charCodeAt(0)
  }
      >
        <i className="fa fa-plus"></i>
      </button>
      </div>
  {/* <button
    className="btn btn-primary px-4"
    style={{
      background: "rgb(40, 78, 147)",
      color: "white",
      marginTop: "10px",
      marginBottom: "10px",
    }}
    onClick={handleAddAnnexure}
    disabled={
    annexures.length > 0 &&
    annexures[annexures.length - 1]?.letter?.charCodeAt(0) >=
      "K".charCodeAt(0)
  }
    >
    + Add Annexure
  </button> */}

  {annexures.map((annexure, index) => (
    <div
      key={annexure.letter}
      className="border rounded p-3 mb-3 shadow-sm position-relative"
    >
      {annexure.letter !== "A" && (
        <button
          className="btn btn-danger ms-1"
          style={{ padding: "0.3rem 0.5rem", color:"white",marginLeft:"2px",float:"right" , marginTop:"-11px" }}
          onClick={() => handleRemoveAnnexure(annexure.letter)}
          title="Remove"
        >
           <i className="fa fa-trash"></i>
        </button>
      )}

      <h6 className="fw-bold mb-2">Annexure {annexure.letter}</h6>

      {/* Upload Box */}
      <div
      onClick={(e) => {
      e.stopPropagation();
      proofFileUploadRefs.current[annexure.letter]?.click();
    }}
        className="text-center py-4 rounded"
        style={{
          border: "2px dashed rgb(190 190 192)",
          cursor: "pointer",
        }}
      >
        <Image src={AddFile} alt="add-file-icon" width={40} height={40} />
        <label className="inputfile-box custom-file-upload py-2 mb-0 text-dark">
          Upload a file for Annexure {annexure.letter}
        </label>
       <input
      type="file"
      className="inputfile"
      onChange={(e) => uploadToClient(e, annexure.letter, annexures, setAnnexures, setShowLoader)}
      ref={(el) => (proofFileUploadRefs.current[annexure.letter] = el)}
      multiple
    />
      </div>

      {/* Files Preview */}
      <div>
        {annexure.files?.length > 0 &&
          annexure.files.map((element, i) => (
            <div
              key={i}
              className="my-2 mx-2 rounded d-flex align-items-center"
              style={{ border: "2px solid rgb(190 190 192)" }}
            >
              <p className="px-2 py-2 m-0 w-50">{element.filename}</p>
              <div className="w-50 text-right px-3">
                {previewFileTypes.includes(element.type) && (
                  <i
                    className="fa fa-eye text-standard mr-3"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handlePreViewFile(
                        element.filename,
                        element.type,
                        element.filepath
                      )
                    }
                  ></i>
                )}
                <i
                  className="fa fa-trash text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => removeFile(annexure.letter, i)}
                ></i>
              </div>
            </div>
          ))}
      </div>
    </div>
  ))}

      {/* Navigation Buttons */}
      <div className="mt-4 d-flex justify-content-between">
        <button onClick={handlePrev} className="btn btn-secondary" style={{ background: "#aaa", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Previous
        </button>
        <button onClick={sopId ? handleEdit : handleSubmit} className="btn btn-success" style={{ color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>
         {sopId ? "Update" : "Submit"}
        </button>
      </div>
</div>

    </>
  );
}

function mapPayloadForBackend(payload) {
  return {
    sop_name: payload.sop_name,
    sop_type: payload.sopType.value,
    docType: payload.docType.value,
    ownerDepartment: payload.ownerDepartment.value,
    stakeholders: payload.stakeholders.map(s => s.value).join(', '),
    subDepartment: payload.subDepartment.value,
    city: payload.city.value,
    version: payload.version,
    criticalityLevel: payload.criticalityLevel?.value,
    dateOfApproval: payload.dateOfApproval,
    preparedBy: payload.preparedBy.value,
    reviewed_stakeholders: payload.reviewedStakeholders.map(s => s.value).join(', '),
    approvedBy: payload.approvedBy.map(s => s.value).join(', '),
  informationClassification: payload.infoClassification?.value,
    manualRequired: payload.manualRequired?.value,
    documentobjective: payload.documentobjective,
  };
}

// function normalizeFormData(formData) {

//   return {
//     ...cleaned,
//     ownerDepartment: formData.ownerDepartment?.value || "",
//     subDepartment: formData.subDepartment?.value || "",
//     sopType: formData.sopType?.value || "",
//     infoClassification: formData.infoClassification?.value || "",
//     criticalityLevel: formData.criticalityLevel?.value || "",
//     manualRequired: formData.manualRequired?.value || "",
//     approvedBy: Array.isArray(formData.approvedBy)
//       ? formData.approvedBy.map(a => a.value).join(", ")
//       : formData.approvedBy || "",
//     stakeholders: Array.isArray(formData.stakeholders)
//       ? formData.stakeholders.map(s => s.value).join(", ")
//       : formData.stakeholders || "",
//     reviewedStakeholders: Array.isArray(formData.reviewedStakeholders)
//       ? formData.reviewedStakeholders.map(r => r.value).join(", ")
//       : formData.reviewedStakeholders || "",
//   };
// }

// function normalizeSOPData(sopData){
//  // remove unwanted fields first
//   const cleaned = _.omit(sopData, ["id", "createdAt", "updatedAt", "datetime"]);
//   return cleaned;
// }

// function normalizeHistory(historyArr) {
//   return historyArr.map(item => {
//     const cleaned = _.omit(item, ["id"]); // remove id
//     return {
//       ...cleaned,
//       // normalize datetime (optional, depends on your use case)
//       datetime: cleaned.datetime?.split("T")[0] || cleaned.datetime,
//     };
//   });
// }

// function normalizeArray(data) {
//   return data.map(item => {
//     // remove id and datetime entirely
//     return _.omit(item, ["id", "datetime"]);
//   });
// }