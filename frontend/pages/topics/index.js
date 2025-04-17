import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Topics.module.css';
import { fetchTopics } from '../../lib/api';

const Topics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const getTopics = async () => {
      const topicsData = await fetchTopics();
      setTopics(topicsData);
    };

    getTopics();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Topics</h1>
        <p>Explore various topics related to goat farming.</p>
      </header>
      <section className={styles.topicsList}>
        {topics.map((topic) => (
          <div key={topic.id} className={styles.topicCard}>
            <Link href={`/topics/${topic.slug}`}>
              <a>
                <h2>{topic.title}</h2>
                <p>{topic.description}</p>
              </a>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Topics;
