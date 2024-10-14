import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Suspense } from "react";
import Root from "./pages/Root";
import Index from "./pages";
import { useGetUserQuery } from "./store";
import LoadingPage from "./pages/LoadingPage";
import { skipToken } from "@reduxjs/toolkit/query";
import { useDetectLogin } from "./hooks/useDetectLogin.js";
import LoadingFancy from "./components/Loading/LoadingFancy.jsx";
const Profile = React.lazy(() =>
  import("./components/SettingPage/Profile.jsx")
);
const CommunityPage = React.lazy(() => import("./pages/CommunityPage.jsx"));
const ChatPage = React.lazy(() => import("./pages/ChatPage.jsx"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage.jsx"));
const CreatePostPage = React.lazy(() => import("./pages/CreatePostPage.jsx"));
const PostPage = React.lazy(() => import("./pages/PostPage.jsx"));
const SearchPage = React.lazy(() => import("./pages/SearchPage.jsx"));
const SettingPage = React.lazy(() => import("./pages/SettingPage.jsx"));
const EditPostPage = React.lazy(() => import("./pages/EditPostPage.jsx"));
const NotFound = React.lazy(() => import("./pages/NotFound.jsx"));

const CreateCommunityPage = React.lazy(() =>
  import("./pages/CreateCommunityPage.jsx")
);

const EditCommunityPage = React.lazy(() =>
  import("./pages/EditCommunityPage.jsx")
);

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
        element: (
          <Suspense fallback={<LoadingPage />}>
            <ChatPage />
          </Suspense>
        ),
      },
      {
        path: "/profile/:_id",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: "/newPost",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <CreatePostPage />
          </Suspense>
        ),
      },
      {
        path: "/post/:_id",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <PostPage />
          </Suspense>
        ),
      },
      {
        path: "/c/:name",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <CommunityPage />
          </Suspense>
        ),
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: "/post/edit/:_id",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <EditPostPage />
          </Suspense>
        ),
      },
      {
        path: "/rhufiewjifewfwepfNewCommunity",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <CreateCommunityPage />
          </Suspense>
        ),
      },
      {
        path: "/editCommunity/:communityName",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <EditCommunityPage />
          </Suspense>
        ),
      },
      {
        path: "/setting/",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <SettingPage />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingFancy />}>
                <Profile />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingFancy />}>
            <NotFound />
          </Suspense>
        ),
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
