import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";

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
    <div className="min-h-screen flex items-center justify-center bg-sidebar">
      <form
        onSubmit={handleSubmit(submitData)}
        className="font-rubik font-normal bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Регистрация</h2>

        <div>
          <label className="block text-black font-medium">Логин</label>
          <input
            type="text"
            {...register("login")}
            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.login && (
            <p className="text-red-500 text-sm mt-2">{errors.login.message}</p>
          )}
        </div>

        <div>
          <label className="block text-black font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-black font-medium">Пароль</label>
          <input
            type="password"
            {...register("password")}
            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-black font-medium">
            Подтвердить пароль
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-2">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-1 bg-fusion text-white cursor-pointer py-2 rounded-md hover:bg-fusion-dark transition "
        >
          Зарегистрироваться
        </button>

        <p className="text-center">
          Уже есть аккаунт?{" "}
          <Link to="/" className="text-fusion hover:text-fusion-dark">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Sign_up;
