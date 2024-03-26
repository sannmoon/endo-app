import "./Form.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const Form = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required("Please enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "Must Contain at least 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords Do Not Match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    console.log();
  };

  return (
    <div className="regis-container">
      <h1 className="title-regis">Create an account</h1>
      <p className="subtitle-regis">
        Enter your email and password to get started
      </p>
      <form onSubmit={handleSubmit(onSubmit, () => {})}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="m@example.com"
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" {...register("password")} />
          <p>{errors.password?.message}</p>
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input type="password" {...register("repeatPassword")} />
          <p>{errors.repeatPassword?.message}</p>
        </div>
        <div className="regis-btn-wrapper">
          <button className="regis-btn" type={"submit"}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
