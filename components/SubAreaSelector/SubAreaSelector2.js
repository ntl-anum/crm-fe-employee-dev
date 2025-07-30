import React, { useEffect, useState } from "react";
import Select from "react-select";
import _ from "lodash";
import { useQueryClient } from "react-query";
import { useActiveCityAreaSubareaMapping } from "../../helpers/react_query_functions";
import { colourStyles, customTheme } from "../SelectStyleComponent";

// Initial State will have empty values for the CITY_ID, AREA_ID and SUBAREA_ID.
const initialStateValue = {
  CITY_ID: "",
  AREA_ID: "",
  SUBAREA_ID: "",
};

export default function SubAreaSelector2({
  propFormState,
  propSetFormState,
  propEditMode,
  propFieldName,
  showBlockQuoteClass = true,
  propIsFullColumn = false,
}) {
  // state variables for storing data related to cities, areas, subareas and selected row
  const [cityAreaSubareaData, setCityAreaSubareaData] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRow, setSelectedRow] = useState(initialStateValue);
  const [areas, setAreas] = useState([]);
  const [subArea, setSubArea] = useState([]);

  // Getting the latest data of city area subarea mapping and QueryClient instance via useQueryClient hook
  const { data: dataClientCityAreaSubarea } = useActiveCityAreaSubareaMapping();
  const queryClient = useQueryClient();

  // Fetching the activeCityAreaSubareaMapping data when it's not available in dataClientCityAreaSubarea variable
  useEffect(() => {
    if (dataClientCityAreaSubarea) {
      setCityAreaSubareaData(dataClientCityAreaSubarea.data);
    }
  }, [dataClientCityAreaSubarea, queryClient]);

  // Setting options for Cities dropdown once we have CityAreaSubareaData fetched
  useEffect(() => {
    if (cityAreaSubareaData?.length > 0) {
      const options = [
        { value: "", label: "Please Select...", disabled: true },
        { value: "SelectAll_C", label: "Select All" },
        ...cityAreaSubareaData.map((element) => ({
          value: element.CITY_ID,
          label: element.CITY_NAME,
        })),
      ];
      setCities(options);
    }
  }, [cityAreaSubareaData]);

  // Setting areas and sub-areas options, once we have the respective city selected
  useEffect(() => {
    if (propFormState?.[propFieldName] && cityAreaSubareaData?.length > 0) {
      const subAreaId = propFormState?.[propFieldName];
      if (!propFormState?.[propFieldName]?.includes("SelectAll_")) {
        const mappingCityAreaData = _.filter(cityAreaSubareaData, {
          areas: [{ subareas: [{ SUBAREA_ID: subAreaId }] }],
        });

        const mappingAreaData = _.filter(mappingCityAreaData[0]?.areas, {
          subareas: [{ SUBAREA_ID: subAreaId }],
        });

        // Set the selected row with the data of City, Area and Sub-Area.
        setSelectedRow({
          CITY_ID: mappingCityAreaData[0]?.CITY_ID,
          AREA_ID: mappingAreaData[0]?.AREA_ID,
          SUBAREA_ID: propFormState?.[propFieldName],
        });

        setAreasOptions(mappingCityAreaData[0]?.CITY_ID);
        setSubAreaOptions(
          mappingAreaData[0]?.AREA_ID,
          mappingCityAreaData[0]?.CITY_ID
        );
      }
    }
  }, [
    selectedRow.CITY_ID,
    selectedRow.AREA_ID,
    cityAreaSubareaData,
    propFormState,
    propFieldName,
  ]);

  const handleSelectChange = (option, htmlElement) => {
    if (htmlElement.name === "SUBAREA_SELECTOR_CITY") {
      setSelectedRow({ CITY_ID: option.value, AREA_ID: "", SUBAREA_ID: "" });
      if (option.value === "SelectAll_C") {
        propSetFormState((prevState) => ({
          ...prevState,
          [propFieldName]: option.value,
        }));
      } else {
        setAreasOptions(option.value);
        setSubArea([]);
        propSetFormState((prevState) => ({
          ...prevState,
          [propFieldName]: "",
        }));
      }
    } else if (htmlElement.name === "SUBAREA_SELECTOR_AREA") {
      setSubArea([]);
      setSelectedRow({ ...selectedRow, AREA_ID: option.value, SUBAREA_ID: "" });
      setSubAreaOptions(option.value, selectedRow.CITY_ID);

      if (option.value === `SelectAll_A_${selectedRow.CITY_ID}`) {
        propSetFormState((prevState) => ({
          ...prevState,
          [propFieldName]: option.value,
        }));
        //
      } else {
        propSetFormState((prevState) => ({
          ...prevState,
          [propFieldName]: "",
        }));
        // setSubArea([]);
      }
    } else if (htmlElement.name === "SUBAREA_SELECTOR_SUBAREA") {
      setSelectedRow({ ...selectedRow, SUBAREA_ID: option.value });
      propSetFormState((prevState) => ({
        ...prevState,
        [propFieldName]: option.value,
      }));
    }
  };

  // To get the options of areas for the selected city from the cityAreaSubareaData
  const setAreasOptions = (cityID) => {
    const options = [
      { value: "", label: "Please Select...", disabled: true },
      { value: `SelectAll_A_${cityID}`, label: "Select All" },
      ...(
        cityAreaSubareaData.find((data) => data.CITY_ID === cityID)?.areas || []
      ).map((element) => ({
        value: element.AREA_ID,
        label: element.AREA_NAME,
      })),
    ];
    setAreas(options);
  };

  // To get the options of Sub-areas for the selected area from the cityAreaSubareaData
  const setSubAreaOptions = (areaID, cityId) => {
    const cityID = cityId || selectedRow.CITY_ID;
    const areaSubareaObj =
      cityAreaSubareaData
        .find((data) => data.CITY_ID === cityID)
        ?.areas.find((element) => element.AREA_ID === areaID) || {};
    const options = [
      { value: "", label: "Please Select...", disabled: true },
      { value: `SelectAll_S_${areaID}`, label: "Select All", disabled: true },
      ...(areaSubareaObj.subareas?.map((element) => ({
        value: element.SUBAREA_ID,
        label: element.SUBAREA_NAME,
      })) || []),
    ];
    setSubArea(options);
  };

  return (
    <div className="col-sm-12">
      <div
        className="row mb-3 mt-1" 
      >
        <div
          className={`${propIsFullColumn ? "col-md-12" : "col-md-6"} col-sm-12`}
        >
          <div className="form-group">
            <label className="required control-label mb-1 text-left font-14 weight-500">
              Cities
            </label>
            <Select
              options={cities}
              onChange={handleSelectChange}
              name="SUBAREA_SELECTOR_CITY"
              value={cities.find((item) => item.value === selectedRow.CITY_ID)}
              isOptionDisabled={(option) => option.disabled}
              styles={colourStyles}
              theme={customTheme}
            />
          </div>
        </div>
        {/* Rendering Areas dropdown only when any city is selected */}
        {selectedRow.CITY_ID !== "SelectAll_C" &&
          selectedRow.CITY_ID !== "" && (
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label className="required control-label mb-1 text-left font-14 weight-500">
                  Areas
                </label>
                <Select
                  options={areas}
                  onChange={handleSelectChange}
                  name="SUBAREA_SELECTOR_AREA"
                  value={areas.find(
                    (item) => item.value === selectedRow.AREA_ID
                  )}
                  styles={colourStyles}
                  theme={customTheme}
                />
              </div>
            </div>
          )}

        {/* Rendering sub-areas dropdown only when area is selected */}
        {selectedRow.CITY_ID !== "SelectAll_C" &&
          selectedRow.AREA_ID !== `SelectAll_A_${selectedRow.CITY_ID}` &&
          selectedRow.AREA_ID !== "" && (
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label className="required control-label mb-1 text-left font-14 weight-500">
                  Sub Area
                </label>
                <Select
                  options={subArea}
                  onChange={handleSelectChange}
                  name="SUBAREA_SELECTOR_SUBAREA"
                  value={subArea.find(
                    (item) => item.value === propFormState?.[propFieldName]
                  )}
                  styles={colourStyles}
                  theme={customTheme}
                />
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
