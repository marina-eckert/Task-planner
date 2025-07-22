import { Bell, Mail, ChevronDown, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-[10%] flex items-center justify-between px-6 py-4 bg-white shadow-md font-rubik">
      {/* Search */}
      <div className="relative w-full max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black cursor-pointer" />
        <input
          type="text"
          placeholder={t("search")}
          className="w-full pl-10 pr-4 py-2 text-sm text-search border rounded-3xl border-border focus:outline-none"
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-6">
        {/* Language switch */}
        <div>
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            defaultValue={i18n.language}
          >
            <option value="ru">RU</option>
            <option value="en">EN</option>
            <option value="de">DE</option>
          </select>
        </div>

        <Bell className="text-black cursor-pointer" />
        <Mail className="text-black cursor-pointer" />

        {/* Dropdown Trigger */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
              A
            </div>
            <span className="text-sm font-medium text-gray-700">Azhar I.</span>
            <ChevronDown size={18} className="text-gray-500" />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 animate-fade-in-down">
              <Link
                to="/profile"
                className="block px-4 py-4 text-sm text-black hover:bg-gray-100 transition-colors duration-300 ease-in-out"
              >
                {t("profile")}
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-4 text-sm text-black hover:bg-gray-100 transition-colors duration-300 ease-in-out"
              >
                {t("account_settings")}
              </Link>
              <Link
                to="/"
                className="block px-4 py-4 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
              >
                {t("logout")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
