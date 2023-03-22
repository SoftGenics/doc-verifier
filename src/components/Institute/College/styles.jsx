import { Modal } from "antd";
import styled from "styled-components";

export const Colleges = styled.div`
  position: absolute;
  width: 92%;
  // left: 25%;
  // top: 15%;
  overflow: scroll;
  background: #ffffff;
  border: 1px solid #d1d1d1;
  border-radius: 12px;
  padding: 2rem 2rem 0;

  .anticon-close-circle,
  .anticon-delete {
    margin-right: 1rem;
    color: red;
  }
  .anticon-phone,
  .anticon-edit {
    margin-right: 1rem;
    color: #7ca1fc;
  }
  .anticon-phone {
    transform: scaleX(-1);
  }
  .anticon:hover {
    cursor: pointer;
  }
  .anticon-check-circle {
    margin-right: 1rem;
    color: green;
  }
  .ant-table {
    font-size: 1rem;
    .blocked {
      opacity: 0.5;
      background: rgb(220, 220, 220);
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
          .name {
            font-weight: 600;
            font-size: 30px;
            line-height: 35px;
          }
          .email {
            font-weight: 400;
            font-size: 18px;
            line-height: 22px;
          }
          color: #ffffff;
          margin: 1rem 0 3rem;
        }
        .secondary {
          font-weight: 500;
          // font-size: 20px;
          line-height: 26px;

          color: #719afa;
        }
      }
      .img-wrapper {
        margin: 6rem 1rem 3rem 2rem;
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
    font-size: 200%;
    line-height: 24px;

    color: #7ca1fc;
  }
  .ant-btn {
    height: 30px;
    width: 100%;
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
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

export const CollegeForm = styled.div`
  position: absolute;
  width: 92%;
  // left: 25%;
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
