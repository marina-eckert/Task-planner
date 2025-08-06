import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import avatar from "../assets/images/arthur.svg";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { User } from "../types/index";

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const userRole = localStorage.getItem("userRole");

      if (!token || !userId) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const userData = await response.json();
          if (userData.username && userData.email && userData.role) {
            setUser(userData);
            return;
          }
        }
      } catch (fetchError) {
        console.log("API fetch failed, using localStorage data");
      }

      const fallbackUser: User = {
        id: parseInt(userId),
        username: localStorage.getItem("username") || "User",
        email: localStorage.getItem("email") || "user@example.com",
        role: (userRole as "admin" | "user" | "manager") || "user",
      };

      setUser(fallbackUser);
    } catch (err: any) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "admin":
        return t("admin") || "Администратор";
      case "manager":
        return t("manager") || "Менеджер";
      case "user":
        return t("user") || "Пользователь";
      default:
        return role;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "manager":
        return "bg-blue-100 text-blue-800";
      case "user":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-md mx-auto text-center mt-10">
          <div className="animate-pulse">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-6"></div>
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-4"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error && !user) {
    return (
      <MainLayout>
        <div className="max-w-md mx-auto text-center mt-10">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={fetchUserProfile}
            className="bg-fusion text-white px-4 py-2 rounded-md hover:bg-fusion-dark transition"
          >
            {t("retry") || "Повторить"}
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-md mx-auto text-center mt-10">
        <h2 className="text-3xl font-medium mb-6">{t("profile")}</h2>

        <img
          src={avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-6"
        />

        {user && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{user.username}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <div className="flex justify-center">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(
                  user.role,
                )}`}
              >
                {getRoleDisplayName(user.role)}
              </span>
            </div>

            <button className="mt-6 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition">
              <Link to="/settings">{t("edit_profile")}</Link>
            </button>
          </div>
        )}

        {error && user && (
          <div className="text-red-500 text-sm mt-4 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Profile;
