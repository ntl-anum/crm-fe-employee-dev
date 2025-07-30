import Image from "next/image";
import { APP_ROUTES } from "../helpers/enums";
import image404 from "../public/dist/img/404.svg";
import NayatelLogo from "../public/dist/img/NayatelLogo.svg";
import { useRouter } from "next/router";
export default function Custom404() {
  const router = useRouter();
  return (
    <div className="mt-5 pt-5 loginMainDiv">
      <div className="container h-auto">
        <div className="row bg-white" style={{ borderRadius: "20px" }}>
          <div className="col-sm-12 col-md-6 col-lg-6 d-none d-md-block rounded pl-5">
            {/* <img
              src="dist/img/404.svg"
              
            ></img> */}
            <Image
              src={image404}
              className="img-fluid"
              alt="login-img"
              style={{ width: "440px", height: "540px" }}
            />
          </div>

          <div
            className="col-sm-12 col-md-6 col-lg-6 text-center mt-5"
            style={{ padding: "50px 20px" }}
          >
            {/* <img
              className="brand-img mt-5 mb-15"
              src="dist/img/NayatelLogo.svg"
              alt="brand"
              style={{ width: "150px" }}
            /> */}
            <Image
              src={NayatelLogo}
              style={{ width: "150px" }}
              alt="nayatel-logo"
              className="brand-img mt-5 mb-15"
            />
            <div className="mt-3">
              {/* <p className="weight-400 font-18 p-0 m-0 text-secondary">
                404 error
              </p> */}
              <h1>Page not found.</h1>
              <p className="weight-400 font-18 text-secondary">
                It looks like the page you’re looking for does not exist.
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
