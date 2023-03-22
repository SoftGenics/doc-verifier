import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { ROOT_URL } from "../../../App";
import * as actionTypes from "../../../store/actions";
import { showNotification } from "../../../util/notification";
import { Carrierskillcertificate } from "./Carrierskills";
import Certificate from "./certificates";
// import EmployeeList from "./list";
// import EmployeeDetails from "./EmployeeDetails";
// import AddNewCertificate from "./EmployeeDetails/AddNewCertificate";
// import AddNewEmployee from "./AddNewEmployee";
// import AddNewstudentCertificate from "./Studentcertificate/AddNewCertificate";

export const Certificatesss = () => {
  const BASE_URL = `${ROOT_URL}/company/student`;
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const [currentView, setView] = useState("list");

  const getInitialEmployeeProps = (key) => {
    const employeeId = query.get("id") || "";
    Axios.get(`${BASE_URL}/`, {
      params: {
        id: employeeId,
      },
    })
      .then((res) => {
        dispatch({
          type: actionTypes.SAVE_COMPANY_CURRENT_EMPLOYEE,
          current_employee: res.data,
        });
        setView(key);
        showNotification(
          "Employee Details Fetched Successfully",
          "Employee Details Fetched Successfully",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };

  useEffect(() => {
    const key = query.get("view") || "list";
    if (key === "details") {
      getInitialEmployeeProps(key);
    } else {
      setView(key);
    }
  }, [query]);

  if (currentView === "carrierskill") {
    return <Carrierskillcertificate />;
  } else if(currentView === "certificate"){
    return <Certificate />
  } 
  
//   else if (currentView === "new"){
//     return <AddNewEmployee />
//   } else if (currentView === "edit"){
//     return <AddNewEmployee isUpdating/>
//   }

  return <Carrierskillcertificate />;
};

export default Certificatesss;
