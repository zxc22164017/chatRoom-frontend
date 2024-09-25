import { useDetectLogin } from "../hooks/useDetectLogin";
import LandingPage from "./LandingPage";
import HomePage from "./HomePage";

import Alert from "../components/Alert";

function Index() {
  const loginOrNot = useDetectLogin();
  if (!loginOrNot) {
    return <LandingPage />;
  }
  if (loginOrNot) {
    return <HomePage />;
  } else if (error) {
    return (
      <div>
        <Alert error={"something went wrong"} />
      </div>
    );
  }
}

export default Index;
