// import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";

import * as React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function NavScrollExample() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dummyAdminData = {
    name: "John Doe",
    email: "john-doe@gmail.com",
    phone: "+91 9489762891",
  };

  // const handleLogin = (key) => {
  //   setLoginType(key);
  //   setIsModalOpen(true);
  // };

  return (
    <Navbar bg="white" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <img src="/images/logo 1.png" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 text-bold"
            style={{
              maxHeight: "100px",
              fontWeight: "bold",
              fontSize: "150%",
              borderSpacing: "4rem",
              color: "red",
            }}
            navbarScroll
          >
            {/* <Nav.Link href="/government/home">College</Nav.Link> */}
            {/* <Nav.Link href="/constructor/home">Verifier</Nav.Link> */}
            {/* <Nav.Link href="/" >Company</Nav.Link> */}
            <Nav.Link href="/admin">Admin</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <div className="contact tab">
              <img
                onClick={handleOpen}
                src="/images/contactus.svg"
                alt="logo"
              />
              {/* <Button >Open modal</Button> */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Contact Details
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div>
                    <UserOutlined />
                    {dummyAdminData.correspondent?.name || "John"}
                  </div>
                  <div>
                    <MailOutlined />
                    {dummyAdminData.correspondent?.email || "Johnsingh@iitk"}
                  </div>
                  <div>
                    <PhoneOutlined />
                    {dummyAdminData.correspondent?.phoneNumber ||
                      "+91 875264724"}
                  </div>
                  </Typography>
                  
                 

                  {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </Typography> */}
                </Box>
              </Modal>
            </div>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
