import { Link } from "react-router-dom";
import { CONTACT_INFO, FOOTER_LINKS, SOCIAL_LINKS, SITE_CONFIG } from "../utils/constants";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-300 py-12 mt-16 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Description */}
          <div>
            <h3 className="text-2xl font-bold text-blue-400 dark:text-blue-300 mb-2">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-gray-400 dark:text-gray-500 text-sm">{SITE_CONFIG.description}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white dark:text-gray-100 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.primary.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 dark:text-gray-500 hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-semibold text-white dark:text-gray-100 mb-4">Policies</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.secondary.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 dark:text-gray-500 hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white dark:text-gray-100 mb-4">Contact Us</h4>
            <div className="space-y-2 text-sm text-gray-400 dark:text-gray-500">
              <p>
                <span className="font-semibold text-gray-300 dark:text-gray-400">Email:</span>{" "}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </p>
              <p>
                <span className="font-semibold text-gray-300 dark:text-gray-400">Phone:</span>{" "}
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </p>
              <p>
                <span className="font-semibold text-gray-300 dark:text-gray-400">Address:</span>{" "}
                {CONTACT_INFO.address}
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-700 dark:border-gray-800 pt-8 mb-8">
          <h4 className="font-semibold text-white dark:text-gray-100 mb-4">Follow Us</h4>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                className="w-10 h-10 bg-gray-800 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors"
                title={social.platform}
              >
                <span className="text-lg">{social.platform.charAt(0).toUpperCase()}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 dark:border-gray-800 pt-8 text-center text-gray-500 dark:text-gray-600 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
