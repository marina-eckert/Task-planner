import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import MainLayout from "../layouts/MainLayout";
import avatar from "../assets/images/arthur.svg";
import { useTranslation } from "react-i18next";

const AccountSettings = () => {
  const { t } = useTranslation();
  const [login, setLogin] = useState("Azhar I.");
  const [email, setEmail] = useState("azhar@example.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState<string>(avatar);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfilePic(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(
      `Updated info:\nLogin: ${login}\nEmail: ${email}\nPassword: ${
        password ? "********" : "(unchanged)"
      }\nProfile picture updated: ${profilePic !== avatar ? "Yes" : "No"}`,
    );
  };

  return (
    <MainLayout>
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          {t("account_settings")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <img
              src={profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <label className="cursor-pointer text-orange-500 hover:underline">
              {t("change_profile_picture")}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="login">
              {t("login")}
            </label>
            <input
              id="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="email">
              {t("email")}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="password">
              {t("new_password")}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="confirmPassword">
              {t("confirm_password")}
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            {t("save_changes")}
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default AccountSettings;
