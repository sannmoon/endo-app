import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LabeledInput } from "../../components/LabeledInput/LabeledInput";
import { Button } from "../../components/Button/Button";
import { useState } from "react";
import Axios from "axios";

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email().required("Please enter a valid email address"),
    password: yup.string().required("Please enter your password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await Axios.post(`http://localhost:3000/login`, data);
    } catch (error) {
      console.error(error);
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
        <Button label={loading ? "Loading ✨" : "Login"} />
      </div>
    </form>
  );
};
