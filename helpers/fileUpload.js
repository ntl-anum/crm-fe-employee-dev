import path from "path";
import { toast } from "react-toastify";
import { FTP_Constants } from "@/constants/FTP_Constants";

// ---------- Upload to Client (Local state handling) ----------
export const uploadToClient = async (
  event,
  identifier,  // annexure letter OR sectionName
  state,
  setState,
  
) => {

  const selectedFiles = Array.from(event.target.files);
  event.target.value = "";

  if (selectedFiles.length === 0) {
    return;
  }

  const allowedFileExtensions = [".img", ".msg"];
  const acceptedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  const restrictedFileExtensions = [".xls", ".xlsx", ".doc", ".docx", ".exe", ".msg"];
  const newFiles = [];

  for (let file of selectedFiles) {
    const { ext } = path.parse(file.name);

    // --- validation ---
    if (
      (!file.type && !allowedFileExtensions.includes(ext)) ||
      (!acceptedFileTypes.includes(file.type) && !allowedFileExtensions.includes(ext)) ||
      restrictedFileExtensions.includes(ext)
    ) {
      toast.error(`Invalid file type for "${file.name}". Only JPG, JPEG, PNG are allowed.`);
      continue;
    }

    // --- rename file ---
    const modifiedFilename = `SOP-${file.name}`;
    const modifiedFile = new File([file], modifiedFilename, {
      type: allowedFileExtensions.includes(ext) ? ext : file.type,
      lastModified: file.lastModified,
    });

    // --- find target annexure OR process section ---
    const target = state.find((s) => s.letter === identifier || s.sectionName === identifier);

    if (!target) {
      toast.error(`Invalid target: ${identifier}`);
      continue;
    }

    if (target.files.some((f) => f.filename === modifiedFilename)) {
      toast.error(`File "${file.name}" already exists in ${identifier}`);
      continue;
    }

    if (target.files.length + newFiles.length >= 5) {
      toast.error(`${identifier} can only have 5 files. "${file.name}" skipped.`);
      break;
    }

    newFiles.push({
      filename: modifiedFile.name,
      type: modifiedFile.type,
      fileObject: modifiedFile,
      filepath: URL.createObjectURL(modifiedFile),
    });
  }

  // --- update state ---
  if (newFiles.length > 0) {
    setState((prev) =>
      prev.map((s) =>
        s.letter === identifier || s.sectionName === identifier
          ? { ...s, files: [...s.files, ...newFiles] }
          : s
      )
    );
  }

//   setShowLoader(false);
};

// ---------- Upload to Server (FTP) ----------
export const uploadToServer = async (files, identifier, sopId) => {
  const uploadedFiles = [];

  for (let file of files) {
    const body = new FormData();
    body.append("file", file);
    body.append("subFolder", FTP_Constants.NTL_COMPLIANCE_SOP_FOLDER);

    try {
      const response = await fetch(FTP_Constants.UPLOAD_URL, {
        method: "POST",
        enctype: "multipart/form-data",
        body,
      });

      const res = await response.json();

      if (res?.status === "SUCCESS") {
        toast.success(`Uploaded: ${file.name}`);

        const filename = res.data?.[0]?.split("budgetapproval/")[1];

        uploadedFiles.push({
          subValue: identifier, // annexureLetter OR sectionName
          documentId: sopId,
          value: filename,
          key: "IMAGE",
          status: "ACTIVE",
        });
      } else {
        toast.error(`Failed to upload: ${file.name}`);
      }
    } catch (err) {
      console.error(err);
      toast.error(`Error uploading file: ${file.name}`);
    }
  }

  return uploadedFiles;
};
