import React from "react";

const DivAlert = ({
  message = "",
  isCloseAble = false,
  type = "warning",
  style = {},
  blink = false
}) => {
  return (
    <div
      className={`alert alert-${type} alert-dismissable alert-style-1 ${blink && "blink"}`}
      style={{ ...style }}
    >
      {isCloseAble && (
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-hidden="true"
        >
          &times;
        </button>
      )}
      <i class="zmdi zmdi-info"></i>
      {message}
    </div>
  );
};

export default DivAlert;
