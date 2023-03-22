import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import Axios from "axios";
import { ROOT_URL } from "../../../App";
import * as actionTypes from "../../../store/actions";
import { Dashboard } from "../../../components/Admin/Dashboard";
import College from "../../../components/Admin/College";
import Company from "../../../components/Admin/Company";
import { HomeBody, HeaderContainer, Sider, Body, SiderTabs } from "./styles";
import "bootstrap/dist/css/bootstrap.min.css";
import Figure from "react-bootstrap/Figure";

const Home = () => {
  const BASE_URL = `${ROOT_URL}/admin`;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const [activeKey, setActiveKey] = useState("home");

  useEffect(() => {
    const key = query.get("module") || "home";
    setActiveKey(key);
  }, [query]);

  const handleAdminLogout = () => {
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
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          name: "Logout Failed",
          message: "Session Invalid",
          placement: "bottomLeft",
        });
        navigate("/admin");
      });
  };

  const handleAdminNavigation = (key) => {
    navigate(`?module=${key}&view=list`);
    setActiveKey(key);
  };

  const renderComponent = () => {
    switch (activeKey) {
      case "home":
        return <Dashboard setActiveKey={handleAdminNavigation} />;
      case "college":
        return <College />;
      case "company":
        return <Company />;
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
          <div className="logout tab" onClick={handleAdminLogout}>
            <img src="/images/logout.svg" alt="logout" />
          </div>
        </div>
      </HeaderContainer>

      <Body>
        <div className="admin">👋 Admin</div>

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
                            onClick={() => handleAdminNavigation("home")}
                          >
                            <img src="/images/homeicon.svg" alt="home" width="30"
                              height="30" />
                            <span class="ms-1 d-none d-sm-inline">
                              Home</span>
                          </a>
                        </li>







                      </SiderTabs>

                      <SiderTabs>
                      <li class="nav-item">
                      <a
                            href="#"
                            class="nav-link px-0 text-dark fw-bold"
                            isActive={activeKey === "college"}
                            onClick={() => handleAdminNavigation("college")}
                          >
                            <img
                                src="/images/college.svg"
                                alt="college"
                                width="30"
                                height="30"
                              />
                            <span class="ms-1 d-none d-sm-inline">
                            College</span>
                          </a>
                        </li>




                        
                      </SiderTabs>
                      <SiderTabs>

                      <li class="nav-item">
                      <a
                            href="#"
                            class="nav-link px-0 text-dark fw-bold"
                            isActive={activeKey === "company"}
                            onClick={() => handleAdminNavigation("company")}
                          >
                            <img
                                src="/images/company.svg"
                                alt="company"
                                width="30"
                                height="30"
                              />
                            <span class="ms-1 d-none d-sm-inline">
                            Company</span>
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
