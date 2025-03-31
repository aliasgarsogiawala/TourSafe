import { stages } from "../constants/stages";
import React from "react";

const Tracking: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto mt-[-10px] p-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        SureShare Distribution Tracking
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stages.map((stage: { 
          step: string;
          status: string;
          date?: string;
          authority?: string;
          expected?: string;
          contact?: string;
          items: Array<{
            name: string;
            quantity: string;
            status: string;
          }>;
        }, index: number) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
          >
            <h3 className="text-lg font-semibold mb-2">{stage.step}</h3>
            <p
              className={`mb-1 ${
                stage.status === "Completed"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              <strong>Status:</strong> {stage.status}{" "}
              {stage.date && `on ${stage.date}`}
            </p>
            {stage.authority && (
              <p className="mb-1">
                <strong>Authority:</strong> {stage.authority}
              </p>
            )}
            {stage.expected && (
              <p className="mb-1">
                <strong>{stage.expected}</strong>
              </p>
            )}
            {stage.contact && <p className="mb-1">{stage.contact}</p>}
            <ul className="mt-2 space-y-1">
              {stage.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-sm">
                  <strong>{item.name}:</strong> {item.quantity} -{" "}
                  <span
                    className={`${
                      item.status.includes("Ready") ||
                      item.status.includes("In Transit")
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracking;
