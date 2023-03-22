import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { Button, Image } from "antd";
// import FacebookIcon from '@mui/icons-material/Facebook';
import {
  TwitterSquareFilled,
  StarFilled,
  StarTwoTone,
} from "@ant-design/icons";
import {
  EditOutlined,
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  TwitterCircleFilled,
  UserOutlined,
  YoutubeFilled,
  InstagramOutlined,
} from "@ant-design/icons";

import { ROOT_URL } from "../../../App";
import { showNotification } from "../../../util/notification";
import * as actionTypes from "../../../store/actions";
import { CustomModal, Modules } from "./styles";

const dummyAdminData = {
  name: "John Doe",
  email: "john-doe@gmail.com",
  phone: "+91 9489762891",
};

export const CompanyDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = `${ROOT_URL}/company`;

  const [companyDetails, setCompanyDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCompanyDetails = () => {
    Axios.get(`${BASE_URL}/dashboard`, {})
      .then((res) => {
        setCompanyDetails(res.data);
        dispatch({
          type: actionTypes.SAVE_COMPANY_DETAILS,
          company_details: res.data,
        });
        showNotification(
          "Stats Success",
          "Details Fetched successfully",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };

  const getCertBracket = (ratio) => {
    if (ratio <= 0.5) {
      return "";
    } else if (ratio <= 0.75) {
      return "warning";
    } else {
      return "critical";
    }
  };

  const openAdminInfoModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  return (
    <Modules>
      <div
        className={
          `cert-count ` +
          getCertBracket(
            companyDetails.totalCertificatesUploaded /
              companyDetails.certificateQuota
          )
        }
      >
        <div>
          {" "}
          <div className="count ">
            {companyDetails.totalCertificatesUploaded} /{" "}
            {companyDetails.certificateQuota}
          </div>
          <div className="label"> Certificate Limit</div>
        </div>
        <div>
          <PlusOutlined onClick={openAdminInfoModal} />
        </div>
      </div>
      <div
        class="row"
        style={{ marginTop: "5%", justifyContent: "center", display: "flex" }}
      >
        <div class="col-sm-5 mb-2">
          <div class="card">
            <div class="card-body">
              <h4 class="card-header">Company Details</h4>
              <div class="card-body text-primary">
                <div className="edit-details">
                  <Button
                    type="primary"
                    onClick={() => navigate("?module=home&view=edit")}
                  >
                    Edit Profile <EditOutlined />
                  </Button>
                </div>

                <div className="header">
                  <div className="motto fs-4">{companyDetails.motto}</div>
                </div>

                <h3 className="sub-title">About Us</h3>
                <div className="description fs-4">
                  {companyDetails.description}
                </div>
              </div>
              {/* {companyDetails.instagramUrl && (
                  <a href={companyDetails.instagramUrl}>
                   <InstagramOutlined />
                  </a>
                )}
                {companyDetails.facebookUrl && (
                  <a href={companyDetails.facebookUrl}>
                    <FacebookIcon />
                  </a>
                )}
                {companyDetails.youtubeUrl && (
                  <a href={companyDetails.youtubeUrl}>
                    <YoutubeFilled />
                  </a>
                )}
                {companyDetails.twitterUrl && (
                  <a href={companyDetails.twitterUrl}>
                  <TwitterSquareFilled /> 
                  </a>
                )} */}

              <div class="list-inline">
                <li class="list-inline-item">
                  <div className="accounts">
                    {companyDetails.linkedinUrl && (
                      <a href={companyDetails.linkedinUrl}>
                        <TwitterSquareFilled />
                      </a>
                    )}
                  </div>
                </li>
                <li class="list-inline-item" style={{ color: "blue" }}>
                  <a href={companyDetails.facebookUrl}>
                    <FacebookFilled />
                  </a>
                </li>
                <li class="list-inline-item" style={{ color: "red" }}>
                  <a href={companyDetails.youtubeUrl}>
                    <YoutubeFilled />
                  </a>
                </li>
                <li class="list-inline-item " style={{ color: "blue" }}>
                  <a href={companyDetails.twitterUrl}>
                    <InstagramOutlined />
                  </a>
                </li>
              </div>
            </div>
          </div>
        </div>
        &nbsp;&nbsp;
        <div class="col-sm-5 ">
          <div
            class="card "
            style={{
              width: "17rem",
              justifyContent: "center",
              display: "flex",
              textAlign: "center",
            }}
          >
            <div className="logo mt-4 ">
              <Image width={210} src={companyDetails.logoUrl} />
            </div>
            <div class="card-body">
              <h5 class="card-title">
                {" "}
                <div className="name">{companyDetails.name}</div>
              </h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                {" "}
                <div className="orgID fs-6 text-success">
                  #{companyDetails.uniqueId}
                </div>
              </li>
              <li class="list-group-item">
                <div className="contact">
                  <div className="contactNumber fs-6 text-primary">
                    <PhoneOutlined />
                    {companyDetails.contactNumber}
                  </div>{" "}
                </div>
              </li>

              <li class="list-group-item">
                <a href="#" class="card-link">
                  <div className="email">
                    <MailOutlined />
                    {companyDetails.email}
                  </div>
                </a>
              </li>

              <li class="list-group-item">
                <div className="address">
                  <img src="/images/addressIcon.svg" alt="logo" />
                  {companyDetails.addresses?.[0]?.completeAddress},{" "}
                  {companyDetails.addresses?.[0]?.city},{" "}
                  {companyDetails.addresses?.[0]?.state}, India -{" "}
                  {companyDetails.addresses?.[0]?.pinCode}
                </div>
              </li>
            </ul>

            <div class="card-body">
              <CustomModal
                title={false}
                footer={false}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <div className="contact-info">
                  <div className="primary">Admin</div>
                  <div className="secondary">
                    <div>
                      <UserOutlined />
                      {dummyAdminData.correspondent?.name || "John"}
                    </div>
                    <div>
                      <MailOutlined />
                      {dummyAdminData.correspondent?.email || "Johnsingh@iitk"}
                    </div>
                    <div>
                      <PhoneOutlined />
                      {dummyAdminData.correspondent?.phoneNumber ||
                        "+91 875264724"}
                    </div>
                  </div>
                </div>
              </CustomModal>
            </div>
          </div>
        </div>
      </div>
    </Modules>
  );
};

export default CompanyDetails;
