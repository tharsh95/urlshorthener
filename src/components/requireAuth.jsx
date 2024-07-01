/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { UrlState } from "@/context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();

  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (!isAuthenticated && loading === false) {
      navigate("/auth");
    }
  }, [isAuthenticated, loading]);

  if (loading) return <BarLoader width={"100%"} color="black" />;
  if (isAuthenticated) return children;
};

export default RequireAuth;
