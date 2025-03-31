"use client";
import React, { useState } from "react";

// Sample data for popular routes
const popularRoutes = [
  { id: 1, route: "Colaba to Marine Drive", distance: 4, fare: 60 },
  { id: 2, route: "Cuffe Parade to Bandra-Worli Sea Link", distance: 12, fare: 120 },
  { id: 3, route: "Churchgate to Worli", distance: 7, fare: 70 },
  { id: 4, route: "Gateway of India to Haji Ali Dargah", distance: 7, fare: 70 },
  { id: 5, route: "Marine Drive to Mahalaxmi Racecourse", distance: 5, fare: 50 },
  { id: 6, route: "Colaba to Girgaon Chowpatty", distance: 6, fare: 60 },
  { id: 7, route: "Kala Ghoda to Dadar", distance: 10, fare: 130 },
  { id: 8, route: "Crawford Market to Lower Parel", distance: 6, fare: 60 },
  { id: 9, route: "CST to Worli Sea Face", distance: 8, fare: 80 },
  { id: 10, route: "Fort to Mahalaxmi Temple", distance: 5, fare: 50 },
];

const CabFare = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [traffic, setTraffic] = useState("normal");
  const [travelTime, setTravelTime] = useState(""); // Travel time input
  const [fare, setFare] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Your DistanceMatrix API key
  const apiKey = "Hn35QAGQ2WpW1e5es6eD73fGNRkBZwyLWjDOSKuxWZvd1aBf3iPxtCozSwOrXXaG"; // Replace with your actual API key

  // Function to fetch distance between source and destination
  const getDistance = async () => {
    try {
      const response = await fetch(
        `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${source}&destinations=${destination}&key=${apiKey}`
      );

      const data = await response.json();

      if (data.rows[0].elements[0].status === "OK") {
        const distanceInMeters = data.rows[0].elements[0].distance.value;
        return distanceInMeters / 1000; // Convert to kilometers
      } else {
        throw new Error("Invalid address or route not found.");
      }
    } catch (error) {
      console.error("Error fetching distance:", error);
      throw error;
    }
  };

  // Function to calculate the fare based on distance, traffic, and time
  const calculateFare = async () => {
    try {
      const distance = await getDistance();

      let fareRate = 10; // Base rate per km for daytime

      // Check if it's nighttime (12 AM to 5 AM) and apply night fare rate
      const [hour] = travelTime.split(":").map(Number);
      if (hour >= 0 && hour < 5) {
        fareRate = 12.5; // Night fare
      } else if (traffic === "heavy") {
        fareRate = 15; // Increased rate for heavy traffic
      } else if (traffic === "light") {
        fareRate = 8; // Reduced rate for light traffic
      }

      const estimatedFare = distance * fareRate + 100; // Adding ₹100 to the fare
      setFare(estimatedFare);
      setError(null);
    } catch (err) {
      setError("Failed to calculate the fare. Please check your input.");
      setFare(null);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Cab Fare Estimator</h1>

      <div className="mb-4">
        <label className="block text-lg mb-2">Source Address (in Mumbai):</label>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg mb-2">Destination Address (in Mumbai):</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg mb-2">Traffic Condition:</label>
        <select
          value={traffic}
          onChange={(e) => setTraffic(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        >
          <option value="normal">Normal</option>
          <option value="light">Light</option>
          <option value="heavy">Heavy</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-lg mb-2">Time of Travel (24-hour format):</label>
        <input
          type="time"
          value={travelTime}
          onChange={(e) => setTravelTime(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>

      <button
        onClick={calculateFare}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Calculate Fare
      </button>

      {fare !== null && (
        <div className="mt-4 flex items-center justify-center">
          <div className="p-6 bg-green-100 rounded-lg shadow-lg max-w-md">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Estimated Fare</h3>
            <p className="text-lg text-green-800">
              Your estimated fare is ₹{fare.toFixed(2)}.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {/* Popular Routes Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Popular Routes in South Mumbai</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {popularRoutes.map((route) => (
            <div key={route.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-teal-600 mb-2">{route.route}</h3>
              <p className="text-gray-700">Distance: {route.distance} km</p>
              <p className="text-gray-700">Approx Fare: ₹{route.fare}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CabFare;
