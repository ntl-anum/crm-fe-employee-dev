import React, { useState, useEffect, use } from "react";
import Layout from "../components/Layout";
import Image from "next/image";
import dashboardIcon from "../public/dist/img/dashboardIcon.svg";
import TicketDashlet from "../components/Dashboard/ticketDashlet";
import Taskprogress from "../components/Dashboard/taskProgress";
import BarChart from "../components/Dashboard/barChart";
import closeIcon from "../public/dist/img/closeDashletPopup.svg";
import GraphModal from "../components/Dashboard/graphGalleryModal";
import TableModal from "../components/Dashboard/tableGalleryModal";
import SprintDetailDashlet from "../components/Dashboard/sprintDetailDashlet";
import { Linechart } from "../components/Charts/linechart";
import { Piechart } from "../components/Charts/piechart";
import Cookie from "js-cookie";
import { DashletMappingService } from "../services/DashboardCustomizationService/UserDashletMapping";
import DashboardCards from "../components/Dashboard/cards";

export default function Dashboard({}) {
  const [blurState, setBlurState] = useState(false);
  const [blurDetailsTableState, setblurDetailsTableState] = useState(false);
  const [blurChartState, setBlurChartState] = useState(false);
  const [blurProgressState, setBlurProgressState] = useState(false);
  const [blurLineChart, setBlurLineChart] = useState(false);
  const [blurPieChart, setBlurPieChart] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [dashletData, setDashletData] = useState([]);

  // const userDashletMapping = async () => {
  //   const empId = Cookie.get(process.env.USER);
  //   const res = await DashletMappingService.listDashletMappingAgainstUser(empId);
  //   let responseText = await res.text();
  //   let jsonRes = JSON.parse(responseText);
  //   setDashletData(jsonRes.data);

  //   jsonRes?.data?.map((element) => {
  //     if (element.dashletPool.TYPE == 'Table') {
  //       setTableData([element.dashletPool])

  //
  //     }
  //     else if (element.dashletPool.TYPE == 'Graph') {
  //       setGraphData([element.dashletPool])
  //
  //     }
  //     else if (element.dashletPool.TYPE == 'Chart') {
  //       setChartData([element.dashletPool])
  //
  //     } else {

  //     }
  //   })
  // }

  // useEffect(() => {
  //   userDashletMapping();
  // }, []);

  const handleCustomizeDashboard = () => {
    setBlurState(true);
    setBlurChartState(true);
    setBlurProgressState(true);
    setblurDetailsTableState(true);
    setBlurLineChart(true);
    setBlurPieChart(true);
  };
  const handlePopup = () => {
    setBlurState(false);
  };
  const handleDetailsTablePopup = () => {
    setblurDetailsTableState(false);
  };
  const handleChartPopup = () => {
    setBlurChartState(false);
  };
  const handleProgressPopup = () => {
    setBlurProgressState(false);
  };
  const handleBlurLineChart = () => {
    setBlurLineChart(false);
  };
  const handleBlurPieChart = () => {
    setBlurPieChart(false);
  };
  const ticketTable = "dashlet_table";
  const sprintDetail = "dashlet_table";
  const barChart = "dashlet_chart";
  const taskProgress = "dashlet_graph";
  const linechart = "dashlet_graph";
  const pieChart = "dashlet_chart";

  return (
    <>
      <Layout>
        <div className="container">
          <div className="row px-2 pt-1 pb-3">
            <div className="col-sm-12 col-md-6">
              <h5>
                {/* <Image
                  src={dashboardIcon}
                  style={{ width: '20px', height: '20px' }}
                  alt="dashboard-icon"
                  className="pb-1"
                />  */}
                Dashboard
              </h5>
            </div>
            <div className="col-sm-12 col-md-6 text-lg-right">
              <button
                className="btn btn-default custom-bg-color text-white py-1 px-2 xyz"
                onClick={handleCustomizeDashboard}
              >
                Customize dashboard
              </button>
            </div>
          </div>
          <DashboardCards />
          <div className="container">
            <div
              className="row bg-white py-3"
              style={{
                boxShadow: " rgba(0, 0, 0, 9%) 0px 3px 8px",
                position: "relative",
              }}
            >
              <div
                className="col-sm-12 col-md-6 mb-2 px-0"
                style={{ position: "relative" }}
              >
                {blurChartState ? (
                  <>
                    <div
                      className="col-sm-12 col-md-12"
                      id={barChart}
                      style={{
                        filter: "blur(1.3px)  brightness(0.5)",
                        position: "relative",
                        zIndex: "1",
                      }}
                    >
                      <BarChart />
                    </div>
                    <div
                      className="text-center rounded second-dashlet"
                      id="dashlet2"
                    >
                      <div className="text-right p-2">
                        <a href="#">
                          <Image
                            src={closeIcon}
                            alt="Close-icon"
                            onClick={handleChartPopup}
                          />
                        </a>
                      </div>
                      <div style={{ padding: "20px 60px 50px 60px" }}>
                        <GraphModal />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="col-sm-12 col-md-12" id={barChart}>
                    <BarChart />
                  </div>
                )}
              </div>

              <div
                className="col-sm-12 col-md-6 pr-0 mb-2"
                style={{ position: "relative" }}
              >
                {blurPieChart ? (
                  <>
                    <div
                      className="col-sm-12 col-md-12"
                      id={pieChart}
                      style={{
                        filter: "blur(1.3px)  brightness(0.5)",
                        position: "relative",
                        zIndex: "1",
                      }}
                    >
                      <Piechart />
                    </div>

                    <div
                      className="text-center rounded second-dashlet"
                      id="dashlet3"
                    >
                      <div className="text-right p-2">
                        <a href="#">
                          <Image
                            src={closeIcon}
                            alt="Close-icon"
                            onClick={handleBlurPieChart}
                          />
                        </a>
                      </div>
                      <div style={{ padding: "20px 60px 50px 60px" }}>
                        <GraphModal />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="col-sm-12 col-md-12" id={pieChart}>
                    <Piechart />
                  </div>
                )}
              </div>

              <div
                className="col-sm-12 col-md-6 pr-0 mb-2  pl-0"
                style={{ position: "relative" }}
              >
                {blurLineChart ? (
                  <>
                    <div
                      className="col-sm-12 col-md-12"
                      id={linechart}
                      style={{
                        filter: "blur(1.3px)  brightness(0.5)",
                        position: "relative",
                        zIndex: "1",
                      }}
                    >
                      <Linechart />
                    </div>

                    <div
                      className="text-center rounded second-dashlet"
                      id="dashlet3"
                    >
                      <div className="text-right p-2">
                        <a href="#">
                          <Image
                            src={closeIcon}
                            alt="Close-icon"
                            onClick={handleBlurLineChart}
                          />
                        </a>
                      </div>
                      <div style={{ padding: "20px 60px 50px 60px" }}>
                        <GraphModal />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="col-sm-12 col-md-12" id={linechart}>
                    <Linechart />
                  </div>
                )}
              </div>
              <div
                className="col-sm-12 col-md-6 pr-0 mb-2"
                style={{ position: "relative" }}
              >
                {blurProgressState ? (
                  <>
                    <div
                      className="col-sm-12 col-md-12"
                      id={taskProgress}
                      style={{
                        filter: "blur(1.3px)  brightness(0.5)",
                        position: "relative",
                        zIndex: "1",
                      }}
                    >
                      <Taskprogress />
                    </div>

                    <div
                      className="text-center rounded second-dashlet"
                      id="dashlet3"
                    >
                      <div className="text-right p-2">
                        <a href="#">
                          <Image
                            src={closeIcon}
                            alt="Close-icon"
                            onClick={handleProgressPopup}
                          />
                        </a>
                      </div>
                      <div style={{ padding: "20px 60px 50px 60px" }}>
                        <GraphModal />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="col-sm-12 col-md-12" id={taskProgress}>
                    <Taskprogress />
                  </div>
                )}
              </div>
              <div
                className="col-sm-12 col-md-12 pr-0 mb-2 bg-white pl-0"
                style={{ position: "relative" }}
              >
                {blurState ? (
                  <>
                    <div
                      className="p-3"
                      id={ticketTable}
                      style={{
                        filter: "blur(1.3px)  brightness(0.5)",
                        position: "relative",
                        zIndex: "1",
                      }}
                    >
                      <TicketDashlet />
                    </div>

                    <div
                      className="text-center rounded first-dashlet"
                      id="dashlet1"
                    >
                      <div className="text-right p-2">
                        <a href="#">
                          <Image
                            src={closeIcon}
                            alt="Close-icon"
                            onClick={handlePopup}
                          />
                        </a>
                      </div>
                      <div style={{ padding: "20px 80px 50px 80px" }}>
                        <TableModal />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3" id={ticketTable}>
                      <TicketDashlet />
                    </div>
                  </>
                )}
              </div>
              <div
                className="col-sm-12 col-md-12 bg-white pl-0"
                style={{ position: "relative" }}
              >
                {blurDetailsTableState ? (
                  <>
                    <div
                      className="p-3"
                      id={sprintDetail}
                      style={{
                        filter: "blur(1.3px)  brightness(0.5)",
                        position: "relative",
                        zIndex: "1",
                      }}
                    >
                      <SprintDetailDashlet />
                    </div>

                    <div className="text-center rounded first-dashlet">
                      <div className="text-right p-2">
                        <a href="#">
                          <Image
                            src={closeIcon}
                            alt="Close-icon"
                            onClick={handleDetailsTablePopup}
                          />
                        </a>
                      </div>
                      <div style={{ padding: "20px 80px 50px 80px" }}>
                        <TableModal />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3" id={sprintDetail}>
                      <SprintDetailDashlet />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* 2nd and 3rd dashlet */}
        </div>
      </Layout>
    </>
  );
}
