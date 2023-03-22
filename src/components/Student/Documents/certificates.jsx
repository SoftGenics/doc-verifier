// import { Certificates } from "./styles";
// import { ROOT_URL } from "../../../App";
// import { Fragment } from "react";

// export const Certificate = () => {

//     // const BASE_URL = `${ROOT_URL}/certificate`;

//     <Fragment>
// <div class="card text-center">
//   <div class="card-header">
//     Featured
//   </div>
//   <div class="card-body">
//     <h5 class="card-title">Special title treatment</h5>
//     <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
//   <div class="card-footer text-muted">
//     2 days ago
//   </div>
// </div>

//     </Fragment>
// }

// export default Certificate;

import { Fragment, useState } from "react";
import Qr_code from "../Timeline/Qrcode";

import { TimelineBody, HeaderContainer, Body, Containercert, Hovereffect } from "./styles";

// import { useNavigate } from "react-router-dom";

const Certificate = () => {
  return (

    <Containercert>
<Hovereffect>
 <Qr_code/>

</Hovereffect>
     
 
    <div className="container   border border-5 p-5 pb-4 "style={{ backgroundImage: `url("/images/imggg2.png")`,backgroundSize:'cover',backgroundColor:'#F1F0E8'}}>
   
    
      <h1
        id="cert-title"
        style={{

          display: "flex",
          justifyContent: "center",
          fontSize: "7rem",
          fontFamily: "serif",
        }}
      >
        CERTIFICATE
      </h1>
      <h1
        id="cert-holder"
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "4rem",
          fontFamily: "serif",
        }}
      >
        OF APPRECIATION
      </h1>
      <br />
      <br />
      <br />
      <br />
      <h2
        class="smaller"
        id="cert-declaration"
        style={{
          display: "flex",
          justifyContent: "center",
          fontFamily: "revert-layer",
        }}
      >
       THE FOLLOWING AWARD IS GIVEN TO
      </h2>
      <br></br>
      <br></br>
      <div id="">
      <input type="text" id="fname " name="fname"/>
         {/* <hr ></hr> */}
        
       </div>
    

      {/* <div
       id="cert-ceo-design1
     
      >
      
<hr ></hr>
       <br></br>
        
      </div> */}
{/* */}


      <p
        class="smaller"
        id="cert-completed-line"
        style={{ display: "flex", justifyContent: "center",textAlign:"center" }}
      >

        This certificate is given to Marceline Anderson
        <br />
         for his achievement in
        the field of education
        
         and proves that he is competent in his field.
      </p>
      {/* <p class="smaller" id="cert-issued">
        <b>Issued on:</b>
        {{date}}.
      </p> */}
             <br /> <br /> <br /> <br /> <br /> <br />        <br />
      <div id="cert-footer ml-5" style={{ display: "flex",textAlign:"center" }}>
        <div id="cert-issued-by">
         
          <hr></hr>
          <p>
               Issued by
               <br />
               THE COMPANY S.L.
             </p>
        </div>
{/* <div >

<img 
            id="cert-stamp"
             src="/images/wheat.png" alt="logo" 
          />
  
</div> */}


        <div id="cert-ceo-design">
         
          <hr></hr>
          <p>
               Company Ceo
               <br />
               CEO of The Company
             </p>
        </div>
      </div>
      <br />
     
  
    </div>

   
  </Containercert>










//     <Containercert>
//       <div className="container   border border-5 border-warning "style={{ backgroundImage: `url("/images/certificate1.png")`,backgroundSize:'cover',backgroundColor:'#F1F0E8'}}>
       
//        {/* <Qr_code></Qr_code> */}
       
//         <h1
//           id="cert-title"
//           style={{

//             display: "flex",
//             justifyContent: "center",
//             fontSize: "7rem",
//             fontFamily: "serif",
//           }}
//         >
//           CERTIFICATE
//         </h1>
//         <h1
//           id="cert-holder"
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             fontSize: "4rem",
//             fontFamily: "serif",
//           }}
//         >
//           OF APPRECIATION
//         </h1>
//         <br />
       
//         <h2
//           class="smaller"
//           id="cert-declaration"
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             fontFamily: "revert-layer",
//           }}
//         >
//           THE FOLLOWING AWARD IS GIVEN TO
//         </h2>
//         <br></br>
//         <br></br>

//         {/* <div class="input-group input-group-sm mb-1">
//   <input type="text" class="form-control" placeholder="" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
 
// </div> */}

//         <div
//           id="cert-ceo-design1"
       
//         >
// <hr ></hr>
//          <br></br>
          
//         </div>
//  {/* <div id="cert-ceo-design">
           
//            <hr ></hr>
          
//          </div> */}


//         <p
//           class="smaller"
//           id="cert-completed-line"
//           style={{ display: "flex", justifyContent: "center",textAlign:"center" }}
//         >

//           This certificate is given to Marceline Anderson
//           <br />
//            for his achievement in
//           the field of education
          
//            and proves that he is competent in his field.
//         </p>
//         {/* <p class="smaller" id="cert-issued">
//           <b>Issued on:</b>
//           {{date}}.
//         </p> */}
//                <br /> <br /> <br /> <br /> <br /> <br />        <br />
//         <div id="cert-footer ml-5" style={{ display: "flex",textAlign:"center" }}>
//           <div id="cert-issued-by">
           
//             <hr></hr>
//             <p>
//               Issued by
//               <br />
//               THE COMPANY S.L.
//             </p>
//           </div>
// {/* <div >

// <img 
//               id="cert-stamp"
//                src="/images/wheat.png" alt="logo" 
//             />
    
// </div> */}


//           <div id="cert-ceo-design">
           
//             <hr></hr>
//             <p>
//               Company Ceo
//               <br />
//               CEO of The Company
//             </p>
//           </div>
//         </div>
//         <br />
      
    
//       </div>
//     </Containercert>
  );
};

export default Certificate;
