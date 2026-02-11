import { Link, useLocation } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const cartCount = useCartStore((state) => state.cart.length);
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 bg-white dark:bg-gray-900 shadow-md z-50 transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo/Brand */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          QuickServe
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors ${
                isActive(link.path)
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Section: Cart, Theme Toggle */}
        <div className="hidden md:flex gap-4 items-center">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                key="sun-icon"
              >
                <path 
                  key="sun-path"
                  d="M10.5 1.5H9.5V.5h1v1zm0 17H9.5v-1h1v1zM19 9.5v1h-1v-1h1zM2 9.5v1H1v-1h1zm13.14-5.64l.707-.707.707.707-.707.707-.707-.707zm-8.28 8.28l.707-.707.707.707-.707.707-.707-.707zM19 19l-.707-.707.707-.707.707.707L19 19zm-8.28-8.28l.707-.707.707.707-.707.707-.707-.707zM14.86 4.86l.707-.707.707.707-.707.707-.707-.707zm-8.28 8.28l.707-.707.707.707-.707.707-.707-.707zM19 10a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                key="moon-icon"
              >
                <path 
                  key="moon-path"
                  d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" 
                />
              </svg>
            )}
          </button>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              🛒 Cart
            </button>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden gap-2 items-center">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" key="mobile-sun">
                <path 
                  key="mobile-sun-path"
                  d="M10.5 1.5H9.5V.5h1v1zm0 17H9.5v-1h1v1zM19 9.5v1h-1v-1h1zM2 9.5v1H1v-1h1zm13.14-5.64l.707-.707.707.707-.707.707-.707-.707zm-8.28 8.28l.707-.707.707.707-.707.707-.707-.707zM19 19l-.707-.707.707-.707.707.707L19 19zm-8.28-8.28l.707-.707.707.707-.707.707-.707-.707zM14.86 4.86l.707-.707.707.707-.707.707-.707-.707zm-8.28 8.28l.707-.707.707.707-.707.707-.707-.707zM19 10a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" key="mobile-moon">
                <path 
                  key="mobile-moon-path"
                  d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" 
                />
              </svg>
            )}
          </button>

          <button
            className="p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              key="hamburger-menu"
            >
              <path
                key="hamburger-path"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 transition-colors duration-200">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-2 ${
                  isActive(link.path)
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/cart"
              className="py-2 text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
