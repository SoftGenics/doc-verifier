import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { ROOT_URL } from "../../../App";
import * as actionTypes from "../../../store/actions";
import { showNotification } from "../../../util/notification";
import CandidateList from "./list";
import CandidateDetails from "./CandidateDetails";

export const AppliedCandidates = () => {
  const BASE_URL = `${ROOT_URL}/company/application`;
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const [currentView, setView] = useState("list");


  const getInitialApplicationProps = (key) => {
    const applicationId = query.get("id") || "";
    Axios.get(`${BASE_URL}/`, {
      params: {
        id: applicationId,
      },
    })
      .then((res) => {
        dispatch({
          type: actionTypes.SAVE_COMPANY_CURRENT_APPLICATION,
          current_application: res.data,
        });
        setView(key);
        showNotification(
          "Application Details Fetched Successfully",
          "Application Details Fetched Successfully",
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
      getInitialApplicationProps(key);
    } else {
      setView(key);
    }
  }, [query]);

  if (currentView === "list") {
    return <CandidateList />;
  }
  return <CandidateDetails />;
};

export default AppliedCandidates;
