import React from "react";
import dashboardIcon from "/public/dist/img/dashboardIcon.svg";
import Image from "next/image";
import BarChart from "./barChart";
import Taskprogress from "./taskProgress";
import { Piechart } from "../Charts/piechart";
import { Linechart } from "../Charts/linechart";
import TicketDashlet from "./ticketDashlet";
import closeIcon from "/public/dist/img/closeDashletPopup.svg";

const GraphGallery = () => {
  const ref = React.useRef(null);

  return (
    <>
      <div className="container-fluid">
        <div className="row py-3">
          <div className="col-sm-6 col-md-6">
            <h5>
              <Image
                src={dashboardIcon}
                style={{ width: "20px", height: "20px" }}
                alt="dashboard-icon"
                className="pb-1"
              />{" "}
              Gallery
            </h5>
          </div>
          <div className="col-sm-6 col-md-6 text-right"></div>
        </div>
        <div
          className="bg-white m-2 p-4"
          style={{ boxShadow: " rgba(0, 0, 0, 9%) 0px 3px 8px" }}
        >
          <div className="row pb-2">
            <div className="col-sm-12 col-md-6" id="barchart">
              <BarChart />
            </div>
            <div className="col-sm-12 col-md-6" id="taskprogress">
              <Taskprogress />
            </div>
          </div>
          <div className="row pb-2">
            <div className="col-sm-12 col-md-6" id="linechart">
              <Linechart />
            </div>
            <div className="col-sm-12 col-md-6" id="piechart">
              <Piechart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GraphGallery;
