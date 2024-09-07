import { Header } from "../../components/Header/Header";
import { LoginForm } from "./LoginForm";
import "./Login.css";

export const Login = () => {
  return (
    <div className="bg-white h-auto w-[600px] rounded-lg p-9 mt-[20%]">
      <Header
        title="Login"
        subtitle="Enter your email and password to get started"
      />
      <LoginForm />
    </div>
  );
};
