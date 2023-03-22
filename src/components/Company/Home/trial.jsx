import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { Button, Image } from "antd";
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
} from "@ant-design/icons";

import { ROOT_URL } from "../../../App";
import { showNotification } from "../../../util/notification";
import * as actionTypes from "../../../store/actions";
import { CustomModal, Modules } from "./styles";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});




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
          <div className="count">
            {companyDetails.totalCertificatesUploaded} /{" "}
            {companyDetails.certificateQuota}
          </div>
          <div className="label"> Certificate Limit</div>
        </div>
        <div>
          <PlusOutlined onClick={openAdminInfoModal} />
        </div>
      </div>









      <div className="corporate-info  " style={{ marginLeft: '150px' }}>
        <div className="header">

          <div>
            <Paper
              sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}
            >
              <Grid container spacing={2}>

                <Grid item>
                  <div className="title">Company Details</div>
                  <Button
                    type="primary"
                    onClick={() => navigate("?module=home&view=edit")}
                  >
                    Edit Profile <EditOutlined />
                  </Button>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1" component="div">
                        <div className="motto">{companyDetails.motto}</div>
                        <div className="sub-title">About Us</div>

                      </Typography>


                      <Typography variant="body2" gutterBottom>
                        <div className="description">{companyDetails.description}</div>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <div className="accounts">
                          {companyDetails.instagramUrl && (
                            <a href={companyDetails.instagramUrl}>
                              <InstagramFilled />
                            </a>
                          )}
                          {companyDetails.facebookUrl && (
                            <a href={companyDetails.facebookUrl}>
                              <FacebookFilled />
                            </a>
                          )}
                          {companyDetails.youtubeUrl && (
                            <a href={companyDetails.youtubeUrl}>
                              <YoutubeFilled />
                            </a>
                          )}
                          {companyDetails.twitterUrl && (
                            <a href={companyDetails.twitterUrl}>
                              <TwitterCircleFilled />
                            </a>
                          )}
                          {companyDetails.linkedinUrl && (
                            <a href={companyDetails.linkedinUrl}>
                              <LinkedinFilled />
                            </a>
                          )}

                        </div>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>

            &nbsp;&nbsp;

            <Paper
              sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 800,

                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}
            >
              <Grid container spacing={2}>
                <Grid item>


                  <ButtonBase sx={{ width: 300, height: 300 }}  >
                    <Img alt="complex" width={280} src={companyDetails.logoUrl} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1" component="div">
                        <div className="name">{companyDetails.name}</div>
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <div className="orgID">#{companyDetails.uniqueId}</div>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <div className="contactNumber">
                          <PhoneOutlined />
                          {companyDetails.contactNumber}
                        </div>
                        <div className="email">
                          <MailOutlined />
                          {companyDetails.email}
                        </div>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={{ cursor: 'pointer' }} variant="body2">
                        <div className="address">
                          <img src="/images/addressIcon.svg" alt="logo" />
                          {companyDetails.addresses?.[0]?.completeAddress},{" "}
                          {companyDetails.addresses?.[0]?.city},{" "}
                          {companyDetails.addresses?.[0]?.state}, India -{" "}
                          {companyDetails.addresses?.[0]?.pinCode}
                        </div>
                      </Typography>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
            </Paper>

          </div>









        </div></div>


      {/* <div className="title">Company Details</div>
//           <div className="edit-details">
//             <Button
//               type="primary"
//               onClick={() => navigate("?module=home&view=edit")}
//             >
//               Edit Profile <EditOutlined />
//             </Button>

//           </div>
//         </div>


//         <div className="motto">{companyDetails.motto}</div>
//         <div className="sub-title">About Us</div>
//         <div className="description">{companyDetails.description}</div>
//         <div className="accounts">
//           {companyDetails.instagramUrl && (
//             <a href={companyDetails.instagramUrl}>
//               <InstagramFilled />
//             </a>
//           )}
//           {companyDetails.facebookUrl && (
//             <a href={companyDetails.facebookUrl}>
//               <FacebookFilled />
//             </a>
//           )}
//           {companyDetails.youtubeUrl && (
//             <a href={companyDetails.youtubeUrl}>
//               <YoutubeFilled />
//             </a>
//           )}
//           {companyDetails.twitterUrl && (
//             <a href={companyDetails.twitterUrl}>
//               <TwitterCircleFilled />
//             </a>
//           )}
//           {companyDetails.linkedinUrl && (
//             <a href={companyDetails.linkedinUrl}>
//               <LinkedinFilled />
//             </a>
//           )}
//         </div>
//       </div> */}

      {/* <div className="personal-info">
        <div className="logo">
          <Image width={200} src={companyDetails.logoUrl} />
        </div>


        <div className="name">{companyDetails.name}</div>
        <div className="orgID">#{companyDetails.uniqueId}</div>
        <div className="contact">
          <div className="contactNumber">
            <PhoneOutlined />
            {companyDetails.contactNumber}
          </div>
          <div className="email">
            <MailOutlined />
            {companyDetails.email}
          </div>
          <div className="address">
            <img src="/images/addressIcon.svg" alt="logo" />
            {companyDetails.addresses?.[0]?.completeAddress},{" "}
            {companyDetails.addresses?.[0]?.city},{" "}
            {companyDetails.addresses?.[0]?.state}, India -{" "}
            {companyDetails.addresses?.[0]?.pinCode}
          </div>
        </div>
      </div> */}









      <CustomModal
        title={false}
        footer={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="contact-info">
          <div className="primary">
            Admin
          </div>
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
              {dummyAdminData.correspondent?.phoneNumber || "+91 875264724"}
            </div>
          </div>
        </div>

        <div className="img-wrapper">
          <img src="/images/admin-college-contact-info.svg" alt="logo" />
        </div>
      </CustomModal>
    </Modules>
  );
};

export default CompanyDetails;










