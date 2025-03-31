import React from 'react';
import Link from 'next/link';
import { FiAlertCircle } from 'react-icons/fi';

const Sos = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-12">
      <h1 className="text-5xl font-extrabold text-center text-red-600 mb-12">
        SOS Emergency Service
      </h1>

      {/* Emergency Message */}
      <div className="text-center mb-16">
        <p className="text-xl font-semibold mb-6">
          If you find yourself in an emergency situation, use our SOS service to get immediate assistance.
        </p>
        <p className="text-lg text-gray-300">
          We are here to help you 24/7. Your location and details will be shared with the nearest emergency responders to ensure your safety.
        </p>
      </div>

      {/* SOS Button */}
      <div className="flex justify-center mb-16">
        <Link href="/SosConfirm">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-2xl shadow-lg transition-all duration-300 flex items-center gap-3">
            <FiAlertCircle className="text-4xl" />
            Send SOS Alert
          </button>
        </Link>
      </div>

      {/* Safety Tips Section */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-4xl font-bold text-red-600 mb-8 text-center">
          Safety Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-black rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-red-500 mb-4">Stay Calm</h3>
            <p className="text-gray-300 leading-relaxed">
              In any emergency, staying calm is critical. Breathe deeply and assess your situation before making decisions.
            </p>
          </div>
          <div className="p-6 bg-black rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-red-500 mb-4">Know Your Location</h3>
            <p className="text-gray-300 leading-relaxed">
              Make sure you are aware of your surroundings. This will help you and emergency responders reach the location more efficiently.
            </p>
          </div>
          <div className="p-6 bg-black rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-red-500 mb-4">Have Emergency Contacts Ready</h3>
            <p className="text-gray-300 leading-relaxed">
              Always keep a list of emergency contacts that you can quickly notify in case of danger or urgent situations.
            </p>
          </div>
          <div className="p-6 bg-black rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-red-500 mb-4">Stay Visible</h3>
            <p className="text-gray-300 leading-relaxed">
              In situations where you are lost or need help, stay in visible areas to make it easier for responders to find you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sos;
