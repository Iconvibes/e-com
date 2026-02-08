import ContactForm from "../components/ContactForm";
import { CONTACT_INFO } from "../utils/constants";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Get In Touch</h1>
        <p className="text-gray-600">We'd love to hear from you. Send us a message!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📧</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Email</h3>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-green-50 to-green-100 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📞</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Phone</h3>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📍</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Address</h3>
                <p className="text-gray-700">{CONTACT_INFO.address}</p>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🕐</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Business Hours</h3>
                <p className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-700">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-700">Sunday: Closed</p>
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
