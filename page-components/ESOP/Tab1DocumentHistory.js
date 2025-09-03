'use client';
import { DeptDesignationService } from "../../services/UtilityService/DeptDesignation";
import { ProfessionalInfoService } from "../../services/UtilityService/ProfessionalInfo";
import { CityManagement } from "../../services/LocationManagement/CityManagement";
import { getOperatorFromCookie } from "@/helpers/cookie-parser";


import { useEffect, useState } from 'react';
import Select from "react-select";
import { APP_ROUTES } from "../../helpers/enums";
import Router from "next/router";
import { toast } from "react-toastify";
import {
  colourStyles,
  customTheme,
} from "../../components/SelectStyleComponent";

export default function DocumentObjectiveForm({ formData, setFormData, onNext, onPrev ,preparedByOptions, rightLevelValueOptions, searchDeptOptions,sopId, infoClassificationOptions,manualRequiredOptions}) {

  
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
    console.log(JSON.stringify(formData, null, 2)); // 2 spaces indentation
    onNext && onNext();
  };

  // const [searchDeptOptions, setSearchDeptOptions] = useState([]);
  const [searchDesignationOptions, setSearchDesignationOptions] = useState([]);
  // const [rightLevelValueOptions, setRightLevelValueOptions] = useState([]);
  const [cityValueOptions, setCityValueOptions] = useState([]);

  

  const initialOptionsArray = [
    { value: "", label: "Please Select...", isDisabled: true },
  ];

     //get all departments
const getAllCities = async () => {
      try {
            // options = [];
            console.log("anum before function: ");

            const response = await CityManagement.listActiveCities();
            console.log("anum hi bye: "+ response);
            const res = await response.json();
            const data = res.data;
            
            let options = [...initialOptionsArray];
            data.forEach((element) => {
              options.push({
                value: element.CITY_NAME,
                label: element.CITY_NAME,
              });
            });
            setCityValueOptions(options);
          } catch (error) {
        console.log(error);
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
          };
  
    //get all subdepartments
      const getSubDeptsByDepartment = async (department) => {
    const response = await DeptDesignationService.getDepartmentSubdepartments(
      department
    );

    if (response) {
      const res = await response.json();
      if (res.status === "SUCCESS") {
        const data = res.data;

        let options = [
          { value: "", label: "Please Select...", isDisabled: true },
        ];

        data.forEach((element) => {
          options.push({
            value: element,
            label: element,
          });
        });

        setSearchDesignationOptions(options);
      } else {
        toast.error(res.message);
      }
    } else {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

    useEffect(() => {
      getAllCities();
    }, []);

  const labelStyle = {  marginBottom: '0.3rem' };
  const selectStyle = {
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #ced4da',
    backgroundColor: '#fff',
    width: '100%',
  };

  return (
    <div className="container mt-4 p-4 border rounded bg-light">
      <h3 className="mb-4">Document Objective</h3>

      
      <div className="row g-3" >

          <div className="col-md-6" >
          <label style={labelStyle} className="form-label required">SOP Name</label>
          <input type="text" name="sop_name" className="form-control" value={formData.sop_name} onChange={handleChange}
          disabled={!!sopId}   // ✅ use disabled instead of isDisabled
 />
        </div>

        <div className="col-md-6" >
          <label style={labelStyle} className="form-label required">Owner Department</label>
          {/* <input type="text" name="ownerDepartment" className="form-control" value={formData.ownerDepartment} onChange={handleChange} /> */}
            <Select
                  instanceId={6}
                  options={searchDeptOptions}
                  onChange={handleSelectChange("ownerDepartment")}
                  name="ownerDepartment"
                 value={formData.ownerDepartment}
                  styles={colourStyles}
                  // isOptionDisabled={(option) => option.disabled}
                  isDisabled={!!sopId} 

                />
        </div>

 <div className="col-md-6 " style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label required">Sub Department</label>
          {/* <input type="text" name="subDepartment" className="form-control" value={formData.subDepartment} onChange={handleChange} /> */}
            <Select
                  instanceId={6}
                  options={searchDesignationOptions}
                  onChange={handleSelectChange("subDepartment")}
                  name="subDepartment"
                 value={formData.subDepartment}
                  styles={colourStyles}
                  isDisabled={!!sopId} 

                />
        </div>

        <div className="col-md-6 " style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label required">Stakeholders</label>
            <Select
                  instanceId={6}
                  options={searchDeptOptions}
                  onChange={handleSelectChange("stakeholders")}
                  name="stakeholders"
                 value={formData.stakeholders}
                  styles={colourStyles}
                 isMulti // <-- makes it multi-select
                />
        </div>

       
        <div className="col-md-6 " style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label required">City</label>
             <Select
                  instanceId={6}
                  options={cityValueOptions}
                  onChange={handleSelectChange("city")}
                  name="city"
                 value={formData.city}
                  styles={colourStyles}
                  // isOptionDisabled={(option) => option.disabled}
                />
        </div>

        <div className="col-md-6 " style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label required">Version</label>
          <input type="text" name="version" className="form-control" value={formData.version} onChange={handleChange} />
        </div>

        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label required">Criticality Level</label>
          <select name="criticalityLevel" style={selectStyle} value={formData.criticalityLevel} onChange={handleChange}>
            <option value="" disabled>Select...</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Date of Approval</label>
          <input type="date" name="dateOfApproval" className="form-control" value={formData.dateOfApproval} onChange={handleChange} />
        </div>

        <div className="col-md-6 " style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label required">Prepared By</label>
          <Select
                  // instanceId={6}
                  options={preparedByOptions}
                  onChange={handleSelectChange("preparedBy")}
                  name="preparedBy"
                  value={formData.preparedBy}
                  styles={colourStyles}
                  
                />
        </div>

        <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Reviewed Stakeholders</label>
           <Select
                  // instanceId={6}
                  options={rightLevelValueOptions}
                  onChange={handleSelectChange("reviewedStakeholders")}
                  name="reviewedStakeholders"
                 value={formData.reviewedStakeholders}
                  styles={colourStyles}
                  isMulti
                />
        </div>

        {/* <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Reviewed By (R&PA)</label>
           <Select
                  // instanceId={6}
                  options={rightLevelValueOptions}
                  onChange={handleSelectChange("reviewByRPA")}
                  name="reviewByRPA"
                 value={formData.reviewByRPA}
                  styles={colourStyles}
                  isMulti
                />
        </div> */}
        {/* <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Approved By (HOD)</label>
           <Select
                  // instanceId={6}
                  options={rightLevelValueOptions}
                  onChange={handleSelectChange("approvedByHOD")}
                  name="approvedByHOD"
                 value={formData.approvedByHOD}
                  styles={colourStyles}
                  isMulti
                />
        </div> */}

        {/* <div className="col-md-6" style={{marginTop: "10px"}}>
          <label style={labelStyle} className="form-label">Approved By (CEO)</label>
              <Select
                  // instanceId={6}
                  options={rightLevelValueOptions}
                  onChange={handleSelectChange("approvedByCEO")}
                  name="approvedByCEO"
                 value={formData.approvedByCEO}
                  styles={colourStyles}
                  // isOptionDisabled={(option) => option.disabled}
                />
        </div> */}

      <div className="col-md-6" style={{marginTop: "10px"}}>
  <label>Information Classification</label>
  <Select
    options={infoClassificationOptions}
    placeholder="Select Information Classification"
    value={formData.infoClassification || null}
    onChange={(selectedOption) => {
      setFormData(prev => ({
        ...prev,
        infoClassification: selectedOption
      }));
    }}
 styles={colourStyles}

  />
</div>
      <div className="col-md-6" style={{marginTop: "10px"}}>
  <label>Mannual Required</label>
  <Select
    options={manualRequiredOptions}
    placeholder="Select Mannual Required"
    value={formData.manualRequired || null}
    onChange={(selectedOption) => {
      setFormData(prev => ({
        ...prev,
        manualRequired: selectedOption
      }));
    }}
 styles={colourStyles}

  />
</div>
      </div>

          <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
       
            <button onClick={handleNext} style={{ background: "#284E93", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer" }}>Next</button>
          </div>
    </div>
  );
}
