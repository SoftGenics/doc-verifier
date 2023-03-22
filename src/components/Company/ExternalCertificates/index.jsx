import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ExternalList from "./list";
import AddNewCertificate from "./AddNewCertificate";

export const AppliedCandidates = () => {
  const [query] = useSearchParams();
  const [currentView, setView] = useState("list");

  useEffect(() => {
    const key = query.get("view") || "list";
    setView(key);
  }, [query]);

  if (currentView === "list") {
    return <ExternalList />;
  }
  return <AddNewCertificate />;
};

export default AppliedCandidates;
