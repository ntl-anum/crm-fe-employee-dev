
import { useEffect, useRef, useState } from 'react';
import { ComplianceService } from "@/services/ComplianceService/ComplianceService";
import { toast } from "react-toastify";
import { Fragment } from 'react';
import AddFile from "../../public/dist/img/AddFile.svg";
import Image from "next/image";
import { RingLoader } from 'react-spinners';
import CircularLoader from "@/components/Loader/circularLoader";
import path from "path";
import { FTP_Constants } from "../../constants/FTP_Constants";
import { useRouter } from "next/router";
import useURLParams from "@/hooks/useURLParams";
import { uploadToClient,uploadToServer  } from '@/helpers/fileUpload';

export default function AnnexureTab({ formData, setFormData, onNext, onPrev ,formType, history, clauses, escalationRows, roles,sopId,  processFiles,setProcessFiles }) {
  const URLParams = useURLParams();
  const router = useRouter();
  const [annexures, setAnnexures] = useState([
    { letter: "A", files: [] }
  ]);
  const [showLoader, setShowLoader] = useState(false);
  const proofFileUploadRefs = useRef({});

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
          setAnnexureData(Data.data);
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

// // Function to upload file to a specific annexure
//   const uploadToClient = async (event, annexureLetter) => {
//   setShowLoader(true);
//   const selectedFiles = Array.from(event.target.files); // multiple files
//   event.target.value = ""; // reset input

//   if (selectedFiles.length === 0) {
//     setShowLoader(false);
//     return;
//   }

//   const allowedFileExtensions = [".img", ".msg"];
//   const acceptedFileTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/jpg",
//   ];
//   const restrictedFileExtensions = [".xls", ".xlsx",".doc",".docx",".exe",".msg"];
//   const newFiles = [];

//   for (let file of selectedFiles) {
//     const { ext } = path.parse(file.name);


//     // Validate file type
//     if (
//       (!file.type && !allowedFileExtensions.includes(ext)) ||
//       (!acceptedFileTypes.includes(file.type) &&
//         !allowedFileExtensions.includes(ext)) ||
//       restrictedFileExtensions.includes(ext)
//     ) {
//       toast.error(
//         `Invalid file type for "${file.name}". Only JPG, JPEG, PNG are allowed.`
//       );
//       continue;
//     }

//     const modifiedFilename = `SOP-${file.name}`;
//     const modifiedFile = new File([file], modifiedFilename, {
//       type: allowedFileExtensions.includes(ext) ? ext : file.type,
//       lastModified: file.lastModified,
//     });

        

// // Check duplicate using the modified filename
// const annexure = annexures.find((a) => a.letter === annexureLetter);
// if (annexure.files.some((f) => f.filename === modifiedFilename)) {
//   toast.error(
//     `File "${file.name}" already exists in Annexure ${annexureLetter}`
//   );
//   continue;
// }

//     // ✅ Check if adding this file would exceed 5
//     if (annexure.files.length + newFiles.length >= 5) {
//       toast.error(`Annexure ${annexureLetter} can only have 5 files. "${file.name}" was skipped.`);
//       break; // stop adding more
//     }

//     newFiles.push({
//       filename: modifiedFile.name,
//       type: modifiedFile.type,
//       fileObject: modifiedFile,
//       filepath: URL.createObjectURL(modifiedFile),
//     });

//     // Optional: upload to server
//     // await uploadToServer([modifiedFile]);
//   }

//   // Add new files to the annexure
//   if (newFiles.length > 0) {
//     setAnnexures((prev) =>
//       prev.map((a) =>
//         a.letter === annexureLetter
//           ? { ...a, files: [...a.files, ...newFiles] }
//           : a
//       )
//     );
//   }

//   setShowLoader(false);
// };
// const uploadToClient = async (event, identifier, state, setState) => {
//   setShowLoader(true);
//   const selectedFiles = Array.from(event.target.files);
//   event.target.value = ""; 

//   if (selectedFiles.length === 0) {
//     setShowLoader(false);
//     return;
//   }

//   const allowedFileExtensions = [".img", ".msg"];
//   const acceptedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
//   const restrictedFileExtensions = [".xls", ".xlsx",".doc",".docx",".exe",".msg"];
//   const newFiles = [];

//   for (let file of selectedFiles) {
//     const { ext } = path.parse(file.name);

//     if (
//       (!file.type && !allowedFileExtensions.includes(ext)) ||
//       (!acceptedFileTypes.includes(file.type) &&
//         !allowedFileExtensions.includes(ext)) ||
//       restrictedFileExtensions.includes(ext)
//     ) {
//       toast.error(`Invalid file type for "${file.name}". Only JPG, JPEG, PNG are allowed.`);
//       continue;
//     }

//     const modifiedFilename = `SOP-${file.name}`;
//     const modifiedFile = new File([file], modifiedFilename, {
//       type: allowedFileExtensions.includes(ext) ? ext : file.type,
//       lastModified: file.lastModified,
//     });

//     // Find the target item (annexure OR process section)
//     const target = state.find((s) => s.letter === identifier || s.sectionName === identifier);

//     if (target.files.some((f) => f.filename === modifiedFilename)) {
//       toast.error(`File "${file.name}" already exists in ${identifier}`);
//       continue;
//     }

//     if (target.files.length + newFiles.length >= 5) {
//       toast.error(`${identifier} can only have 5 files. "${file.name}" skipped.`);
//       break;
//     }

//     newFiles.push({
//       filename: modifiedFile.name,
//       type: modifiedFile.type,
//       fileObject: modifiedFile,
//       filepath: URL.createObjectURL(modifiedFile),
//     });
//   }

//   if (newFiles.length > 0) {
//     setState((prev) =>
//       prev.map((s) =>
//         (s.letter === identifier || s.sectionName === identifier)
//           ? { ...s, files: [...s.files, ...newFiles] }
//           : s
//       )
//     );
//   }

//   setShowLoader(false);
// };


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
    prev.map((annexure) =>
      annexure.letter === annexureLetter
        ? {
            ...annexure,
            files: annexure.files.filter((_, idx) => idx !== fileIndex),
          }
        : annexure
    )
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
    toast.success("All annexure files uploaded and saved successfully!");

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
          
          await Promise.all([
              // 👈 wrap it in an array
              ComplianceService.CreateHistory( {histories: historyWithDocId }),
              ComplianceService.CreateEscalations({escalations: escalationsWithDocId}),
              ComplianceService.CreateRoles({responsibilities: rolesWithDocId}),
              ComplianceService.CreateClauses({clauses:clausesWithDocId}),
              ComplianceService.addDocDetails( {details: annexureWithDocId }),

            ]);

          toast.success("Document inserted successfully");
        } else {
          toast.error("Error in saving document");
        }
      } else {
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
  } catch (error) {
    console.error("Save failed:", error);
    toast.error("Error in saving document");
  }
};

const handleEdit = async () => {
  try {
    // Prepare SOP Document payload
    const payload = {
      ...formData,
    };

    const allAnnexureFiles = [];
    const dataToSend = mapPayloadForBackend(payload);

    // 1️⃣ Update SOP Document first
    const response = await ComplianceService.UpdateSOPDocument(
      sopId,   // existing doc id
      dataToSend
    );

    if (response) {
      const jsonRes = await response.json();

      if (jsonRes.id) {
        const documentId = jsonRes.id;

    for (let annexure of annexures) {
      if (!annexure.files.length) continue;

      // Build array of File objects for upload
      const filesForUpload = await Promise.all(
        annexure.files.map(async f => {
          if (f.fileObject) {
            // 🆕 case: new file picked by user → already a File object
            return f.fileObject;
          } else {
            // 🧾 case: old file (only filename known)
            // fetch it again from storage/FTP and convert to File
            const response = await fetch(`${FTP_Constants.BASE_URL}/${f.filename}`);
            const blob = await response.blob();
            return new File([blob], f.filename, { type: f.type || "application/octet-stream" });
          }
        })
      );

      // Upload all (old + new together)
      const uploadedFiles = await uploadToServer(filesForUpload, annexure.letter,documentId);

      allAnnexureFiles.push(...uploadedFiles);
    }

    console.log("Updated process files are:::", processFiles);

      let uploadedProcessFiles = []; // declare here
     // Upload Process Explanation files in same manner
const processSection = processFiles.find(p => p.sectionName === "Process Explanation");

if (processSection && processSection.files.length > 0) {
  const filesForUpload = await Promise.all(
    processSection.files.map(async f => {
      if (f.fileObject) {
        return f.fileObject; // new file
      } else {
        const response = await fetch(`${FTP_Constants.BASE_URL}/${f.filename}`);
        const blob = await response.blob();
        return new File([blob], f.filename, { type: f.type || "application/octet-stream" });
      }
    })
  );

  const uploadedProcessFiles = await uploadToServer(filesForUpload, "Process Explanation", documentId);
  allAnnexureFiles.push(...uploadedProcessFiles);

}

  // Append to main DB array

    console.log("Files ready for DB:", allAnnexureFiles);

          const annexureWithDocId = allAnnexureFiles.map((h) => ({
          ...h,
          documentId,
        }));
        // 2️⃣ Append documentId + keep existing ids
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

        console.log("History Data (Update):", historyWithDocId);
        console.log("Escalation Data (Update):", escalationsWithDocId);
        console.log("Roles Data (Update):", rolesWithDocId);
        console.log("Clause Data (Update):", clausesWithDocId);
        console.log("Annexure Data (Update):", annexureWithDocId);


        // 3️⃣ Call update APIs in parallel
        await Promise.all([
          ComplianceService.UpdateHistory(sopId, { histories: historyWithDocId }),
          ComplianceService.UpdateEscalations(sopId, { escalations: escalationsWithDocId }),
          ComplianceService.UpdateRoles(sopId, { responsibilities: rolesWithDocId }),
          ComplianceService.UpdateClauses(sopId, { clauses: clausesWithDocId }),
          ComplianceService.UpdateAnnexure(sopId, { details: annexureWithDocId }),
          
        ]);

        toast.success("Document updated successfully");
      } else {
        toast.error("Error in updating document");
      }
    } else {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  } catch (error) {
    console.error("Update failed:", error);
    toast.error("Error in updating document");
  }
};
/**
 * Upload files to server and return metadata
 * @param {File[]} files Array of File objects
 * @param {string} annexureLetter Letter of the annexure
 * @returns {Promise<Object[]>} Array of uploaded file info
 */
// const uploadToServer = async (files, annexureLetter) => {
//   const uploadedFiles = [];

//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];
//     const body = new FormData();
//     body.append("file", file);
//     body.append("subFolder", FTP_Constants.NTL_COMPLIANCE_SOP_FOLDER);

//     const ext = file.name.split(".").pop();

//     try {
//       const response = await fetch(FTP_Constants.UPLOAD_URL, {
//         method: "POST",
//         enctype: "multipart/form-data",
//         body,
//       });

//       const res = await response.json();

//       if (res && res.status === "SUCCESS") {
//         toast.success(`Uploaded: ${file.name}`);

//         const filename = res.data?.[0]?.split("budgetapproval/")[1];

//         uploadedFiles.push({
//           subValue: annexureLetter,
//           documentId: sopId,
//           value: filename,
//           key: 'IMAGE',
//           status:'ACTIVE',
//         });
//       } else {
//         toast.error(`Failed to upload: ${file.name}`);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error(`Error uploading file: ${file.name}`);
//     }
//   }

//   return uploadedFiles;
// };
// const uploadToServer = async (files, identifier, sopId) => {
//   const uploadedFiles = [];

//   for (let file of files) {
//     const body = new FormData();
//     body.append("file", file);
//     body.append("subFolder", FTP_Constants.NTL_COMPLIANCE_SOP_FOLDER);

//     try {
//       const response = await fetch(FTP_Constants.UPLOAD_URL, {
//         method: "POST",
//         enctype: "multipart/form-data",
//         body,
//       });

//       const res = await response.json();

//       if (res?.status === "SUCCESS") {
//         toast.success(`Uploaded: ${file.name}`);

//         const filename = res.data?.[0]?.split("budgetapproval/")[1];

//         uploadedFiles.push({
//           subValue: identifier,  // annexureLetter OR sectionName
//           documentId: sopId,
//           value: filename,
//           key: 'IMAGE',
//           status: 'ACTIVE',
//         });
//       } else {
//         toast.error(`Failed to upload: ${file.name}`);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error(`Error uploading file: ${file.name}`);
//     }
//   }

//   return uploadedFiles;
// };


  return (
    <>
 {showLoader && (
        <div className="loader-overlay">
          <CircularLoader />
        </div>
      )}
<div className="mb-4 mt-5">
  <h6 className="fw-bold mb-3">
    {formType === "service" ? "" : "14. "} Annexures
  </h6>

  <button
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
  </button>

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
</div>

      {/* Navigation Buttons */}
      <div className="mt-4 d-flex justify-content-between">
        <button onClick={handlePrev} className="btn btn-secondary" style={{ background: "#aaa", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Previous
        </button>
        <button onClick={sopId ? handleEdit : handleSubmit} className="btn btn-success" style={{ color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>
         {sopId ? "Update" : "Submit"}
        </button>
      </div>
    </>
  );
}

function mapPayloadForBackend(payload) {
  return {
    sop_name: payload.sop_name,
    sop_type: payload.sopType.value,
    ownerDepartment: payload.ownerDepartment.value,
    stakeholders: payload.stakeholders.map(s => s.value).join(', '),
    subDepartment: payload.subDepartment.value,
    city: payload.city.value,
    version: payload.version,
    criticalityLevel: payload.criticalityLevel,
    dateOfApproval: payload.dateOfApproval,
    preparedBy: payload.preparedBy.value,
    reviewed_stakeholders: payload.reviewedStakeholders.map(s => s.value).join(', '),
    // approved_by: payload.approvedBy || '',
  informationClassification: payload.infoClassification?.value,
    manualRequired: payload.manualRequired?.value,
    documentobjective: payload.documentobjective,
  };
}

function diffAnnexures(originalData, currentState) {
  // --- Normalize original (backend)
  const originalGrouped = originalData.reduce((acc, item) => {
    if (!acc[item.subValue]) acc[item.subValue] = [];
    acc[item.subValue].push(item.value); // only filename
    return acc;
  }, {});

  // --- Normalize current (UI state)
  const currentGrouped = currentState.reduce((acc, annex) => {
    acc[annex.letter] = annex.files.map(f => f.filename);
    return acc;
  }, {});

  let toAdd = [];
  let toDelete = [];

  // --- Check per annexure
  const allLetters = new Set([
    ...Object.keys(originalGrouped),
    ...Object.keys(currentGrouped),
  ]);

  allLetters.forEach(letter => {
    const origFiles = originalGrouped[letter] || [];
    const currFiles = currentGrouped[letter] || [];

    // files to add → in current but not in original
    currFiles.forEach(f => {
      if (!origFiles.includes(f)) {
        toAdd.push({ letter, filename: f });
      }
    });

    // files to delete → in original but not in current
    origFiles.forEach(f => {
      if (!currFiles.includes(f)) {
        toDelete.push({ letter, filename: f });
      }
    });
  });

  return { toAdd, toDelete };
}
