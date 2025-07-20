import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

const schema = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
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
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const submitData = async (data: FormData) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      // TODO: Добавить типизацию для API ответов
      // interface LoginResponse {
      //   token: string;
      //   userId: string;
      //   message?: string;
      // }
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Ошибка входа");
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.userId);

      console.log("✅ Вход выполнен", result);
      navigate("/dashboard");
    } catch (err: any) {
      alert(`Ошибка: ${err.message}`);
    }
  };

  return (
    <AuthLayout>
      <form
        className="font-rubik font-normal bg-white p-7 rounded-2xl shadow-lg w-full max-w-md space-y-3"
        onSubmit={handleSubmit(submitData)}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Вход</h2>

        <label className="block text-black font-medium">Email:</label>
        <input
          type="text"
          {...register("email")}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-fusion text-sm">{errors.email?.message}</p>

        <label className="block text-black font-medium">Пароль:</label>
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
    </AuthLayout>
  );
}

export default Sign_in;
