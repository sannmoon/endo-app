import { Header } from "../../components/Header/Header";
import { LoginForm } from "./LoginForm";
import "./Login.css";

export const Login = () => {
  return (
    <div className="login-container">
      <Header
        title="Login"
        subtitle="Enter your email and password to get started"
      />
      <LoginForm />
    </div>
  );
};
