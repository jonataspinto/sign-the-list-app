import { useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/auth";

export const Login = () => {
  const { loginGoogle, isAuthenticated } = useAuth();
  
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  return (
    <div>
      Login
      <button onClick={loginGoogle}>Google</button>
    </div>
  );
};
