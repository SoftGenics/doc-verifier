import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminHome from "./pages/Admin/Home";
import Company from "./pages/Company";
import Student from "./pages/Student";
import Institute from "./pages/Institute";

import InstituteHome from "./pages/Institute/Home";


import "antd/dist/antd.min.css";
// import { Footer, Header } from "antd/lib/layout/layout";
import NavScrollExample from "./pages/Home/footer";
import CoursesList from "./components/Student/Home/Studentcertificate/courses";
// import Certificate from "./components/Student/Documents/certificates";
// import AddNewCertificate from "./components/Company/ExternalCertificates/AddNewCertificate";
import AddNewstudentCertificate from "./components/Student/Home/Studentcertificate/AddNewCertificate";

import Certificate from "./components/Student/Documents/certificates";
import StudentDetails from "./components/Institute/Students/Newcertificate";
import BulkNewStudents from "./components/Institute/Students/AddNewStudents";
import Qr_code from "./components/Student/Timeline/Qrcode";
// import CertificateView from "./components/Institute/Student/CertificateView";


/* Enter URL without ending slash */
// export const ROOT_URL = "https://docs-verifier-backend-h8wm2.ondigitalocean.app";
export const ROOT_URL = "http://localhost:5000";

const App = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      {/* <Route path="/Footer" exact element={<Footer />} /> */}


      
      {/* <Route path="/qrcode" element={<Qr_code />} /> */}
      {/* <Route path="/cert" element={<Certificate />} /> */}

      <Route path="/bulkstudent" element={<BulkNewStudents />} />
      <Route path="/studentdetails" element={<StudentDetails />} />
      <Route path="/add" element={<AddNewstudentCertificate />} />
      {/* <Route path="/adds" element={<CertificateView />} /> */}

      <Route path="/NavScrollExample" exact element={<NavScrollExample />} />
      {/* <Route path="/Header" element={<PersistentDrawerLeft />} /> */}

      <Route path="/student/home" element={<CoursesList />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/home" element={<AdminHome />} />
   
      <Route path="/company" element={<Company />} />
      <Route path="/student" element={<Student />} />
      <Route path="/institute" element={<Institute />} />
      <Route path="/institute/home" element={<InstituteHome />} />

{/* 
      <Route path="/government/home" element={<GovernmentHome />} />
      <Route path="/constructor/home" element={<ConstructorHome />} /> */}
    </Routes>
  );
};

export default App;
