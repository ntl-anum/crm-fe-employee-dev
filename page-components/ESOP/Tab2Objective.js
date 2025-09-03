'use client';

import { useState, useEffect } from 'react';
import AddClause from "@/helpers/AddClause";
import { ProfessionalInfoService } from '@/services/UtilityService/ProfessionalInfo';
import { toast } from "react-toastify";
import { APP_ROUTES } from "../../helpers/enums";
import Router from "next/router";
import Select from "react-select";
import {
  colourStyles,
  customTheme,
} from "../../components/SelectStyleComponent";



export default function Tab2ObjectiveScope({ formData, setFormData, onNext, onPrev, history, addHistoryRow, removeHistoryRow, updateHistoryField, clauses, addClause, deleteClause, updateClause,preparedByOptions }) {

  useEffect(() => {
    setFormData(prev => ({
      documentObjective: '',
      ...prev
    }));
    getAllEmployees();
  }, []);

   const [rightLevelValueOptions, setRightLevelValueOptions] = useState([]);

  const initialOptionsArray = [
    { value: "", label: "Please Select...", isDisabled: true },
  ];

  const colourStyles = {
  control: (provided) => ({
    ...provided,
    width: "180px"   // fixed width
  }),
  menu: (provided) => ({
    ...provided,
    width: "180px"
  })
};
       //get all departments
   const getAllEmployees = async () => {
         try {
               // options = [];
               const response = await ProfessionalInfoService.listIndividuals();
               const res = await response.json();
               const data = res.data;
               
               let options = [...initialOptionsArray];
               data.forEach((element) => {
                 options.push({
                   value: element.EMPID,
                   label: element.EMPID,
                 });
               });
               setRightLevelValueOptions(options);
             } catch (error) {
           console.log(error);
           Router.push(APP_ROUTES.SERVER_ERROR);
         }
             };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };

    setFormData(updatedData);
  };

  const handleSelectChange = (fieldName) => (selectedOption) => {
  setFormData(prev => ({
    ...prev,
    [fieldName]: selectedOption,
  }));

    if (fieldName === "ownerDepartment" && selectedOption) {
    getSubDeptsByDepartment(selectedOption.value);
  }

  // If needed, do other stuff based on fieldName and selectedOption here
};

     const handleNext = () => {
    console.log(JSON.stringify(clauses, null, 2)); // 2 spaces indentation
    onNext && onNext();
  };

   const handlePrev = () => {
    onPrev && onPrev();
  };


  useEffect(() => {

  



  }, []);
    //  console.log("preparedByOptions:", preparedByOptions);

  return (
    <div className="container mt-3">
      <div className="mb-4 p-3 border rounded shadow-sm">
        <h6 className="fw-bold mb-2">Document Objective</h6>
        <textarea
         name="documentobjective"
          className="form-control "  style={{ minHeight: "80px", resize: "vertical" }}
          rows="10"
          value={formData.documentobjective || ''}
          onChange={handleChange}
        />
      </div>

      
          {/* Document History */}
      <div className="mb-4 p-3 border rounded shadow-sm">
        <h6 className="fw-bold mb-2">Document History</h6>
        {history.map((row, index) => (
          <div key={index} className="row g-2 align-items-center mb-2">
            <div className="col-md-1">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Ver."
                value={row.version}
                onChange={(e) =>
                  updateHistoryField(index, "version", e.target.value)
                }
              />
            </div>

            <div className="col-md-2">
       <Select
  options={preparedByOptions}
  placeholder="Prepared By"
  className="ml-2"
  styles={colourStyles}
 value={
    preparedByOptions.find(
      opt => opt.value === history[index]?.preparedBy
    ) || preparedByOptions[0] || null
  }
  onChange={(selectedOption) =>
    updateHistoryField(index, "preparedBy", selectedOption ? selectedOption.value : null)
  }
/>

          </div>

            <div className="col-md-2">
   
          <Select
            options={rightLevelValueOptions}
            placeholder="Approved By"
            className='ml-2'
            styles={colourStyles}
            value={rightLevelValueOptions.find(opt => opt.value === row.approvedBy) || null}
            onChange={(selectedOption) =>
              updateHistoryField(index, "approvedBy", selectedOption.value)
            }
          />
     
            </div>

            <div className="col-md-2 ">
              <input
                type="date"
                className="form-control form-control-sm ml-2"
                value={row.datetime}
                onChange={(e) =>
                  updateHistoryField(index, "datetime", e.target.value)
                }
              />
            </div>
            <div className="col-md-4">
              <textarea
                rows="3"
                className="form-control form-control-sm ml-2"
                placeholder="Additional Notes"
                style={{ resize: "vertical", maxHeight: "100px", width: "386px" }}
                value={row.changes}
                onChange={(e) =>
                  updateHistoryField(index, "changes", e.target.value)
                }
              />
            </div>
            <div className="col-md-1">
              <button
                type="button"
                 className="btn btn-danger ms-1"
                style={{ padding: "0.3rem 0.5rem", color:"white",marginLeft:"3px" }}
                onClick={() => removeHistoryRow(index)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary px-4"
          style={{ background: "rgb(40, 78, 147)", color: "white" }}
          onClick={addHistoryRow}
        >
          + Add History
        </button>
      </div>

      {/* Navigation */}

         <div className="mb-4 p-3 border rounded shadow-sm">
        <h6 className="fw-bold mb-2">1. Scope</h6>
         <AddClause 
        clauses={clauses}
        addClause={addClause}
        deleteClause={deleteClause}
        updateClause={updateClause}
        currentNo={1}
        sectionName="Scope" // Unique heading identifier
    />
      </div>


           <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
            <button  onClick={handlePrev} style={{ background: "#aaa", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>Previous</button>
            <button onClick={handleNext} style={{ background: "#284E93", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>Next</button>
          </div>
    </div>
  );
}
