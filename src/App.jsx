import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import ChatPage from "./pages/ChatPage";
import Index from "./pages";
import ProfilePage from "./pages/ProfilePage";
import { useGetUserQuery } from "./store";

import LoadingPage from "./pages/LoadingPage";
import { skipToken } from "@reduxjs/toolkit/query";
import { useDetectLogin } from "./hooks/useDetectLogin.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/chat/:_id",
        element: <ChatPage />,
      },
      {
        path: "/profile/:_id",
        element: <ProfilePage />,
      },
    ],
  },
]);

function App() {
  const userToken = useDetectLogin();
  const { isLoading } = useGetUserQuery(userToken ?? skipToken);

  return isLoading ? (
    <LoadingPage />
  ) : (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
