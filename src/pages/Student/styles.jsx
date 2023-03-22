import styled, { css } from "styled-components";

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
  .company {
    box-sizing: border-box;

    position: absolute;
    width: 13%;
    height: 7%;
    left: 4%;
    top: 5%;

    background: radial-gradient(
      100% 359.18% at 0% 0%,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0.2) 100%
    );
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15px);
    border-radius: 10px;
    font-family: "Work Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 150%;
    padding: 0.75rem 3rem;
    color: #403930;
  }
`;

export const HomeBody = styled.div``;

export const Sider = styled.div`
  position: absolute;
  width: 272px;
  height: 587px;
  left: 4%;
  top: 15%;
  padding: 3rem 0;

  background: rgba(47, 105, 255, 0.61);
  border-radius: 19px;














  .tab {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    color: #ffffff;
    img {
      margin: 0 1rem 0 0;
      height: 19.494535446166992px;
      width: 18px;
      left: 128px;
      top: 243px;
      border-radius: 0px;
    }
    margin: 0.75rem 2.5rem;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

export const SiderTabs = styled.div`
  ${(props) =>
    props.isActive &&
    css`
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.88) -17.8%,
        rgba(255, 255, 255, 0) 88.26%
      );
      border-radius: 10px;
    `}
  display: flex;
  &:hover {
    cursor: pointer;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.88) -17.8%,
      rgba(255, 255, 255, 0) 88.26%
    );
  }

 
`;

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
  .tabs {
    display: flex;
    justify-content: space-between;
    align-items: middle;
    margin: 1.5rem 2rem;

    .tab {
      font-family: Poppins;
      font-size: 20px;
      font-weight: 700;
      line-height: 30px;
      letter-spacing: 0em;
      text-align: left;
      margin: 0 2rem;
    }
    .logout {
      margin-top: -0.5rem;
      &:hover {
        cursor: pointer;
        box-shadow: 2px 20px 20px rgba(0, 0, 0, 0.1);
      }
    }
  }
`;







export const HeaderCon = styled.div`


.sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}
 
.sidebar a.active {
  background-color: red;
  color: white;
}

.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}

div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
}

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {float: left;}
  div.content {margin-left: 0;}
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}

`;