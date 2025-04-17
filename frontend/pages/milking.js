import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Milking.module.css';

const MilkingGuide = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="page-section text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Complete Milking Guide</h1>
        <p className="text-gray-600 mb-8">Step-by-step instructions and timelines for successful goat milking</p>
      </header>

      <section className="page-section grid md:grid-cols-3 gap-4 mb-12">
        <Link href="#daily-routine">
          <a className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="font-semibold">Daily Routine</h3>
            <p className="text-sm text-gray-600">Morning and evening schedule</p>
          </a>
        </Link>
        <Link href="#six-week-plan">
          <a className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="font-semibold">6-Week Training Plan</h3>
            <p className="text-sm text-gray-600">Getting goats used to milking</p>
          </a>
        </Link>
        <Link href="#production-timeline">
          <a className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="font-semibold">Production Timeline</h3>
            <p className="text-sm text-gray-600">Yearly milking cycle</p>
          </a>
        </Link>
      </section>

      <section id="daily-routine" className="page-section bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Daily Milking Routine</h2>
        
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

      <section id="six-week-plan" className="page-section bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">6-Week Goat Training Plan</h2>
        
        <div className="timeline-item">
          <h3 className="font-semibold mb-2">Week 1-2: Introduction</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Lead goats to stand twice daily</li>
            <li>• Offer grain while on stand</li>
            <li>• Practice touching udder area</li>
            <li>• Keep sessions short (5-10 minutes)</li>
          </ul>
        </div>

        <div className="timeline-item">
          <h3 className="font-semibold mb-2">Week 3-4: Building Trust</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Increase time on stand</li>
            <li>• Begin udder washing routine</li>
            <li>• Practice hand positions</li>
            <li>• Maintain consistent schedule</li>
          </ul>
        </div>

        <div className="timeline-item">
          <h3 className="font-semibold mb-2">Week 5-6: Final Preparation</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Full milking routine practice</li>
            <li>• Extended stand time (15-20 minutes)</li>
            <li>• Complete health checks</li>
            <li>• Ready for actual milking</li>
          </ul>
        </div>
      </section>

      <section id="production-timeline" className="page-section bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Yearly Production Timeline</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Production Cycle</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Month 1-2: Colostrum and early lactation</li>
              <li>• Month 3-5: Peak production</li>
              <li>• Month 6-8: Steady production</li>
              <li>• Month 9-10: Natural decline</li>
              <li>• Month 11-12: Dry period</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Expected Yields</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Early: 2-3 liters daily</li>
              <li>• Peak: 3-4 liters daily</li>
              <li>• Late: 1-2 liters daily</li>
              <li>• Annual: 600-900 liters</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Key Production Points</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• First freshening: Lower yields expected</li>
            <li>• Second+ freshening: Peak production</li>
            <li>• Weather impact: Production may vary with temperature</li>
            <li>• Nutrition correlation: Feed quality affects yield</li>
          </ul>
        </div>
      </section>

      <section className="page-section bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Preparation</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Equipment Needed</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Clean milking pail</li>
              <li>• Teat dip and clean cloths</li>
              <li>• Strip cup for testing</li>
              <li>• Milking stand</li>
              <li>• Storage containers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Pre-Milking Steps</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Wash hands thoroughly</li>
              <li>• Clean udder and teats</li>
              <li>• Check for mastitis</li>
              <li>• Position goat on stand</li>
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

export default MilkingGuide;
