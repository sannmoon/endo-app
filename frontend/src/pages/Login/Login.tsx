import { Header } from "../../components/Header/Header";
import { LoginForm } from "./LoginForm";

export const Login = () => {
  return (
    <div className="bg-white h-auto md:w-[600px] w-[300px] rounded-lg p-9 mt-[40%]">
      <Header
        title="Login"
        subtitle="Enter your email and password to get started"
      />
      <LoginForm />
    </div>
  );
};
