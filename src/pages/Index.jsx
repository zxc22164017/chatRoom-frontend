import React, { Suspense } from "react";
import { useDetectLogin } from "../hooks/useDetectLogin";
import LoadingPage from "./LoadingPage";
import { useGetUserQuery } from "../store";
import { skipToken } from "@reduxjs/toolkit/query";

const LandingPage = React.lazy(() => import("./LandingPage"));
const HomePage = React.lazy(() => import("./HomePage"));

const Index = () => {
  const token = useDetectLogin();
  const { isError, isSuccess } = useGetUserQuery(token || skipToken);
  if (!token || isError) {
    return (
      <Suspense fallback={<LoadingPage />}>
        <LandingPage />
      </Suspense>
    );
  }
  if (token || isSuccess) {
    return (
      <Suspense fallback={<LoadingPage />}>
        <HomePage />
      </Suspense>
    );
  }
};

export default Index;
