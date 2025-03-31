"use client";
import React, { useState } from "react";

const ReportScam = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    scamType: "",
    description: "",
    location: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Scam Report Submitted:", formData);
    // Logic to submit form data
    setFormData({
      name: "",
      email: "",
      scamType: "",
      description: "",
      location: "",
      date: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-6">
      <div className="bg-red-500 shadow-xl rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Report a Scam</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-white font-semibold mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-white font-semibold mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your email"
            />
          </div>

          {/* Scam Type */}
          <div>
            <label className="block text-white font-semibold mb-2">Type of Scam</label>
            <select
              name="scamType"
              value={formData.scamType}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="" disabled>Select Scam Type</option>
              <option value="Taxi Overcharging">Taxi Overcharging</option>
              <option value="Fake Products">Fake Products</option>
              <option value="Tour Guide Scam">Tour Guide Scam</option>
              <option value="Restaurant Scam">Restaurant Scam</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 h-32 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Describe the scam in detail"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-white font-semibold mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter the location where the scam occurred"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-white font-semibold mb-2">Date of Incident</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-100 hover:bg-gray-200 text-red-500 font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
          >
            Submit 
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportScam;
