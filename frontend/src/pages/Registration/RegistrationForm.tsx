import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LabeledInput } from "../../components/LabeledInput/LabeledInput";
import { Button } from "../../components/Button/Button";
import { useContext, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../../App";

export const RegistrationForm = () => {
  const { setIsLoggedIn } = useContext(AppContent);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required("Please enter a valid email address"),
    password: yup
      .string()
      .required("Please enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "Password must be 6 or more characters, an Uppercase, a Lowercase, a Number and a Special Case Character"
      ),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords Do Not Match")
      .required("Please confirm your password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        data
      );
      localStorage.setItem("token", response.data.token); //Storing token in local storage
      setIsLoggedIn(true);
      navigate("/");
    } catch (error: any) {
      if (error.response?.data?.errorMessage) {
        setError("email", {
          type: "custom",
          message: error.response.data.errorMessage,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, () => {})}>
      <div className="form-group">
        <LabeledInput
          label="Email"
          type="email"
          placeholder="m@example.com "
          errors={errors.email?.message}
          {...register("email")}
        />
        <LabeledInput
          label="Password"
          type="password"
          errors={errors.password?.message}
          {...register("password")}
        />
        <LabeledInput
          label="Repeat Password"
          type="password"
          errors={errors.repeatPassword?.message}
          {...register("repeatPassword")}
        />
        <Button label={loading ? "Loading 🌿" : "Signup"} />
      </div>
    </form>
  );
};
