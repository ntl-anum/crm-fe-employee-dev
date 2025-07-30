import { useRef, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

export default function DataGridSelectable({
  columns,
  data,
  gridHeight = 600, // height of the grid
  exportExcel = false, // flag to show download as excel button
  propRef,
  selectableType = "multiple", // can be single or multiple
}) {
  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
  }));

  // function called when ever pagination select changes
  const onPaginationChange = (pageSize) => {
    propRef.current.api.paginationSetPageSize(Number(pageSize));
  };

  // called when global filter is changed
  const onFilterTextChange = useCallback((e) => {
    propRef.current.api.setQuickFilter(e.target.value);
  }, []);

  // called when export button is clicked
  const exportListener = useCallback(() => {
    propRef.current.api.exportDataAsCsv();
  }, []);

  return (
    <>
      <div className="mb-1" style={{ overflow: "hidden" }}>
        <span style={{ marginRight: "5px" }}>Show</span>
        <select onChange={(e) => onPaginationChange(e.target.value)}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value={Number.MAX_VALUE.toString()}>All</option>
        </select>
        <span style={{ marginLeft: "5px" }}>entries</span>
        <span style={{ float: "right" }}>
          <input
            style={{ border: "1px solid grey", borderRadius: "10px" }}
            type="search"
            onChange={onFilterTextChange}
            placeholder=" Search ..."
          />
          {exportExcel && (
            <button
              style={{ marginLeft: "10px" }}
              className="btn btn-success btn-icon-anim btn-circle"
              onClick={exportListener}
            >
              <i className="ti-download"></i>
            </button>
          )}
        </span>
      </div>
      <div
        style={{ width: "100%", height: gridHeight }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          ref={propRef} // Ref for accessing Grid's API
          rowData={data} // Row Data for Rows
          columnDefs={columns} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection={selectableType} // Options - allows click selection of rows
          rowMultiSelectWithClick={true}
          pagination={true}
          paginationPageSize={10}
          suppressRowClickSelection={true}
          onCellClicked={(e) => {
            e.node.selected
              ? e.node.setSelected(false)
              : e.node.setSelected(true);
          }}
        />
      </div>
    </>
  );
}
