import { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { ROOT_URL } from "../../../App";
// import { showNotification } from "../../../../util/notification";
import { Button, Image } from "antd";
import {
  EditOutlined,
  IdcardFilled,
  LinkedinFilled,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import { CertificateList } from "./certificates";
import { EmployeeInfo } from "../Student/styles";
// import CertificateList from "./Studentcertificate/certificates";
// import CoursesList from "./Studentcertificate/courses";
import * as actionTypes from "../../../../src/store/actions";
import CertificatesLst from "./Certificate";
import CoursesLst from "./Courses";

export const Studentinfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const BASE_URL = `${ROOT_URL}/`;

  const currentEmployeeData =
    useSelector((state) => state.company.current_employee) || {};

  const [employeeDetails, setEmployeeDetails] = useState({});
  const [certificateList, setCertificateList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    setEmployeeDetails(currentEmployeeData?.employeeDetail);
    setCertificateList(currentEmployeeData?.certificates);
    setCoursesList(currentEmployeeData?.certificates);
  }, []);

  return (
    <EmployeeInfo>
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <div className="corporate-info">
                <div className="header">
                  <div className="title">Student Details</div>
                  <div className="edit-details">
                    <Button
                      type="primary"
                      onClick={() => navigate("?module=employee&view=edit")}
                    >
                      Edit Details <EditOutlined />
                    </Button>
                  </div>
                </div>
                <div className="sub-title">
                  <LinkedinFilled />
                  <a
                    target="_blank"
                    // href={employeeDetails.linkedinUrl}
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
                <div className="sub-title">
                  {/* <IdcardFilled /> Certificates: {certificateList?.length} */}
                </div>
                <div className="sub-title">
                  <img src="/images/addressIcon.svg" alt="logo" />
                  Address:
                  {/* {employeeDetails.addresses?.[0]?.completeAddress},{" "}
          {employeeDetails.addresses?.[0]?.city},{" "}
          {employeeDetails.addresses?.[0]?.state}, India -{" "}
          {employeeDetails.addresses?.[0]?.pinCode} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <div className="personal-info">
                <div className="logo">
                  <Image
                    width={150}
                    src="/images/R.png"
                  // src={employeeDetails.profilePictureUrl}
                  />
                </div>
                <div className="name">
                  Student card
                  {/* {employeeDetails.name} */}
                </div>
                <div className="orgID">
                  uniqueId: #125878934
                  {/* #{employeeDetails.uniqueId} */}
                </div>
                <div className="contact">
                  <div className="contactNumber">
                    Phoneno
                    <PhoneOutlined />
                    123456789
                    {/* {employeeDetails.contactNumber} */}
                  </div>
                  <div className="email">
                    <MailOutlined />
                    abc@gmail.com
                    {/* {employeeDetails.email} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <br></br><br></br>
      <div className="certificate-list">
        <CertificatesLst
          certificateList={certificateList}
          setCertificateList={setCertificateList}
          employeeId={employeeDetails?._id}
        />
      </div>


      &nbsp;&nbsp;&nbsp;

      {/* <br></br><br></br> */}

      <div className="">
        <CoursesLst
          CoursesList={coursesList}
          setCoursesList={setCoursesList}
        // employeeId={employeeDetails?._id}
        />


        <br></br><br></br><br></br><br></br><br></br>
      </div>







    </EmployeeInfo>
  );
};

export default Studentinfo;
