

    import { useState } from "react";
    import LoginFormModal from "../../components/Home/LoginModal";
    import { HomeBody, HeaderContainer, Body } from "./styles";
    
    import Figure from 'react-bootstrap/Figure';


    const Footer = () => {
        // const navigate = useNavigate();
      
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [loginType, setLoginType] = useState(null);
      
        const handleLogin = (key) => {
          setLoginType(key);
          setIsModalOpen(true);
        };
      
        return (
          <HomeBody >
           
      
            <div>
            <Body>
              <div>
                <div className="options ">
                  <div onClick={() => handleLogin("user")} className="option">
                    <img src="/images/student.svg" alt="student" />
                    <div>Student</div>
                  </div>
                  <div onClick={() => handleLogin("college")} className="option">
                    <img src="/images/teacher.svg" alt="college" />
                    <div>College</div>
                  </div>
                  <div onClick={() => handleLogin("company")} className="option">
                    <img src="/images/institute.svg" alt="company" />
                    <div>Company</div>
                  </div>
                </div>
              </div>
      
        
            </Body>
            </div>
            <LoginFormModal
              loginType={loginType}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </HomeBody>
        );
      };
      
      export default Footer;
      
      
      
      
      
      


//     <div class="container ">    
  
//   <div className="row options">
//     <div className="col-sm-4" onClick={() => handleLogin("user")} >
//       <img src="/images/student.svg" class="img-responsive" alt="Image"/>
//       <p>Student</p>
//     </div>
//     <div class="col-sm-4"onClick={() => handleLogin("college")}> 
//       <img src="/images/student.svg" class="img-responsive"  alt="Image"/>
//       <p>College</p>    
//     </div>
//     <div class="col-sm-4" onClick={() => handleLogin("company")}> 
//       <img src="/images/student.svg" class="img-responsive"  alt="Image"/>
//       <h1>Company</h1>    
//     </div>
      
    
