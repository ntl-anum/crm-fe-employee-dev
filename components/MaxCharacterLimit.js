import React from "react";

export default function MaxCharacterLimit({ characters }) {
  return (
    <p className="my-1 text-danger text-14">
      Maximum {characters} Characters allowed!
    </p>
  );
}
