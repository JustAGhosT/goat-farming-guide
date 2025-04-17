import React from 'react';
import Link from 'next/link';
import styles from '../../styles/BloodlinesEducation.module.css';

const BloodlinesEducation = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Bloodlines Education</h1>
        <p>Learn about the different bloodlines and their unique characteristics.</p>
      </header>
      <section className={styles.introduction}>
        <h2>Introduction to Bloodline Educational Content</h2>
        <p>Understanding goat bloodlines is crucial for making informed breeding decisions. This section provides detailed information on various bloodlines, their traits, and how to select the best bloodline for your herd.</p>
      </section>
      <section className={styles.topics}>
        <h2>Explore Bloodline Concepts</h2>
        <ul>
          <li><Link href="/bloodlines-education/concept1"><a>Concept 1</a></Link></li>
          <li><Link href="/bloodlines-education/concept2"><a>Concept 2</a></Link></li>
          <li><Link href="/bloodlines-education/concept3"><a>Concept 3</a></Link></li>
        </ul>
      </section>
    </div>
  );
};

export default BloodlinesEducation;
