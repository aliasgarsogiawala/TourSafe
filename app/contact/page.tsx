"use client"; // Ensure this component is treated as a Client Component

import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"; // Replaced Twitter with Instagram

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Message Sent Successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('//to/gate.png')" }}> {/* Background Image */}
      <section className="w-full max-w-6xl bg-white bg-opacity-80 p-10 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-teal-600 text-center mb-8">
          Contact Us
        </h1>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Address */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Our Office</h2>
            <p className="text-gray-600">
              Sewri, Mumbai, Maharashtra <br />
              India
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
            <p className="text-gray-600">
              Email: support@toursafe.com <br />
              Phone: +91 1234567890
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h2>
            <div className="flex gap-6">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                className="text-blue-600 hover:text-blue-800 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={30} />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                className="text-pink-600 hover:text-pink-800 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={30} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                className="text-blue-700 hover:text-blue-900 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={30} />
              </a>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Working Hours</h2>
            <p className="text-gray-600">
              Mon - Fri: 9:00 AM - 6:00 PM <br />
              Sat - Sun: Closed
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-600 font-bold mb-2"
              >
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-300 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-600 font-bold mb-2"
              >
                Your Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-300 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-gray-600 font-bold mb-2"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-300 focus:outline-none"
              placeholder="Enter your message"
              rows={5}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Embedded Map */}
      <section className="w-full max-w-6xl bg-white bg-opacity-80 mt-12 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Us Here</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120034.26072226846!2d72.81971912467535!3d19.01488624962295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ced1de1577b7%3A0x37f6b31e3ab112d5!2sSewri%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1696235984185!5m2!1sen!2sin"
          width="100%"
          height="450"
          className="border-0 rounded-lg shadow-lg"
          allowFullScreen={true}
          loading="lazy"
        />
      </section>
    </main>
  );
};

export default Contact;
