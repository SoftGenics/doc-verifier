import { Modal } from "antd";
import styled from "styled-components";

export const CustomModal = styled(Modal)`
  top: 20%;
  // right: 10%;
  .ant-modal-content {
    background: radial-gradient(
      100% 359.18% at 0% 0%,
      #7da1fd 0%,
      rgba(255, 255, 255) 100%
    );
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    width: 100%;

    .ant-modal-body {
      padding: 7rem 6rem;
      font-size: 1rem;
      .form {
        div {
          margin-bottom: 1rem;
        }
        .ant-input,
        .ant-input-password {
          width: 500px;
          line-height: 40px;
          font-size: 25px;
          background-color: transparent;
          background: transparent !important;
          border: none;
          box-shadow: none !important;
        }
        .admin-id .ant-input {
          border-bottom: 2px solid gray;
        }
        .password .ant-input-password {
          border-bottom: 2px solid gray;
        }
      }

      .login__input {
        border: none;
        border-bottom: 2px solid #D1D1D4;
        background: none;
        padding: 10px;
        padding-left: 24px;
        font-weight: 700;
        width: 75%;
        transition: .2s;
      }



      .login-btn {
        .ant-btn {
          margin-top: 2rem;
          left: 25%;
          height: 56px;
          width: 308px;
          font-family: "Open Sans";
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
          line-height: 27px;

          color: #ffffff;
          background: #7ba0ff;
        }
      }
      .forget-password {
        position: absolute;
        margin-top: 1rem;
        left: 43%;
        font-family: "Open Sans";
        font-style: normal;
        font-weight: 400;
        font-size: 14.75px;
        line-height: 20px;

        color: #000000;

        opacity: 0.3;
      }
    }
  }
`;
