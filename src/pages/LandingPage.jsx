import react, { useState } from "react";
import Button from "../components/Button";
import { AnimatePresence } from "framer-motion";
const LoginModel = react.lazy(() => import("../models/LoginModel"));
const RegisterModel = react.lazy(() => import("../models/RegisterModel"));
const ForgetPasswordModal = react.lazy(() =>
  import("../models/ForgetPasswordModal")
);

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const loginModel = showLogin && (
    <LoginModel
      onChange={() => setShowLogin(false)}
      onRegister={() => {
        setShowRegister(true);
      }}
      onForget={() => {
        setShowForgetPassword(true);
      }}
    />
  );
  const registerModel = showRegister && (
    <RegisterModel
      onChange={() => setShowRegister(false)}
      onLogin={() => {
        setShowLogin(true);
      }}
    />
  );
  const forgetPassword = showForgetPassword && (
    <ForgetPasswordModal onChange={() => setShowForgetPassword(false)} />
  );

  return (
    <div className=" flex flex-col xl:flex-row h-screen mx-4 md:px-16 xl:items-center  justify-evenly ">
      <AnimatePresence mode="sync">
        {loginModel}
        {registerModel}
        {forgetPassword}
      </AnimatePresence>
      <div className=" h-36 w-36 xl:h-96 xl:w-96 ml-48 md:ml-0 mb-36 md:mb-10 xl:mb-0 xl:mr-72 z-10 ">
        <img
          src="./logo.svg"
          rel="preload"
          className="w-full h-full object-fill"
          alt="logo"
        />
      </div>
      <div className="flex flex-col z-10  xl:w-1/4 ">
        <h1 className="font-bold text-4xl xl:text-6xl my-5">One Frame</h1>
        <h3 className="text-2xl font-bold md:mb-10 text-gray-700 ">
          One Emotion
        </h3>

        <div className="mb-14">
          <Button
            className="w-2/3 mb-5"
            primary
            rounded
            onClick={() => setShowRegister(true)}
          >
            Register
          </Button>
          <h3 className=" text-gray-700 font-semibold text-lg pl-2 my-3">
            Already have an account?
          </h3>
          <Button
            className="w-2/3 mb-2"
            secondary
            rounded
            onClick={() => setShowLogin(true)}
          >
            Login
          </Button>
        </div>
      </div>
      <div className="fixed inset-y-0 -inset-x-1/2  animate-slide rotate-45  bg-gradient-to-bl from-topic-100 to-amber-100 opacity-50 blur"></div>
      <div className="fixed   inset-y-0 right-0 w-1/2  [animation-delay:0.6s] animate-slide  bg-gradient-to-l from-sky-100 to-emerald-300 opacity-40 blur-3xl"></div>
      <div className="fixed   inset-y-0 left-0 w-full  [animation-delay:1.2s] animate-slide  bg-gradient-to-l from-emerald-300 to-sky-300 opacity-40 blur-3xl"></div>
      <div className="fixed  inset-y-0 left-0 w-1/2  [animation-delay:1.8s] animate-slide  bg-gradient-to-l from-sky-300 to-sky-100 opacity-40 blur-3xl"></div>
    </div>
  );
};

export default LandingPage;
