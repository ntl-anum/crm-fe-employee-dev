import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useQueryClient } from "react-query";
import { useActiveCityAreaSubareaMapping } from "../../helpers/react_query_functions";
import { colourStyles, customTheme } from "../SelectStyleComponent";
import { toast } from "react-toastify"; // Make sure to import toast

const SELECT_ALL_OPTION = { value: "select-all", label: "Select All" };

const handleSelectAll = (options) => options.map((option) => option.value);

export default function EditMultiSelectSubArea({
  setSubAreaAgainstEachArea,
  propFormState,
  propSetFormState,
  propEditMode,
  propFieldName,
  showBlockQuoteClass = true,
  editableFeilds,
  propSetEditState,
  propValidateFlag,
  onValidationResult,
  propIsFullColumn = false,
  servicePlanBasedCities,
  changeInPromotionPoolId,
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
  const [previousServicePoolId, setPreviousServicePoolId] = useState(null);

  const { data: dataClientCityAreaSubarea } = useActiveCityAreaSubareaMapping();
  const queryClient = useQueryClient();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  });

  useEffect(() => {
    if (dataClientCityAreaSubarea) {
      setCityAreaSubareaData(dataClientCityAreaSubarea.data);
    }
  }, [dataClientCityAreaSubarea, queryClient]);

  useEffect(() => {
    if (servicePlanBasedCities && servicePlanBasedCities.length > 0) {
      const options = servicePlanBasedCities.map((element) => ({
        value: element.value,
        label: element.label,
      }));
      setCities(options);
    } else if (cityAreaSubareaData.length > 0) {
      const options = cityAreaSubareaData.map((element) => ({
        value: element.CITY_ID,
        label: element.CITY_NAME,
      }));
      setCities(options);
    }
  }, [servicePlanBasedCities, cityAreaSubareaData]);

  useEffect(() => {
    if (changeInPromotionPoolId) {
      setSelectedRow({ CITY_ID: [], AREA_ID: [], SUBAREA_ID: [] });
    }
  }, [changeInPromotionPoolId]);

  useEffect(() => {
    if (editableFeilds.SUBAREA_ID.CITY_ID.length > 0) {
      setSelectedRow((prevState) => ({
        ...prevState,
        CITY_ID: editableFeilds.SUBAREA_ID.CITY_ID,
      }));
    }
  }, [editableFeilds.SUBAREA_ID.CITY_ID]);

  useEffect(() => {
    if (editableFeilds.SUBAREA_ID.AREA_ID.length > 0) {
      setSelectedRow((prevState) => ({
        ...prevState,
        AREA_ID: editableFeilds.SUBAREA_ID.AREA_ID,
      }));
    }
  }, [editableFeilds.SUBAREA_ID.AREA_ID]);

  useEffect(() => {
    if (editableFeilds.SUBAREA_ID.SUBAREA_ID.length > 0) {
      setSelectedRow((prevState) => ({
        ...prevState,
        SUBAREA_ID: editableFeilds.SUBAREA_ID.SUBAREA_ID,
      }));
    }
  }, [editableFeilds.SUBAREA_ID.SUBAREA_ID]);

  useEffect(() => {
    if (propFormState.BUNDLE_POOL_ID) {
      setSelectedRow({ CITY_ID: [], AREA_ID: [], SUBAREA_ID: [] });
    }
  }, [propFormState.BUNDLE_POOL_ID]);

  useEffect(() => {
    const selectedCities = selectedRow.CITY_ID;
    const areasOptions = [];
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
  }, [selectedRow.CITY_ID, cityAreaSubareaData]);

  useEffect(() => {
    if (selectedRow.AREA_ID.length > 0) {
      const subAreaOptions = [];
      selectedRow.AREA_ID.forEach((areaId) => {
        cityAreaSubareaData.forEach((city) => {
          const area = city.areas.find((element) => element.AREA_ID === areaId);
          if (area) {
            area.subareas.forEach((subarea) => {
              subAreaOptions.push({
                value: subarea.SUBAREA_ID,
                label: `${area.AREA_NAME} - ${subarea.SUBAREA_NAME}`,
                checkAtleastOneSubarea: `${subarea.SUBAREA_ID} - ${area.AREA_ID}`,
              });
            });
          }
        });
      });
      setSubArea(subAreaOptions);
    } else {
      setSubArea([]);
    }
  }, [selectedRow.AREA_ID, cityAreaSubareaData]);

  const handleSelectChange = (options, { name }) => {
    if (name === "MULTI_SELECTOR_CITY") {
      const selectedCity = options.value;
      setSelectedRow({
        ...selectedRow,
        CITY_ID: [selectedCity],
        AREA_ID: [],
        SUBAREA_ID: [],
      });
      setAreas([]);
      setSubArea([]);
      propSetEditState((prevState) => ({
        ...prevState,
        [propFieldName]: {
          CITY_ID: [selectedCity],
          AREA_ID: [],
          SUBAREA_ID: [],
        },
      }));
    } else if (name === "MULTI_SELECTOR_AREA") {
      const isSelectAll = options.some(
        (option) => option.value === SELECT_ALL_OPTION.value
      );
      const selectedValues = isSelectAll
        ? handleSelectAll(areas)
        : options.map((option) => option.value);

      const previouslySelectedAreas = selectedRow.AREA_ID;
      const deselectedAreas = previouslySelectedAreas.filter(
        (areaId) => !selectedValues.includes(areaId)
      );

      const newSubAreaSelected = selectedRow.SUBAREA_ID.filter((subareaId) => {
        const subarea = subArea.find((s) => s.value === subareaId);
        if (!subarea) return true;

        const [subareaID, areaID] = subarea.checkAtleastOneSubarea.split(" - ");
        return !deselectedAreas.includes(areaID);
      });

      setSelectedRow({
        ...selectedRow,
        AREA_ID: selectedValues,
        SUBAREA_ID: newSubAreaSelected,
      });
      setSubArea([]);

      propSetEditState((prevState) => ({
        ...prevState,
        [propFieldName]: {
          ...prevState[propFieldName],
          AREA_ID: selectedValues,
          SUBAREA_ID: newSubAreaSelected,
        },
      }));
    } else if (name === "MULTI_SELECTOR_SUBAREA") {
      const isSelectAll = options.some(
        (option) => option.value === SELECT_ALL_OPTION.value
      );
      const selectedValues = isSelectAll
        ? handleSelectAll(subArea)
        : options.map((option) => option.value);

      setSelectedRow({ ...selectedRow, SUBAREA_ID: selectedValues });
      propSetEditState((prevState) => ({
        ...prevState,
        [propFieldName]: {
          ...prevState[propFieldName],
          SUBAREA_ID: selectedValues,
        },
      }));
    }
  };

  const validateSubareas = () => {
    const areaIDs = selectedRow.AREA_ID;
    const subareaIDs = selectedRow.SUBAREA_ID;

    const areaMap = {};

    areaIDs.forEach((areaId) => {
      areaMap[areaId] = false;
    });

    subareaIDs.forEach((subareaId) => {
      const subarea = subArea.find((sub) => sub.value === subareaId);

      if (subarea) {
        const [subareaID, areaID] = subarea.checkAtleastOneSubarea.split(" - ");

        if (areaMap.hasOwnProperty(areaID)) {
          areaMap[areaID] = true;
        }
      }
    });

    const missingSubareas = Object.entries(areaMap).filter(
      ([_, hasSubarea]) => !hasSubarea
    );

    if (missingSubareas.length > 0) {
      const missingAreaNames = missingSubareas
        .map(([areaId]) => {
          const area = areas.find((a) => a.value === areaId);
          return area ? area.label : areaId;
        })
        .join(", ");
      // toast.error(
      //   `Please select at least 1 subarea for each area: ${missingAreaNames}`
      // );
      return false;
    }

    return true;
  };

  const handleBlur = () => {
    const validateSubareass = validateSubareas();
    if (validateSubareass) {
      setSubAreaAgainstEachArea(true);
    } else {
      setSubAreaAgainstEachArea(false);
    }
  };

  useEffect(() => {
    if (propValidateFlag) {
      const validationResult = validateSubareas();
      onValidationResult(validationResult); // Return validation result to parent
    }
  }, [propValidateFlag]);

  const displaySelectedValue = (selectedValues, options) => {
    if (selectedValues.length === options.length && options.length > 0) {
      return [SELECT_ALL_OPTION];
    }
    return options.filter((option) => selectedValues.includes(option.value));
  };

  const customStyles = {
    valueContainer: (provided) => ({
      ...provided,
      maxHeight: "80px",
      overflowY: "auto",
      display: "flex",
      flexWrap: "wrap",
    }),
    multiValue: (provided) => ({
      ...provided,
      display: "flex",
      maxWidth: "100%",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      display: "flex",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 20,
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  return (
    <div className="col-sm-12">
      <div className="row mb-3 mt-1">
        <div
          className={`${propIsFullColumn ? "col-md-12" : "col-md-6"} col-sm-12`}
        >
          <div className="form-group">
            <label id="lblCity" className="required">
              City
            </label>
            <Select
              id="lbxCity"
              options={cities}
              isDisabled={true}
              placeholder="Select Cities"
              name="MULTI_SELECTOR_CITY"
              value={displaySelectedValue(selectedRow.CITY_ID, cities)}
              onChange={handleSelectChange}
              theme={customTheme}
              styles={colourStyles}
            />
          </div>
        </div>

        <div
          className={`${propIsFullColumn ? "col-md-12" : "col-md-6"} col-sm-12`}
        >
          <div className="form-group">
            <label id="lblAreas" className="required">
              Areas
            </label>
            <Select
              id="lbxAreas"
              isMulti
              options={[SELECT_ALL_OPTION, ...areas]}
              isDisabled={!editableFeilds.SUBAREA_ID.CITY_ID.length}
              placeholder="Select Areas"
              name="MULTI_SELECTOR_AREA"
              value={displaySelectedValue(selectedRow.AREA_ID, areas)}
              onChange={handleSelectChange}
              theme={customTheme}
              styles={customStyles}
              menuPortalTarget={mounted ? document?.body : null}
            />
          </div>
        </div>

        <div
          className={`${propIsFullColumn ? "col-md-12" : "col-md-6"} col-sm-12`}
        >
          <div className="form-group">
            <label id="lblSubareas" className="required">
              Subareas
            </label>
            <Select
              id="lbxSubareas"
              isMulti
              options={[SELECT_ALL_OPTION, ...subArea]}
              isDisabled={!editableFeilds.SUBAREA_ID.AREA_ID.length}
              placeholder="Select Subareas"
              name="MULTI_SELECTOR_SUBAREA"
              value={displaySelectedValue(selectedRow.SUBAREA_ID, subArea)}
              onChange={handleSelectChange}
              onBlur={handleBlur}
              theme={customTheme}
              styles={customStyles}
              menuPortalTarget={mounted ? document?.body : null}
              menuPosition="fixed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
