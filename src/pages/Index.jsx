import React, { Suspense } from "react";
import { useDetectLogin } from "../hooks/useDetectLogin";
import LoadingPage from "./LoadingPage";

const LandingPage = React.lazy(() => import("./LandingPage"));
const HomePage = React.lazy(() => import("./HomePage"));

const Index = () => {
  const loginOrNot = useDetectLogin();
  if (!loginOrNot) {
    return (
      <Suspense fallback={<LoadingPage />}>
        <LandingPage />
      </Suspense>
    );
  }
  if (loginOrNot) {
    return (
      <Suspense fallback={<LoadingPage />}>
        <HomePage />
      </Suspense>
    );
  }
};

export default Index;
