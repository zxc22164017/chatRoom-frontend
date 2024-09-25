import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import LoginModel from "../models/LoginModel";
import RegisterModel from "../models/RegisterModel";

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const loginModel = showLogin && (
    <LoginModel
      onChange={() => setShowLogin(false)}
      onRegister={() => {
        setShowRegister(true);
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

  return (
    <div className=" flex h-screen items-center justify-evenly">
      {loginModel}
      {registerModel}
      <div className="bg-red-500 h-72 w-72 ">logo</div>
      <div className="flex flex-col w-1/4">
        <h1 className="font-bold text-7xl my-5">Slogan01</h1>
        <h3 className="text-2xl font-bold mb-10 text-gray-700 ">Slogan02</h3>

        <div className="">
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
    </div>
  );
}

export default LandingPage;
