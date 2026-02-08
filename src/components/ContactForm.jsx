import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export default function ContactForm({ variant = "full" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      toast.success("Message sent successfully! We'll be in touch soon.");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const baseFormClass = "space-y-4";
  const fullFormClass = "bg-white p-8 rounded-lg shadow-md max-w-md mx-auto";
  const inlineFormClass = "bg-gray-800 p-6 rounded-lg";

  const formClass = variant === "full" ? fullFormClass : inlineFormClass;
  const labelClass = variant === "full" ? "text-gray-700 font-semibold" : "text-gray-300 font-semibold";
  const inputClass = "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-gray-900";
  const textareaClass = "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-gray-900 resize-none";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${baseFormClass} ${formClass}`}>
      <div>
        <label className={labelClass}>Name</label>
        <input
          type="text"
          {...register("name")}
          placeholder="Your name"
          className={inputClass}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Email</label>
        <input
          type="email"
          {...register("email")}
          placeholder="your@email.com"
          className={inputClass}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Subject</label>
        <input
          type="text"
          {...register("subject")}
          placeholder="What's this about?"
          className={inputClass}
        />
        {errors.subject && (
          <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Message</label>
        <textarea
          {...register("message")}
          placeholder="Your message..."
          rows={4}
          className={textareaClass}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
