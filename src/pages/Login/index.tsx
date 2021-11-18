import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

export const Login = () => {
  const { loginGoogle, isAuthenticated } = useAuth();
  const a = null;
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  return (
    <div>
      Login
      <button type="button" onClick={loginGoogle}>Google</button>
    </div>
  );
};
