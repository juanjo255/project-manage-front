import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFormData from "hooks/useFormData";
import { useMutation } from "@apollo/client";
import { LOGIN } from "graphql/auth/mutations";
import { useAuth } from "context/authContext";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import wave from "media/wave1.jpg";
import logo from "media/beakerLogo.png";
import { toast } from "react-toastify";
import { Dialog, DialogTitle, DialogContent, List, ListItem} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();
  const [open, setOpen] = useState(false);

  const [
    login,
    { data: dataMutation, loading: mutationLoading, error: mutationError },
  ] = useMutation(LOGIN);

  const submitForm = (e) => {
    e.preventDefault();
    login({
      variables: formData,
    });
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.login.token) {
        setToken(dataMutation.login.token);
        navigate("/");
      }
    } else if (mutationError) {
      toast.error("Error en el Login");
    }
  }, [dataMutation, setToken, navigate, mutationError]);


  return (
    <div className="flex overflow-x-hidden ">
      <img src={wave} className=" hidden lg:block h-screen" alt="" />
      <div className="absolute flex flex-col justify-center w-screen h-screen ">
        <form
          className="flex flex-col justify-center items-center "
          onSubmit={submitForm}
          onChange={updateFormData}
          ref={form}
        >
          <img src={logo} alt="logo" className="h-20" />
          <div className="flex" onClick={()=>{setOpen(true)}}>
            <h2 className="my-8 font-display font-bold text-3xl text-center">
              RESEARCH PROJECTS 
            </h2>
            <i className="fas fa-question-circle hover:text-blue-700"/>
          </div>
          <div className="relative">
            <i className="fa fa-user absolute text-blue-800 text-xl" />
            <input
              name="Email"
              type="text"
              placeholder="email"
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-blue-800 transition-all duration-500 text-lg"
              required={true}
            />
          </div>
          <div className="relative mt-8">
            <i className="fa fa-lock absolute text-blue-800 text-xl"></i>
            <input
              name="Password"
              type="password"
              placeholder="password"
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-blue-800 transition-all duration-500 text-lg"
              required={true}
            />
          </div>
          <button
            disabled={Object.keys(formData).length === 0}
            type="submit"
            className="py-3 px-20 bg-blue-800 hover:bg-blue-600 rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500"
          >
            {mutationLoading ? (
              <ReactLoading type="spin" height={30} width={30} />
            ) : (
              <div> SIGN IN </div>
            )}
          </button>
          <span className="mt-4 text-gray-600 font-bold">
            Don't you have an account?
          </span>
          <Link to="/auth/register">
            <span className="text-blue-700">SIGN UP</span>
          </Link>
        </form>
      </div>
      <Dialog open={open} onClose={()=>(setOpen(false))}>
        <DialogTitle sx={{fontWeight:800}} >Research Projects</DialogTitle>
        <DialogContent className=" font-semibold">On this page, students can enroll in research projects of 
          their interest. Here we find 3 Roles:
        </DialogContent>
        <List >
          <ListItem className="dialog">
            <span className="font-bold">Administrator:</span> can see and modify registered projects and users.
          </ListItem>
          <ListItem className="dialog">
            <span className="font-bold">Leader:</span> can see and modify its projects and inscriptions to its projects.
          </ListItem>
          <ListItem className="dialog">
            <span className="font-bold">Student: </span> only can see and enroll into active projects.
          </ListItem>
        </List>

      </Dialog>
    </div>
  );
};

export default Login;
