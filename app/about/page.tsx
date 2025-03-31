"use client";

import React from "react";
import { Bar } from 'react-chartjs-2';
import Image from "next/image";

// Register the components needed for Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AboutUs = () => {
  // Survey Data for Chart
  const scamExperienceData = {
    labels: ["Overcharging by Taxi Drivers", "Fake Restaurant Bills", "Misleading Product Prices", "Tour Guide Scams", "Fake Travel Agencies"],
    datasets: [
      {
        label: "Scams Experienced by Tourists (%)",
        data: [92.3, 23.1, 53.8, 53.8, 23.1],
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // Soft Blue
        borderColor: 'rgba(59, 130, 246, 1)', // Blue
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="relative text-gray-900">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(67, 170, 139, 0.3))", // Blue-Green Gradient
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 p-10 bg-white bg-opacity-90 rounded-lg shadow-xl">
        <h1 className="text-5xl font-extrabold text-center mb-8 text-blue-600">About Us</h1>

        {/* First Section: Mission and Survey Data */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <Image
              src="/assets/images/touri.jpg"
              alt="TourSafe Mission"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div className="md:w-1/2 md:ml-10">
            <p className="text-lg mb-6">
              TourSafe is a platform dedicated to protecting tourists from common scams and ensuring a hassle-free travel experience.
              According to a survey we conducted, <strong>92.3%</strong> of tourists reported being overcharged by taxi drivers, and <strong>53.8%</strong> faced misleading product prices. 
              Our platform addresses these issues by offering real-time scam alerts, cab fare estimation, and price verification features.
            </p>
            <p className="text-lg mb-6">
              Additionally, <strong>84.6%</strong> of tourists said they would use a tool like TourSafe to report scams and notify other travelers, highlighting the importance of such a service in today’s travel ecosystem.
            </p>
          </div>
        </div>

        {/* Second Section: Survey Chart */}
        <div className="my-12">
          <h2 className="text-4xl font-bold text-center mb-6 text-blue-600">Survey Results: Common Scams Experienced by Tourists</h2>
          <div className="max-w-4xl mx-auto">
            <Bar data={scamExperienceData} options={options} />
          </div>
        </div>

        {/* What is TourSafe Section with Image */}
        <div className="my-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 text-lg text-center mb-6 md:mb-0">
              <h2 className="text-4xl font-bold text-center mb-6 text-blue-600">What is TourSafe?</h2>
              <p className="max-w-2xl mx-auto mb-4">
                TourSafe is a comprehensive travel safety platform designed to help tourists avoid scams by offering tools like cab fare estimation, price checks, and real-time scam alerts. 
                Our mission is to ensure every tourist can explore new destinations with confidence and without fear of being taken advantage of.
              </p>
              <p className="max-w-2xl mx-auto">
                By leveraging the latest technology and a growing community of users, TourSafe provides reliable and trustworthy data to ensure transparency in pricing and services, making your travel experience safer.
              </p>
            </div>
            <div className="md:w-1/3 md:ml-6">
              <Image
                src="/assets/images/toby.jpeg"
                alt="Mastermind Ali with Toby"
                width={300}
                height={200}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Tourist Reviews Section */}
        <div className="my-12 bg-gradient-to-r from-teal-100 to-blue-100 p-10 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-center mb-6 text-teal-600">Tourist Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-teal-50 shadow-lg rounded-lg p-6 transition duration-300 ease-in-out hover:bg-teal-100 hover:shadow-2xl">
              <h4 className="text-xl font-bold mb-2 text-teal-900">Toby (England)</h4>
              <p className="text-teal-800">
                &ldquo;TourSafe was incredibly helpful during my trip! I avoided being overcharged by taxi drivers thanks to the fare estimator, and I felt safer knowing I could get real-time alerts.&rdquo;
              </p>
            </div>
            <div className="bg-teal-50 shadow-lg rounded-lg p-6 transition duration-300 ease-in-out hover:bg-teal-100 hover:shadow-2xl">
              <h4 className="text-xl font-bold mb-2 text-teal-900">Chris Harris (UK)</h4>
              <p className="text-teal-800">
                &ldquo;This app is a game changer for travelers! It saved me from being scammed at a local market by checking the prices of goods before purchasing.&rdquo;
              </p>
            </div>
            <div className="bg-teal-50 shadow-lg rounded-lg p-6 transition duration-300 ease-in-out hover:bg-teal-100 hover:shadow-2xl">
              <h4 className="text-xl font-bold mb-2 text-teal-900">Victoria (Australia)</h4>
              <p className="text-teal-800">
                &ldquo;I highly recommend TourSafe. I used it every day during my trip and it helped me avoid overpriced taxis and fake restaurants!&rdquo;
              </p>
            </div>
            <div className="bg-teal-50 shadow-lg rounded-lg p-6 transition duration-300 ease-in-out hover:bg-teal-100 hover:shadow-2xl">
              <h4 className="text-xl font-bold mb-2 text-teal-900">Linda (Poland)</h4>
              <p className="text-teal-800">
                &ldquo;TourSafe gave me peace of mind while traveling. I felt more informed and less stressed knowing I could rely on accurate fare estimates and warnings from other tourists.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section with Collaboration Form */}
        <footer className="bg-blue-50 text-gray-900 p-10 rounded-lg shadow-lg mt-12">
          <div className="text-center mb-8 bg-blue-100 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold">Collaboration</h2>
            <p className="mt-4 text-lg">
              Join us in our mission to create a safer and scam-free travel experience for everyone. Fill out the form below to collaborate with us.
            </p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-md flex flex-col items-center">
            <form className="w-full max-w-md">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="How can we collaborate?"
                  className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg w-full transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;
