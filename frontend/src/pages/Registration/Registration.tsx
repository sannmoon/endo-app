import { Header } from "../../components/Header/Header";
import "./Registration.css";
import { RegistrationForm } from "./RegistrationForm";

export const Registration = () => {
  return (
    <div className="acc-container">
      <Header
        title="Create an account"
        subtitle="Enter your email and password to get started"
      />
      <RegistrationForm />
    </div>
  );
};
