import { useDetectLogin } from "../hooks/useDetectLogin";
import LandingPage from "./LandingPage";
import HomePage from "./HomePage";

import Alert from "../components/Alert";

const Index = () => {
  const loginOrNot = useDetectLogin();
  if (!loginOrNot) {
    return <LandingPage />;
  }
  if (loginOrNot) {
    return <HomePage />;
  }
};

export default Index;
