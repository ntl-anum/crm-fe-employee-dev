import Image from "next/image";
import general_error from "../public/dist/img/general_error.svg";
import NayatelLogo from "../public/dist/img/NayatelLogo.svg";
import Router from "next/router";
import { BACKEND_ROUTES } from "@/helpers/backend_routes";

const moveToLogin = () => {
  Router.push(BACKEND_ROUTES.AUTH.CRM_LOGIN);
};
export default function Custom500() {
  return (
    <div className="mt-5 pt-5 loginMainDiv">
      <div className="container h-auto">
        <div className="row bg-white" style={{ borderRadius: "20px" }}>
          <div className="col-sm-12 col-md-6 col-lg-6 d-none d-md-block rounded pl-5">
            {/* <img src="dist/img/500.svg" className="img-fluid"
              alt="login-img"
              style={{ width: "440px", height: "540px" }}></img> */}
            <Image
              src={general_error}
              className="img-fluid general_error"
              alt="login-img"
            />
          </div>

          <div
            className="col-sm-12 col-md-6 col-lg-6 text-center mt-5"
            style={{ padding: "50px 20px" }}
          >
            <Image
              src={NayatelLogo}
              style={{ width: "150px" }}
              alt="nayatel-logo"
              className="brand-img mt-5 mb-15"
            />
            {/* <img
            className="brand-img mt-5 mb-15"
            src="dist/img/NayatelLogo.svg"
            alt="brand"
            style={{ width: "150px" }}
          /> */}
            <div className="mt-3">
              {/* <p className="weight-400 font-18 p-0 m-0 text-secondary">
                401 error
              </p> */}
              <h1>Session Expired.</h1>
              <p className="weight-400 font-18 text-secondary">
                Please Login Again.
              </p>
              <span onClick={moveToLogin} className="text-primary">
                {" "}
                <a href="#">Login Again</a>{" "}
                <img src="dist/img/arrow-right-alt.svg" alt="arrow" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
