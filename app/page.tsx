"use client"; // Ensure this component is treated as a Client Component

import dynamic from 'next/dynamic';
import Link from "next/link";
import { FiUsers } from "react-icons/fi";
import 'swiper/css';
import 'swiper/css/autoplay';
import SwiperCore from 'swiper';
import { Autoplay } from 'swiper/modules';
import CountUp from 'react-countup';
import { useState, useEffect } from 'react';

// Dynamically import Swiper with SSR disabled
const Swiper = dynamic(() => import('swiper/react').then(mod => mod.Swiper), { ssr: false });
const SwiperSlide = dynamic(() => import('swiper/react').then(mod => mod.SwiperSlide), { ssr: false });

// Install the Swiper Autoplay module
SwiperCore.use([Autoplay]);

export default function Home() {
  const [startCounter, setStartCounter] = useState(false);

  useEffect(() => {
    setStartCounter(true); // Trigger counter animation when component loads
  }, []);

  return (
    <main className="flex flex-col items-center justify-between relative">
      {/* Hero Section with Background Image */}
      <section className="relative w-full h-[80vh] bg-cover bg-center" style={{ backgroundImage: `url('/assets/images/gate.png')` }}>
        
        {/* Transparent Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Centered Content with White Box to Hide Background */}
        <div className="relative z-10 flex items-center justify-end h-full pr-12"> {/* Added `justify-end` and `pr-12` to align the content to the right */}
          <div className="bg-white p-10 rounded-lg shadow-lg max-w-xl opacity-100"> {/* Opaque white box to hide the background */}
            <h1 className="text-6xl font-extrabold text-light-blue-500">TOURSAFE</h1>
            <p className="mt-6 text-lg leading-relaxed text-black">
              Welcome to TOURSAFE, a platform designed to protect tourists from common scams by providing tools like cab fare estimation, price checks, and real-time scam alerts.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link href="/features">
                <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300">
                  Learn More
                </button>
              </Link>
              <Link href="/contact">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Counter Section */}
      <section className="text-center w-full py-10 bg-gradient-to-r from-cyan-400 to-teal-500 text-white">
        <h2 className="text-4xl font-bold mb-6">Our Impact</h2>
        <div className="text-6xl font-extrabold">
          {startCounter && (
            <CountUp
              start={0}
              end={100}
              duration={3}
              suffix="+" />
          )}
        </div>
        <p className="mt-4 text-2xl">Tourists Saved</p>
      </section>

      {/* Key Features Cards Section */}
      <section className="w-full py-16 bg-gradient-to-r from-gray-100 to-gray-300">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-black mb-4">Cab Fare Estimation</h3>
            <p className="text-gray-700 leading-relaxed">Check accurate cab fare estimates to avoid being overcharged.</p>
            <Link href="/cabfare">
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Use Cab Fare</button>
            </Link>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-black mb-4">SOS Alert</h3>
            <p className="text-gray-700 leading-relaxed">Send instant SOS alerts in case of emergencies during your trip.</p>
            <Link href="/sos">
              <button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">Send Alert</button>
            </Link>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-black mb-4">Report a Scam</h3>
            <p className="text-gray-700 leading-relaxed">Help fellow tourists by reporting scams that you encounter.</p>
            <Link href="/report-scam">
              <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg">Report Scam</button>
            </Link>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-black mb-4">Tourist Chatroom</h3>
            <p className="text-gray-700 leading-relaxed">Connect with fellow tourists in your area and share experiences.</p>
            <Link href="/chatroom">
              <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">Join Chat</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-16 bg-gray-800">
        <h2 className="text-3xl font-extrabold text-center mb12 text-light-blue-500">
          Why Choose TourSafe?
        </h2><br></br>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="p-8 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-light-blue-500 mb-4">Real-Time Alerts</h3>
            <p className="text-gray-300 leading-relaxed">
              Get real-time scam alerts based on your location, ensuring that you stay informed about any ongoing scams in the area.
            </p>
          </div>
          <div className="p-8 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-light-blue-500 mb-4">Trusted Cab Fare Estimation</h3>
            <p className="text-gray-300 leading-relaxed">
              Avoid overcharging by using our reliable cab fare estimator, giving you transparency in your transportation costs.
            </p>
          </div>
          <div className="p-8 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-light-blue-500 mb-4">Price Checker</h3>
            <p className="text-gray-300 leading-relaxed">
              Verify food, clothing, and other purchase prices before buying to ensure you&apos;re not being overcharged while exploring new places.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="flex flex-col items-center bg-gray-100 w-full py-16">
        <h2 className="text-4xl font-bold text-light-blue-500">About Us</h2>
        <Link href="/about">
          <div className="group cursor-pointer p-8 bg-white hover:bg-gray-200 transition-colors duration-300 rounded-lg flex items-center shadow-lg max-w-lg mx-auto">
            <FiUsers className="text-blue-500 text-4xl mr-4" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Who We Are</h3>
              <p className="text-gray-600 leading-relaxed">We offer tools to ensure safe, scam-free travel experiences.</p>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
