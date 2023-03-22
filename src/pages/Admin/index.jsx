import { useNavigate } from "react-router-dom";
import { Button, Form, Input, notification } from "antd";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { ROOT_URL } from "../../App";
import * as actionTypes from "../../store/actions";
import { HomeBody, HeaderContainer, Body } from "./styles";
import Container from 'react-bootstrap/Container';
const Home = () => {
  const BASE_URL = `${ROOT_URL}/admin`;

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    Axios.post(`${BASE_URL}/login`, {
      ...values,
    })
      .then((res) => {
        dispatch({
          type: actionTypes.SET_LOGIN_INFO,
          loginInfo: {
            token: res.data.payload,
          },
        });
        notification.success({
          name: "Login Successful",
          message: "Login Successful",
          placement: "bottomLeft",
        });
        navigate("home");
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          name: "Login Failed",
          message: "Invalid Credentials",
          placement: "bottomLeft",
        });
      });
  };
  return (

    <HomeBody>

      <HeaderContainer>
        <div className="logo">
          <img src="/images/logo 1.png" alt="logo" />
        </div>
      </HeaderContainer>


      <Body>
        <Container

        >
          <h3 className="hello">👋 Admin</h3>
          <div className="choose-your-option1">Enter Creds</div>


        </Container>




        <Form
          name="College Form "
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="form ">
            <div className="admin-id">
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input E-mail!",
                  },
                ]}
              >
                <Input placeholder="Admin ID" autoComplete="new-password" />
              </Form.Item>
            </div>
            <div className="password">

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input password!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  autoComplete="new-password"
                />
              </Form.Item>
            </div>
          </div>
          <div className="actions">
            <div className="login-btn">
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
            <div className="forget-password">Forgot Password ?</div>
          </div>
        </Form>



        <div className="home-wrapper   img-fluid">
          <img src="/images/homeimg.svg" alt="home img" />
        </div>
      </Body>

    </HomeBody>
  );
};

export default Home;
