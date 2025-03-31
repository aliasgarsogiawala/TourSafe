import Link from "next/link";
import React from "react";
import { features } from "@/constants"; // Assuming your features list is in a constants file

const Features = () => {
  // Add links for all features
  const featureLinks = [
    "/cabfare",          // Link for Cab Fare Estimation
    "/sos",              // Link for SOS Alert
    "/report-scam",      // Link for Report Scams
    "/chatroom",         // Link for Tourist Chatroom
    "/scam-alerts",      // Link for Real-Time Scam Alerts
    "/price-checker",    // Link for Price Checker
    "/location-services",// Link for Location-Based Services
    "/secure-payments",  // Link for Secure Payments
    "/tour-guide-finder" // Link for Tour Guide Finder
  ];

  return (
    <div className="p-10 bg-gradient-to-r from-gray-50 to-gray-200 shadow-xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-teal-500">Key Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-teal-500">{feature.title}</h2>
            <p className="text-gray-700 mb-6">{feature.description}</p>
            {/* Link for all features */}
            <Link href={featureLinks[index]}>
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
                Learn More
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
