import styled from "styled-components";

export const Body = styled.div`

  width: 100vw;
  height: 100vh;
  
  
  position: absolute;
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(
    180deg,
    rgba(72, 145, 219, 0.68) 0%,
    rgba(255, 255, 255, 0.83) 72.46%
  );




  .navbar {
    margin-bottom: 0;
    border-radius: 0;
  }

  footer {
    background-color: #f2f2f2;
    padding: 25px;
  }
  
.carousel-inner img {
    width: 100%; 
    margin: auto;
    min-height:200px;
}


@media (max-width: 600px) {
  .carousel-caption {
    display: none; 
  }
}




















  .hello {
    box-sizing: border-box;

    position: absolute;
    width: 12%;
    height: 7%;
    left: 10%;
    top: 12%;

   
    
    backdrop-filter: blur(15px);
    border-radius: 10px;

    font-family: "Work Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 200%;
    line-height: 150%;
    padding: 0.5rem 0.5rem;
    color: #403930;
  }

  .choose-your-option {
    position: absolute;
    width: 25%;
    height: 15%;
    left: 10%;
    top: 259px;
    font-size: 58px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    
    line-height: 125%;

    letter-spacing: 0.02em;

    color: #403930;
  }
  img {

    
    width: 100%;
    height: auto;
    object-fit: scale-down;

  }

  @media screen and (min-width: 580px) {
    img {
      width: 100%;
    height: auto;
    object-fit: scale-down;
    }
  }
   
    .home-wrapper {
      position: absolute;
      left: 60%;
      top: 58px;
    }


    @media screen and (min-width: 580px) {
      home-wrapper {
        width: 440px;
      height: auto;
      object-fit: scale-down;
      
      }
    }

  .options {
    position: absolute;
    width: 100%;
    height: auto;
    left: 5%;
    top: 497.67px;
    display: flex;
    .option {
      margin: 2.2rem;
      cursor: pointer;
      div {
        display: flex;
        justify-content: center;
      }
    }
  }
 
`;

export const HomeBody = styled.div``;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
 
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
    .contact {
      margin-top: -0.5rem;
    }
  }
`;



// export const Body = styled.div`
//   width: 100vw;
//   height: 90vh;
//   position: absolute;
//   overflow-x: hidden;
//   display: flex;
//   justify-content: space-between;
//   background: linear-gradient(
//     180deg,
//     rgba(72, 145, 219, 0.68) 0%,
//     rgba(255, 255, 255, 0.83) 72.46%
//   );
//   .hello {
//     box-sizing: border-box;

//     position: absolute;
//     width: 12%;
//     height: 7%;
//     left: 10%;
//     top: 22%;

//     background: radial-gradient(
//       100% 359.18% at 0% 0%,
//       rgba(255, 255, 255, 0.6) 0%,
//       rgba(255, 255, 255, 0.2) 100%
//     );
//     box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
//     backdrop-filter: blur(15px);
//     border-radius: 10px;

//     font-family: "Work Sans";
//     font-style: normal;
//     font-weight: 600;
//     font-size: 28px;
//     line-height: 150%;
//     padding: 0.5rem 1.5rem;
//     color: #403930;
//   }

//   .choose-your-option {
//     position: absolute;
//     width: 25%;
//     height: 15%;
//     left: 10%;
//     top: 299px;

//     font-family: "Poppins";
//     font-style: normal;
//     font-weight: 600;
//     font-size: 78px;
//     line-height: 125%;

//     letter-spacing: 0.02em;

//     color: #403930;
//   }

//   .home-wrapper {
//     position: absolute;
//     width: 615px;
//     height: 609px;
//     left: 60%;
//     top: 80px;
//   }

//   .options {
//     position: absolute;
//     width: 100px;
//     height: 100px;
//     left: 10%;
//     top: 557.67px;
//     display: flex;
//     .option {
//       margin: 4rem;
//       cursor: pointer;
//       div {
//         display: flex;
//         justify-content: center;
//       }
//     }
//   }
// `;

// export const HomeBody = styled.div``;

// export const HeaderContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   height: 84px;
//   width: 100vw;
//   left: 0px;
//   top: 0px;
//   border-radius: 0px;

//   .logo {
//     display: absolute;
//     margin-left: 0;
//     width: 208px;
//     left: 0px;
//     top: 0px;
//     border-radius: 0px;
//   }
//   .tabs {
//     display: flex;
//     justify-content: space-between;
//     align-items: middle;
//     margin: 1.5rem 2rem;

//     .tab {
//       font-family: Poppins;
//       font-size: 20px;
//       font-weight: 700;
//       line-height: 30px;
//       letter-spacing: 0em;
//       text-align: left;
//       margin: 0 2rem;
//     }
//     .contact {
//       margin-top: -0.5rem;
//     }
//   }
// `;
