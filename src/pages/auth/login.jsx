import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/auth/mutations';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import wave from 'media/wave1.jpg'
import logo from 'media/EAFITlogo.png'
import { toast } from 'react-toastify';


const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();

  const [login, { data: dataMutation, loading: mutationLoading, error: mutationError }] =
    useMutation(LOGIN);

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
        navigate('/');
      }
    }else if (mutationError){
      toast.error("Error en el Login")
    }
  }, [dataMutation, setToken, navigate, mutationError]);

  return (
    <div className='flex overflow-x-hidden '>
        <img src={wave} className=" hidden lg:block  h-screen" alt=""/>
        <div class="absolute w-screen h-screen  justify-start items-center ">
          <form className='flex flex-col justify-center items-center ' onSubmit={submitForm} onChange={updateFormData} ref={form}>
            <img src={logo} alt="logoEAFIT"/>
            <h2
              class="my-8 font-display font-bold text-3xl text-center"
            >
              SIGN IN
            </h2>
            <div className="relative">
              <i className="fa fa-user absolute text-blue-800 text-xl"/>
              <input
                name='Email'
                type="text"
                placeholder="email"
                class="pl-8 border-b-2 font-display focus:outline-none focus:border-blue-800 transition-all duration-500 capitalize text-lg"
                required={true} 
              />
            </div>
            <div class="relative mt-8">
              <i class="fa fa-lock absolute text-blue-800 text-xl"></i>
              <input
                name='Password'
                type="password"
                placeholder="password"
                class="pl-8 border-b-2 font-display focus:outline-none focus:border-blue-800 transition-all duration-500 capitalize text-lg"
                required={true} 
              />
            </div>
            <button
            disabled={Object.keys(formData).length === 0}
            type='submit'
            className="py-3 px-20 bg-blue-800 hover:bg-blue-600 rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500"
            >
            {mutationLoading ? <ReactLoading type='spin' height={30} width={30} /> : <div> SIGN IN </div>}
            </button>
            <span className="mt-4 text-gray-600 font-bold">Don't you have an account?</span>
            <Link to='/auth/register'>
            <span className='text-blue-700'>SIGN UP</span>
            </Link>
          </form>
        </div>
    </div>
  );
};

export default Login;
