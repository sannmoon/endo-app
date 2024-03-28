import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

  const onSubmit = () => {};
  return (
    <form onSubmit={handleSubmit(onSubmit, () => {})}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          className="form-input"
          type="text"
          placeholder=" m@example.com"
          {...register("email")}
        />
        <p className="form-p">{errors.email?.message}</p>
        <label htmlFor="password">Password</label>
        <input
          className="form-input"
          type="password"
          {...register("password")}
        />
        <p className="form-p">{errors.password?.message}</p>
        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          className="form-input"
          type="password"
          {...register("repeatPassword")}
        />
        <p className="form-p">{errors.repeatPassword?.message}</p>
      </div>
      <div className="regis-btn-wrapper">
        <button className="regis-btn" type={"submit"}>
          Register
        </button>
      </div>
    </form>
  );
};
