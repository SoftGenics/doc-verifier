// //  import { ROOT_URL } from "../../../App";
//  import { useNavigate } from "react-router-dom";
//  import { useDispatch } from "react-redux";

// import { ROOT_URL } from "../../../App";
// import { CustomModal, Modules } from "./styles";

// export const Studentcompany = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const BASE_URL = `${ROOT_URL}/studentcompany`;

//   <Modules>

// <div class="row">
//   <div class="col-sm-6">
//     <div class="card">
//       <div class="card-body">
//         <h5 class="card-title">Special title treatment</h5>
//         <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
//         <a href="#" class="btn btn-primary">Go somewhere</a>
//       </div>
//     </div>
//   </div>
//   <div class="col-sm-6">
//     <div class="card">
//       <div class="card-body">
//         <h5 class="card-title">Special title treatment</h5>
//         <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
//         <a href="#" class="btn btn-primary">Go somewhere</a>
//       </div>
//     </div>
//   </div>
// </div>

// </Modules>

// };

// export default Studentcompany;

import * as React from "react";
import Box from "@mui/material/Box";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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
  // name: "Tagline will be written here",
  // email: "john-doe@gmail.com",
  // phone: "+91 9489762891",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Studentcompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = `${ROOT_URL}/studentcompany`;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [companyDetails, setCompanyDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCompanyDetails = () => {
    // Axios.get(`${BASE_URL}/studentdashboard`, {})
    //   .then((res) => {
    //     setCompanyDetails(res.data);
    //     dispatch({
    //       type: actionTypes.SAVE_COMPANY_DETAILS,
    //       company_details: res.data,
    //     });
    //     showNotification(
    //       "Stats Success",
    //       "Details Fetched successfully",
    //       "success"
    //     );
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // showNotification("Server Error", "Internal Server Error", "error");
    //   });
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
        className="row"
        style={{ marginTop: "5%", justifyContent: "center", display: "flex" }}
      >
        <div className="col-sm-5 mb-2">
          <div className="card">
            <div className="card-body">
              <h4 className="card-header">Company Details</h4>
              <div className="card-body text-primary">
                <div classNameName="edit-details">
                  {/* <Button
                    type="primary"
                    onClick={(handleOpen) => navigate("?module=home&view=edit")}
                  >
                    Apply <EditOutlined />
                  </Button> */}
                  <Button type="primary" onClick={handleOpen}>
                    Apply{" "}
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title contact-info"
                    aria-describedby="modal-modal-description "
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title mb-4 "
                        variant="h6"
                        component="h2"
                      >
                        Are you sure you want to apply
                      </Typography>
                     
                      <Button
                        type="primary mt-4"
                        onClick={() => navigate("?module=home&view=edit")}
                      >
                        yes{" "}
                      </Button>
                    </Box>
                  </Modal>
                </div>
              
                <div classNameName="header mb-5">

                Tagline will be written here
                  {/* <div classNameName="motto fs-4">{companyDetails.motto}</div> */}
                </div>
                <h3 classNameName="sub-title">About Us</h3>
                <div classNameName="description fs-2">
                  A problem isn't truly solved until it's solved for all.
                  Googlers build products that help create opportunities for
                  everyone, whether down the street or across the globe. Bring
                  your insight, imagination and a healthy disregard for the
                  impossible. Bring everything that makes you unique. Together,
                  we can build for everyone.
                  {/* {companyDetails.description} */}
                </div>
              </div>

              <div className="list-inline">
                <li className="list-inline-item">
                  {/* <div classNameName="accounts">
                    
                  </div> */}
                  <li className="list-inline-item" style={{ color: "blue" }}>
                    {/* <a href={companyDetails.facebookUrl}> */}
                    <TwitterSquareFilled />
                    {/* </a> */}
                  </li>
                  <li className="list-inline-item" style={{ color: "blue" }}>
                    {/* <a href={companyDetails.facebookUrl}> */}
                    <LinkedinFilled />
                    {/* </a> */}
                  </li>
                  {/* {companyDetails.linkedinUrl && (
                      <a href={companyDetails.linkedinUrl}>
                        <TwitterCircleFilled />
                      </a>
                    )} */}
                </li>
                <li className="list-inline-item" style={{ color: "blue" }}>
                  {/* <a href={companyDetails.facebookUrl}> */}
                  <FacebookFilled />
                  {/* </a> */}
                </li>
                <li className="list-inline-item" style={{ color: "red" }}>
                  <a href={companyDetails.youtubeUrl}>
                    <YoutubeFilled />
                  </a>
                </li>
                <li className="list-inline-item " style={{ color: "orange" }}>
                  <a href={companyDetails.twitterUrl}>
                    <InstagramOutlined />
                  </a>
                </li>
              </div>
            </div>
          </div>
        </div>


        &nbsp;&nbsp;
        <div className="col-sm-5 col-lg-6 ">
          <div
            className="card "
            style={{
              width: "22rem",
              justifyContent: "center",
              display: "flex",
              textAlign: "center",
            }}
          >
            <div classNameName="logo mt-4 ">
              {/* <Image width={210} src={companyDetails.logoUrl} /> */}

              <img width={210} src="/images/eee.png" alt="logo" />
            </div>
            <div className="card-body">
              <h5 className="card-title">
                {" "}
                <div classNameName="name">
                  Google
                  {/* {companyDetails.name} */}
                </div>
              </h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                {" "}
                <div classNameName="orgID fs-6 text-success">
                  {/* #{companyDetails.uniqueId} */}
                  #123456
                </div>
              </li>

              <li className="list-group-item">
                <a href="#" className="card-link">
                  <div classNameName="email p-4">
                    <MailOutlined />
                    &nbsp; docverifier@gmail.com
                    {/* {companyDetails.email} */}
                  </div>
                </a>
              </li>

              <li className="list-group-item">
                <div classNameName="address">
                  <img src="/images/addressIcon.svg" alt="logo" /> &nbsp;
                  Headquarter
                  {/* {companyDetails.addresses?.[0]?.completeAddress},{" "}
                  {companyDetails.addresses?.[0]?.city},{" "}
                  {companyDetails.addresses?.[0]?.state}, India -{" "}
                  {companyDetails.addresses?.[0]?.pinCode} */}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Modules>
  );
};

export default Studentcompany;

// Company Details
// Apply
// Tagline will be written here

// About Us
// A problem isn't truly solved until it's solved for all. Googlers build products that help create opportunities for everyone, whether down the street or across the globe. Bring your insight, imagination and a healthy disregard for the impossible. Bring everything that makes you unique. Together, we can build for everyone.
