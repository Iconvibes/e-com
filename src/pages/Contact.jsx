import ContactForm from "../components/ContactForm";
import { CONTACT_INFO } from "../utils/constants";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">Get In Touch</h1>
        <p className="text-gray-600 dark:text-gray-400">We'd love to hear from you. Send us a message!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 dark:from-blue-950 to-blue-100 dark:to-blue-900 p-6 rounded-lg transition-colors duration-200">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📧</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Email</h3>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 dark:from-green-950 to-green-100 dark:to-green-900 p-6 rounded-lg transition-colors duration-200">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📞</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Phone</h3>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 dark:from-purple-950 to-purple-100 dark:to-purple-900 p-6 rounded-lg transition-colors duration-200">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📍</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Address</h3>
                <p className="text-gray-700 dark:text-gray-300">{CONTACT_INFO.address}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 dark:from-orange-950 to-orange-100 dark:to-orange-900 p-6 rounded-lg transition-colors duration-200">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🕐</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Business Hours</h3>
                <p className="text-gray-700 dark:text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-700 dark:text-gray-300">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-700 dark:text-gray-300">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <ContactForm variant="full" />
        </div>
      </div>
    </div>
  );
}
