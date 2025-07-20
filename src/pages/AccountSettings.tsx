import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import MainLayout from "../layouts/MainLayout";
import avatar from "../assets/images/arthur.svg";

const AccountSettings = () => {
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
          Account Settings
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <img
              src={profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <label className="cursor-pointer text-orange-500 hover:underline">
              Change Profile Picture
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
              Login
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
              Email
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
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Leave empty to keep current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default AccountSettings;
