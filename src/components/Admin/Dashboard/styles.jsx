import styled from "styled-components";

export const Modules = styled.div`
  .module1 {
    position: absolute;
    width: 30%;
    height: 25%;
    left: 25%;
    top: 15%;

    background: #779efc;
    border-radius: 20px;

    display: flex;
    justify-content: center;
    padding: 1rem;
    padding: 3rem;
    &:hover {
      cursor: pointer;
      box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
    }
  }

  .color{
    backgroundColor: RED;
  }
  // .center {
      display: block;
    //   margin-left: auto;
    //   margin-right: auto;
    //   width: 50%;
    // }
    

  img {
// display:flex;
    
    max-width: 100%;
  height: auto;
  }

  @media screen and (max-width: 500px) {
    img {
      display: inline-block;
      text-align: center;
  //     max-width: 30px;
  // height: auto;
  // margin-left: auto;
  
    }
  }
   
  .module2 {
    position: absolute;
    width: 30%;
    height: 25%;
    left: 60%;
    top: 15%;

    background: #779efc;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    padding: 3rem;
    &:hover {
      cursor: pointer;
      box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
    }
  }
  .info {
    margin: 0 2rem;
    .count {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 700;
      font-size: 100%;
      // line-height: 58px;

      color: white;
    }
    .org {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 300;
      font-size: 100%;
      line-height: 22px;

      color: #ffffff;
    }
  }
  img {
    height: 100%;
    width: auto;
    left: 656px;
    top: 251px;
    border-radius: 0px;
    margin: 0.75rem 0;
  }
`;
