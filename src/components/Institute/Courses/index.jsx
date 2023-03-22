import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { ROOT_URL } from "../../../App";
import * as actionTypes from "../../../store/actions";
import { showNotification } from "../../../util/notification";
import CoursessTable from "./CoursessTable";
import AddNewCourses from "./AddNewCourses";



export const Coursess = () => {
  const BASE_URL = `${ROOT_URL}/institute/courses`;
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
    const key = query.get("view") || "list";
    if (key === "edit") {
      getInitialCompanyProps(key);
    } else {
      setView(key);
    }
  }, [query]);

  if (currentView === "list") {
    return <CoursessTable />;
  }
  //  else if (currentView === "edit") {
  //   return <AddNewCourses isUpdating />;
  // }
  return <AddNewCourses />;
};

export default Coursess;
