import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { fetchRelatedArticles, fetchTopicDetails } from '../../../lib/api';
import styles from '../../../styles/Topic.module.css';

interface TopicData {
  title: string;
  description: string;
}

interface Article {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
}

const Topic: React.FC = () => {
  const router = useRouter();
  const { topicSlug } = router.query;
  const [topic, setTopic] = useState<TopicData | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (topicSlug) {
      const getTopicDetails = async () => {
        const topicData = await fetchTopicDetails(topicSlug as string);
        setTopic(topicData);
      };

      const getRelatedArticles = async () => {
        const articlesData = await fetchRelatedArticles(topicSlug as string);
        setRelatedArticles(articlesData);
      };

      getTopicDetails();
      getRelatedArticles();
    }
  }, [topicSlug]);

  if (!topic) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{topic.title}</h1>
        <p>{topic.description}</p>
      </header>
      <section className={styles.relatedArticles}>
        <h2>Related Articles</h2>
        {relatedArticles.map((article) => (
          <div key={article.id} className={styles.articleCard}>
            <Link href={`/topics/${topicSlug}/${article.slug}`}>
              <a>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
              </a>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Topic;