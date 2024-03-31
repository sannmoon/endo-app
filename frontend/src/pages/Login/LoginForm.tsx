import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LabeledInput } from "../../components/LabeledInput/LabeledInput";
import { Button } from "../../components/Button/Button";

export const LoginForm = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required("Please enter a valid email address"),
    password: yup.string().required("Please enter your password"),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit, () => {})}>
      <div className="form-group">
        <LabeledInput
          label="Email"
          type="email"
          placeholder="m@example.com "
          errors={errors.email?.message}
        />
        <LabeledInput
          label="Password"
          type="password"
          errors={errors.password?.message}
        />
        <Button label="Login" />
      </div>
    </form>
  );
};
