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
      <section className={styles.detailedProfiles}>
        <h2>Detailed Bloodline Profiles</h2>
        <p>Explore in-depth profiles of various goat bloodlines, including their history, characteristics, and advantages.</p>
        <ul>
          <li><Link href="/bloodlines-education/profile1"><a>Bloodline Profile 1</a></Link></li>
          <li><Link href="/bloodlines-education/profile2"><a>Bloodline Profile 2</a></Link></li>
          <li><Link href="/bloodlines-education/profile3"><a>Bloodline Profile 3</a></Link></li>
        </ul>
      </section>
      <section className={styles.breedingStrategies}>
        <h2>Breeding Strategies</h2>
        <p>Discuss different breeding strategies and how to select the best bloodlines for specific goals, such as milk production, meat quality, or disease resistance.</p>
      </section>
      <section className={styles.caseStudies}>
        <h2>Case Studies</h2>
        <p>Include real-life case studies of successful breeding programs and the impact of specific bloodlines on herd performance.</p>
      </section>
      <section className={styles.geneticTraits}>
        <h2>Genetic Traits</h2>
        <p>Explain the genetic traits associated with different bloodlines and how they influence goat health, productivity, and behavior.</p>
      </section>
      <section className={styles.bloodlineComparison}>
        <h2>Bloodline Comparison</h2>
        <p>Offer a comparison of different bloodlines, highlighting their strengths and weaknesses to help farmers make informed decisions.</p>
      </section>
      <section className={styles.expertInterviews}>
        <h2>Expert Interviews</h2>
        <p>Feature interviews with experienced breeders and experts in goat genetics to provide valuable insights and tips.</p>
      </section>
      <section className={styles.visualAids}>
        <h2>Visual Aids</h2>
        <p>Incorporate visual aids such as charts, diagrams, and images to help illustrate the differences between bloodlines and their characteristics.</p>
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
