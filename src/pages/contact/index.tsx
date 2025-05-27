import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="pt-14">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/* Left Pink Strip */}
        <motion.section
          className="w-full py-20 bg-pink-100 text-pink-700 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* No text here (just design accent) */}
        </motion.section>

        {/* Contact Form */}
        <motion.section
          className="max-w-4xl w-full py-20 px-6"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-pink-700 mb-6 text-center">
              Contact Form
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border rounded-xl text-black"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border rounded-xl text-black"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border rounded-xl text-black"
                  placeholder="Type your message"
                  required
                />
              </div>
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="mt-4 px-6 py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition"
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </div>
        </motion.section>

        {/* Right Pink Strip */}
        <motion.section
          className="w-full py-20 bg-pink-100 text-pink-700 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* No text here (just design accent) */}
        </motion.section>
      </div>
    </div>
  );
}

Contact.displayName = "Contact Us | Cake Shop";
