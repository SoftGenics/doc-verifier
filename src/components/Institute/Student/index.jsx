import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Axios from "axios";

import { ROOT_URL } from "../../../../src/App";
import * as actionTypes from "../../../../src/store/actions";
import { showNotification } from "../../../../src/util/notification";


// import AddNewCompany from "./AddNewCompany";
// import CompanyTable from "./CompanyTable";
import Certificate from "../../Student/Documents/certificates";
import Studentinfo from "./studentdetails";
import NewCertificate from "./Newcertificate";


export const Students = () => {
  const BASE_URL = `${ROOT_URL}/institute/student`;
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const [currentView, setView] = useState("list");

  const getInitialCompanyProps = (key) => {
    const companyId = query.get("id") || "";
    Axios.get(`${BASE_URL}/`, {
      params: {
        id: companyId,
      },
    })
      .then((res) => {
        dispatch({
          type: actionTypes.SAVE_ADMIN_COMPANY,
          current_company: res.data,
        });
        setView(key);
        showNotification(
          "Company Details Fetched Successfully",
          "Company Details Fetched Successfully",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };

  useEffect(() => {
    const key = query.get("view") || "list"||"new-certificate";
    if (key === "edit") {
      getInitialCompanyProps(key);
    } else {
      setView(key);
    }
  }, [query]);

  if (currentView === "list") {
    return <Studentinfo />;
  } 

  else if (currentView === "edit"){
    return <NewCertificate isUpdating/>
  }

  else if (currentView === "new-certificate"){
    return <NewCertificate />
  }
  // else if (currentView === "edit") {
  //   return <Certificate isUpdating />;
  // }
  return <NewCertificate />;
};

export default Students;
