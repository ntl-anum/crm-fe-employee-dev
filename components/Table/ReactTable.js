import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  useTable,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { CSVLink } from "react-csv";

function ReactTable({
  columns,
  data,
  tableID = null,
  includeDownload = false,
  downloadFileName = "",
  includeColumnAccessors = [],
  onFilterChange, // Make sure onFilterChange is passed as a prop from the parent
  buttonFlag = false,
  heading = '',
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
  } = useTable({ columns, data }, useGlobalFilter, usePagination);

  const { globalFilter, pageIndex, pageSize } = state;
  const textAreaRef = useRef();
// useEffect(()=>{
//   console.log(rows,'rowsrows');
// })
  // Handle filter changes
  useEffect(() => {
    if (onFilterChange) {
      const filteredData = rows.map((row) => row.original);
      onFilterChange(filteredData); // Pass filtered data to parent
    }
  }, [globalFilter, rows, onFilterChange]);

  // Function to copy to clipboard
  const copyToClipboard = () => {
    const centerSpacing = "\t".repeat(headers.length / 2);
    const filteredData = rows.map((row) => row.original);
    const textData = [
          "",
          "",
          `${centerSpacing}${heading}${centerSpacing}`,
          "",
          "",
          headers.map((header) => header.label).join("\t"),
          ...filteredData.map((row) =>
            headers.map((header) => row[header.key] || "").join("\t")
          ),
        ].join("\n");
    if (textAreaRef.current) {
      textAreaRef.current.value = textData;
      textAreaRef.current.select();
      document.execCommand("copy");
    }
    toast.success(`${filteredData.length} rows copied to clipboard!`);
  };

  // Function to handle copy button click
  // const handleCopy = () => {
  //   alert("Copied to clipboard");
  // };
  
  const excludedColumn = "col_actions";
  const headers = columns
  .filter((col) => col.accessor !== excludedColumn)
  .map((col) => ({ label: col.Header, key: col.accessor }));
// console.log(headers);
  // Function to format data for CSV export
  const formatDataForExport = () => {
    return rows.map((row, rowIndex) => {
      const formattedRow = {};
      prepareRow(row);
      row.cells.forEach((cell) => {
        const columnId = cell.column.id;
        if (includeColumnAccessors.includes(columnId)) {
          if (
            typeof cell.value === "object" &&
            data?.[rowIndex]?.[columnId + "_CSV"]
          ) {
            formattedRow[columnId] = data[rowIndex][columnId + "_CSV"];
          } else {
            formattedRow[columnId] = cell.value;
          }
        }
      });
      return formattedRow;
    });
  };

  // Export to Excel function
  const exportToExcel = () => {
    
    const dataWithSerialNumbers = rows.map((row, index) => {
      const rowData = {};
      columns.slice(0, -1).forEach((col) => {
        rowData[col.Header] = row.original[col.accessor];
      });
      return rowData;
    });
  
    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");
  
    // Add heading row
    worksheet.mergeCells(1, 1, 1, columns.slice(0, -1).length); // Merge cells for the heading
    const headingCell = worksheet.getCell("A1");
    headingCell.value = heading;
    headingCell.alignment = { horizontal: "center", vertical: "middle" };
    headingCell.font = { bold: true, size: 14 };
  
    // Add column headers
    const headersWithSerialNumber = columns.slice(0, -1).map((col) => ({
      header: col.Header,
      key: col.Header,
    }));
    worksheet.addRow(headersWithSerialNumber.map((h) => h.header));
  
    // Add data rows
    dataWithSerialNumbers.forEach((dataRow) => {
      worksheet.addRow(Object.values(dataRow));
    });
  
    // Apply styling (optional)
    worksheet.columns.forEach((column, index) => {
      column.width = Math.max(
        ...[...worksheet.getColumn(index + 1).values].map((val) =>
          val ? val.toString().length : 0
        )
      ) + 2; // Adjust column width dynamically
    });
  
    // Export workbook to Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, `${heading}.xlsx`);
    });
  };
  
  
   const exportToPDF = () => {
      const doc = new jsPDF();
      // const heading = "Source Of Information";
      const pageWidth = doc.internal.pageSize.width;
  
      // Add heading
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(heading, pageWidth / 2, 20, { align: "center" });
      const filteredData = rows.map((row) => row.original);
      const gap = 10;
      doc.autoTable({
        startY: 30 + gap,
        head: [headers.map((header) => header.label)],
        body: filteredData.map((row) => headers.map((header) => row[header.key])),
      });
  
      // doc.save("Source Of Information.pdf");
      doc.save(`${heading}.pdf`);

    };

  return (
    <>
      {includeDownload && (
        <CSVLink
          data={formatDataForExport()}
          filename={downloadFileName + ".csv"}
          className="btn btn-primary"
        >
          Download CSV
        </CSVLink>
      )}

      <div className="mb-2">
        {buttonFlag && (<button
          onClick={() => {
            copyToClipboard();
            // handleCopy();
          }}
          style={{
            border: "none",
            background: "#EBE8E8",
            color: "#666666",
            padding: "5px 10px",
            borderRadius: "5px",
            marginRight: "10px",
          }}
          id="btnCopy"
        >
          Copy
        </button>
        )}
        <textarea
          ref={textAreaRef}
          style={{
            position: "absolute",
            left: "-9999px",
            top: "0",
          }}
        />
        {buttonFlag && (<button
          onClick={exportToExcel}
          style={{
            border: "none",
            background: "#EBE8E8",
            color: "#666666",
            padding: "5px 10px",
            borderRadius: "5px",
            marginRight: "10px",
          }}
          id="btnExport"
        >
          Excel
        </button>
        )}
        {buttonFlag && (<button
          onClick={exportToPDF}
          style={{
            border: "none",
            background: "#EBE8E8",
            color: "#666666",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
          id="btnPdf"
        >
          PDF
        </button>
        )}
      </div>

      <div className="row mt-3 mb-1">
        <div className="col-sm-12 col-md-6">
          <p className="p-0 m-0 weight-400">Show Entries</p>
          <select
            style={{ width: "170px", background: "#f7f7f7" }}
            className="rounded text-left border-0 pl-2 py-2 font-12"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 50, 100, 500, "All"].map((size) => (
              <option key={size} value={size !== "All" ? size : 10000}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <GlobalFilter
          id={`${tableID}_search`}
          filter={globalFilter}
          setFilter={setGlobalFilter}
        />
      </div>

      <div className="table-wrap mt-4">
        <div
          className="table-responsive rounded rowset"
          style={{ overflowY: "auto", maxHeight: "450px" }}
        >
          <table id={tableID} className="table table-hover" {...getTableProps()}>
            <thead className="custom-light-bg-color">
              {headerGroups.map((headerGroup, i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, j) => (
                    <th
                      style={{
                        whiteSpace: "nowrap",
                        position: "sticky", // Apply sticky to first column
                        left: j === 0 ? 0 : "auto",
                        zIndex: j === 0 ? 1 : "auto", // Keep first column above others
                      }}
                      
                      key={j}
                      {...column.getHeaderProps()}
                      className="text-dark text-left pl-3 pr-2 py-2 font-15 weight-500 custom-light-bg-color"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr id={`row_${i}`} key={i} {...row.getRowProps()}>
                    {row.cells.map((cell, j) => (
                      <td
                        key={j}
                        {...cell.getCellProps()}
                        className="font-13 weight-400 pl-3 pr-2 py-2"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-10">
          <span className="font-14 d-inline-block mb-2">
            Page {page.length > 0 ? pageIndex + 1 : 0} of {pageOptions.length}
          </span>
          <span style={{ float: "right" }}>
            <button
              style={{ marginLeft: "5px", fontSize: "14px" }}
              className="btn btn-default bg-white text-dark border-secondary btn-fixed-width"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Previous
            </button>
            <button
              className="btn btn-primary btn-fixed-width"
              style={{
                background: "#284E93",
                marginLeft: "5px",
                fontSize: "14px",
              }}
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
            </button>
          </span>
        </div>
      </div>
    </>
  );
}

export default ReactTable;
