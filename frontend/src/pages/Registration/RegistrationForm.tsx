import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LabeledInput } from "../../components/LabeledInput/LabeledInput";
import { Button } from "../../components/Button/Button";

export const RegistrationForm = () => {
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
        <Button label="Register" />
      </div>
    </form>
  );
};
