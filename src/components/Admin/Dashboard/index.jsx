import { useEffect, useState } from "react";
import Axios from "axios";
import { ROOT_URL } from "../../../App";
import { showNotification } from "../../../util/notification";
import { Modules } from "./styles";

export const Dashboard = ({ setActiveKey }) => {
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
      <div class="col-sm-6">
        <div class="card mb-3">
          <div class="card-body">

            <div className="module1 bg-success " onClick={() => setActiveKey("college")}>
              <div className="info ">
                <div style={{ justifyContent: 'center', display: 'flex', padding: '12px', fontSize: '20px', background: '#779efc', color: 'white' }}>
                  <div className="count fy-4">{collegesCount}</div>
                  <div className="org ">College</div>
                </div> </div>
              <div style={{ justifyContent: 'center', display: 'flex', padding: '12px', background: '#779efc' }}>
                <img src="/images/college.svg" alt="college" style={{ width: "600", height: "400" }} />
              </div></div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 ">
        <div class="card">
          <div class="card-body">
            <div className="module2  " onClick={() => setActiveKey("company")}>
              <div className="info">
                <div style={{ justifyContent: 'center', display: 'flex', padding: '12px', fontSize: '20px', background: '#779efc', color: 'white' }}>
                  <div className="count">{companiesCount}</div>
                  <div className="org">Companies</div>
                </div>  </div>
              <div style={{ justifyContent: 'center', display: 'flex', padding: '12px', background: '#779efc' }}>
                <img src="/images/company.svg" alt="company" style={{ width: "600", height: "400" }} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>






    // <Modules style={{ display: "flex" ,flexWrap: 'wrap'}}>


    // </Modules>
  );
};

export default Dashboard;

















