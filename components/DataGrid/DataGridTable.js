import { useRef, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

export default function DataGridTable({
  columns, // all columns to show in data grid
  data, // all data related to those columns
  showActionColumn = false, // flag to show action button Column
  actionColumns = [], // action button column
  actionColumnWidth = 250, // width of action columns
  gridHeight = 600, // height of the grid
  exportExcel = false, // flag to show download as excel button
}) {
  // Accessing Grid's API
  const gridRef = useRef();
  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
  }));

  // function called when ever pagination select changes
  const onPaginationChange = useCallback((pageSize) => {
    gridRef.current.api.paginationSetPageSize(Number(pageSize));
  }, []);

  // called when global filter is changed
  const onFilterTextChange = useCallback((e) => {
    gridRef.current.api.setQuickFilter(e.target.value);
  }, []);

  // called when export button is clicked
  const exportListener = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
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
          ref={gridRef} // Ref for accessing Grid's API
          rowData={data} // Row Data for Rows
          columnDefs={[
            ...columns,
            ...(showActionColumn
              ? [
                  {
                    minWidth: actionColumnWidth,
                    sortable: false,
                    filter: false,
                    floatingFilter: false,
                    ...actionColumns,
                  },
                ]
              : []),
          ]} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </>
  );
}
