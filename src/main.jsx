import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import { userApi } from "./store/apis/userApi.js";
import { skipToken } from "@reduxjs/toolkit/query";
import { useDetectLogin } from "./hooks/useDetectLogin.js";

// store.dispatch(userApi.endpoints.getUser.initiate({ skip: userToken }));

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
