import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { ROOT_URL } from "../../../App";
import * as actionTypes from "../../../store/actions";
import { showNotification } from "../../../util/notification";
import AddNewCollege from "./AddNewCollege";
import CollegeTable from "./CollegeTable";

export const College = () => {
  const BASE_URL = `${ROOT_URL}/admin/college`;
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const [currentView, setView] = useState("list");

  const getInitialCollegeProps = (key) => {
    const collegeId = query.get("id") || "";
    Axios.get(`${BASE_URL}/`, {
      params: {
        id: collegeId,
      },
    })
      .then((res) => {
        dispatch({
          type: actionTypes.SAVE_ADMIN_COLLEGE,
          current_college: res.data,
        });
        setView(key);
        showNotification(
          "College Details Fetched Successfully",
          "College Details Fetched Successfully",
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
      getInitialCollegeProps(key);
    } else {
      setView(key);
    }
  }, [query]);

  if (currentView === "list") {
    return <CollegeTable />;
  } else if (currentView === "edit") {
    return <AddNewCollege isUpdating />;
  }
  return <AddNewCollege />;
};

export default College;
