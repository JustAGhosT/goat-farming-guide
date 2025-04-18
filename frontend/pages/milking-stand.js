import React from 'react';
import Link from 'next/link';
import styles from '../styles/MilkingStand.module.css';

const MilkingStand = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="page-section text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">DIY Milking Stand Plans</h1>
        <p className="text-gray-600 mb-8">Build your own milking stand with these easy-to-follow plans</p>
      </header>

      <section className="page-section bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Materials Needed</h2>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left">Item</th>
              <th className="text-left">Quantity</th>
              <th className="text-right">Est. Cost (ZAR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2x4 Lumber</td>
              <td>4 pieces</td>
              <td className="text-right">R120</td>
            </tr>
            <tr>
              <td>Plywood</td>
              <td>1 sheet</td>
              <td className="text-right">R200</td>
            </tr>
            <tr>
              <td>Screws</td>
              <td>1 box</td>
              <td className="text-right">R50</td>
            </tr>
            <tr>
              <td>Hinges</td>
              <td>2 pairs</td>
              <td className="text-right">R80</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="page-section bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Assembly Steps</h2>
        <ol className="space-y-2 text-sm">
          <li>1. Cut base frame (90x60cm)</li>
          <li>2. Attach legs (45cm height)</li>
          <li>3. Install platform</li>
          <li>4. Build head gate</li>
          <li>5. Add feeding tray</li>
          <li>6. Install optional sides</li>
          <li>7. Add non-slip surface</li>
        </ol>
        <div className="tip-box mt-4">
          <strong>Safety Tip:</strong> Sand all edges and test stability before use
        </div>
      </section>

      <section className="page-section bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Placeholder Image</h2>
        <img src="assets/milking-stand.png" alt="Placeholder Milking Stand" />
      </section>

      <section className="page-section bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Related Pages</h2>
        <ul className="space-y-2 text-gray-600 list-disc pl-4">
          <li><Link href="/milking"><a className="text-green-600 hover:text-green-700">Milking Guide</a></Link></li>
          <li><Link href="/management"><a className="text-green-600 hover:text-green-700">Health & Management</a></Link></li>
          <li><Link href="/schedule"><a className="text-green-600 hover:text-green-700">Goat Farming Schedule</a></Link></li>
          <li><Link href="/investor"><a className="text-green-600 hover:text-green-700">Investor Information</a></Link></li>
        </ul>
      </section>

      <div className="prev-next-buttons">
        <button id="prev-button">Previous</button>
        <button id="next-button">Next</button>
      </div>
    </div>
  );
};

export default MilkingStand;
