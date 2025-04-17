import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/TopicNav.module.css';
import { fetchTopics } from '../../lib/api';

const TopicNav = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const getTopics = async () => {
      const topicsData = await fetchTopics();
      setTopics(topicsData);
    };

    getTopics();
  }, []);

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {topics.map((topic) => (
          <li key={topic.id} className={styles.navItem}>
            <Link href={`/topics/${topic.slug}`}>
              <a className={styles.navLink}>{topic.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopicNav;
