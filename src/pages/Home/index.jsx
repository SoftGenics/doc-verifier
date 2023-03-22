import { useState } from "react";
import LoginFormModal from "../../components/Home/LoginModal";
import { HomeBody, HeaderContainer, Body } from "./styles";
import { useNavigate } from "react-router-dom";
import Figure from "react-bootstrap/Figure";
import { Navbar } from "react-bootstrap";
import NavScrollExample from "./NavScr";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginType, setLoginType] = useState(null);

  const handleLogin = (key) => {
    setLoginType(key);
    setIsModalOpen(true);
  };
  const handleAddStudent = () => {
   
    navigate("/student");
  
  };
  const handleAddInstitute = () => {
   
    navigate("/institute/home");
   
  };
  


  return (
    <HomeBody className="">
      <NavScrollExample></NavScrollExample>
      <HeaderContainer></HeaderContainer>

      <div className="">
        <Body>
          <div>
            <div className="hello">👋 Hello All</div>
            <Figure.Caption>
              {" "}
              <div className="choose-your-option">Choose your Option</div>{" "}
            </Figure.Caption>

            <div className="options ">
              {/* <div onClick={() => handleLogin("user")} className="option"> */}

              <div  onClick={handleAddStudent} className="option">
                <img src="/images/student.svg" alt="student" />
                <div>Student</div>
              </div>
              {/* <div onClick={() => handleLogin("college")} className="option"> */}

              <div  onClick={handleAddInstitute} className="option">
                <img src="/images/teacher.svg" alt="college" />
                <div>College</div>
              </div>
              <div onClick={() => handleLogin("company")} className="option">
                <img src="/images/institute.svg" alt="company" />
                <div>Company</div>
              </div>
            </div>
          </div>

          <div className="home-wrapper   img-fluid">
            <img src="/images/homeimg.svg" alt="home img" />
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

export default Home;
