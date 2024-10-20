import react, { Suspense, useState } from "react";
import Button from "../components/Button";

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
      {loginModel}
      {registerModel}
      {forgetPassword}
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

        <div className="mb-12">
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
      <div className="hidden xl:block absolute h-[1300px] w-[890px] right-0 rounded-full bg-topic-400 rounded-r-none">
        <div className=" absolute right-0  rounded-full rounded-r-none bg-topic-300   h-[1300px] w-[834px] "></div>
        <div className=" absolute right-0  rounded-full rounded-r-none bg-topic-200   h-[1300px] w-[780px] "></div>
        <div className=" absolute right-0  rounded-full rounded-r-none bg-topic-100   h-[1300px] w-[740px] "></div>
        <div className=" absolute right-0  rounded-full rounded-r-none bg-topic-50   h-[1300px] w-[712px] "></div>
      </div>
      <div className="block xl:hidden  absolute bg-topic-400 w-screen h-2/3 bottom-0 left-0 rounded-tr-full">
        <div className="block xl:hidden  absolute bg-topic-300 -translate-x-10 translate-y-10 w-full h-full bottom-0 left-0 rounded-tr-full">
          <div className="block xl:hidden  absolute bg-topic-200 -translate-x-8 translate-y-8 w-full h-full bottom-0 left-0 rounded-tr-full">
            <div className="block xl:hidden  absolute bg-topic-100 -translate-x-6 translate-y-6 w-full h-full bottom-0 left-0 rounded-tr-full">
              <div className="block xl:hidden  absolute bg-topic-50 -translate-x-3 translate-y-3 w-full h-full bottom-0 left-0 rounded-tr-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
