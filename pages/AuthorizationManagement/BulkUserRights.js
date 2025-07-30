import CircularLoader from "@/components/Loader/circularLoader";
import { APP_ROUTES } from "@/helpers/enums";
import Image from "next/image";
import Router from "next/router";
import React from "react";
import { toast } from "react-toastify";
import fileIcon from "../../public/dist/img/fileIcon.svg";
import AddFile from "../../public/dist/img/AddFile.svg";
import ExcelJS from "exceljs";
import { get, set } from "lodash";
import PanelHeading from "@/components/PanelHeading";
import ReactTable from "@/components/Table/ReactTable";
import { UserRightsService } from "@/services/AuthorizationService/UserRightsManagement";
import { getOperatorFromCookie } from "@/helpers/cookie-parser";

function BulkUserRights() {
  const [files, setFiles] = React.useState([]);
  const [showLoader, setShowLoader] = React.useState(false);
  const [bulkUserRights, setBulkUserRights] = React.useState([]);
  const [assignmentResults, setAssigmentResults] = React.useState([]);

  const cols = React.useMemo(
    () => [
      {
        Header: "Sr No",
        accessor: "SR_NO",
      },
      {
        Header: "Assigned To Key",
        accessor: "ASSIGNED_TO_KEY",
      },
      {
        Header: "Assigned To Value",
        accessor: "ASSIGNED_TO_VALUE",
      },
      {
        Header: "Rights Level Key",
        accessor: "RIGHTS_LEVEL_KEY",
      },
      {
        Header: "Rights Level Value",
        accessor: "RIGHTS_LEVEL_VALUE",
      },
      {
        Header: "Role",
        accessor: "ROLE",
      },
      {
        Header: "Status",
        accessor: "STATUS",
      },
      {
        Header: "Message",
        accessor: "MESSAGE",
      },
    ],
    []
  );

  const uploadToClient = async (event) => {
    try {
      const selectedFile = event.target.files[0];

      if (
        ![
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "text/csv",
        ].includes(selectedFile.type)
      ) {
        return toast.error("Only Excel File Is Allowed");
      }

      const reader = new FileReader();

      reader.readAsArrayBuffer(selectedFile);

      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;

        // Create a new Workbook
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);

        const worksheet = workbook.worksheets[0];
        const requiredHeaders = [
          "ASSIGNED_TO_KEY",
          "ASSIGNED_TO_VALUE",
          "RIGHTS_LEVEL_KEY",
          "RIGHTS_LEVEL_VALUE",
          "ROLE",
        ];

        const headerRow = worksheet.getRow(1);
        const headersInFile = headerRow.values.slice(1); // skip first null index

        // Check for missing headers
        const missingHeaders = requiredHeaders.filter(
          (header) => !headersInFile.includes(header)
        );

        if (missingHeaders.length > 0) {
          toast.error("Missing headers: " + missingHeaders.join(", "));
          return;
        }

        // Optional: Check for unexpected headers
        const unexpectedHeaders = headersInFile.filter(
          (header) => !requiredHeaders.includes(header)
        );
        if (unexpectedHeaders.length > 0) {
          toast.error("Unexpected headers: " + unexpectedHeaders.join(", "));
          return;
        }
        const jsonData = [];
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          // Start processing from the second row
          if (rowNumber > 1) {
            // Skip the header row
            const rowData = {};
            row.eachCell((cell, colNumber) => {
              const header = worksheet.getCell(1, colNumber).value;
              if (requiredHeaders.includes(header) && cell.value) {
                rowData[header] = cell.value;
              }
            });
            jsonData.push(rowData);
          }
        });
        setBulkUserRights(jsonData);
        setFiles([selectedFile]);
      };

      reader.onerror = (error) => {
        toast.error("Error reading file");
        setBulkUserRights([]);
        setFiles([]);
      };
    } catch (error) {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  const assignRights = async () => {
    if (files.length === 0) {
      toast.error("Please upload a valid Excel file.");
    } else if (bulkUserRights.length === 0) {
      toast.error("Please upload a valid Excel file.");
    } else {
      setShowLoader(true);
      try {
        const response = await UserRightsService.createBulkUserRights({
          BULK_RIGHTS: bulkUserRights,
          OPERATOR: getOperatorFromCookie(),
        });

        if (response) {
          const result = await response.json();
          if (result?.error) {
            toast.error(result?.error);
            setShowLoader(false);
            return;
          }
          if (result.status === "SUCCESS") {
            prepareTableData(result.data);
            toast.success("Rights Processed successfully.");
            setBulkUserRights([]);
            setFiles([]);
          } else {
            toast.error(
              Array.isArray(result.messsage)
                ? result.messsage[0]
                : result.message
            );
          }
        } else {
          Router.push(APP_ROUTES.SERVER_ERROR);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setShowLoader(false);
      }
    }
  };

  const removeFile = () => {
    setFiles([]);
    setBulkUserRights([]);
  };

  const prepareTableData = (data) => {
    const formattedData = data.map((item, index) => ({
      SR_NO: index + 1,
      ASSIGNED_TO_KEY: item?.data?.ASSIGNED_TO_KEY,
      ASSIGNED_TO_VALUE: item?.data?.ASSIGNED_TO_VALUE,
      RIGHTS_LEVEL_KEY: item?.data.RIGHTS_LEVEL_KEY,
      RIGHTS_LEVEL_VALUE: item?.data.RIGHTS_LEVEL_VALUE,
      ROLE: item?.data?.ROLE,
      STATUS: item.status,
      MESSAGE: item.message,
    }));
    setAssigmentResults(formattedData);
  };

  return (
    <div>
      {showLoader && (
        <div className="loader-overlay">
          <CircularLoader />
        </div>
      )}
      <div className="panel panel-inverse card-view">
        <div
          className="panel-heading panel-heading-div rounded-top"
          style={{ background: "#284E93" }}
        >
          <div className="pull-left">
            <h6 className="panel-title text-white font-16 weight-500 ">
              Bulk User Rights
            </h6>
          </div>

          <div className="clearfix"> </div>
        </div>
        <div className="pt-4">
          <div className="">
            {files?.length > 0 &&
              files.map((element, i) => {
                return (
                  <div
                    key={i}
                    className="my-2 mx-2 rounded d-flex align-items-center"
                    style={{
                      border: "2px solid rgb(190 190 192)",
                    }}
                  >
                    <p className="px-2 py-2 m-0 w-50">
                      <Image
                        id="imgFileIcon"
                        src={fileIcon}
                        alt="fileIcon"
                        className="mr-2"
                      />
                      {element?.name}
                    </p>
                    <div className="w-50 text-right px-3">
                      <i
                        id="btnRemove"
                        className="fa fa-trash text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={removeFile}
                      ></i>
                    </div>
                  </div>
                );
              })}
          </div>

          <section className="pb-2 ">
            {/* Customer Status */}
            <div className="row mt-3">
              <div className="col-md-6 col-sm-12"></div>
              <div className="col-md-6 col-sm-12"></div>
            </div>

            {/* Submit button  */}
            <div className="py-2 text-right mr-2">
              <button
                id="btnUpload"
                className="btn custom-bg-color"
                onClick={assignRights}
              >
                Assign Rights
              </button>
            </div>
          </section>
          <div className="row d-flex justify-content-center align-items-center text-center mt-3">
            <div>
              <Image id="imgFile" src={AddFile} alt="add-file-icon" />
              <br />
              <label
                className="required inputfile-box custom-file-upload py-2 control-label mb-0 text-dark text-left font-14 weight-500"
                onChange={(e) => {
                  uploadToClient(e);
                }}
              >
                Upload Excel File
                <input type="file" className="inputfile" name="FILE" />
              </label>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <div
              className="d-inline-block p-3 mb-2 rounded"
              style={{ background: "#f7f7f7" }}
            >
              <label className="mb-10 text-left text-dark font-14 weight-500">
                Excel File Format
              </label>

              <ol className="pl-3 mb-0" style={{ listStyleType: "decimal" }}>
                <li className="font-13">
                  File Should Contain only these columns: ASSIGNED_TO_KEY,
                  ASSIGNED_TO_VALUE, RIGHTS_LEVEL_KEY, RIGHTS_LEVEL_VALUE, ROLE
                </li>
                <li className="font-13">
                  ASSIGNED_TO_KEY Should be either of these: INDIVIDUAL,
                  DESIGNATION, SUBDEPARTMENT, DEPARTMENT, TEAM
                </li>

                <li className="font-13">
                  ASSIGNED_TO_VALUE is the name of the individual,
                  sub-department, department, etc.
                </li>
                <li className="font-13">
                  RIGHTS_LEVEL_KEY Should be either of these: APP, MODULE,
                  SUBMODULE, SECTION, ELEMENT
                </li>
                <li className="font-13">
                  RIGHTS_LEVEL_VALUE is name of the app, module, submodule,
                  section, or element.
                </li>
                <li className="font-13">
                  ROLE Should be either of these: Basic Role, Admin, Section
                  Admin or Element Admin
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="panel panel-inverse card-view">
        <PanelHeading text="Bulk Rights Result" />
        <div className="panel-wrapper collapse in">
          <div className="panel-body">
            <ReactTable
              columns={cols}
              data={assignmentResults}
              tableID={"tblBulkRightsResult"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BulkUserRights;
