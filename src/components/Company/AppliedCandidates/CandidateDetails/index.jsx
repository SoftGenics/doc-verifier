import { useEffect, useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { ROOT_URL } from "../../../../App";
import * as actionTypes from "../../../../store/actions";
import { showNotification } from "../../../../util/notification";
import { Button, Image } from "antd";
import {
  IdcardFilled,
  LinkedinFilled,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CertificateList } from "./certificates";
import { CandidateInfo } from "../styles";
import { useSelector } from "react-redux";

export const CandidateDetails = () => {
  const dispatch = useDispatch();
  const BASE_URL = `${ROOT_URL}/company/application`;

  const [candidateDetails, setCandidateDetails] = useState({});
  const [applicationDetails, setApplicationDetails] = useState({});
  const [certificateList, setCertificateList] = useState([]);

  const currentCandidateData =
    useSelector((state) => state.company.current_application) || {};

  useEffect(() => {
    setCandidateDetails(currentCandidateData?.candidateDetails);
    setCertificateList(currentCandidateData?.certificates);
    setApplicationDetails(currentCandidateData?.application);
  }, []);

  const handleApplicationAccept = () => {
    Axios.put(`${BASE_URL}/assign-status`, {
      applicationId: applicationDetails.id,
      requiredStatus: "accepted",
    })
      .then((res) => {
        dispatch({
          type: actionTypes.SAVE_COMPANY_CURRENT_APPLICATION,
          current_application: res.data,
        });
        showNotification(
          "Application Updated Successfully",
          `Application Accepted Successfully`,
          "success"
        );
        const { application = {} } = res.data;
        setApplicationDetails(application);
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };

  const handleApplicationReject = () => {
    console.log(applicationDetails);
    Axios.put(`${BASE_URL}/assign-status`, {
      applicationId: applicationDetails.id,
      requiredStatus: "rejected",
    })
      .then((res) => {
        dispatch({
          type: actionTypes.SAVE_COMPANY_CURRENT_APPLICATION,
          current_application: res.data,
        });
        showNotification(
          "Application Updated Successfully",
          `Application Rejected Successfully`,
          "success"
        );
        const { application = {} } = res.data;
        setApplicationDetails(application);
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };

  return (
    <CandidateInfo>
      {/* 
<div className="header">
          <div className="title">Candidate Details</div>
        </div>
        <div className="sub-title">
          <LinkedinFilled />
          <a
            target="_blank"
            href={candidateDetails.linkedinUrl}
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <div className="sub-title">
          <IdcardFilled /> Certificates: {certificateList.length}
        </div>
        <div className="sub-title">
          <img src="/images/addressIcon.svg" alt="logo" />
          Address: {
            (candidateDetails?.addresses || [])[0]?.completeAddress
          }, {(candidateDetails?.addresses || [])[0]?.city},{" "}
          {(candidateDetails?.addresses || [])[0]?.state}, India -{" "}
          {(candidateDetails?.addresses || [])[0]?.pinCode}
        </div> */}




      <div class="container ">
        <div class="row text-center ">


          <div class="col-xl-3 col-sm-6 mb-5">
            <div class="card" style={{ width: '18rem' }}>
              <div class="card-body">
                <h5 class="card-title"><div className="header">

                  <div className="title">Candidate Details
                  </div>
                </div></h5>
                <h6 class="card-subtitle mb-2 text-muted">



                </h6>
                <h6 class="card-text mt-4 "> <div className="sub-title text-primary">
                  <LinkedinFilled />
                  <a
                    target="_blank"
                    href={candidateDetails.linkedinUrl}
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
                  <div className="sub-title mt-2 text-info">
                    <IdcardFilled /> Certificates: {certificateList.length}
                  </div>
                  <div className="sub-title mt-2 text-info">
                    <img src="/images/addressIcon.svg" alt="logo" />
                    Address: {
                      (candidateDetails?.addresses || [])[0]?.completeAddress
                    }, {(candidateDetails?.addresses || [])[0]?.city},{" "}
                    {(candidateDetails?.addresses || [])[0]?.state}, India -{" "}
                    {(candidateDetails?.addresses || [])[0]?.pinCode}
                  </div>
                </h6>

              </div>
            </div>
          </div>





          <div class="col-xl-3 col-sm-5 mb-5">
            <div class="bg-white rounded shadow-sm py-5 px-4"><img src={candidateDetails.profilePictureUrl} alt="" width="200" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
              <h5 class="mb-0">  <div className="name">{candidateDetails.name}</div></h5>
              <span class="small text-uppercase text-muted">

                <div className="contact">
                  <div className="contactNumber fs-5 text-primary">
                    <PhoneOutlined />
                    {candidateDetails.contactNumber}
                  </div>
                  <div className="email mt-2 text-dark">
                    <MailOutlined />
                    {candidateDetails.email}
                  </div>
                </div></span>


              <ul class="social mb-0 list-inline mt-5">
                <div className="btn-container">
                  {applicationDetails.status !== "accepted" && (
                    <div className="accept">
                      <Button type="primary bg-success" onClick={handleApplicationAccept}>
                        Accept
                      </Button>
                    </div>
                  )}
                  {applicationDetails.status !== "rejected" && (
                    <div className="reject mt-3 ">
                      <Button type="primary bg-danger" onClick={handleApplicationReject}>
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </ul>
            </div>
          </div>

          <div className="certificate-list">
            <CertificateList
              certificateList={certificateList}
              setCertificateList={setCertificateList}
            />
          </div>

        </div>
      </div>













      {/* <div className="corporate-info">
       
      </div> */}


      {/* <div className="personal-info">
        <div className="logo">
          <Image width={250} src={candidateDetails.profilePictureUrl} />
        </div>
        <div className="name">{candidateDetails.name}</div>
        <div className="contact">
          <div className="contactNumber">
            <PhoneOutlined />
            {candidateDetails.contactNumber}
          </div>
          <div className="email">
            <MailOutlined />
            {candidateDetails.email}
          </div>
        </div>
        <div className="btn-container">
          {applicationDetails.status !== "accepted" && (
            <div className="accept">
              <Button type="primary" onClick={handleApplicationAccept}>
                Accept
              </Button>
            </div>
          )}
          {applicationDetails.status !== "rejected" && (
            <div className="reject">
              <Button type="primary" onClick={handleApplicationReject}>
                Reject
              </Button>
            </div>
          )}
        </div>
      </div> */}




    </CandidateInfo>
  );
};

export default CandidateDetails;
