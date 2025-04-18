import Link from 'next/link';
import React from 'react';

const Schedule: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="page-section text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Goat Farming Schedule</h1>
        <p className="text-gray-600 mb-8">Detailed schedule of goat farming activities</p>
      </header>

      <section className="page-section bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Daily Schedule</h2>
        <div className="schedule-card">
          <h3 className="font-semibold text-lg mb-3">Morning Routine (5:00 AM)</h3>
          <ol className="space-y-2 text-gray-600 list-decimal pl-4">
            <li>Clean milking area and prepare equipment</li>
            <li>Feed goats their grain ration</li>
            <li>Clean udders and check for issues</li>
            <li>Milk each goat completely</li>
            <li>Filter and store milk immediately</li>
            <li>Clean equipment and area</li>
          </ol>
        </div>

        <div className="schedule-card">
          <h3 className="font-semibold text-lg mb-3">Evening Routine (5:00 PM)</h3>
          <ol className="space-y-2 text-gray-600 list-decimal pl-4">
            <li>Repeat morning routine steps</li>
            <li>Record daily production</li>
            <li>Check supplies for next day</li>
            <li>Final equipment cleaning</li>
          </ol>
        </div>
      </section>

      <section className="page-section bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Weekly Schedule</h2>
        <div className="schedule-card">
          <h3 className="font-semibold text-lg mb-3">Monday</h3>
          <ul className="space-y-2 text-gray-600 list-disc pl-4">
            <li>Health check for all goats</li>
            <li>Clean and disinfect barn</li>
            <li>Check and refill mineral supplements</li>
          </ul>
        </div>

        <div className="schedule-card">
          <h3 className="font-semibold text-lg mb-3">Wednesday</h3>
          <ul className="space-y-2 text-gray-600 list-disc pl-4">
            <li>Inspect and repair fencing</li>
            <li>Check water supply and clean troughs</li>
            <li>Review feed inventory</li>
          </ul>
        </div>

        <div className="schedule-card">
          <h3 className="font-semibold text-lg mb-3">Friday</h3>
          <ul className="space-y-2 text-gray-600 list-disc pl-4">
            <li>Hoof trimming and care</li>
            <li>Check for signs of illness</li>
            <li>Prepare for weekend tasks</li>
          </ul>
        </div>
      </section>

      <section className="page-section bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Monthly Schedule</h2>
        <div className="schedule-card">
          <h3 className="font-semibold text-lg mb-3">First Week</h3>
          <ul className="space-y-2 text-gray-600 list-disc pl-4">
            <li>Vaccinations and deworming</li>
            <li>Deep clean barn and equipment</li>
            <li>Review breeding plans</li>
          </ul>
        </div>

        <div className="schedule-card">
          <h3 className="font-semibold text-lg mb-3">Third Week</h3>
          <ul className="space-y-2 text-gray-600 list-disc pl-4">
            <li>Check and repair equipment</li>
            <li>Review health records</li>
            <li>Plan for upcoming month</li>
          </ul>
        </div>
      </section>

      <section className="page-section bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Related Pages</h2>
        <ul className="space-y-2 text-gray-600 list-disc pl-4">
          <li>
            <Link href="/milking">
              <a className="text-green-600 hover:text-green-700">Milking Guide</a>
            </Link>
          </li>
          <li>
            <Link href="/management">
              <a className="text-green-600 hover:text-green-700">Health & Management</a>
            </Link>
          </li>
          <li>
            <Link href="/milking-stand">
              <a className="text-green-600 hover:text-green-700">Milking Stand</a>
            </Link>
          </li>
          <li>
            <Link href="/investor">
              <a className="text-green-600 hover:text-green-700">Investor Information</a>
            </Link>
          </li>
        </ul>
      </section>

      <div className="prev-next-buttons">
        <button id="prev-button">Previous</button>
        <button id="next-button">Next</button>
      </div>
    </div>
  );
};

export default Schedule;