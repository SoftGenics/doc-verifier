import { Modal } from "antd";
import styled from "styled-components";

// export const HeaderContainer = styled.div`


export const Academicsstyle = styled.div`
  position: absolute;
  width: 92%;
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


export const AcademicTable = styled.div`
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


export const CertificateForm = styled.div`
  // position: absolute;
  // width: 70%;
//   overflow-y: auto;
//   left: 25%;
//   top: 15%;
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
    label{
      margin: 130px 0;
    }
    .ant-upload-list-picture-card-container, .ant-upload{
      width: 100%;
      height: auto;
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

export const Certificates = styled.div`
/* 12 58 */

position: absolute;
width: 630px;
height: 716px;



/* 12 62 */

position: absolute;
width: 630px;
height: 716px;



/* 12 61 */

position: absolute;
width: 630px;
height: 716px;



/* 12 63 */

position: absolute;
width: 630px;
height: 716px;



/* Rectangle 5 */

position: absolute;
width: 1280px;
height: 84px;
left: 35px;
top: -5px;

background: #FFFFFF;


/* logo 1 */

position: absolute;
width: 208px;
height: 79px;
left: 0px;
top: 0px;

background: url(logo.png);


/* Frame 2 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px 24px;
gap: 10px;

position: absolute;
width: 163px;
height: 60px;
left: 67px;
top: 74px;

background: #D9E4FF;
border-radius: 10px;


/* 👋 Pavitra */

width: 115px;
height: 36px;

font-family: 'Work Sans';
font-style: normal;
font-weight: 600;
font-size: 24px;
line-height: 150%;
/* identical to box height, or 36px */

color: #403930;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Webp 1 */

position: absolute;
width: 1171px;
height: 658px;
left: -899px;
top: -115px;



/* Nav CTA */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 10px 17px;
gap: 10px;

position: absolute;
width: 131px;
height: 47px;
left: 1089px;
top: 19px;

background: #7BA0FF;
border-radius: 4px;


/* Vector */

box-sizing: border-box;

width: 21px;
height: 21px;

background: #4053FF;
border: 4px solid #4053FF;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* LogOut */

width: 66px;
height: 27px;

font-family: 'Poppins';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 27px;
/* identical to box height */
text-transform: capitalize;

color: #FFFFFE;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Left bar */

position: absolute;
width: 309px;
height: 587px;
left: 61px;
top: 193px;



/* Rectangle 389 */

position: absolute;
width: 272px;
height: 587px;
left: 61px;
top: 193px;

background: rgba(47, 105, 255, 0.61);
border-radius: 19px;


/* Rectangle */

position: absolute;
width: 309px;
height: 53px;
left: 61px;
top: 368px;



/* Rectangle 391 */

position: absolute;
width: 309px;
height: 53px;
left: 61px;
top: 368px;

background: linear-gradient(90deg, rgba(255, 255, 255, 0.88) -17.8%, rgba(255, 255, 255, 0) 88.26%);
border-radius: 10px;


/* Rectangle 392 */

position: absolute;
width: 6.37px;
height: 53px;
left: 61px;
top: 368px;

/* Neutral / White */
background: #FFFFFF;
border-radius: 10px;


/* Classes */

position: absolute;
width: 147px;
height: 29px;
left: 128px;
top: 297px;



/* Certificates */

position: absolute;
width: 106px;
height: 29px;
left: 169px;
top: 297px;

font-family: 'Jost';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 29px;
/* identical to box height */

color: #FFFFFF;



/* Vector */

position: absolute;
left: 10%;
right: 88.44%;
top: 36.54%;
bottom: 61.3%;

background: #FFFFFF;


/* Classes */

position: absolute;
width: 140px;
height: 29px;
left: 162px;
top: 343px;



/* Academics */

position: absolute;
width: 101px;
height: 29px;
left: 201px;
top: 343px;

font-family: 'Jost';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 29px;
/* identical to box height */

color: #FFFFFF;



/* Vector */

position: absolute;
left: 12.66%;
right: 85.62%;
top: 41.59%;
bottom: 56.25%;

background: #FFFFFF;


/* Classes */

position: absolute;
width: 122px;
height: 29px;
left: 197px;
top: 380px;



/* Carrier Skills */

position: absolute;
width: 122px;
height: 29px;
left: 197px;
top: 380px;

font-family: 'Jost';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 29px;
/* identical to box height */

color: #FFFFFF;



/* Classes */

position: absolute;
width: 90px;
height: 29px;
left: 200px;
top: 422px;



/* Life Skills */

position: absolute;
width: 90px;
height: 29px;
left: 200px;
top: 422px;

font-family: 'Jost';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 29px;
/* identical to box height */

color: #FFFFFF;



/* Home */

position: absolute;
width: 119px;
height: 29px;
left: 128px;
top: 245px;



/* TimeLine */

position: absolute;
width: 84px;
height: 29px;
left: 163px;
top: 245px;

font-family: 'Jost';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 29px;
/* identical to box height */

color: #FFFFFF;



/* Group */

position: absolute;
left: 10%;
right: 88.75%;
top: 30.17%;
bottom: 67.91%;



/* Vector */

position: absolute;
left: 10.47%;
right: 89.22%;
top: 31.61%;
bottom: 67.91%;

border: 2px solid #FFFFFF;


/* Vector */

position: absolute;
left: 10%;
right: 88.75%;
top: 30.17%;
bottom: 68.15%;

border: 2px solid #FFFFFF;


/* Vector */

box-sizing: border-box;

position: absolute;
left: 12.97%;
right: 85.78%;
top: 46.63%;
bottom: 51.8%;

background: #FFFFFF;
border: 14px solid #FFFFFF;


/* Recent Certificates */

position: absolute;
width: 157px;
height: 24px;
left: 1338px;
top: 212px;

font-family: 'Poppins';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 24px;
/* identical to box height */

color: #7CA1FC;



/* Line 15 */

position: absolute;
width: 830.01px;
height: 0px;
left: 354px;
top: 265.01px;

border: 1px solid #D1D1D1;
transform: rotate(-0.28deg);


/* Line 16 */

position: absolute;
width: 830.01px;
height: 0px;
left: 355px;
top: 299.01px;

border: 1px solid #D1D1D1;
transform: rotate(-0.28deg);


/* Vector */

position: absolute;
left: 81.02%;
right: 17.27%;
top: 11.18%;
bottom: 86.18%;

background: #FF8787;


/* Golden Elegant Certificate of Appreciation 1 */

position: absolute;
width: 840px;
height: 595px;
left: 220px;
top: 118px;

background: url(Golden Elegant Certificate of Appreciation.png);


/* qrcode 1 */

position: absolute;
width: 121px;
height: 121px;
left: 1072px;
top: 118px;

background: url(qrcode);


/* Rectangle 18 */

position: absolute;
width: 117px;
height: 23px;
left: 1074px;
top: 253px;

background: #7BA0FF;
border-radius: 10px;


/* Rectangle 703 */

position: absolute;
width: 117px;
height: 23px;
left: 1075px;
top: 287px;

background: #FF8787;
border-radius: 10px;


/* Apply for verification */

position: absolute;
width: 146px;
height: 21px;
left: 1060px;
top: 256px;

font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 10px;
line-height: 150%;
/* or 15px */
text-align: center;

color: #FFFFFF;



/* Delete */

position: absolute;
width: 146px;
height: 21px;
left: 1061px;
top: 290px;

font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 10px;
line-height: 150%;
/* or 15px */
text-align: center;

color: #FFFFFF;



/* 12 50 */

position: absolute;
width: 630px;
height: 716px;
left: 691px;
top: -408px;



/* 12 81 */

position: absolute;
width: 630px;
height: 716px;
left: 692px;
top: -374px;



/* 12 51 */

position: absolute;
width: 630px;
height: 716px;
left: 691px;
top: -228px;



/* 12 82 */

position: absolute;
width: 630px;
height: 716px;
left: 692px;
top: -194px;



/* 12 52 */

position: absolute;
width: 630px;
height: 716px;
left: 691px;
top: -365px;



/* 12 83 */

position: absolute;
width: 630px;
height: 716px;
left: 692px;
top: -331px;



/* 12 53 */

position: absolute;
width: 630px;
height: 716px;
left: 1053px;
top: -40px;



/* 12 84 */

position: absolute;
width: 630px;
height: 716px;
left: 1054px;
top: -6px;



/* 12 54 */

position: absolute;
width: 630px;
height: 716px;
left: 691px;
top: -376px;



/* 12 85 */

position: absolute;
width: 630px;
height: 716px;
left: 692px;
top: -342px;



/* 12 55 */

position: absolute;
width: 630px;
height: 716px;
left: 691px;
top: -196px;



/* 12 86 */

position: absolute;
width: 630px;
height: 716px;
left: 692px;
top: -162px;



/* 12 56 */

position: absolute;
width: 630px;
height: 716px;
left: 691px;
top: -333px;



/* 12 87 */

position: absolute;
width: 630px;
height: 716px;
left: 692px;
top: -299px;



/* 12 57 */

position: absolute;
width: 630px;
height: 716px;
left: 1053px;
top: -8px;



/* 12 88 */

position: absolute;
width: 630px;
height: 716px;
left: 1054px;
top: 26px;



/* 12 59 */

position: absolute;
width: 630px;
height: 716px;
left: 1048px;
top: -152px;



/* 12 89 */

position: absolute;
width: 630px;
height: 716px;
left: 1049px;
top: -118px;



/* 12 60 */

position: absolute;
width: 630px;
height: 716px;
left: 1048px;
top: -289px;



/* 12 90 */

position: absolute;
width: 630px;
height: 716px;
left: 1049px;
top: -255px;



/* 12 62 */

position: absolute;
width: 630px;
height: 716px;
left: 691px;
top: -285px;



/* 12 91 */

position: absolute;
width: 630px;
height: 716px;
left: 692px;
top: -251px;



/* 12 63 */

position: absolute;
width: 630px;
height: 716px;
left: 691px;
top: -422px;



/* 12 92 */

position: absolute;
width: 630px;
height: 716px;
left: 692px;
top: -388px;



/* 12 64 */

position: absolute;
width: 630px;
height: 716px;
left: 1053px;
top: -97px;



/* 12 93 */

position: absolute;
width: 630px;
height: 716px;
left: 1054px;
top: -63px;



/* 12 65 */

position: absolute;
width: 630px;
height: 716px;
left: 691px;
top: -105px;



/* 12 94 */

position: absolute;
width: 630px;
height: 716px;
left: 692px;
top: -71px;



/* 12 66 */

position: absolute;
width: 630px;
height: 716px;
left: 691px;
top: -242px;



/* 12 95 */

position: absolute;
width: 630px;
height: 716px;
left: 692px;
top: -208px;



/* 12 67 */

position: absolute;
width: 630px;
height: 716px;
left: 1053px;
top: 83px;



/* 12 96 */

position: absolute;
width: 630px;
height: 716px;
left: 1054px;
top: 117px;



/* 12 68 */

position: absolute;
width: 630px;
height: 716px;
left: 686px;
top: -386px;



/* 12 97 */

position: absolute;
width: 630px;
height: 716px;
left: 687px;
top: -352px;



/* 12 69 */

position: absolute;
width: 630px;
height: 716px;
left: 1048px;
top: -61px;



/* 12 98 */

position: absolute;
width: 630px;
height: 716px;
left: 1049px;
top: -27px;



/* 12 70 */

position: absolute;
width: 630px;
height: 716px;
left: 1048px;
top: -198px;



/* 12 99 */

position: absolute;
width: 630px;
height: 716px;
left: 1049px;
top: -164px;



/* 12 71 */

position: absolute;
width: 630px;
height: 716px;
left: 691px;
top: -430px;



/* 12 100 */

position: absolute;
width: 630px;
height: 716px;
left: 692px;
top: -396px;



/* 12 72 */

position: absolute;
width: 630px;
height: 716px;
left: 691px;
top: -252px;



/* 12 101 */

position: absolute;
width: 630px;
height: 716px;
left: 692px;
top: -218px;



/* 12 73 */

position: absolute;
width: 630px;
height: 716px;
left: 691px;
top: -389px;



/* 12 102 */

position: absolute;
width: 630px;
height: 716px;
left: 692px;
top: -355px;



/* 12 74 */

position: absolute;
width: 630px;
height: 716px;
left: 1053px;
top: -64px;



/* 12 103 */

position: absolute;
width: 630px;
height: 716px;
left: 1054px;
top: -30px;



/* 12 75 */

position: absolute;
width: 630px;
height: 716px;
left: 691px;
top: -72px;



/* 12 104 */

position: absolute;
width: 630px;
height: 716px;
left: 692px;
top: -38px;



/* 12 76 */

position: absolute;
width: 630px;
height: 716px;
left: 691px;
top: -209px;



/* 12 105 */

position: absolute;
width: 630px;
height: 716px;
left: 692px;
top: -175px;



/* 12 77 */

position: absolute;
width: 630px;
height: 716px;
left: 1053px;
top: 116px;



/* 12 106 */

position: absolute;
width: 630px;
height: 716px;
left: 1054px;
top: 150px;



/* 12 78 */

position: absolute;
width: 630px;
height: 716px;
left: 686px;
top: -353px;



/* 12 107 */

position: absolute;
width: 630px;
height: 716px;
left: 687px;
top: -319px;



/* 12 79 */

position: absolute;
width: 630px;
height: 716px;
left: 1048px;
top: -28px;



/* 12 108 */

position: absolute;
width: 630px;
height: 716px;
left: 1049px;
top: 6px;



/* 12 80 */

position: absolute;
width: 630px;
height: 716px;
left: 1048px;
top: -165px;



/* 12 109 */

position: absolute;
width: 630px;
height: 716px;
left: 1049px;
top: -131px;



/* Vector */

position: absolute;
width: 34px;
height: 24px;

background: #7BA0FF;


/* Arrow 1 */

box-sizing: border-box;

position: absolute;
width: 107px;
height: 0px;

border: 3px solid #000000;
transform: rotate(180deg);


/* Arrow 2 */

box-sizing: border-box;

position: absolute;
width: 156px;
height: 0px;

border: 3px solid #000000;
transform: rotate(-179.63deg);
`;




export const Containercert = styled.div`

@import url('https://fonts.googleapis.com/css?family=Saira+Condensed:700');
#colorrrr{
  background-image: url("bgdesert.jpg");
  // backgroundColor:red;
}
hr {
  background-color: #be2d24;
  height: 3px;
  margin: 5px;
}


input[type=text] {
  background-color:#F1F0E8 ;
  width: 30%;
  // padding: 12px 2px;
  margin: 8px 400px;
  box-sizing: border-box;
  border: none;
  font-size: 20px;
  border-bottom: 4px solid rgb(191 162 160);
}


div#cert-footer {
  position: absolute;
  width: 60%;
  top: 650px;
  text-align: center;
}

#cert-stamp, #cert-ceo-sign {
  display :flex;
  justifyContent:center;
  width: 150%;
  display: inline-block;
  // marginBottom:10px;
}

div#cert-issued-by, div#cert-ceo-design {
  width: 40%;

  display: inline-block;
  // float: left;
}

div#cert-ceo-design {
  margin-left: 50%;
}
div#cert-ceo-design1 {
  margin-left: 30%;
  margin-right:30%;
}
h1 {
  font-family: 'Saira Condensed', sans-serif;
  margin: 5px 0px;
}

// body {
//   width: 950px;
//   height: 990px;
//   position: absolute;
//   left: 30px;
//   top: 30px;
//   border: 3px solid red;
// }

p {
  font-family: 'Arial', sans-serif;
  font-size: 18px;
  margin: 5px 0px;
}

html {
  display: inline-block;
  width: 1024px;
  height: 768px;
  border: 2px solid red;
  background: #eee url("https://i.pinimg.com/originals/b3/17/db/b317db24945589699a4ef18150dc5b73.jpg") no-repeat; background-size: 100%;
}

h1#cert-holder {
  // font-size: 50px;
  color: #b8860b;
}

p.smaller {
  font-size: 17px !important;
}

div#cert-desc {
  width: 70%;
}

p#cert-from {
  color: #be2d24;
  font-family: 'Saira Condensed', sans-serif;
}

div#cert-verify {
  opacity: 1;
  position: absolute;
  top: 680px;
  left: 60%;
  font-size: 12px;
  color: grey;
}

borderr{
  outline-style: double;
}


`;







export const HeaderContainer = styled.span`
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


export const Hovereffect = styled.div`

  .hide {
    display: none;
  }
      
  .myDIV:hover + .hide {
    display: block;
    color: red;
  }
  ;`

