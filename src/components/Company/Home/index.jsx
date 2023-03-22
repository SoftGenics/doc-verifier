import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import CompanyDetails from "./details";
import EditCompany from "./EditCompany";

export const CompanyHome = () => {
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const [currentView, setView] = useState("list");


  useEffect(() => {
    const key = query.get("view") || "list";
      setView(key);
  }, [query]);

  if (currentView === "list") {
    return <CompanyDetails />;
  }
  return <EditCompany />;
};

export default CompanyHome;
