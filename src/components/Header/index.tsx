import { useAuth } from "../../contexts/auth";
import "./styles.css";

export const Header = () => {
  const { user } = useAuth();

  const { photoURL, name, email } = user;

  return (
    <header className="header-container">
      <div className="header-container__user">
        <img className="header-container__user-avatar" src={photoURL} alt={`imagem perfil ${name}`} srcSet="" />
        <span className="header-container__user-datails">
          <h1>{name}</h1>
          <span>{email}</span>
        </span>
      </div>
    </header>
  );
};
