import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const submitData = async (data: FormData) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.login,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Ошибка регистрации");
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.userId);

      console.log("✅ Успешная регистрация", result);
      navigate("/");
    } catch (err: any) {
      alert(`Ошибка: ${err.message}`);
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(submitData)}
        className="font-rubik font-normal bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <div className="flex justify-between items-center w-full px-4">
          <div className="flex-1 flex justify-center">
            <h2 className="text-2xl font-medium ml-12">{t("sign_up")}</h2>
          </div>

          <div>
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              className="border border-fusion rounded ml-2 px-2 py-1 text-sm"
              defaultValue={i18n.language}
            >
              <option value="ru">RU</option>
              <option value="en">EN</option>
              <option value="de">DE</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-black font-medium">{t("login")}</label>
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
          <label className="block text-black font-medium">{t("email")}</label>
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
          <label className="block text-black font-medium">
            {t("password")}
          </label>
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
            {t("confirm_password")}
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
          className="w-full mt-1 bg-fusion text-white cursor-pointer py-2 rounded-md hover:bg-fusion-dark transition"
        >
          {t("sign_up")}
        </button>

        <p className="text-center">
          {t("already_have_account")}{" "}
          <Link to="/" className="text-fusion hover:text-fusion-dark">
            {t("sign_in")}
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Sign_up;
