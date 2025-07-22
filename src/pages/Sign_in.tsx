import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import type { LoginResponse } from "../types/index";
import { useTranslation } from "react-i18next";

const schema = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z
    .string()
    .min(5, { message: "Пароль слишком короткий" })
    .max(20, { message: "Пароль слишком длинный" }),
});

type FormData = z.infer<typeof schema>;

const Sign_in: React.FC = () => {
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
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result: LoginResponse = await response.json();

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
        <div className="flex justify-between items-center w-full px-4">
          <div className="flex-1 flex justify-center">
            <h2 className="text-2xl font-medium ml-12">{t("sign_in")}</h2>
          </div>

          <div>
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              className="border border-fusion rounded px-2 py-1 text-sm"
              defaultValue={i18n.language}
            >
              <option value="ru">RU</option>
              <option value="en">EN</option>
              <option value="de">DE</option>
            </select>
          </div>
        </div>

        <label className="block text-black font-medium">{t("email")}:</label>
        <input
          type="text"
          {...register("email")}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-fusion text-sm">{errors.email?.message}</p>

        <label className="block text-black font-medium">{t("password")}:</label>
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
          {t("sign_in")}
        </button>

        <p className="text-center">
          {t("no_account")}{" "}
          <Link to="/sign_up" className="text-fusion hover:text-fusion-dark">
            {t("sign_up")}
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Sign_in;
