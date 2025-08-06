import { Bell, Mail, ChevronDown, Search, Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, sidebarVisible }) => {
  const { t, i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

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

      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allTasks = response.data;
      const lower = value.toLowerCase();

      const filtered = allTasks.filter(
        (task: any) =>
          task.title?.toLowerCase().includes(lower) ||
          task.description?.toLowerCase().includes(lower),
      );

      setSearchResults(filtered);
      setShowSearchDropdown(true);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleResultClick = (taskId: number) => {
    setSearchTerm("");
    setSearchResults([]);
    setShowSearchDropdown(false);
    navigate(`/tasks/${taskId}`);
  };

  return (
    <header className="h-[10%] flex items-center justify-between px-6 py-4 bg-white shadow-md font-rubik">
      {/* Left side - Menu button and Search */}
      <div className="flex items-center gap-4 w-full max-w-lg">
        {/* Sidebar Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className={`p-2 rounded-md hover:bg-gray-100 smooth-transition cursor-pointer ${
            sidebarVisible ? "text-black" : "text-fusion"
          }`}
          title={sidebarVisible ? "Скрыть меню" : "Показать меню"}
        >
          <Menu
            className={`smooth-transition ${
              sidebarVisible ? "rotate-0" : "rotate-180"
            }`}
            size={20}
          />
        </button>

        {/* Search */}
        <div className="relative flex-1" ref={searchContainerRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
          <input
            type="text"
            placeholder={t("search")}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 text-sm text-search border rounded-3xl border-border focus:outline-none"
          />
          {showSearchDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
              {searchResults.length > 0 ? (
                searchResults.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleResultClick(task.id)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <p className="font-medium text-sm">{task.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {task.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">
                  {t("no_results_found")}
                </div>
              )}
            </div>
          )}
        </div>
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
