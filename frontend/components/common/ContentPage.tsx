import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/ContentPage.module.css';

interface ContentFields {
  title: string;
  excerpt: string;
  body: string;
}

interface ContentData {
  id: string;
  fields: ContentFields;
  sys?: {
    createdAt: string;
    updatedAt: string;
  };
}

const ContentPage: React.FC<{ contentType: string; slug: string }> = ({ contentType, slug }) => {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async (): Promise<void> => {
      try {
        const response = await axios.get<ContentData>('/api/content/getContent', {
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
