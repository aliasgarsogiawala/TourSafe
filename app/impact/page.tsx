import React from 'react';
import Image from 'next/image';

const Impact = () => {
  return (
    <div className="bg-gradient-to-b from-teal-100 via-white to-blue-100 p-12 shadow-xl">
      <h1 className="text-6xl font-extrabold text-center text-teal-500 mb-16">
        Our Impact
      </h1>

      {/* First Impact Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-20">
        <div className="md:w-1/2 mb-8 md:mb-0 transform hover:scale-105 transition-transform duration-500 ease-in-out">
          <Image
            src="/assets/images/guide.jpg"
            alt="Tourists using TourSafe"
            width={500}
            height={300}
            className="rounded-xl shadow-2xl hover:shadow-lg transition-shadow duration-300 ease-in-out"
          />
        </div>
        <div className="md:w-1/2 md:ml-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Empowering Tourists with Safety</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed font-medium">
            At TourSafe, we are committed to protecting tourists from scams and overpricing. By offering innovative solutions like real-time scam alerts, cab fare estimations, and price checks, we ensure that tourists can explore new destinations with confidence.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            Our platform empowers travelers to make informed decisions, avoid common scams, and enhance their overall travel experience. By promoting transparency and offering valuable tools, we provide tourists with peace of mind during their trips.
          </p>
        </div>
      </div>

      {/* Second Impact Section */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0 md:order-2 transform hover:scale-105 transition-transform duration-500 ease-in-out">
          <Image
            src="/assets/images/7.jpg"
            alt="TourSafe helping tourists"
            width={500}
            height={300}
            className="rounded-xl shadow-2xl hover:shadow-lg transition-shadow duration-300 ease-in-out"
          />
        </div>
        <div className="md:w-1/2 md:mr-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Building Safe Travel Experiences</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed font-medium">
            TourSafe plays a crucial role in ensuring safe and scam-free travel experiences for tourists worldwide. By leveraging real-time information and community-driven alerts, we help travelers navigate new cities without fear of being taken advantage of.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            Our efforts not only protect tourists but also foster trust in local economies. We strive to build a world where tourists can travel with confidence, knowing they have the tools to avoid scams and enjoy their journey safely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Impact;
