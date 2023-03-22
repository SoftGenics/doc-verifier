import { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { ROOT_URL } from "../../../../App";
import { showNotification } from "../../../../util/notification";
import { Button, Image } from "antd";
import {
  EditOutlined,
  IdcardFilled,
  LinkedinFilled,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CertificateList } from "./certificates";
import { EmployeeInfo } from "../styles";
import * as actionTypes from "../../../../store/actions";

export const EmployeeDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const BASE_URL = `${ROOT_URL}/company`;

  const currentEmployeeData =
    useSelector((state) => state.company.current_employee) || {};

  const [employeeDetails, setEmployeeDetails] = useState({});
  const [certificateList, setCertificateList] = useState([]);

  useEffect(() => {
    setEmployeeDetails(currentEmployeeData?.employeeDetail);
    setCertificateList(currentEmployeeData?.certificates);
  }, []);

  return (
    <EmployeeInfo>
<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
      <div className="corporate-info">
        <div className="header">
          <div className="title">Employee Details</div>
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
            href={employeeDetails.linkedinUrl}
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <div className="sub-title">
          <IdcardFilled /> Certificates: {certificateList?.length}
        </div>
        <div className="sub-title">
          <img src="/images/addressIcon.svg" alt="logo" />
          Address: {employeeDetails.addresses?.[0]?.completeAddress},{" "}
          {employeeDetails.addresses?.[0]?.city},{" "}
          {employeeDetails.addresses?.[0]?.state}, India -{" "}
          {employeeDetails.addresses?.[0]?.pinCode}
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
          <Image width={250} src={employeeDetails.profilePictureUrl} />
        </div>
        <div className="name">{employeeDetails.name}</div>
        <div className="orgID">#{employeeDetails.uniqueId}</div>
        <div className="contact">
          <div className="contactNumber">
            <PhoneOutlined />
            {employeeDetails.contactNumber}
          </div>
          <div className="email">
            <MailOutlined />
            {employeeDetails.email}
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</div>


      







      











      <div className="certificate-list">
        <CertificateList
          certificateList={certificateList}
          setCertificateList={setCertificateList}
          employeeId={employeeDetails?._id}
        />
      </div>
    </EmployeeInfo>
  );
};

export default EmployeeDetails;
