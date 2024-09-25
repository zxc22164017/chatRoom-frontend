import { LoadingFancy } from "../components/Loading/LoadingFancy";
import React from "react";


function LoadingPage() {
  return (
    <div className="flex  min-h-screen justify-center items-center bg-topic-500">
      <LoadingFancy />
    </div>
  );
}

export default LoadingPage;
