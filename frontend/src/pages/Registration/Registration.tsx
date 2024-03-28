import "./Registration.css";
import { RegistrationForm } from "./RegistrationForm";

export const Registration = () => {
  return (
    <div className="regis-container">
      <h1 className="title-regis">Create an account</h1>
      <p className="subtitle-regis">
        Enter your email and password to get started
      </p>
      <RegistrationForm />
    </div>
  );
};
