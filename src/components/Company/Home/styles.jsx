import { Modal } from "antd";
import styled from "styled-components";

export const Modules = styled.div`
  .cert-count {
    // position: absolute;
  
          
    left: 75%;
    top: 1%;
    color: #ffffff;
    background: #7ba0ff;
    border-radius: 10px;
    padding: 0.5rem 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .count {
      font-size: 107%;
      margin-left: 1.5rem;
      display:flex;
    }
    .label {
      font-size: 80%;
      margin-left: 1.5rem;
    }
    .anticon-plus {
      font-size: 42px;
      margin-left: 0.5rem;
      cursor: pointer;
    }
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
  }
  .critical {
    background: #ffa070;
  }
  .warning {
    background: #ffd070;
  }
  .corporate-info {
    position: absolute;
    width: 40%;
    left: 22%;
    top: 15%;
    background: #ffffff;
    border-radius: 10px;
    padding: 1.5rem 4rem;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 2rem 0;
      .title {
        font-family: "Poppins";
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
    .motto {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 200;
      font-size: 150%;
      line-height: 40px;
      margin: 0 0 2rem 0;
      color: #000000;
    }
    .sub-title {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 30px;
      margin: 0 0 1.5rem 0;
      color: #5d8df6;
    }
    .description {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 200;
      font-size: 18px;
      line-height: 27px;
      margin: 0 0 2rem 0;
      color: #000000;
    }
    .accounts {
      svg {
        color: #7da1fd;
        font-size: 25px;
      }
      a {
        margin-right: 2rem;
      }
    }
  }
  .personal-info {
    position: absolute;
    justify-content: center;
    width: 30%;
    left: 65%;
    top: 15%;
    background: #ffffff;
    border-radius: 10px;
    padding: 1.5rem 4rem;
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .name {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 700;
      font-size: 125%;
      line-height: 38px;
      margin: 2rem 0 1.5rem 0;
      color: #7da1fd;
    }
    .orgID {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 300;
      font-size: 0.8rem;
      line-height: 27px;
      margin: 0 0 2rem 0;
      color: #272727;
    }
    .contact {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 30px;
    }
    .address {
      img {
        margin-right: 1rem;
      }
    }
    .anticon-phone,
    .anticon-mail {
      margin: 0 1rem 1rem 0;
      color: #7ca1fc;
    }
    .anticon-phone {
      transform: scaleX(-1);
    }
  }
`;

export const CompanyForm = styled.div`
  position: absolute;
  width: 70%;
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
  .correspondent-section {
    border: 1px solid gray;
    padding: 1rem;
    border-radius: 20px;
    margin-bottom: 1rem;
    .correspondent-title {
      margin-bottom: 0.5rem;
      font-family: "Poppins";
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: #7ca1fc;
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

export const CustomModal = styled(Modal)`
  top: 30%;
  .ant-modal-content {
    background: radial-gradient(
      100% 359.18% at 0% 0%,
      #7da1fd 0%,
      rgba(255, 255, 255) 100%
    );
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    .ant-modal-body {
      display: flex;
      justify-content: space-between;
      padding: 1rem 3rem;
      align-items: middle;
      font-size: 1rem;
      .anticon-close-circle,
      .anticon-delete {
        margin-right: 1rem;
        color: red;
      }
      .anticon-phone,
      .anticon-user,
      .anticon-mail {
        margin-right: 1rem;
      }
      .anticon-phone {
        transform: scaleX(-1);
      }
      .contact-info {
        font-family: "Poppins";
        font-style: normal;
        .primary {
          font-weight: 600;
          font-size: 40px;
          line-height: 35px;
          color: #ffffff;
          margin: 1rem 0 3.5rem 8rem;
        }
        .secondary {
          font-weight: 600;
          font-size: 20px;
          line-height: 26px;
          color: #619aff;
          margin-left: 2rem;
        }
      }
      .img-wrapper {
        margin: 6rem 1rem 3rem 2rem;
      }
    }
  }
`;



















// import { Modal } from "antd";
// import styled from "styled-components";

// export const Modules = styled.div`
//   .cert-count {
//     position: absolute;
//     left: 85%;
//     top: 3%;

//     color: #ffffff;
//     background: #7ba0ff;
//     border-radius: 10px;
//     padding: 0.5rem 1rem;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     .count {
//       font-size: 17px;
//       margin-left: 1.5rem;
//     }
//     .label {
//       font-size: 14px;
//     }
//     .anticon-plus {
//       font-size: 42px;
//       margin-left: 0.5rem;
//       cursor: pointer;
//     }
//     font-family: "Poppins";
//     font-style: normal;
//     font-weight: 700;
//   }
//   .critical {
//     background: #ffa070;
//   }
//   .warning {
//     background: #ffd070;
//   }







//   .corporate-info {
//     position: absolute;
//     width: 40%;
//     left: 22%;
//     top: 15%;

    
//     border-radius: 10px;
//     padding: 1.5rem 4rem;


   
//     }

//     .grid {
//       display: grid;
//       grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
//       grid-gap: 5px;
//     }
//     .grid > div {
//       font-size: 30px;
//       padding: .5em;
//       color: #ffffff;
//       background: #1c87c9;
//       text-align: center;
//     }

//     .header {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       margin: 0 0 2rem 0;
//       .title {
//         font-family: "Poppins";
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
//     .motto {
//       font-family: "Poppins";
//       font-style: normal;
//       font-weight: 200;
//       font-size: 20px;
//       line-height: 30px;
//       margin: 0 0 2rem 0;

//       color: #000000;
//     }
//     .sub-title {
//       font-family: "Poppins";
//       font-style: normal;
//       font-weight: 600;
//       font-size: 20px;
//       line-height: 30px;
//       margin: 0 0 1.5rem 0;

//       color: #5d8df6;
//     }
//     .description {
//       font-family: "Poppins";
//       font-style: normal;
//       font-weight: 200;
//       font-size: 18px;
//       line-height: 27px;
//       margin: 0 0 2rem 0;

//       color: #000000;
//     }
//     .accounts {
//       svg {
//         color: #7da1fd;
//         font-size: 25px;
//       }
//       a {
//         margin-right: 2rem;
//       }
//     }
//   }
//   .personal-info {
//     position: absolute;
//     justify-content: center;
//     width: 30%;
//     left: 65%;
//     top: 15%;

//     background: #ffffff;
//     border-radius: 10px;
//     padding: 1.5rem 4rem;

//     .logo {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
//     .name {
//       font-family: "Poppins";
//       font-style: normal;
//       font-weight: 700;
//       font-size: 25px;
//       line-height: 38px;
//       margin: 2rem 0 1.5rem 0;

//       color: #7da1fd;
//     }
//     .orgID {
//       font-family: "Poppins";
//       font-style: normal;
//       font-weight: 300;
//       font-size: 20px;
//       line-height: 27px;
//       margin: 0 0 2rem 0;

//       color: #272727;
//     }
//     .contact {
//       font-family: "Poppins";
//       font-style: normal;
//       font-weight: 400;
//       font-size: 20px;
//       line-height: 30px;
//     }
//     .address {
//       img {
//         margin-right: 1rem;
//       }
//     }
//     .anticon-phone,
//     .anticon-mail {
//       margin: 0 1rem 1rem 0;
//       color: #7ca1fc;
//     }
//     .anticon-phone {
//       transform: scaleX(-1);
//     }
//   }
// `;

// export const CompanyForm = styled.div`
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
//   .correspondent-section {
//     border: 1px solid gray;
//     padding: 1rem;
//     border-radius: 20px;
//     margin-bottom: 1rem;
//     .correspondent-title {
//       margin-bottom: 0.5rem;
//       font-family: "Poppins";
//       font-style: normal;
//       font-weight: 700;
//       font-size: 20px;
//       line-height: 24px;

//       color: #7ca1fc;
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

// export const CustomModal = styled(Modal)`
//   top: 30%;

//   .ant-modal-content {
//     background: radial-gradient(
//       100% 359.18% at 0% 0%,
//       #7da1fd 0%,
//       rgba(255, 255, 255) 100%
//     );
//     box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);

//     border-radius: 15px;
//     .ant-modal-body {
//       display: flex;
//       justify-content: space-between;
//       padding: 1rem 3rem;
//       align-items: middle;
//       font-size: 1rem;
//       .anticon-close-circle,
//       .anticon-delete {
//         margin-right: 1rem;
//         color: red;
//       }
//       .anticon-phone,
//       .anticon-user,
//       .anticon-mail {
//         margin-right: 1rem;
//       }
//       .anticon-phone {
//         transform: scaleX(-1);
//       }
//       .contact-info {
//         font-family: "Poppins";
//         font-style: normal;
//         .primary {
//           font-weight: 600;
//           font-size: 40px;
//           line-height: 35px;
//           color: #ffffff;
//           margin: 1rem 0 3.5rem 8rem;
//         }
//         .secondary {
//           font-weight: 600;
//           font-size: 20px;
//           line-height: 26px;

//           color: #619aff;
//           margin-left: 2rem;
//         }
//       }
//       .img-wrapper {
//         margin: 6rem 1rem 3rem 2rem;
//       }
//     }
//   }
// `;
