import React, { useEffect, useState } from "react";
import Select from "react-select";
import _ from "lodash";
import { useQueryClient } from "react-query";
import { useActiveCityAreaSubareaMapping } from "../../helpers/react_query_functions";
import { colourStyles } from "../SelectStyleComponent";

// Initial State will have empty values for the CITY_ID, AREA_ID, and SUBAREA_ID.
const initialStateValue = {
  CITY_ID: "",
  AREA_ID: "",
  SUBAREA_ID: "",
};

export default function SubAreaSelector3({
  propFormState,
  propSetFormState,
  propEditMode,
  propFieldName,
  showBlockQuoteClass = true,
}) {
  // state variables for storing data related to cities, areas, subareas, and selected row
  const [cityAreaSubareaData, setCityAreaSubareaData] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRow, setSelectedRow] = useState(initialStateValue);

  // Getting the latest data of city area subarea mapping and QueryClient instance via useQueryClient hook
  const { data: dataClientCityAreaSubarea } = useActiveCityAreaSubareaMapping();
  const queryClient = useQueryClient();

  // Fetching the activeCityAreaSubareaMapping data when it's not available in dataClientCityAreaSubarea variable
  useEffect(() => {
    if (!dataClientCityAreaSubarea) {
      queryClient.fetchQuery("activeCityAreaSubareaMapping");
    } else {
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

  // To handle the changes in dropdowns using onChange function for different SELECT options
  const handleSelectChange = (option, htmlElement) => {
    setSelectedRow({ CITY_ID: option.value, AREA_ID: "", SUBAREA_ID: "" });
    propSetFormState((prevState) => ({
      ...prevState,
      [propFieldName]: option.value,
    }));
  };

  return (
    <div className="col-sm-12">
      <div
        className={`row mb-3 mt-1 pb-1 ${
          showBlockQuoteClass && "blockquote-for-sections"
        }`}
      >
        <div className="col-md-6 col-sm-12">
          <div className="form-group">
            <label className="control-label mb-1 text-left font-14 weight-500">
              Cities
            </label>
            <Select
              options={cities}
              onChange={handleSelectChange}
              name="SUBAREA_SELECTOR_CITY"
              value={cities.find((item) => item.value === selectedRow.CITY_ID)}
              isOptionDisabled={(option) => option.disabled}
              styles={colourStyles}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
