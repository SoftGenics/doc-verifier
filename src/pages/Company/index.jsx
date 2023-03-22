import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import Axios from "axios";
import { ROOT_URL } from "../../App";
import * as actionTypes from "../../store/actions";
import { CompanyHome } from "../../components/Company/Home";
import {
  HomeBody,
  HeaderContainer,
  Sider,
  Body,
  SiderTabs,
  HeaderCon,
} from "./styles";
import AppliedCandidates from "../../components/Company/AppliedCandidates";
import ExternalCertificates from "../../components/Company/ExternalCertificates";
import { Employees } from "../../components/Company/Employee";
// import Sidebar from "../Admin/Home/Sidebar";

const Home = () => {
  const BASE_URL = `${ROOT_URL}/company`;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const [activeKey, setActiveKey] = useState("home");

  useEffect(() => {
    const key = query.get("module") || "home";
    setActiveKey(key);
  }, [query]);

  const handleCompanyLogout = () => {
    Axios.post(`${BASE_URL}/logout`, {})
      .then((res) => {
        dispatch({
          type: actionTypes.SET_LOGIN_INFO,
          loginInfo: {
            token: "",
          },
        });
        notification.success({
          name: "Logout Successful",
          message: "Logout Successful",
          placement: "bottomLeft",
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          name: "Logout Failed",
          message: "Session Invalid",
          placement: "bottomLeft",
        });
        navigate("/");
      });
  };

  const handleCompanyNavigation = (key) => {
    navigate(`?module=${key}&view=list`);
    setActiveKey(key);
  };

  const renderComponent = () => {
    switch (activeKey) {
      case "home":
        return <CompanyHome />;
      case "applied":
        return <AppliedCandidates />;
      case "employee":
        return <Employees />;
      case "external":
        return <ExternalCertificates />;
      default:
        return null;
    }
  };

  return (
    <HomeBody>
      <HeaderContainer>
        <div className="logo">
          <img src="/images/logo 1.png" alt="logo" />
        </div>
        <div className="tabs">
          <div className="logout tab" onClick={handleCompanyLogout}>
            <img src="/images/logout.svg" alt="logout" />
          </div>
        </div>
      </HeaderContainer>

      {/* <div className="company">👋 Company</div> */}

      <Body>
        <div class="container-fluid">
          <div class="row flex-nowrap">
            <div
              class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 "
              style={{ backgroundColor: "#7ba0ff" }}
            >
              <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-info min-vh-100">
                <a
                  href="/"
                  class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-info text-decoration-none"
                >
                  <span class="fs-5 d-none d-sm-inline font-weight-bold">
                    👋 Company
                  </span>
                </a>
                <ul
                  class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start "
                  id="menu"
                >
                  <li>
                    <ul
                      class="collapse show nav flex-column ms-1 mx-auto"
                      id="submenu1"
                      data-bs-parent="#menu"
                    >
                      <SiderTabs>
                        {" "}

                        <li class="nav-item">
                          <a
                            href="#"
                            class="nav-link px-0 text-dark fw-bold"
                            isActive={activeKey === "home"}
                            onClick={() => handleCompanyNavigation("home")}
                          >
                            <img
                              src="/images/homeicon.svg"
                              alt="home"
                              width="30"
                              height="30"
                            /> <span class="ms-1 d-none d-sm-inline">Home</span>
                          </a>
                        </li>

                      </SiderTabs>
                      <SiderTabs>
                      <li class="nav-item">
                          <a
                            href="#"
                            class="nav-link px-0 text-dark fw-bold"
                            isActive={activeKey === "employee"}
                            onClick={() => handleCompanyNavigation("employee")}
                          >
                            <img
                              src="/images/company.svg"
                              alt="applied"
                              width="30" height="30"
                            /><span class="ms-1 d-none d-sm-inline">Employees</span>
                          </a>
                        </li>

                        </SiderTabs>

                      {/* <li class="w-100">
                        <a href="#" class="nav-link px-0 text-dark fw-bold" isActive={activeKey === "employee"}
                          onClick={() => handleCompanyNavigation("employee")}> <span class="d-none d-sm-inline"> <img src="/images/company.svg" alt="employee" width="30" height="30" />
                          </span>        EMPLOYEES</a>
                      </li> */}
                      <SiderTabs>
                        <li class="nav-item">
                          <a
                            href="#"
                            class="nav-link px-0 text-dark fw-bold"
                            isActive={activeKey === "applied"}
                            onClick={() => handleCompanyNavigation("applied")}
                          >
                            <img
                              src="/images/company-applied.svg"
                              alt="applied"
                            /><span class="ms-1 d-none d-sm-inline">Application</span>
                          </a>
                        </li>
                      </SiderTabs>
                      <SiderTabs>
                        <li class="nav-item">
                          <a
                            href="#"
                            class="nav-link px-0 text-dark fw-bold"
                            isActive={activeKey === "external"}
                            onClick={() => handleCompanyNavigation("external")}
                          >
                            <img
                              src="/images/company.svg"
                              alt="external"
                              width="30"
                              height="30"
                            /><span class="ms-1 d-none d-sm-inline">External Certificates</span>
                          </a>
                        </li>
                      </SiderTabs>
                    </ul>
                  </li>
                </ul>
                <hr></hr>
              </div>
            </div>
            <div class="col py-3">{renderComponent(activeKey)}</div>
          </div>
        </div>


      </Body>
    </HomeBody>
  );
};

export default Home;
