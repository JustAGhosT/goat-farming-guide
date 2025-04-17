import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome to the Goat Farming Guide</h1>
        <p>Your comprehensive resource for all things goat farming.</p>
      </header>
      <section className={styles.introduction}>
        <h2>Introduction to Goat Farming</h2>
        <p>Goat farming is a highly rewarding agricultural practice that provides sustainable sources of milk, meat, and fiber. This guide covers essential aspects such as selecting the right breed, housing, feeding, health management, and profitability.</p>
      </section>
      <section className={styles.topics}>
        <h2>Explore Topics</h2>
        <ul>
          <li><Link href="/topics"><a>Topics Listing</a></Link></li>
          <li><Link href="/bloodlines-education"><a>Bloodlines Education</a></Link></li>
          <li><Link href="/search"><a>Search</a></Link></li>
          <li><Link href="/resources"><a>Resources</a></Link></li>
          <li><Link href="/glossary"><a>Glossary</a></Link></li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
