import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-fusion">404</h1>
      <p className="text-xl mb-6">{t("404_message")}</p>
      <Link
        to="/dashboard"
        className="bg-fusion text-white px-6 py-2 rounded-lg"
      >
        {t("go_to_dashboard")}
      </Link>
    </div>
  );
};

export default NotFound;
