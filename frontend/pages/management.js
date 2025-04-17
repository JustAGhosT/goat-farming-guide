import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Management.module.css';

const Management = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="page-section text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Health & Management of Goats</h1>
        <p className="text-gray-600 mb-8">Your comprehensive guide to maintaining the health and well-being of your goats</p>
      </header>

      <section className="page-section bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Health Management</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Common Health Issues</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Parasites</li>
              <li>• Mastitis</li>
              <li>• Foot Rot</li>
              <li>• Respiratory Infections</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Preventive Measures</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Regular deworming</li>
              <li>• Clean living conditions</li>
              <li>• Proper nutrition</li>
              <li>• Regular health checks</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="page-section bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Nutrition Management</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Dietary Requirements</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Balanced diet with adequate protein</li>
              <li>• Access to clean water</li>
              <li>• Mineral supplements</li>
              <li>• Forage and roughage</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Feeding Schedule</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Morning: Hay and grain</li>
              <li>• Midday: Fresh forage</li>
              <li>• Evening: Hay and grain</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="page-section bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Breeding Management</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Breeding Cycle</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Estrus detection</li>
              <li>• Mating</li>
              <li>• Gestation period</li>
              <li>• Kidding</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Breeding Tips</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Select healthy breeding stock</li>
              <li>• Monitor for signs of heat</li>
              <li>• Provide proper nutrition</li>
              <li>• Ensure clean birthing environment</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="page-section bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Housing Management</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Housing Requirements</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Adequate space per goat</li>
              <li>• Proper ventilation</li>
              <li>• Clean and dry bedding</li>
              <li>• Secure fencing</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Maintenance Tips</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Regular cleaning</li>
              <li>• Check for repairs</li>
              <li>• Ensure predator protection</li>
              <li>• Provide enrichment</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="prev-next-buttons">
        <button id="prev-button">Previous</button>
        <button id="next-button">Next</button>
      </div>
    </div>
  );
};

export default Management;
