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
    <div className="min-h-screen flex items-center justify-center bg-sidebar">
      <form
        className="font-rubik font-normal bg-white p-7 rounded-2xl shadow-lg w-full max-w-md space-y-3"
        onSubmit={handleSubmit(submitData)}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Вход</h2>
        <label className="block text-black font-medium"> Логин: </label>
        <input
          type="text"
          {...register("login")}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-fusion text-sm">{errors.login?.message}</p>

        <label className="block text-black font-medium"> Пароль: </label>
        <input
          type="password"
          {...register("password")}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-fusion text-sm">{errors.password?.message}</p>

        <button
          className="w-full bg-fusion mt-1 text-white py-2 rounded-md hover:bg-fusion-dark transition cursor-pointer"
          type="submit"
        >
          Войти
        </button>

        <p className="text-center">
          Нет аккаунта?{" "}
          <Link to="/sign_up" className="text-fusion hover:text-fusion-dark">
            Зарегистрироваться
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Sign_in;
