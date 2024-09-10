import { Header } from "../../components/Header/Header";
import { RegistrationForm } from "./RegistrationForm";

export const Registration = () => {
  return (
    <div className="bg-white h-auto md:w-[600px] w-[350px] rounded-lg p-9 mt-[20%]">
      <Header
        title="Create an account"
        subtitle="Enter your email and password to get started"
      />
      <RegistrationForm />
    </div>
  );
};
