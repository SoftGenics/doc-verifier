import { Modal } from "antd";
import styled from "styled-components";







export const Employees = styled.div`
  position: absolute;
  width: 92%;
  height:100%;
  left: 5%;
  // top: 15%;
overflow:auto;
  background: #ffffff;
  border: 1px solid #d1d1d1;
  border-radius: 12px;
  padding: 2rem 2rem 0;

  .ant-table {
    font-size: 1rem;

    .anticon:hover {
      cursor: pointer;
    }
    .anticon-delete {
      margin-right: 1rem;
      color: red;
    }
    .anticon-folder-view {
      margin-right: 1rem;
      color: #7ba0ff;
    }
    .cert-status {
      display: flex;
      align-items: center;

      .node {
        width: 10px;
        margin: 0 0.5rem;
        height: 10px;
        border-radius: 50%;
      }
      .p-node {
        background: #ded507;
      }
      .s-node {
        background: #4d9a00;
      }
      .f-node {
        background: #ff5656;
      }
    }
  }
`;

export const Certificates = styled.div`
  // position: absolute;
  width: 93%;
  // left: 22%;
  top: 75%;
overflow:auto;
  background: #ffffff;
  border: 1px solid #d1d1d1;
  border-radius: 12px;
  padding: 2rem 2rem 0;

  .ant-table {
    font-size: 1rem;

    .anticon:hover {
      cursor: pointer;
    }
    .anticon-check-circle {
      margin-right: 1rem;
      color: green;
    }
    .anticon-close-circle {
      margin-right: 1rem;
      color: red;
    }
    .anticon-folder-view {
      margin-right: 1rem;
      color: #7ba0ff;
    }
    .grey-out {
      color: gray;
    }
    .cert-status {
      display: flex;
      align-items: center;

      .node {
        width: 10px;
        margin: 0 0.5rem;
        height: 10px;
        border-radius: 50%;
      }
      .p-node {
        background: #ded507;
      }
      .s-node {
        background: #4d9a00;
      }
      .f-node {
        background: #ff5656;
      }
    }
  }
`;

export const CustomModal = styled(Modal)`
  top: 10%;

  .ant-modal-content {
    background: radial-gradient(
      100% 359.18% at 0% 0%,
      #7da1fd 0%,
      rgba(255, 255, 255) 100%
    );
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);

    border-radius: 15px;
    .ant-modal-body {
      padding: 3rem;
      .img-wrapper {
        width: 800px;
        object {
          width: 1100px;
          height: 700px;
        }
      }
    }
  }
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: middle;
  justify-content: space-between;
  margin: 0.5rem 0 2rem;
  .title {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 130%;
    line-height: 24px;

    color: #7ca1fc;
  }
  .ant-btn {
    height: 30px;
    width: 100%;
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 100%;
    line-height: 27px;

    color: #ffffff;
    background: #7ba0ff;
    border-radius: 7px;
    padding: 0 0.5rem;
    margin-top: -0.5rem;
    .anticon {
      color: #ffffff;
      margin: 0;
    }
  }
`;

export const EmployeeInfo = styled.div`
  margin-bottom: 20rem;
  .corporate-info {
    // position: absolute;
    // width: 100%;
    // left: 22%;
    // top: 15%;

    background: #ffffff;
    border-radius: 10px;
    padding: 1.5rem 4rem;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 2rem 0;
      .title {
        font-family: "Nunito Sans";
        font-style: normal;
        font-weight: 500;
        font-size: 36px;
        line-height: 49px;

        color: #5d8df6;
      }
      .ant-btn {
        height: 36px;
        width: 120px;
        font-family: "Open Sans";
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 27px;
        border-radius: 5px;

        color: #ffffff;
        background: #7ba0ff;
        &:hover {
          box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
        }
      }
    }

    .sub-title {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 30px;
      margin: 0 0 1.5rem 0;

      svg {
        color: #7da1fd;
        font-size: 25px;
        margin-right: 1rem;
      }
      img {
        margin-right: 1rem;
      }
      align-items: center;
      display: flex;
    }
  }
  .personal-info {
    // position: absolute;
    // justify-content: center;
    // width: 50%;
    // left: 65%;
    // top: 15%;

    background: #ffffff;
    border-radius: 10px;
    padding: 1rem 4rem;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        border-radius: 50%;
      }
    }
    .name {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 700;
      font-size: 25px;
      line-height: 38px;
      margin: 1rem 0;

      color: #7da1fd;
    }
    .orgID {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 300;
      font-size: 20px;
      line-height: 27px;
      margin: 0 0 1rem 0;

      color: #272727;
    }
    .contact {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 30px;
    }
    .anticon-phone,
    .anticon-mail {
      margin: 0 1rem 1rem 0;
      color: #7ca1fc;
    }
    .anticon-phone {
      transform: scaleX(-1);
    }
    .btn-container {
      display: flex;
      align-items: center;
      .ant-btn {
        height: 30px;
        width: 100%;
        font-family: "Open Sans";
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 27px;

        color: #ffffff;
        border-radius: 7px;
        padding: 0 0.5rem;
        margin: 2rem;
      }
      .ant-btn:hover {
        box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
      }
      .accept .ant-btn {
        background: #4d9a00ee;
      }
      .reject .ant-btn {
        background: #ff5656ee;
      }
      div {
        margin: 0 1.5rem;
      }
    }
  }
`;

export const CertificateForm = styled.div`
  // position: absolute;
  // width: 70%;
  left: 25%;
  top: 15%;
  padding: 2rem;

  background: #ffffff;
  border: 1px solid #d1d1d1;
  border-radius: 12px;

  .form-title {
    margin-bottom: 2rem;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 24px;

    color: #7ca1fc;
  }
  .cert-upload {
    label {
      margin: 130px 0;
    }
    .ant-upload-list-picture-card-container,
    .ant-upload {
      width: 500px;
      height: 300px;
    }
    .ant-upload-list-item-actions {
      a {
        pointer-events: initial !important;
        opacity: 1 !important;
      }
    }
  }
  .submit-btn {
    .ant-btn {
      position: absolute;
      height: 56px;
      width: 100%;
      font-family: "Open Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 27px;

      color: #ffffff;
      background: #7ba0ff;
    }
  }
`;












export const EmployeeForm = styled.div`
  position: absolute;
  width: 92%;
  left: 5%;
  // top: 15%;
  padding: 2rem;

  background: #ffffff;
  border: 1px solid #d1d1d1;
  border-radius: 12px;

  .form-title {
    margin-bottom: 2rem;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 24px;

    color: #7ca1fc;
  }

  .address-section {
    border: 1px solid gray;
    padding: 1rem;
    border-radius: 20px;
    margin-bottom: 1rem;
    .address-title {
      margin-bottom: 0.5rem;
      font-family: "Poppins";
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;

      color: #7ca1fc;
      .anticon-minus-circle {
        margin-left: 1rem;
        color: red;
        margin-top: 0.25rem;
      }
    }
  }
  .submit-btn {
    .ant-btn {
      position: absolute;
      height: 56px;
      width: 100%;
      font-family: "Open Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 27px;

      color: #ffffff;
      background: #7ba0ff;
    }
  }
`;

export const Ellipsis = styled.span`
  width: ${(props) => {
    if (props.width) {
      return `${props.width}px`;
    }

    if (props.blockWidth || Number.isInteger(props.blockWidth)) {
      return `calc(100% - ${props.blockWidth}px)`;
    }
    return "calc(100% - 10px)";
  }};

  max-width: ${(props) => {
    if (props.maxWidth) {
      return `${props.maxWidth}px`;
    }
    return "initial";
  }};

  display: ${(props) => {
    if (props.isBlock) {
      return "block";
    }
    return "inline-block";
  }};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: ${(props) => props.cursor || "help"};
  vertical-align: ${(props) => props.verticalAlign || "initial"};
`;













// import { Modal } from "antd";
// import styled from "styled-components";

// export const Employees = styled.div`
//   position: absolute;
//   width: 92%;
//   left: 5%;
//   // top: 15%;
// overflow:auto;
//   background: #ffffff;
//   border: 1px solid #d1d1d1;
//   border-radius: 12px;
//   padding: 2rem 2rem 0;

//   .ant-table {
//     font-size: 1rem;

//     .anticon:hover {
//       cursor: pointer;
//     }
//     .anticon-delete {
//       margin-right: 1rem;
//       color: red;
//     }
//     .anticon-folder-view {
//       margin-right: 1rem;
//       color: #7ba0ff;
//     }
//     .cert-status {
//       display: flex;
//       align-items: center;

//       .node {
//         width: 10px;
//         margin: 0 0.5rem;
//         height: 10px;
//         border-radius: 50%;
//       }
//       .p-node {
//         background: #ded507;
//       }
//       .s-node {
//         background: #4d9a00;
//       }
//       .f-node {
//         background: #ff5656;
//       }
//     }
//   }
// `;

// export const Certificates = styled.div`
//   position: absolute;
//   width: 93%;
//   // left: 22%;
//   top: 75%;
// overflow:auto;
//   background: #ffffff;
//   border: 1px solid #d1d1d1;
//   border-radius: 12px;
//   padding: 2rem 2rem 0;

//   .ant-table {
//     font-size: 1rem;

//     .anticon:hover {
//       cursor: pointer;
//     }
//     .anticon-check-circle {
//       margin-right: 1rem;
//       color: green;
//     }
//     .anticon-close-circle {
//       margin-right: 1rem;
//       color: red;
//     }
//     .anticon-folder-view {
//       margin-right: 1rem;
//       color: #7ba0ff;
//     }
//     .grey-out {
//       color: gray;
//     }
//     .cert-status {
//       display: flex;
//       align-items: center;

//       .node {
//         width: 10px;
//         margin: 0 0.5rem;
//         height: 10px;
//         border-radius: 50%;
//       }
//       .p-node {
//         background: #ded507;
//       }
//       .s-node {
//         background: #4d9a00;
//       }
//       .f-node {
//         background: #ff5656;
//       }
//     }
//   }
// `;

// export const CustomModal = styled(Modal)`
//   top: 10%;

//   .ant-modal-content {
//     background: radial-gradient(
//       100% 359.18% at 0% 0%,
//       #7da1fd 0%,
//       rgba(255, 255, 255) 100%
//     );
//     box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);

//     border-radius: 15px;
//     .ant-modal-body {
//       padding: 3rem;
//       .img-wrapper {
//         width: 800px;
//         object {
//           width: 1100px;
//           height: 700px;
//         }
//       }
//     }
//   }
// `;

// export const TableHeader = styled.div`
//   display: flex;
//   align-items: middle;
//   justify-content: space-between;
//   margin: 0.5rem 0 2rem;
//   .title {
//     font-family: "Poppins";
//     font-style: normal;
//     font-weight: 700;
//     font-size: 130%;
//     line-height: 24px;

//     color: #7ca1fc;
//   }
//   .ant-btn {
//     height: 30px;
//     width: 100%;
//     font-family: "Open Sans";
//     font-style: normal;
//     font-weight: 400;
//     font-size: 100%;
//     line-height: 27px;

//     color: #ffffff;
//     background: #7ba0ff;
//     border-radius: 7px;
//     padding: 0 0.5rem;
//     margin-top: -0.5rem;
//     .anticon {
//       color: #ffffff;
//       margin: 0;
//     }
//   }
// `;

// export const EmployeeInfo = styled.div`
//   margin-bottom: 20rem;
//   .corporate-info {
//     // position: absolute;
//     // width: 100%;
//     // left: 22%;
//     // top: 15%;

//     background: #ffffff;
//     border-radius: 10px;
//     padding: 1.5rem 4rem;

//     .header {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       margin: 0 0 2rem 0;
//       .title {
//         font-family: "Nunito Sans";
//         font-style: normal;
//         font-weight: 500;
//         font-size: 36px;
//         line-height: 49px;

//         color: #5d8df6;
//       }
//       .ant-btn {
//         height: 36px;
//         width: 120px;
//         font-family: "Open Sans";
//         font-style: normal;
//         font-weight: 400;
//         font-size: 15px;
//         line-height: 27px;
//         border-radius: 5px;

//         color: #ffffff;
//         background: #7ba0ff;
//         &:hover {
//           box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
//         }
//       }
//     }

//     .sub-title {
//       font-family: "Poppins";
//       font-style: normal;
//       font-weight: 600;
//       font-size: 20px;
//       line-height: 30px;
//       margin: 0 0 1.5rem 0;

//       svg {
//         color: #7da1fd;
//         font-size: 25px;
//         margin-right: 1rem;
//       }
//       img {
//         margin-right: 1rem;
//       }
//       align-items: center;
//       display: flex;
//     }
//   }
//   .personal-info {
//     // position: absolute;
//     // justify-content: center;
//     // width: 50%;
//     // left: 65%;
//     // top: 15%;

//     background: #ffffff;
//     border-radius: 10px;
//     padding: 1rem 4rem;

//     .logo {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       img {
//         border-radius: 50%;
//       }
//     }
//     .name {
//       font-family: "Poppins";
//       font-style: normal;
//       font-weight: 700;
//       font-size: 25px;
//       line-height: 38px;
//       margin: 1rem 0;

//       color: #7da1fd;
//     }
//     .orgID {
//       font-family: "Poppins";
//       font-style: normal;
//       font-weight: 300;
//       font-size: 20px;
//       line-height: 27px;
//       margin: 0 0 1rem 0;

//       color: #272727;
//     }
//     .contact {
//       font-family: "Poppins";
//       font-style: normal;
//       font-weight: 400;
//       font-size: 20px;
//       line-height: 30px;
//     }
//     .anticon-phone,
//     .anticon-mail {
//       margin: 0 1rem 1rem 0;
//       color: #7ca1fc;
//     }
//     .anticon-phone {
//       transform: scaleX(-1);
//     }
//     .btn-container {
//       display: flex;
//       align-items: center;
//       .ant-btn {
//         height: 30px;
//         width: 100%;
//         font-family: "Open Sans";
//         font-style: normal;
//         font-weight: 400;
//         font-size: 20px;
//         line-height: 27px;

//         color: #ffffff;
//         border-radius: 7px;
//         padding: 0 0.5rem;
//         margin: 2rem;
//       }
//       .ant-btn:hover {
//         box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
//       }
//       .accept .ant-btn {
//         background: #4d9a00ee;
//       }
//       .reject .ant-btn {
//         background: #ff5656ee;
//       }
//       div {
//         margin: 0 1.5rem;
//       }
//     }
//   }
// `;

// export const CertificateForm = styled.div`
//   position: absolute;
//   width: 70%;
//   left: 25%;
//   top: 15%;
//   padding: 2rem;

//   background: #ffffff;
//   border: 1px solid #d1d1d1;
//   border-radius: 12px;

//   .form-title {
//     margin-bottom: 2rem;
//     font-family: "Poppins";
//     font-style: normal;
//     font-weight: 700;
//     font-size: 30px;
//     line-height: 24px;

//     color: #7ca1fc;
//   }
//   .cert-upload {
//     label {
//       margin: 130px 0;
//     }
//     .ant-upload-list-picture-card-container,
//     .ant-upload {
//       width: 500px;
//       height: 300px;
//     }
//     .ant-upload-list-item-actions {
//       a {
//         pointer-events: initial !important;
//         opacity: 1 !important;
//       }
//     }
//   }
//   .submit-btn {
//     .ant-btn {
//       position: absolute;
//       height: 56px;
//       width: 100%;
//       font-family: "Open Sans";
//       font-style: normal;
//       font-weight: 400;
//       font-size: 20px;
//       line-height: 27px;

//       color: #ffffff;
//       background: #7ba0ff;
//     }
//   }
// `;

// export const EmployeeForm = styled.div`
//   position: absolute;
//   width: 92%;
//   left: 5%;
//   // top: 15%;
//   padding: 2rem;

//   background: #ffffff;
//   border: 1px solid #d1d1d1;
//   border-radius: 12px;

//   .form-title {
//     margin-bottom: 2rem;
//     font-family: "Poppins";
//     font-style: normal;
//     font-weight: 700;
//     font-size: 30px;
//     line-height: 24px;

//     color: #7ca1fc;
//   }

//   .address-section {
//     border: 1px solid gray;
//     padding: 1rem;
//     border-radius: 20px;
//     margin-bottom: 1rem;
//     .address-title {
//       margin-bottom: 0.5rem;
//       font-family: "Poppins";
//       font-style: normal;
//       font-weight: 700;
//       font-size: 20px;
//       line-height: 24px;

//       color: #7ca1fc;
//       .anticon-minus-circle {
//         margin-left: 1rem;
//         color: red;
//         margin-top: 0.25rem;
//       }
//     }
//   }
//   .submit-btn {
//     .ant-btn {
//       position: absolute;
//       height: 56px;
//       width: 100%;
//       font-family: "Open Sans";
//       font-style: normal;
//       font-weight: 400;
//       font-size: 20px;
//       line-height: 27px;

//       color: #ffffff;
//       background: #7ba0ff;
//     }
//   }
// `;

// export const Ellipsis = styled.span`
//   width: ${(props) => {
//     if (props.width) {
//       return `${props.width}px`;
//     }

//     if (props.blockWidth || Number.isInteger(props.blockWidth)) {
//       return `calc(100% - ${props.blockWidth}px)`;
//     }
//     return "calc(100% - 10px)";
//   }};

//   max-width: ${(props) => {
//     if (props.maxWidth) {
//       return `${props.maxWidth}px`;
//     }
//     return "initial";
//   }};

//   display: ${(props) => {
//     if (props.isBlock) {
//       return "block";
//     }
//     return "inline-block";
//   }};

//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   cursor: ${(props) => props.cursor || "help"};
//   vertical-align: ${(props) => props.verticalAlign || "initial"};
// `;
