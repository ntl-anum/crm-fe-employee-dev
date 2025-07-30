import { useRouter } from "next/router";

export default function Custom409() {
  const router = useRouter();

  return (
    <div className="mt-5 pt-5 loginMainDiv">
      <div className="container h-auto">
        <div className="row bg-white" style={{ borderRadius: "20px" }}>
          <div className="col-sm-12 col-md-6 col-lg-6 d-none d-md-block rounded pl-5">
            <img
              src="dist/img/general_error.svg"
              className="img-fluid general_error"
              alt="login-img"
            ></img>
          </div>

          <div
            className="col-sm-12 col-md-6 col-lg-6 text-center mt-5"
            style={{ padding: "50px 20px" }}
          >
            <img
              className="brand-img mt-5 mb-15"
              src="dist/img/NayatelLogo.svg"
              alt="brand"
              style={{ width: "150px" }}
            />
            <div className="mt-3">
              {/* <p className="weight-400 font-18 p-0 m-0 text-secondary">
                409 error
              </p> */}
              <h1>CONFLICT</h1>
              <p className="weight-400 font-18 text-secondary">
                Operator Verification Failed
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
