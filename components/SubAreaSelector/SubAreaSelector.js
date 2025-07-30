import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
import { CityManagement } from "../../services/LocationManagement/CityManagement";
import { AreaManagement } from "../../services/LocationManagement/AreaManagement";
import { SubAreaManagement } from "../../services/LocationManagement/SubAreaManagement";
import { useActiveCity } from "../../helpers/react_query_functions";
import { colourStyles } from "../SelectStyleComponent";
import Router from "next/router";
import { APP_ROUTES } from "@/helpers/enums";

export default function SubAreaSelector({
  propFormState,
  propSetFormState,
  propFieldName,
  propFieldValue,
}) {
  const {
    isLoading,
    isError,
    error,
    data: dataClientCity,
    isFetching,
  } = useActiveCity();

  const [stateValue, setStateValue] = useState({
    CITY_ID: "",
    AREA_ID: "",
  });

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [subArea, setSubAreas] = useState([]);
  const areaRef = useRef();
  const loadCities = (rawData) => {
    if (rawData) {
      let options = [{ value: "", label: "Please Select...", disabled: true }];
      rawData.forEach((element) => {
        options.push({ value: element.CITY_ID, label: element.CITY_NAME });
      });
      setCities(options);
    }
  };

  const handleSelectChange = async (option, htmlElement) => {
    try {
      if (htmlElement.name === "SUBAREA_SELECTOR_CITY") {
        // load area data
        const response = await AreaManagement.getAreaByCityId(+option.value);
        const res = await response.json();

        if (res.status === "SUCCESS") {
          let options = [
            { value: "", label: "Please Select...", disabled: true },
          ];
          const data = res.data;
          data.forEach((element) => {
            options.push({ value: element.AREA_ID, label: element.AREA_NAME });
          });
          setAreas(options);
        } else {
          setAreas([]);
        }
      } else if (htmlElement.name === "AREA_ID") {
        await setStateValue({
          ...stateValue,
          [htmlElement.name]: option.label,
        });
        propFormState[propFieldValue] = "";
        // load area data
        const response = await SubAreaManagement.getSubAreaByAreaId(
          +option.value
        );
        const res = await response.json();
        if (res.status === "SUCCESS") {
          const selectAll = "selectAll_" + option.value;
          let options = [
            { value: "", label: "Please Select...", disabled: true },
            { value: selectAll, label: "Select All", disabled: true },
          ];
          const data = res.data;
          data.forEach((element) => {
            options.push({
              value: element.SUBAREA_ID,
              label: element.SUBAREA_NAME,
            });
          });
          setSubAreas(options);
        }
      } else if (htmlElement.name === "SUBAREA_SELECTOR_SUBAREA") {
        if (!propFieldName) {
          propSetFormState({
            ...propFormState,
            [propFieldValue]: option.value.toString(),
          });
        } else {
          propSetFormState({
            ...propFormState,
            [propFieldValue]: option.value.toString(),
            [propFieldName]: option.label,
          });
        }
      }
    } catch (error) {
      Router.push(APP_ROUTES.SERVER_ERROR);
    }
  };

  useEffect(() => {
    if (dataClientCity) {
      loadCities(dataClientCity.data);
    }
  }, [dataClientCity]);

  return (
    <div className="col-sm-12">
      <div className="row mb-3 mt-1 pb-1 blockquote-for-sections">
        <div className="col-md-6 col-sm-12">
          <div className="form-group">
            <label className="control-label mb-1 text-left font-14 weight-500">
              City
            </label>
            <Select
              options={cities}
              onChange={handleSelectChange}
              name="CITY_ID"
              value={cities.find((item) => item.value === stateValue.CITY_ID)}
            />
            styles={colourStyles}
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="form-group">
            <label className="control-label mb-1 text-left font-14 weight-500">
              Area
            </label>
            <Select
              // ref={areaRef}

              options={areas}
              onChange={handleSelectChange}
              name="AREA_ID"
              value={areas.find((item) => item.value === stateValue.AREA_ID)}
              styles={colourStyles}
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="form-group">
            <label className="control-label mb-1 text-left font-14 weight-500">
              Sub Area
            </label>
            <Select
              options={subArea}
              name="SUBAREA_SELECTOR_SUBAREA"
              onChange={handleSelectChange}
              value={subArea.find(
                (item) => item.value == propFormState[propFieldValue]
              )}
              styles={colourStyles}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
