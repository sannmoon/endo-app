import { Header } from "../../components/Header/Header";
import "./Registration.css";
import { RegistrationForm } from "./RegistrationForm";

export const Registration = () => {
  return (
    <div className="bg-white h-auto w-[600px] rounded-lg p-9 mt-[20%]">
      <Header
        title="Create an account"
        subtitle="Enter your email and password to get started"
      />
      <RegistrationForm />
    </div>
  );
};
