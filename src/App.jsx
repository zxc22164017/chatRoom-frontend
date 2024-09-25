import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import Index from "./pages";
import ProfilePage from "./pages/ProfilePage";
import { useEffect } from "react";
import { useGetUserQuery } from "./store";
import { useDispatch } from "react-redux";
import LoadingPage from "./pages/LoadingPage";

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
  const { isLoading } = useGetUserQuery();

  return isLoading ? (
    <LoadingPage />
  ) : (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
