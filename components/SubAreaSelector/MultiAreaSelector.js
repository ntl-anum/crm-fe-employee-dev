import React, { useEffect, useState } from "react";
import Select from "react-select";
import _ from "lodash";
import { useQueryClient } from "react-query";
import { useActiveCityAreaSubareaMapping } from "../../helpers/react_query_functions";
import { colourStyles, customTheme } from "../SelectStyleComponent";

const SELECT_ALL_OPTION = { value: 'select-all', label: 'Select All' };

// Function to get all values from the options
const handleSelectAll = (options) => {
  return options.map(option => option.value);
};

export default function MultiSelectSubArea({
  propFormState,
  propSetFormState,
  propEditMode,
  propFieldName,
  showBlockQuoteClass = true,
  propIsFullColumn = false,
}) {
  const [cityAreaSubareaData, setCityAreaSubareaData] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    CITY_ID: [],
    AREA_ID: [],
    SUBAREA_ID: [],
  });
  const [areas, setAreas] = useState([]);
  const [subArea, setSubArea] = useState([]);

  const { data: dataClientCityAreaSubarea } = useActiveCityAreaSubareaMapping();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (dataClientCityAreaSubarea) {
      setCityAreaSubareaData(dataClientCityAreaSubarea.data);
    }
  }, [dataClientCityAreaSubarea, queryClient]);

  useEffect(() => {
    if (cityAreaSubareaData?.length > 0) {
      const options = [SELECT_ALL_OPTION, ...cityAreaSubareaData.map((element) => ({
        value: element.CITY_ID,
        label: element.CITY_NAME,
      }))];
      setCities(options);
    }
  }, [cityAreaSubareaData]);

  useEffect(() => {
    if (selectedRow.CITY_ID.length > 0) {
      const selectedCities = selectedRow.CITY_ID;
      const areasOptions = [SELECT_ALL_OPTION];
      selectedCities.forEach((cityId) => {
        const city = cityAreaSubareaData.find((data) => data.CITY_ID === cityId);
        if (city) {
          city.areas.forEach((area) => {
            areasOptions.push({
              value: area.AREA_ID,
              label: `${city.CITY_NAME} - ${area.AREA_NAME}`,
            });
          });
        }
      });
      setAreas(areasOptions);
    } else {
      setAreas([SELECT_ALL_OPTION]);
    }
  }, [selectedRow.CITY_ID, cityAreaSubareaData]);

  useEffect(() => {
    if (selectedRow.AREA_ID.length > 0) {
      const selectedAreas = selectedRow.AREA_ID;
      const subAreaOptions = [SELECT_ALL_OPTION];
  
      selectedAreas.forEach((areaId) => {
        cityAreaSubareaData.forEach((city) => {
          const area = city.areas.find((element) => element.AREA_ID === areaId);
          if (area) {
            area.subareas.forEach((subarea) => {
              subAreaOptions.push({
                value: subarea.SUBAREA_ID,
                label: `${area.AREA_NAME} - ${subarea.SUBAREA_NAME}`,
              });
            });
          }
        });
      });
      setSubArea(subAreaOptions);
    } else {
      setSubArea([SELECT_ALL_OPTION]);
    }
  }, [selectedRow.AREA_ID, cityAreaSubareaData]);

  const handleSelectChange = (options, { name }) => {
    const isSelectAll = options.some(option => option.value === 'select-all');
  
    if (isSelectAll) {
      if (name === "MULTI_SELECTOR_CITY") {
        const allCityIds = handleSelectAll(cities.filter(option => option.value !== 'select-all'));
        setSelectedRow({ ...selectedRow, CITY_ID: allCityIds, AREA_ID: [], SUBAREA_ID: [] });
        setAreas([SELECT_ALL_OPTION]);
        setSubArea([SELECT_ALL_OPTION]);
        propSetFormState((prevState) => ({
          ...prevState,
          [propFieldName]: { CITY_ID: allCityIds, AREA_ID: [], SUBAREA_ID: [] },
        }));
      } else if (name === "MULTI_SELECTOR_AREA") {
        const allAreaIds = handleSelectAll(areas.filter(option => option.value !== 'select-all'));
        setSelectedRow({ ...selectedRow, AREA_ID: allAreaIds, SUBAREA_ID: [] });
        setSubArea([SELECT_ALL_OPTION]);
        propSetFormState((prevState) => ({
          ...prevState,
          [propFieldName]: { ...prevState[propFieldName], AREA_ID: allAreaIds, SUBAREA_ID: [] },
        }));
      } else if (name === "MULTI_SELECTOR_SUBAREA") {
        const allSubAreaIds = handleSelectAll(subArea.filter(option => option.value !== 'select-all'));
        setSelectedRow({ ...selectedRow, SUBAREA_ID: allSubAreaIds });
        propSetFormState((prevState) => ({
          ...prevState,
          [propFieldName]: { ...prevState[propFieldName], SUBAREA_ID: allSubAreaIds },
        }));
      }
    } else {
      const selectedValues = options.map((option) => option.value);
    
      if (name === "MULTI_SELECTOR_CITY") {
        setSelectedRow({ ...selectedRow, CITY_ID: selectedValues, AREA_ID: [], SUBAREA_ID: [] });
        setAreas([SELECT_ALL_OPTION]);
        setSubArea([SELECT_ALL_OPTION]);
        propSetFormState((prevState) => ({
          ...prevState,
          [propFieldName]: { CITY_ID: selectedValues, AREA_ID: [], SUBAREA_ID: [] },
        }));
      } else if (name === "MULTI_SELECTOR_AREA") {
        setSelectedRow({ ...selectedRow, AREA_ID: selectedValues, SUBAREA_ID: [] });
        setSubArea([SELECT_ALL_OPTION]);
        propSetFormState((prevState) => ({
          ...prevState,
          [propFieldName]: { ...prevState[propFieldName], AREA_ID: selectedValues, SUBAREA_ID: [] },
        }));
      } else if (name === "MULTI_SELECTOR_SUBAREA") {
        setSelectedRow({ ...selectedRow, SUBAREA_ID: selectedValues });
        propSetFormState((prevState) => ({
          ...prevState,
          [propFieldName]: { ...prevState[propFieldName], SUBAREA_ID: selectedValues },
        }));
      }
    }
  };
  

  return (
    <div className="col-sm-12">
      <div className="row mb-3 mt-1">
        <div className={`${propIsFullColumn ? "col-md-12" : "col-md-6"} col-sm-12`}>
          <div className="form-group">
            <label className="required control-label mb-1 text-left font-14 weight-500">
              Cities
            </label>
            <Select
  options={cities}
  onChange={handleSelectChange}
  name="MULTI_SELECTOR_CITY"
  value={selectedRow.CITY_ID.length === cities.length - 1 ? [SELECT_ALL_OPTION] : cities.filter((item) => selectedRow.CITY_ID.includes(item.value))}
  isMulti
  theme={customTheme}
/>
          </div>
        </div>
        {selectedRow.CITY_ID.length > 0 && (
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <label className="required control-label mb-1 text-left font-14 weight-500">
                Areas
              </label>
              <Select
  options={areas}
  onChange={handleSelectChange}
  name="MULTI_SELECTOR_AREA"
  value={selectedRow.AREA_ID.length === areas.length - 1 ? [SELECT_ALL_OPTION] : areas.filter((item) => selectedRow.AREA_ID.includes(item.value))}
  isMulti
  theme={customTheme}
/>
            </div>
          </div>
        )}
        {selectedRow.AREA_ID.length > 0 && (
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <label className="required control-label mb-1 text-left font-14 weight-500">
                Sub Areas
              </label>
              <Select
  options={subArea}
  onChange={handleSelectChange}
  name="MULTI_SELECTOR_SUBAREA"
  value={selectedRow.SUBAREA_ID.length === subArea.length - 1 ? [SELECT_ALL_OPTION] : subArea.filter((item) => selectedRow.SUBAREA_ID.includes(item.value))}
  isMulti
  theme={customTheme}
/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
}
