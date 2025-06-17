import "../assets/css/style.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";

const schema = z.object({
  login: z
    .string()
    .min(5, { message: "Логин должен содержать минимум 5 символов" })
    .max(30, { message: "Логин не может быть длиннее 30 символов" }),
  password: z
    .string()
    .min(5, { message: "Пароль слишком короткий" })
    .max(20, { message: "Пароль слишком длинный" }),
});

type FormData = z.infer<typeof schema>;

function Sign_in() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: FormData) => {
    console.log("Сработало", data);
  };

  return (
    <div className="Sign_in">
      <form className="form" onSubmit={handleSubmit(submitData)}>
        <label> Логин: </label>
        <input type="text" {...register("login")} />
        <p className="error">{errors.login?.message}</p>

        <label> Пароль: </label>
        <input type="password" {...register("password")} />
        <p className="error">{errors.password?.message}</p>

        <input type="submit" />
      </form>

      <p className="registration-link">
        Нет аккаунта? <Link to="/sign_up">Зарегистрироваться</Link>
      </p>
    </div>
  );
}

export default Sign_in;
