import Sidebar from "components/Sidebar";
import { Outlet } from "react-router";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useMutation } from "@apollo/client";
import { useAuth } from "context/authContext";
import { REFRESH_TOKEN } from "graphql/auth/mutations";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";

const PrivateLayout = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [
    refreshToken,
    { data: dataMutation, loading: loadingMutation, error: errorMutation },
  ] = useMutation(REFRESH_TOKEN);

  useEffect(() => {
    refreshToken();
    if (errorMutation) {
      toast.error("Error refrescando token");
    }
  }, [refreshToken, errorMutation]);

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.refreshToken.token) {
        setToken(dataMutation.refreshToken.token);
      } else {
        setToken(null);
        navigate("/auth/login");
      }
      setLoadingAuth(false);
    }
  }, [dataMutation, setToken, loadingAuth, navigate]);

  if (loadingMutation || loadingAuth)
    return (
      <div className="flex flex-col justify-center items-center h-screen  bg-black">
        <ReactLoading
          type={"spinningBubbles"}
          color={"#0080FF"}
          height={"30%"}
          width={"10%"}
        />
      </div>
    );

  return (
    <div className="flex h-screen relative ">
      <Sidebar />
      <div className="flex w-full h-full ">
        <div className="w-full h-full  overflow-y-scroll">
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PrivateLayout;
