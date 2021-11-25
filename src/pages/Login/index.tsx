import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button";
import { useAuth } from "../../contexts/auth";
import "./styles.css";

export const Login = () => {
  const { loginGoogle, isAuthenticated } = useAuth();
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  return (
    <div className="login-container">
      <aside className="col-span-1 flex justify-center items-center px-1">
        <h1
          className="mt-6 text-center text-3xl font-extrabold text-gray-900"
        >
          Assine itens de uma lista facilmente.
        </h1>
      </aside>
      <main className="col-span-2 flex justify-center items-center">
        <Button
          type="button"
          className="primary"
          onClick={loginGoogle}
        >
          Login Google
        </Button>
      </main>
    </div>
  );
};
