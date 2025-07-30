import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Piechart } from "../components/Charts/piechart";
import { Linechart } from "../components/Charts/linechart";
import Image from "next/image";
import userIcon from '../public/dist/img/users-profiles-02.svg';
import rateIcon from '../public/dist/img/eye-open.png';
import barChartIcon from '../public/dist/img/bar-chart-square-up-01.svg';
import pieChartIcon from '../public/dist/img/pie-chart-01.svg';

export default function Dashboard({ data }) {
  return (
    <>
      <Layout>
        <div className="container">
          <div className="row mx-n5">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 pl-lg-1">
              <div className="col rounded mt-3" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="row">
                  <div className="col-4 d-flex align-items-center justify-content-center rounded-left" style={{ background: "#DB2777" }}>
                    <Image
                      src={userIcon}
                      alt="users"
                      width={24}
                      height={24}
                    />
                    {/* <img src="dist/img/users-profiles-02.svg" alt="users" /> */}
                  </div>
                  <div className="col-8 pl-4 pb-3">
                    <p className="pt-3 pb-0 mb-0 font-16 weight-500">914,001</p>
                    <span className="font-14 weight-400">Visits</span>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
              <div className="col rounded mt-3" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="row">
                  <div className="col-4 d-flex align-items-center justify-content-center rounded-left" style={{ background: "#328FF4" }}>
                  <Image
                      src={rateIcon}
                      alt="rateIcon"
                      width={24}
                      height={24}
                    />
                    {/* <img src="dist/img/eye-open.png" alt="users" /> */}
                  </div>
                  <div className="col-8 pl-4 pb-3">
                    <p className="pt-3 pb-0 mb-0 font-16 weight-500">46.41%</p>
                    <span className="font-14 weight-400">Bounce Rate</span>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
              <div className="col rounded mt-3" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="row">
                  <div className="col-4 d-flex align-items-center justify-content-center rounded-left" style={{ background: "#B562F6" }}>
                  <Image
                      src={barChartIcon}
                      alt="barChartIcon"
                      width={24}
                      height={24}
                    />
                    {/* <img src="dist/img/bar-chart-square-up-01.svg" alt="users" /> */}
                  </div>
                  <div className="col-8 pl-4 pb-3">
                    <p className="pt-3 pb-0 mb-0 font-16 weight-500">4,914,001</p>
                    <span className="font-14 weight-400">Page Views</span>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
              <div className="col rounded mt-3" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="row">
                  <div className="col-4 d-flex align-items-center justify-content-center rounded-left" style={{ background: "#E87B1E" }}>
                  <Image
                      src={pieChartIcon}
                      alt="pieChartIcon"
                      width={24}
                      height={24}
                    />
                    {/* <img src="dist/img/pie-chart-01.svg" alt="users" /> */}
                  </div>
                  <div className="col-8 pl-4 pb-3">
                    <p className="pt-3 pb-0 mb-0 font-16 weight-500">914,001</p>
                    <span className="font-14 weight-400">Visits</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>


        <div className="container my-5">

          <div className="row mx-n5">
            <div className="col pr-2">
              <div className="col rounded pt-4 pb-4 mt-3" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <h3 className="px-3 font-20 weight-500">Browser stats</h3>
                <div className="row px-3">
                  <div className="col-sm-12 col-lg-6">
                    <div className="row">
                      <div className="col-8">
                        <ul>
                          <li className="pt-1"
                          >Google Chrome</li>
                          <li className="pt-3">Firefox</li>
                          <li className="pt-3">Internet Explorer</li>
                          <li className="pt-3">Safari</li>
                          <li className="pt-3">Opera</li>
                          <li className="pt-3">Brave</li>
                        </ul>
                      </div>
                      <div className="col-4">
                        <ul>
                          <li className="pt-1">50%</li>
                          <li className="pt-3">10%</li>
                          <li className="pt-3">30%</li>
                          <li className="pt-3">10%</li>
                          <li className="pt-3">5%</li>
                          <li className="pt-3">5%</li>
                        </ul>
                      </div>
                    </div>
                  </div>


                  <div className="col-sm-12 col-lg-6">
                    <Piechart />
                  </div>
                </div>
              </div>
            </div>

            <div className="col pr-1">
              <div className="col rounded  pt-4 pb-4 mt-3" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <h3 className="pl-3 pr-3 font-20 weight-500">Customer satisfaction</h3>
                <div className="px-3">
                  <Linechart />
                </div>

              </div>
            </div>

          </div>

        </div>
        {/* <div className="row">
          <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
            <div className="panel panel-default card-view">
              <div className="panel-heading">
                <div className="pull-left">
                  <h6 className="panel-title txt-dark">browser stats</h6>
                </div>
                <div className="pull-right">
                  <a href="#" className="pull-left inline-block mr-15">
                    <i className="zmdi zmdi-download"></i>
                  </a>
                  <a
                    href="#"
                    className="pull-left inline-block close-panel"
                    data-effect="fadeOut"
                  >
                    <i className="zmdi zmdi-close"></i>
                  </a>
                </div>
                <div className="clearfix"></div>
              </div>
              <div className="panel-wrapper collapse in">
                <div className="panel-body">
                  <div>
                    <span className="pull-left inline-block capitalize-font txt-dark">
                      Google Chrome
                    </span>
                    <span className="label label-primary pull-right">50%</span>
                    <div className="clearfix"></div>
                    <hr className="light-grey-hr row mt-10 mb-1" />
                    <span className="pull-left inline-block capitalize-font txt-dark">
                      mozila firefox
                    </span>
                    <span className="label label-primary pull-right">10%</span>
                    <div className="clearfix"></div>
                    <hr className="light-grey-hr row mt-10 mb-1" />
                    <span className="pull-left inline-block capitalize-font txt-dark">
                      Internet explorer
                    </span>
                    <span className="label label-primary pull-right">30%</span>
                    <div className="clearfix"></div>
                    <hr className="light-grey-hr row mt-10 mb-1" />
                    <span className="pull-left inline-block capitalize-font txt-dark">
                      safari
                    </span>
                    <span className="label label-primary pull-right">10%</span>
                    <div className="clearfix"></div>
                    <hr className="light-grey-hr row mt-10 mb-1" />
                    <span className="pull-left inline-block capitalize-font txt-dark">
                      Brave
                    </span>
                    <span className="label label-primary pull-right">10%</span>
                    <div className="clearfix"></div>
                    <hr className="light-grey-hr row mt-10 mb-1" />
                    <span className="pull-left inline-block capitalize-font txt-dark">
                      Opera
                    </span>
                    <span className="label label-primary pull-right">10%</span>
                    <div className="clearfix"></div>
                    <hr className="light-grey-hr row mt-10 mb-1" />
                    <span className="pull-left inline-block capitalize-font txt-dark">
                      Firefox
                    </span>
                    <span className="label label-primary pull-right">10%</span>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-7 col-sm-12 col-xs-12">
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="panel panel-default card-view pa-0">
                <div className="panel-wrapper collapse in">
                  <div className="panel-body pa-0">
                    <div className="sm-data-box">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
                            <span className="txt-dark block counter"><span className="counter-anim">914,001</span></span>
                            <span className="weight-500 uppercase-font block font-13">visits</span>
                          </div>
                          <div className="col-xs-6 text-center  pl-0 pr-0 data-wrap-right">
                            <i className="icon-user-following data-right-rep-icon txt-light-grey"></i>
                          </div>
                        </div>	
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="panel panel-default card-view pa-0">
                <div className="panel-wrapper collapse in">
                  <div className="panel-body pa-0">
                    <div className="sm-data-box">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
                            <span className="txt-dark block counter"><span className="counter-anim">46.41</span>%</span>
                            <span className="weight-500 uppercase-font block">bounce rate</span>
                          </div>
                          <div className="col-xs-6 text-center  pl-0 pr-0 data-wrap-right">
                            <i className="icon-control-rewind data-right-rep-icon txt-light-grey"></i>
                          </div>
                        </div>	
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="panel panel-default card-view pa-0">
                <div className="panel-wrapper collapse in">
                  <div className="panel-body pa-0">
                    <div className="sm-data-box">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
                            <span className="txt-dark block counter"><span className="counter-anim">4,054,876</span></span>
                            <span className="weight-500 uppercase-font block">pageviews</span>
                          </div>
                          <div className="col-xs-6 text-center  pl-0 pr-0 data-wrap-right">
                            <i className="icon-layers data-right-rep-icon txt-light-grey"></i>
                          </div>
                        </div>	
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="panel panel-default card-view pa-0">
                <div className="panel-wrapper collapse in">
                  <div className="panel-body pa-0">
                    <div className="sm-data-box">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
                            <span className="txt-dark block counter"><span className="counter-anim">914,001</span></span>
                            <span className="weight-500 uppercase-font block font-13">visits</span>
                          </div>
                          <div className="col-xs-6 text-center  pl-0 pr-0 data-wrap-right">
                            <i className="icon-user-following data-right-rep-icon txt-light-grey"></i>
                          </div>
                        </div>	
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div><br/><br/><br/>
            <div className="col-lg-12 col-md-6 col-sm-6 col-xs-12">
            <div className="panel panel-default card-view">
							<div className="panel-wrapper collapse in">
                                <div className="panel-body sm-data-box-1">
									<span className="uppercase-font weight-500 font-14 block text-center txt-dark">customer satisfaction</span>	
									<div className="cus-sat-stat weight-500 txt-primary text-center mt-5">
										<span className="counter-anim">70</span><span>%</span>
									</div>
									<div className="progress-anim mt-20">
										<div className="progress">
											<div className="progress-bar progress-bar-primary
											wow animated progress-animated" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
										</div>
									</div>
									<ul className="flex-stat mt-5">
										<li>
											<span className="block">Previous</span>
											<span className="block txt-dark weight-500 font-15">79.82</span>
										</li>
										<li>
											<span className="block">% Change</span>
											<span className="block txt-dark weight-500 font-15">+14.29</span>
										</li>
										<li>
											<span className="block">Trend</span>
											<span className="block">
												<i className="zmdi zmdi-trending-up txt-success font-20"></i>
											</span>
										</li>
									</ul>
								</div>
                            </div>
            </div>
            </div>
          </div>
        </div> */}
      </Layout>
    </>
  );
}


// export async function getServerSideProps({ req }) {
//   // Fetch data from external API
//   const res = await session.getEmpData(req);

//   if (!res) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//     };
//   } else {
//     let response = await res.text();
//     let jsonRes = JSON.parse(response);
//     const data = jsonRes.data;
//     return { props: { data } };
//   }
// }
