import Image from "next/image";
import { APP_ROUTES } from "../helpers/enums";
import image500 from "../public/dist/img/500.svg";
import NayatelLogo from "../public/dist/img/NayatelLogo.svg";
import { useRouter } from "next/router";

export default function Custom500() {
  const router = useRouter();
  return (
    <div className="mt-5 pt-5 loginMainDiv">
      <div className="container h-auto">
        <div className="row bg-white" style={{ borderRadius: "20px" }}>
          <div className="col-sm-12 col-md-6 col-lg-6 d-none d-md-block rounded pl-5">
            {/* <img src="dist/img/500.svg" className="img-fluid"
              alt="login-img"
              style={{ width: "440px", height: "540px" }}></img> */}
            <Image
              src={image500}
              className="img-fluid"
              alt="login-img"
              style={{ width: "440px", height: "540px" }}
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
              {/* <p className="weight-400 font-18 p-0 m-0 text-secondary">500 error</p> */}
              <h1>Internal Server Error.</h1>
              <p className="weight-400 font-18 text-secondary">
                It looks like something went wrong on the server.
              </p>
              <span onClick={() => router.back()}>
                <a href="#">Go Back</a>
                <img src="dist/img/arrow-right-alt.svg" alt="arrow" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
