import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { fetchTopics } from '../../lib/api';
import styles from '../../styles/TopicNav.module.css';

interface Topic {
  id: string;
  slug: string;
  title: string;
  description?: string;
}

const TopicNav: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const getTopics = async (): Promise<void> => {
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
              <span className={styles.navLink}>{topic.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopicNav;