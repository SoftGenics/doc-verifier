import styled from "styled-components";

export const Body = styled.div`
  width: 100vw;
  height: 90vh;
  position: absolute;
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(
    180deg,
    rgba(72, 145, 219, 0.68) 0%,
    rgba(255, 255, 255, 0.83) 72.46%
  );
  img {
    width: 100%;
    height: auto;
    object-fit: scale-down;
// padding:50px;
  }

  @media screen and (max-width: 480px) {
    img {
      display:none;
    }
  }
  .scale-down {object-fit: scale-down;}
  .hello {
    box-sizing: border-box;

    
    // width: 12%;
    height: 7%;
    left: 10%;
    top: 22%;

  
    
   
    border-radius: 10px;

    font-family: "Work Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 150%;
    padding: 0.75rem 3rem;
    color: #403930;
  }
  .choose-your-option1 {
    position: absolute;
    // width: 25%;
    height: 15%;
    left: 10%;
    top: 200px;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size:45px;
    // font-size:52px;
    line-height: 125%;

   

    color: #403930;
  }
  .choose-your-option {
    position: absolute;
    width: 440px;
    height: 160px;
    left: 10%;
    top: 299px;

    font-family: "Poppins";
    font-style: normal;
    font-size: 78px;
    font-weight: 600;
    line-height: 125%;

    letter-spacing: 0.02em;

    color: #403930;
  }
  
  .home-wrapper {
    position: absolute;
   
    left: 70%;
    top: 50px;
  }
  .form {
    position: absolute;
    left: 10%;
    top: 50%;
    div {
      margin-bottom: 0.5rem;
    }
    .ant-input,
    .ant-input-password {
      // width: 500px;
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
  .login-btn {
    .ant-btn {
      position: absolute;
      left: 15%;
      top: 657.67px;
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
    left: 20.5%;
    top: 85.94%;
    bottom: 21.42%;

    font-family: "Open Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 14.75px;
    line-height: 20px;

    color: #000000;

    opacity: 0.3;
  }
`;

export const HomeBody = styled.div``;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 84px;
  width: 100vw;
  left: 0px;
  top: 0px;
  border-radius: 0px;

  .logo {
    display: absolute;
    margin-left: 0;
    width: 208px;
    left: 0px;
    top: 0px;
    border-radius: 0px;
  }
`;

// @media screen and (min-width: 480px) {
//   img {
//     width: 200px;
//   height: 200px;
//   object-fit: scale-down;
//   }
// }