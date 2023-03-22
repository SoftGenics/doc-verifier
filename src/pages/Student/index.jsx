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
import EmployeeList from "../../components/Company/Employee/list";
import EmployeeDetails from "../../components/Company/Employee/EmployeeDetails";
// import Studentdetails from "../../components/Student/Home/studentdetails";
import Timeline from "../../components/Student/Timeline/timeline";
import Timelines from "../../components/Student/Timeline/timeline";
import Studentcompany from "../../components/Student/Company/Studentcompany";
import { Academics } from "../../components/Student/Documents/Academics";
import { Carrierskillcertificate } from "../../components/Student/Documents/Carrierskills";
import { Lifeskillcertificate } from "../../components/Student/Documents/Lifeskill";
import { Miscellaneouscertificate } from "../../components/Student/Documents/Miscellaneous";
import AddDocs from "../../components/Student/Documents/Adddocs";
import Certificatesss from "../../components/Student/Documents";
import StudentHome from "../../components/Student/Home";
// import Sidebar from "../Admin/Home/Sidebar";

const Home = () => {
  const BASE_URL = `${ROOT_URL}/student`;

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

  const handleDocumentNavigation = (key) => {
    navigate(`?module=${key}&view=list`);
    setActiveKey(key);
  };

  const renderComponent = () => {
    switch (activeKey) {
      // case "home":
      //   return <Studentdetails />;

      

      case "home":
        return <StudentHome />;


      case "Timeline":
        return <Timelines />;

      case "employee":
        return <Employees />;
      case "external":
        return <Studentcompany />;

      case "academics":
        return <Academics />;

      case "Carrier":
        return <Certificatesss />;

      case "lifeskill":
        return <Lifeskillcertificate />;

      case "miscellaneous":
        return <Miscellaneouscertificate />;

      case "adddocuments":
        return <AddDocs />;

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
                    👋 STUDENTS
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
                            onClick={() => handleDocumentNavigation("home")}
                          >
                            <img
                              src="/images/homeicon.svg"
                              alt="home"
                              width="30"
                              height="30"
                            />{" "}
                            <span class="ms-1 d-none d-sm-inline">Home</span>
                          </a>
                        </li>
                      </SiderTabs>
                      <SiderTabs>
                        <li class="nav-item">
                          <a
                            href="#"
                            class="nav-link px-0 text-dark fw-bold"
                            isActive={activeKey === "Timeline"}
                            onClick={() => handleDocumentNavigation("Timeline")}
                          >
                            <img
                              src="/images/company.svg"
                              alt="applied"
                              width="30"
                              height="30"
                            />
                            <span class="ms-1 d-none d-sm-inline">
                              Timeline
                            </span>
                          </a>
                        </li>
                      </SiderTabs>




                      <li class="active">
                        <a
                          href="#homeSubmenu"

                          class="nav-link px-0 text-dark fw-bold dropdown-toggle"
                          // isActive={activeKey === "company"}
                          // onClick={() => handleDocumentNavigation("company")}
                          data-toggle="collapse"
                          aria-expanded="false"

                        >
                          <img
                            src="/images/CERTIFICATECONS.svg"
                            alt="company"
                            width="30"
                            height="30"
                          />
                          <span class="ms-1 d-none d-sm-inline">
                            Certificates
                          </span>

                        </a>

                        <ul class="collapse list-unstyled  p-1" id="homeSubmenu">


                          <SiderTabs style={{ margin: "10px" }}>
                            <li>
                              <a href="#"
                                class="nav-link px-0 text-dark fw-bold "
                                isActive={activeKey === "applied"}
                                onClick={() =>
                                  handleDocumentNavigation("academics")
                                }

                              >
                                <img
                                src="/images/company-applied.svg"
                                  alt="company"
                                  width="25"
                                  height="23"
                                />
                                <span class="ms-1 d-none d-sm-inline p-2 fy-2" style={{ color: "black" }}>
                                  Academics
                                </span>
                              </a>
                            </li>
                          </SiderTabs>
                          <SiderTabs style={{ margin: "10px" }}>
                            <li>
                              <a href="#"
                                class="nav-link px-0 text-dark fw-bold "
                                isActive={activeKey === "Carrier"}
                            onClick={() => handleDocumentNavigation("Carrier")}
                              >
                                <img
                                 src="/images/aaa.svg"
                                  alt="company"
                                  width="25"
                                  height="23"
                                />
                                <span class="ms-1 d-none d-sm-inline p-2 " style={{ color: "black" }}>
                                Carrier
                                </span></a>
                            </li>
                          </SiderTabs>
                          <SiderTabs style={{ margin: "10px" }}>
                            <li>
                              <a href="#"
                                class="nav-link px-0 text-dark fw-bold "

                                isActive={activeKey === "applied"}
                                onClick={() =>
                                  handleDocumentNavigation("lifeskill")

                               }
                              >
                                <img
                                  src="/images/aaaa.svg"
                                  alt="company"
                                  width="25"
                                  height="23"
                                />
                                <span class="ms-1 d-none d-sm-inline p-2" style={{ color: "black" }}>
                                Life Skills
                                </span></a>
                            </li>
                          </SiderTabs>


                          <SiderTabs style={{ margin: "10px" }}>
                            <li>
                              <a href="#"
                                class="nav-link px-0 text-dark fw-bold "
                                isActive={activeKey === "miscellaneous"}
                            onClick={() =>
                              handleDocumentNavigation("miscellaneous")
                            }
                              >
                                <img
                                  src="/images/aaaaa.svg"
                                  alt="company"
                                  width="25"
                                  height="23"
                                />
                                <span class="ms-1 d-none d-sm-inline p-2" style={{ color: "black" }}>
                                Miscellaneous
                                </span></a>
                            </li>
                          </SiderTabs>

                          <SiderTabs  style={{ margin: "10px" }}>
                        <li class="nav-item">
                          <a
                            href="#"
                            class="nav-link px-0 text-dark fw-bold"
                            isActive={activeKey === "adddocuments"}
                            onClick={() => handleDocumentNavigation("adddocuments")}
                          >
                            <img
                              src="/images/aaaaaa.svg"
                              alt="applied"
                              width="25"
                              height="23"
                            />
                            <span class="ms-1 d-none d-sm-inline">Add Doc</span>
                          </a>
                        </li>
                      </SiderTabs>

                          </ul>
                      </li>




                      {/* 
                      <SiderTabs>
                        <li class="nav-item">
                          <a
                            href="#"
                            class="nav-link px-0 text-dark fw-bold"
                            isActive={activeKey === "applied"}
                            onClick={() => handleDocumentNavigation("applied")}
                          >
                            <img
                              src="/images/a.svg"
                              alt="applied"
                              width="30"
                              height="30"
                            />
                            <span class="ms-1 d-none d-sm-inline">
                              Documents
                            </span>
                          </a>
                        </li>
                      </SiderTabs> */}

                      {/* <SiderTabs>
                        <li class="nav-item">
                          <a
                            href="#"
                            class="nav-link px-0 text-dark fw-bold"
                            isActive={activeKey === "applied"}
                            onClick={() =>
                              handleDocumentNavigation("academics")
                            }
                          >
                            <img
                              src="/images/company-applied.svg"
                              alt="applied"
                              width="30"
                              height="30"
                            />
                            <span class="ms-1 d-none d-sm-inline">
                              Academics
                            </span>
                          </a>
                        </li>
                      </SiderTabs>

                      <SiderTabs>
                        <li class="nav-item">
                          <a
                            href="#"
                            class="nav-link px-0 text-dark fw-bold"
                            isActive={activeKey === "Carrier"}
                            onClick={() => handleDocumentNavigation("Carrier")}
                          >
                            <img src="/images/aaa.svg" alt="applied"  width="30"
                              height="30"/>
                            <span class="ms-1 d-none d-sm-inline">
                              Carrier Skills
                            </span>
                          </a>
                        </li>
                      </SiderTabs>

                      <SiderTabs>
                        <li class="nav-item">
                          <a
                            href="#"
                            class="nav-link px-0 text-dark fw-bold"
                            isActive={activeKey === "applied"}
                            onClick={() =>
                              handleDocumentNavigation("lifeskill")
                            }
                          >
                            <img
                              src="/images/aaaa.svg"
                              alt="applied"
                              width="30"
                              height="30"
                            />
                            <span class="ms-1 d-none d-sm-inline">
                              Life Skills
                            </span>
                          </a>
                        </li>
                      </SiderTabs>

                      <SiderTabs>
                        <li class="nav-item">
                          <a
                            href="#"
                            class="nav-link px-0 text-dark fw-bold"
                            isActive={activeKey === "miscellaneous"}
                            onClick={() =>
                              handleDocumentNavigation("miscellaneous")
                            }
                          >
                            <img src="/images/aaaaa.svg" alt="miscellaneous" width="30"
                              height="30" />
                            <span class="ms-1 d-none d-sm-inline">
                              Miscellaneous
                            </span>
                          </a>
                        </li>
                      </SiderTabs> */}

                     

                      <SiderTabs>
                        <li class="nav-item">
                          <a
                            href="#"
                            class="nav-link px-0 text-dark fw-bold"
                            isActive={activeKey === "external"}
                            onClick={() => handleDocumentNavigation("external")}
                          >
                            <img
                              src="/images/company.svg"
                              alt="external"
                              width="30"
                              height="30"
                            />
                            <span class="ms-1 d-none d-sm-inline">
                              {" "}
                              Company
                            </span>
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
