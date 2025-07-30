import { useRouter } from "next/router";
import React from "react";
export default function GoBack() {
  const router = useRouter();
  return (
    <div className="d-flex justify-content-end">
      <button
        className="btn btn-primary my-4"
        onClick={() => router.back()}
        style={{ position: "relative", right: "22rem", background: "#284E93" }}
      >
        <i className="fa fa-long-arrow-left"></i>
        <span className="ml-2">Go Back</span>
      </button>
    </div>
  );
}
