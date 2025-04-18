import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Content.module.css';

const ContentPage = () => {
  const router = useRouter();
  const { contentType, slug } = router.query;
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (contentType && slug) {
      const fetchContent = async () => {
        try {
          const response = await axios.get('/api/content/getContent', {
            params: { contentType, slug },
          });
          setContent(response.data);
        } catch (error) {
          setError('Error fetching content');
        } finally {
          setLoading(false);
        }
      };

      fetchContent();
    }
  }, [contentType, slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!content) {
    return <p>No content found</p>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{content.fields.title}</h1>
        <p>{content.fields.excerpt}</p>
      </header>
      <section className={styles.content}>
        <div dangerouslySetInnerHTML={{ __html: content.fields.body }} />
      </section>
    </div>
  );
};

export default ContentPage;
