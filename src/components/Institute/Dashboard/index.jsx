




import { useEffect, useState } from "react";
import Axios from "axios";
import { ROOT_URL } from "../../../App";
import { showNotification } from "../../../util/notification";
import { Modules } from "./styles";

export const InstituteDashboard = ({ setActiveKey }) => {
  const BASE_URL = `${ROOT_URL}/admin`;

  const [collegesCount, setCollegesCount] = useState(0);
  const [companiesCount, setCompaniesCount] = useState(0);

  const fetchDashboardData = () => {
    Axios.get(`${BASE_URL}/dashboard`, {})
      .then((res) => {
        setCollegesCount(res.data.collegesCount);
        setCompaniesCount(res.data.companiesCount);
        showNotification(
          "Stats Success",
          "Data Fetched successfully",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (

    <div class="row ">
      <div class="col-sm-6 ">
        <div class="card mb-3 ">


          <div className="module1 bg-success " onClick={() => setActiveKey("college")}>
            <div className="info ">
              <div style={{ justifyContent: 'center', display: 'flex', padding: '12px', fontSize: '20px', background: '#779efc', color: 'white' }}>
                <div className="count fy-4">{collegesCount}</div> &nbsp;
                <div className="org ">Student</div>
              </div> </div>
            <div style={{ justifyContent: 'center', display: 'flex', padding: '12px', background: '#779efc' }}>
              <img src="/images/studentss.svg" alt="college" style={{ width: "600", height: "400" }} />
            </div></div>
        </div>

      </div>
      <div class="col-sm-6 ">
        <div class="card">

          <div className="module2  " onClick={() => setActiveKey("company")}>
            <div className="info">
              <div style={{ justifyContent: 'center', display: 'flex', padding: '12px', fontSize: '20px', background: '#779efc', color: 'white' }}>
                <div className="count ">{companiesCount}</div>
                &nbsp;
                <div className="org">Courses</div>
              </div>  </div>
            <div style={{ justifyContent: 'center', display: 'flex', padding: '12px', background: '#779efc' }}>
              <img src="/images/course.svg" alt="company" style={{ width: "600", height: "400" }} />
            </div>


          </div>
        </div>
      </div>


      <div class="col-sm-6">
        <div class="card mb-3">


          <div className="module1 bg-success " onClick={() => setActiveKey("college")}>
            <div className="info ">
              <div style={{ justifyContent: 'center', display: 'flex', padding: '12px', fontSize: '20px', background: '#779efc', color: 'white' }}>
                <div className="count fy-4">{collegesCount}</div> &nbsp;
                <div className="org ">Certificates</div>
              </div> </div>
            <div style={{ justifyContent: 'center', display: 'flex', padding: '12px', background: '#779efc' }}>
              <img src="/images/certif.svg" alt="college" style={{ width: "600", height: "400" }} />
            </div></div>
        </div>

      </div>
      <div class="col-sm-6 ">
        <div class="card">

          <div className="module2  " onClick={() => setActiveKey("company")}>
            <div className="info">
              <div style={{ justifyContent: 'center', display: 'flex', padding: '12px', fontSize: '20px', background: '#779efc', color: 'white' }}>
                <div className="count">{companiesCount}</div> &nbsp;
                <div className="org">User</div>
              </div>  </div>
            <div style={{ justifyContent: 'center', display: 'flex', padding: '20px', background: '#779efc' }}>
              <img src="/images/user.svg" alt="company" style={{ width: "600", height: "400" }} />
            </div>


          </div>
        </div>
      </div>



      {/* <div class="container py-5">
      <header class="text-center "> */}

        {/* <div class="row">
          <div class="col-lg-3 col-sm-6 mb-2">
            <div class="card">
              <div class="content">
                <div class="row">
                  <div class="col-xs-5">
                    <div class="icon-big icon-warning text-center">
                      <i class="ti-server"></i>
                    </div>
                  </div>
                  <div class="col-xs-7" style={{ justifyContent: 'center', display: 'flex', padding: '12px', fontSize: '20px', }}>
                    <div class="numbers">
                      <p>Students</p>
                      3700
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 mb-2">
            <div class="card">
              <div class="content">
                <div class="row">
                  <div class="col-xs-5">
                    <div class="icon-big icon-success text-center">
                      <i class="ti-wallet"></i>
                    </div>
                  </div>
                  <div class="col-xs-7" style={{ justifyContent: 'center', display: 'flex', padding: '12px', fontSize: '20px', }}>
                    <div class="numbers">
                      <p>Certificates</p>
                      690
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 mb-2">
            <div class="card">
              <div class="content">
                <div class="row">
                  <div class="col-xs-5">
                    <div class="icon-big icon-danger text-center">
                      <i class="ti-pulse"></i>
                    </div>
                  </div>
                  <div class="col-xs-7" style={{ justifyContent: 'center', display: 'flex', padding: '12px', fontSize: '20px', }}>
                    <div class="numbers">
                      <p>Courses</p>
                      12
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 mb-2">
            <div class="card">
              <div class="content">
                <div class="row">
                  <div class="col-xs-5">
                    <div class="icon-big icon-info text-center">
                      <i class="ti-twitter-alt"></i>
                    </div>
                  </div>
                  <div class="col-xs-7" style={{ justifyContent: 'center', display: 'flex', padding: '12px', fontSize: '20px', }}>
                    <div class="numbers">
                      <p>Active Users</p>
                      2134
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div> */}






      {/* </header>

      <div class="row py-5">


        <div class="col-lg-12 mx-auto">
          <h2 className=" text-center">Courses Distribution</h2>
          <div class="card shadow ">
            <div class="card-body p-5">
              <h4>Labeled progress ba</h4>
              <p class="font-italic text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>


              <div class="progress rounded-pill">
                <div role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100" style={{ width: "55%" }} class="progress-bar rounded-pill">55%</div>
              </div>
            </div>
          </div>


          <div class="card shadow ">
            <div class="card-body p-5">
              <h4>Labeled progress ba</h4>
              <p class="font-italic text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>


              <div class="progress rounded-pill">
                <div role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100" style={{ width: "55%" }} class="progress-bar rounded-pill">55%</div>
              </div>
            </div>
          </div>

          <div class="card shadow">
            <div class="card-body p-5">
              <h4>Labeled progress ba</h4>
              <p class="font-italic text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>


              <div class="progress rounded-pill">
                <div role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100" style={{ width: "55%" }} class="progress-bar rounded-pill">55%</div>
              </div>
            </div>
          </div>





        </div>
      </div> */}
    {/* </div> */}






    </div>






    // <Modules style={{ display: "flex" ,flexWrap: 'wrap'}}>


    // </Modules>
  );
};

export default InstituteDashboard;
