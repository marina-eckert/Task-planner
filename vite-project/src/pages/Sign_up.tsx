import "../assets/css/style.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    login: z
      .string()
      .min(5, { message: "Логин должен содержать минимум 5 символов" })
      .max(30, { message: "Логин не может быть длиннее 30 символов" }),
    email: z.string().email({ message: "Введите корректный email" }),
    password: z
      .string()
      .min(5, { message: "Пароль слишком короткий" })
      .max(20, { message: "Пароль слишком длинный" }),
    confirmPassword: z
      .string()
      .min(5, { message: "Пароль слишком короткий" })
      .max(20, { message: "Пароль слишком длинный" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

function Sign_up() {
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
    <div className="Sign_up">
      <form className="form" onSubmit={handleSubmit(submitData)}>
        <label> Логин: </label>
        <input type="text" {...register("login")} />
        <p className="error">{errors.login?.message}</p>

        <label> Email: </label>
        <input type="email" {...register("email")} />
        <p className="error">{errors.email?.message}</p>

        <label> Пароль: </label>
        <input type="password" {...register("password")} />
        <p className="error">{errors.password?.message}</p>

        <label> Подтвердить пароль: </label>
        <input type="password" {...register("confirmPassword")} />
        <p className="error">{errors.confirmPassword?.message}</p>

        <input type="submit" />
      </form>
    </div>
  );
}

export default Sign_up;
