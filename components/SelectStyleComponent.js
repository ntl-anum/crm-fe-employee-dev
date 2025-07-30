export const colourStyles = {
  control: (styles, state) => ({
    ...styles,

    height: 37,
    boxShadow: state.isFocused ? "0 0 0 .2rem rgba(0,123,255,.25)" : "none",
    outline: "none",
    borderColor: state.isFocused ? "#80bdff" : styles.borderColor,
    ":hover": {
      borderColor: state.isFocused
        ? "#80bdff"
        : styles[":hover"]
        ? styles[":hover"].borderColor
        : styles.borderColor,
    },
  }),
  menu: (provided) => ({ ...provided, zIndex: 1050 }),

  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    let bgColor = null;

    if (isSelected) {
      bgColor = "#284E93";
    } else if (isFocused) {
      bgColor = "#D2E2FF";
    }
    return {
      ...styles,
      backgroundColor: bgColor,
      color: isSelected ? "#ffffff" : "#333",
    };
  },

  // commenting it according to comment under cr-2121
  // input: (styles) => ({
  //   ...styles,
  //   caretColor: "transparent",
  // }),
};

export const customTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#80bdff",
  },
});

export const colourStylesTable = {
  control: (styles, state) => ({
    ...styles,
    height: 37,
    boxShadow: state.isFocused ? "0 0 0 .2rem rgba(0,123,255,.25)" : "none",
  }),
  menu: (provided) => ({ ...provided, position: "relative" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    let bgColor = null;

    if (isSelected) {
      bgColor = "#284E93";
    } else if (isFocused) {
      bgColor = "#D2E2FF";
    }
    return {
      ...styles,
      backgroundColor: bgColor,
      color: isSelected ? "#ffffff " : "#333",
      ":hover": {
        backgroundColor: "#D2E2FF",
        color: "#333",
      },
    };
  },
};
